/**
 * Type definitions for @beorn/chalkx
 */

// =============================================================================
// Color Types
// =============================================================================

/**
 * Color level supported by terminal.
 * - 'basic': 16 colors (SGR 30-37, 40-47)
 * - '256': 256 colors (SGR 38;5;n)
 * - 'truecolor': 16M colors (SGR 38;2;r;g;b)
 */
export type ColorLevel = "basic" | "256" | "truecolor"

/**
 * RGB color tuple for underline color.
 * Each component is 0-255.
 */
export type RGB = [r: number, g: number, b: number]

// =============================================================================
// Underline Types
// =============================================================================

/**
 * Extended underline styles supported by modern terminals.
 *
 * - `single`: Standard underline (SGR 4:1)
 * - `double`: Two parallel lines (SGR 4:2)
 * - `curly`: Wavy/squiggly line (SGR 4:3) - commonly used for spell check
 * - `dotted`: Dotted line (SGR 4:4)
 * - `dashed`: Dashed line (SGR 4:5)
 */
export type UnderlineStyle = "single" | "double" | "curly" | "dotted" | "dashed"

// =============================================================================
// Style Types
// =============================================================================

/**
 * Style options for term.style() method.
 */
export interface StyleOptions {
  color?: string
  bgColor?: string
  bold?: boolean
  dim?: boolean
  italic?: boolean
  underline?: boolean
  strikethrough?: boolean
  inverse?: boolean
}

// =============================================================================
// Console Types
// =============================================================================

/**
 * Console method names that can be intercepted.
 */
export type ConsoleMethod = "log" | "info" | "warn" | "error" | "debug"

/**
 * Entry captured from console.
 */
export interface ConsoleEntry {
  method: ConsoleMethod
  args: unknown[]
  stream: "stdout" | "stderr"
}

// =============================================================================
// Term Types
// =============================================================================

/**
 * Options for createTerm().
 */
export interface CreateTermOptions {
  stdout?: NodeJS.WriteStream
  stdin?: NodeJS.ReadStream

  // Override auto-detection (for testing or forcing)
  color?: ColorLevel | null // override hasColor()
  unicode?: boolean // override hasUnicode()
  cursor?: boolean // override hasCursor()
}
