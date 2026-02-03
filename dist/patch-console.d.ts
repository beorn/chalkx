/**
 * Console patching with subscribable store for useSyncExternalStore.
 */
import type { ConsoleEntry } from "./types.js";
/**
 * A patched console that intercepts methods and accumulates entries.
 * Compatible with React's useSyncExternalStore.
 */
export interface PatchedConsole extends Disposable {
    /** Read current entries (for useSyncExternalStore) */
    getSnapshot(): readonly ConsoleEntry[];
    /** Subscribe to changes - called when new entry arrives. Returns unsubscribe function. */
    subscribe(onStoreChange: () => void): () => void;
    dispose(): void;
    [Symbol.dispose](): void;
}
export interface PatchConsoleOptions {
    /**
     * Suppress original console output when true.
     * Use in TUI mode where you want console output only in a component.
     */
    suppress?: boolean;
}
/**
 * Patch console methods to intercept and accumulate entries.
 * Returns a disposable that restores original methods.
 *
 * @param console - The console object to patch
 * @param options - Configuration options
 * @param options.suppress - If true, don't call original methods (for TUI mode)
 */
export declare function patchConsole(console: Console, options?: PatchConsoleOptions): PatchedConsole;
//# sourceMappingURL=patch-console.d.ts.map