/**
 * Console patching with subscribable store for useSyncExternalStore.
 */
const METHODS = ["log", "info", "warn", "error", "debug"];
const STDERR_METHODS = new Set(["error", "warn"]);
/**
 * Patch console methods to intercept and accumulate entries.
 * Returns a disposable that restores original methods.
 *
 * @param console - The console object to patch
 * @param options - Configuration options
 * @param options.suppress - If true, don't call original methods (for TUI mode)
 */
export function patchConsole(console, options) {
    const suppress = options?.suppress ?? false;
    const entries = [];
    const subscribers = new Set();
    // Save original methods
    const originals = new Map();
    for (const method of METHODS) {
        originals.set(method, console[method].bind(console));
    }
    // Replace with interceptors
    for (const method of METHODS) {
        const original = originals.get(method);
        console[method] = (...args) => {
            const entry = {
                method,
                args,
                stream: STDERR_METHODS.has(method) ? "stderr" : "stdout",
            };
            entries.push(entry);
            // Call original unless suppressed (TUI mode)
            if (!suppress) {
                original(...args);
            }
            // Notify subscribers
            subscribers.forEach((subscriber) => subscriber());
        };
    }
    function restore() {
        for (const method of METHODS) {
            console[method] = originals.get(method);
        }
    }
    return {
        getSnapshot() {
            return entries;
        },
        subscribe(onStoreChange) {
            subscribers.add(onStoreChange);
            return () => {
                subscribers.delete(onStoreChange);
            };
        },
        dispose() {
            restore();
            subscribers.clear();
        },
        [Symbol.dispose]() {
            this.dispose();
        },
    };
}
//# sourceMappingURL=patch-console.js.map