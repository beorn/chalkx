/**
 * Extended underline style functions.
 *
 * Provides curly, dotted, dashed, and double underline styles
 * with graceful fallback to standard underline on unsupported terminals.
 */
import type { UnderlineStyle, RGB } from "./types.js";
/**
 * Apply an extended underline style to text.
 * Falls back to regular underline on unsupported terminals.
 *
 * @param text - Text to underline
 * @param style - Underline style (default: "single")
 * @returns Styled text with ANSI codes
 */
export declare function underline(text: string, style?: UnderlineStyle): string;
/**
 * Apply curly/wavy underline to text.
 * Commonly used for spell check errors in IDEs.
 * Falls back to regular underline on unsupported terminals.
 *
 * @param text - Text to underline
 * @returns Styled text with curly underline
 *
 * @example
 * ```ts
 * import { curlyUnderline, chalk } from '@beorn/chalkx';
 *
 * console.log(curlyUnderline('misspelled'));
 * console.log(chalk.red(curlyUnderline('error')));
 * ```
 */
export declare function curlyUnderline(text: string): string;
/**
 * Apply dotted underline to text.
 * Falls back to regular underline on unsupported terminals.
 *
 * @param text - Text to underline
 * @returns Styled text with dotted underline
 */
export declare function dottedUnderline(text: string): string;
/**
 * Apply dashed underline to text.
 * Falls back to regular underline on unsupported terminals.
 *
 * @param text - Text to underline
 * @returns Styled text with dashed underline
 */
export declare function dashedUnderline(text: string): string;
/**
 * Apply double underline to text.
 * Falls back to regular underline on unsupported terminals.
 *
 * @param text - Text to underline
 * @returns Styled text with double underline
 */
export declare function doubleUnderline(text: string): string;
/**
 * Set underline color independently of text color.
 * On unsupported terminals, the color is ignored but underline still applies.
 *
 * @param r - Red component (0-255)
 * @param g - Green component (0-255)
 * @param b - Blue component (0-255)
 * @param text - Text to style
 * @returns Styled text with colored underline
 *
 * @example
 * ```ts
 * import { underlineColor, chalk } from '@beorn/chalkx';
 *
 * // Red underline (text color unchanged)
 * console.log(underlineColor(255, 0, 0, 'warning'));
 *
 * // Red underline with blue text
 * console.log(chalk.blue(underlineColor(255, 0, 0, 'blue text, red underline')));
 * ```
 */
export declare function underlineColor(r: number, g: number, b: number, text: string): string;
/**
 * Combine underline style with underline color.
 *
 * @param style - Underline style ('curly', 'dotted', 'dashed', 'double', 'single')
 * @param rgb - Color as [r, g, b] tuple (0-255 each)
 * @param text - Text to style
 * @returns Styled text with colored underline in specified style
 *
 * @example
 * ```ts
 * import { styledUnderline, chalk } from '@beorn/chalkx';
 *
 * // Red curly underline (spell-check style)
 * console.log(styledUnderline('curly', [255, 0, 0], 'misspelled'));
 *
 * // Orange dashed underline with yellow text
 * console.log(chalk.yellow(styledUnderline('dashed', [255, 165, 0], 'warning')));
 * ```
 */
export declare function styledUnderline(style: UnderlineStyle, rgb: RGB, text: string): string;
//# sourceMappingURL=underline.d.ts.map