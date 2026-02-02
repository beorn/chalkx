/**
 * Console patching with subscribable store for useSyncExternalStore.
 */

import type { ConsoleEntry, ConsoleMethod } from "./types.js"

/**
 * A patched console that intercepts methods and accumulates entries.
 * Compatible with React's useSyncExternalStore.
 */
export interface PatchedConsole extends Disposable {
  /** Read current entries (for useSyncExternalStore) */
  getSnapshot(): readonly ConsoleEntry[]

  /** Subscribe to changes - called when new entry arrives. Returns unsubscribe function. */
  subscribe(onStoreChange: () => void): () => void

  dispose(): void
  [Symbol.dispose](): void
}

const METHODS: ConsoleMethod[] = ["log", "info", "warn", "error", "debug"]

const STDERR_METHODS = new Set<ConsoleMethod>(["error", "warn"])

export interface PatchConsoleOptions {
  /**
   * Suppress original console output when true.
   * Use in TUI mode where you want console output only in a component.
   */
  suppress?: boolean
}

/**
 * Patch console methods to intercept and accumulate entries.
 * Returns a disposable that restores original methods.
 *
 * @param console - The console object to patch
 * @param options - Configuration options
 * @param options.suppress - If true, don't call original methods (for TUI mode)
 */
export function patchConsole(
  console: Console,
  options?: PatchConsoleOptions,
): PatchedConsole {
  const suppress = options?.suppress ?? false
  const entries: ConsoleEntry[] = []
  const subscribers = new Set<() => void>()

  // Save original methods
  const originals = new Map<ConsoleMethod, Console[ConsoleMethod]>()
  for (const method of METHODS) {
    originals.set(method, console[method].bind(console))
  }

  // Replace with interceptors
  for (const method of METHODS) {
    const original = originals.get(method)!
    console[method] = (...args: unknown[]) => {
      const entry: ConsoleEntry = {
        method,
        args,
        stream: STDERR_METHODS.has(method) ? "stderr" : "stdout",
      }
      entries.push(entry)

      // Call original unless suppressed (TUI mode)
      if (!suppress) {
        original(...args)
      }

      // Notify subscribers
      subscribers.forEach((subscriber) => subscriber())
    }
  }

  function restore() {
    for (const method of METHODS) {
      console[method] = originals.get(method)!
    }
  }

  return {
    getSnapshot(): readonly ConsoleEntry[] {
      return entries
    },

    subscribe(onStoreChange: () => void): () => void {
      subscribers.add(onStoreChange)
      return () => {
        subscribers.delete(onStoreChange)
      }
    },

    dispose() {
      restore()
      subscribers.clear()
    },

    [Symbol.dispose]() {
      this.dispose()
    },
  }
}
