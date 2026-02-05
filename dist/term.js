/**
 * Term interface and createTerm() factory.
 *
 * Term is the central abstraction for terminal interaction:
 * - Detection: hasCursor(), hasInput(), hasColor(), hasUnicode()
 * - Dimensions: cols, rows
 * - I/O: stdout, stdin, write(), writeLine()
 * - Styling: Chainable styles via Proxy (term.bold.red('text'))
 * - Lifecycle: Disposable pattern via Symbol.dispose
 */
import { Chalk } from "chalk";
import { detectColor, detectCursor, detectInput, detectUnicode, } from "./detection.js";
// =============================================================================
// ANSI Utilities
// =============================================================================
/**
 * ANSI escape code pattern for stripping.
 */
const ANSI_REGEX = /\x1b\[[0-9;:]*m|\x1b\]8;;[^\x1b]*\x1b\\/g;
/**
 * Strip all ANSI escape codes from a string.
 */
function stripAnsi(text) {
    return text.replace(ANSI_REGEX, "");
}
// =============================================================================
// createTerm Factory
// =============================================================================
/**
 * Create a Term instance with optional overrides.
 *
 * Detection results are cached at creation time for consistency.
 * Use overrides for testing or to force specific capabilities.
 *
 * @example
 * ```ts
 * // Auto-detect everything
 * const term = createTerm()
 *
 * // Force no colors (for testing)
 * const term = createTerm({ color: null })
 *
 * // Custom streams
 * const term = createTerm({ stdout: customStream })
 * ```
 */
export function createTerm(options = {}) {
    const stdout = options.stdout ?? process.stdout;
    const stdin = options.stdin ?? process.stdin;
    // Cache detection results
    const cachedCursor = options.cursor ?? detectCursor(stdout);
    const cachedInput = detectInput(stdin);
    const cachedColor = options.color !== undefined ? options.color : detectColor(stdout);
    const cachedUnicode = options.unicode ?? detectUnicode();
    // Create chalk instance with appropriate color level
    const chalkLevel = cachedColor === null
        ? 0
        : cachedColor === "basic"
            ? 1
            : cachedColor === "256"
                ? 2
                : 3;
    const chalkInstance = new Chalk({ level: chalkLevel });
    // Disposed flag
    let disposed = false;
    // Base term object with methods
    const termBase = {
        // Detection methods
        hasCursor: () => cachedCursor,
        hasInput: () => cachedInput,
        hasColor: () => cachedColor,
        hasUnicode: () => cachedUnicode,
        // Streams
        stdout,
        stdin,
        // I/O methods
        write: (str) => {
            stdout.write(str);
        },
        writeLine: (str) => {
            stdout.write(str + "\n");
        },
        // Utilities
        stripAnsi,
        // Disposable
        [Symbol.dispose]: () => {
            disposed = true;
        },
    };
    // Create proxy that wraps chalk for styling
    const term = createStyleProxy(chalkInstance, termBase);
    // Add dynamic dimension getters
    Object.defineProperty(term, "cols", {
        get: () => (stdout.isTTY ? stdout.columns : undefined),
        enumerable: true,
    });
    Object.defineProperty(term, "rows", {
        get: () => (stdout.isTTY ? stdout.rows : undefined),
        enumerable: true,
    });
    return term;
}
// =============================================================================
// Style Proxy Implementation
// =============================================================================
/**
 * Create a proxy that combines term methods with chalk styling.
 *
 * The proxy makes the term object:
 * - Callable: term('text') applies current styles
 * - Chainable: term.bold.red('text') chains styles
 */
function createStyleProxy(chalkInstance, termBase) {
    return createChainProxy(chalkInstance, termBase);
}
/**
 * Create a chainable proxy that wraps a chalk instance.
 */
function createChainProxy(currentChalk, termBase) {
    const handler = {
        // Make the proxy callable
        apply(_target, _thisArg, args) {
            // Handle both regular calls and template literals
            if (args.length === 1 && typeof args[0] === "string") {
                return currentChalk(args[0]);
            }
            // Template literal call
            if (args.length > 0 && Array.isArray(args[0]) && "raw" in args[0]) {
                return currentChalk(args[0], ...args.slice(1));
            }
            return currentChalk(String(args[0] ?? ""));
        },
        // Handle property access for chaining
        get(target, prop, receiver) {
            // Check termBase first for term-specific methods/properties
            if (prop in termBase) {
                const value = termBase[prop];
                // Return methods bound to termBase, or values directly
                if (typeof value === "function") {
                    return value;
                }
                return value;
            }
            // Handle symbol properties
            if (typeof prop === "symbol") {
                if (prop === Symbol.dispose) {
                    return termBase[Symbol.dispose];
                }
                return Reflect.get(target, prop, receiver);
            }
            // Handle chalk methods that take arguments and return a new chain
            if (prop === "rgb" || prop === "bgRgb") {
                return (r, g, b) => {
                    const newChalk = currentChalk[prop](r, g, b);
                    return createChainProxy(newChalk, termBase);
                };
            }
            if (prop === "hex" || prop === "bgHex") {
                return (color) => {
                    const newChalk = currentChalk[prop](color);
                    return createChainProxy(newChalk, termBase);
                };
            }
            if (prop === "ansi256" || prop === "bgAnsi256") {
                return (code) => {
                    const newChalk = currentChalk[prop](code);
                    return createChainProxy(newChalk, termBase);
                };
            }
            // Handle style properties (bold, red, etc.) - return new chain
            const chalkProp = currentChalk[prop];
            if (chalkProp !== undefined) {
                // If it's a chalk chain property, wrap it in a new proxy
                if (typeof chalkProp === "function" || typeof chalkProp === "object") {
                    return createChainProxy(chalkProp, termBase);
                }
                return chalkProp;
            }
            return undefined;
        },
        // Report that we have term properties
        has(_target, prop) {
            if (prop in termBase)
                return true;
            if (typeof prop === "string" && prop in currentChalk)
                return true;
            return false;
        },
    };
    // Use a function as the proxy target so it's callable
    const proxyTarget = Object.assign(function () { }, currentChalk);
    return new Proxy(proxyTarget, handler);
}
//# sourceMappingURL=term.js.map