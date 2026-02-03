/**
 * Terminal capability detection.
 *
 * Detects:
 * - Cursor control (can reposition cursor)
 * - Input capability (can read raw keystrokes)
 * - Color level (basic, 256, truecolor)
 * - Unicode support (can render unicode symbols)
 * - Extended underline support (curly, dotted, etc)
 */
import type { ColorLevel } from "./types.js";
/**
 * Detect if terminal supports cursor control (repositioning).
 * Returns false for dumb terminals and piped output.
 */
export declare function detectCursor(stdout: NodeJS.WriteStream): boolean;
/**
 * Detect if terminal can read raw keystrokes.
 * Requires stdin to be a TTY with raw mode support.
 */
export declare function detectInput(stdin: NodeJS.ReadStream): boolean;
/**
 * Detect color level supported by terminal.
 * Returns null if no color support.
 *
 * Checks (in order):
 * 1. NO_COLOR env var - forces no color
 * 2. FORCE_COLOR env var - forces color level
 * 3. COLORTERM=truecolor - truecolor support
 * 4. TERM patterns - detect from terminal type
 * 5. CI detection - basic colors in CI
 */
export declare function detectColor(stdout: NodeJS.WriteStream): ColorLevel | null;
/**
 * Detect if terminal can render unicode symbols.
 * Based on TERM, locale, and known terminal apps.
 */
export declare function detectUnicode(): boolean;
/**
 * Detect if terminal supports extended underline styles.
 * (curly, dotted, dashed, double)
 */
export declare function detectExtendedUnderline(): boolean;
//# sourceMappingURL=detection.d.ts.map