/**
 * @beorn/chalkx - Terminal Primitives and Extended ANSI Features
 *
 * Core terminal abstraction with Disposable pattern support plus
 * extended ANSI features not natively supported by chalk:
 * - Extended underline styles (curly, dotted, dashed, double)
 * - Independent underline color
 * - Hyperlinks (OSC 8)
 *
 * ## NewWay API (Preferred)
 *
 * ```ts
 * import { createTerm, patchConsole } from '@beorn/chalkx'
 *
 * // Create term (Disposable)
 * using term = createTerm()
 *
 * // Detection
 * term.hasCursor()    // boolean
 * term.hasInput()     // boolean
 * term.hasColor()     // 'basic' | '256' | 'truecolor' | null
 * term.hasUnicode()   // boolean
 *
 * // Styling (flattened, chainable)
 * term.red('error')
 * term.bold.green('success')
 *
 * // Console interception
 * using patched = patchConsole(console)
 * patched.subscribe(() => console.log('new entry'))
 * ```
 *
 * @packageDocumentation
 */

// =============================================================================
// Term API (NewWay)
// =============================================================================

export { createTerm } from "./term.js"
export type { Term, StyleChain } from "./term.js"

import { createTerm as _createTerm } from "./term.js"
/**
 * Default term instance for convenience.
 * Use this for simple scripts. For apps, prefer createTerm() with `using`.
 *
 * @example
 * ```ts
 * import { term } from '@beorn/chalkx'
 *
 * console.log(term.green('success'))
 * if (term.hasColor()) { ... }
 * ```
 */
export const term = _createTerm()

export { patchConsole } from "./patch-console.js"
export type {
  PatchedConsole,
  PatchConsoleOptions,
  ConsoleStats,
} from "./patch-console.js"

// =============================================================================
// Types
// =============================================================================

export type {
  UnderlineStyle,
  RGB,
  ColorLevel,
  StyleOptions,
  ConsoleMethod,
  ConsoleEntry,
  CreateTermOptions,
} from "./types.js"

// =============================================================================
// Detection Functions
// =============================================================================

export {
  detectCursor,
  detectInput,
  detectColor,
  detectUnicode,
  detectExtendedUnderline,
} from "./detection.js"

// =============================================================================
// Utilities
// =============================================================================

export { ANSI_REGEX, stripAnsi, displayLength } from "./utils.js"

// =============================================================================
// Underline Functions
// =============================================================================

export {
  underline,
  curlyUnderline,
  dottedUnderline,
  dashedUnderline,
  doubleUnderline,
  underlineColor,
  styledUnderline,
} from "./underline.js"

// =============================================================================
// Hyperlink Functions
// =============================================================================

export { hyperlink } from "./hyperlink.js"

// =============================================================================
// Background Override (for inkx compatibility)
// =============================================================================

/**
 * SGR code recognized by inkx to signal intentional bg override.
 * When text is wrapped with this, inkx won't warn/throw about chalk bg + inkx bg conflicts.
 * Exported for inkx to detect this marker in text content.
 */
export const BG_OVERRIDE_CODE = 9999

/**
 * Wrap text with a marker that tells inkx this background color is intentional.
 *
 * Use this when you deliberately want to use chalk.bg* inside an inkx Box
 * that also has backgroundColor set. Without this wrapper, inkx will throw
 * (by default) because mixing both creates visual artifacts.
 *
 * @example
 * ```tsx
 * // Normally this throws because both inkx bg AND chalk bg are set:
 * <Box backgroundColor="cyan">
 *   <Text>{chalk.bgBlack('text')}</Text>  // Error!
 * </Box>
 *
 * // With bgOverride, you're saying "I know what I'm doing":
 * <Box backgroundColor="cyan">
 *   <Text>{bgOverride(chalk.bgBlack('text'))}</Text>  // OK
 * </Box>
 * ```
 */
export function bgOverride(text: string): string {
  return `\x1b[${BG_OVERRIDE_CODE}m${text}`
}
