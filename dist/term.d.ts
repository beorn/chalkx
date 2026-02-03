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
import type { ColorLevel, CreateTermOptions } from "./types.js";
/**
 * All chalk style method names that can be chained.
 */
type ChalkStyleName = "reset" | "bold" | "dim" | "italic" | "underline" | "overline" | "inverse" | "hidden" | "strikethrough" | "visible" | "black" | "red" | "green" | "yellow" | "blue" | "magenta" | "cyan" | "white" | "gray" | "grey" | "blackBright" | "redBright" | "greenBright" | "yellowBright" | "blueBright" | "magentaBright" | "cyanBright" | "whiteBright" | "bgBlack" | "bgRed" | "bgGreen" | "bgYellow" | "bgBlue" | "bgMagenta" | "bgCyan" | "bgWhite" | "bgGray" | "bgGrey" | "bgBlackBright" | "bgRedBright" | "bgGreenBright" | "bgYellowBright" | "bgBlueBright" | "bgMagentaBright" | "bgCyanBright" | "bgWhiteBright";
/**
 * StyleChain provides chainable styling methods.
 * Each property returns a new chain, and the chain is callable.
 */
export type StyleChain = {
    /**
     * Apply styles to text.
     */
    (text: string): string;
    (template: TemplateStringsArray, ...values: unknown[]): string;
    /**
     * RGB foreground color.
     */
    rgb(r: number, g: number, b: number): StyleChain;
    /**
     * Hex foreground color.
     */
    hex(color: string): StyleChain;
    /**
     * 256-color foreground.
     */
    ansi256(code: number): StyleChain;
    /**
     * RGB background color.
     */
    bgRgb(r: number, g: number, b: number): StyleChain;
    /**
     * Hex background color.
     */
    bgHex(color: string): StyleChain;
    /**
     * 256-color background.
     */
    bgAnsi256(code: number): StyleChain;
} & {
    /**
     * Chainable style properties.
     */
    readonly [K in ChalkStyleName]: StyleChain;
};
/**
 * Term interface for terminal interaction.
 *
 * Provides:
 * - Capability detection (cached on creation)
 * - Dimensions (live from stream)
 * - I/O (stdout, stdin, write, writeLine)
 * - Styling (chainable via Proxy)
 * - Disposable lifecycle
 */
export interface Term extends Disposable, StyleChain {
    /**
     * Check if terminal supports cursor control (repositioning).
     * Returns false for dumb terminals and piped output.
     */
    hasCursor(): boolean;
    /**
     * Check if terminal can read raw keystrokes.
     * Requires stdin to be a TTY with raw mode support.
     */
    hasInput(): boolean;
    /**
     * Check color level supported by terminal.
     * Returns null if no color support.
     */
    hasColor(): ColorLevel | null;
    /**
     * Check if terminal can render unicode symbols.
     */
    hasUnicode(): boolean;
    /**
     * Terminal width in columns.
     * Undefined if not a TTY or dimensions unavailable.
     */
    readonly cols: number | undefined;
    /**
     * Terminal height in rows.
     * Undefined if not a TTY or dimensions unavailable.
     */
    readonly rows: number | undefined;
    /**
     * Output stream (defaults to process.stdout).
     */
    readonly stdout: NodeJS.WriteStream;
    /**
     * Input stream (defaults to process.stdin).
     */
    readonly stdin: NodeJS.ReadStream;
    /**
     * Write string to stdout.
     */
    write(str: string): void;
    /**
     * Write string followed by newline to stdout.
     */
    writeLine(str: string): void;
    /**
     * Strip ANSI escape codes from string.
     */
    stripAnsi(str: string): string;
}
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
export declare function createTerm(options?: CreateTermOptions): Term;
export {};
//# sourceMappingURL=term.d.ts.map