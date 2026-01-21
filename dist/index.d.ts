/**
 * @beorn/chalkx - Extended Chalk with Modern Terminal Features
 *
 * Extends chalk with features not natively supported:
 * - Extended underline styles (curly, dotted, dashed, double)
 * - Independent underline color
 * - Hyperlinks (OSC 8)
 *
 * Features graceful fallback for unsupported terminals.
 *
 * ## Terminal Support
 *
 * | Feature           | Ghostty | Kitty | WezTerm | iTerm2 | Terminal.app |
 * |-------------------|---------|-------|---------|--------|--------------|
 * | Curly underline   | ✓       | ✓     | ✓       | ✓      | ✗ (fallback) |
 * | Dotted underline  | ✓       | ✓     | ✓       | ✓      | ✗ (fallback) |
 * | Dashed underline  | ✓       | ✓     | ✓       | ✓      | ✗ (fallback) |
 * | Double underline  | ✓       | ✓     | ✓       | ✓      | ✗ (fallback) |
 * | Underline color   | ✓       | ✓     | ✓       | ✓      | ✗ (ignored)  |
 * | Hyperlinks        | ✓       | ✓     | ✓       | ✓      | ✓            |
 *
 * @see https://sw.kovidgoyal.net/kitty/underlines/
 * @see https://gist.github.com/egmontkob/eb114294efbcd5adb1944c9f3cb5feda
 *
 * @packageDocumentation
 */
import chalk from "chalk";
export type { UnderlineStyle, RGB } from "./types.js";
export { ANSI_REGEX, stripAnsi, displayLength } from "./utils.js";
export { supportsExtendedUnderline, setExtendedUnderlineSupport, resetDetectionCache, } from "./detection.js";
export { underline, curlyUnderline, dottedUnderline, dashedUnderline, doubleUnderline, underlineColor, styledUnderline, } from "./underline.js";
export { hyperlink } from "./hyperlink.js";
/**
 * SGR code recognized by inkx to signal intentional bg override.
 * When text is wrapped with this, inkx won't warn/throw about chalk bg + inkx bg conflicts.
 * Exported for inkx to detect this marker in text content.
 */
export declare const BG_OVERRIDE_CODE = 9999;
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
export declare function bgOverride(text: string): string;
/**
 * Re-export chalk for convenience.
 * Users can import everything from @beorn/chalkx instead of needing both packages.
 */
export { chalk };
import { stripAnsi, displayLength } from "./utils.js";
import { supportsExtendedUnderline } from "./detection.js";
import { curlyUnderline, dottedUnderline, dashedUnderline, doubleUnderline, underlineColor, styledUnderline } from "./underline.js";
import { hyperlink } from "./hyperlink.js";
/**
 * Extended chalk instance with all standard chalk methods plus extensions.
 *
 * @example
 * ```ts
 * import { chalkX } from '@beorn/chalkx';
 *
 * // Standard chalk methods
 * chalkX.red('error');
 * chalkX.bold.blue('important');
 *
 * // Extended features
 * chalkX.curlyUnderline('misspelled');
 * chalkX.hyperlink('Click here', 'https://example.com');
 * ```
 */
export declare const chalkX: {
    curlyUnderline: typeof curlyUnderline;
    dottedUnderline: typeof dottedUnderline;
    dashedUnderline: typeof dashedUnderline;
    doubleUnderline: typeof doubleUnderline;
    underlineColor: typeof underlineColor;
    styledUnderline: typeof styledUnderline;
    hyperlink: typeof hyperlink;
    stripAnsi: typeof stripAnsi;
    displayLength: typeof displayLength;
    supportsExtendedUnderline: typeof supportsExtendedUnderline;
    bgOverride: typeof bgOverride;
    level: import("chalk").ColorSupportLevel;
    rgb: (red: number, green: number, blue: number) => import("chalk").ChalkInstance;
    hex: (color: string) => import("chalk").ChalkInstance;
    ansi256: (index: number) => import("chalk").ChalkInstance;
    bgRgb: (red: number, green: number, blue: number) => import("chalk").ChalkInstance;
    bgHex: (color: string) => import("chalk").ChalkInstance;
    bgAnsi256: (index: number) => import("chalk").ChalkInstance;
    reset: import("chalk").ChalkInstance;
    bold: import("chalk").ChalkInstance;
    dim: import("chalk").ChalkInstance;
    italic: import("chalk").ChalkInstance;
    underline: import("chalk").ChalkInstance;
    overline: import("chalk").ChalkInstance;
    inverse: import("chalk").ChalkInstance;
    hidden: import("chalk").ChalkInstance;
    strikethrough: import("chalk").ChalkInstance;
    visible: import("chalk").ChalkInstance;
    black: import("chalk").ChalkInstance;
    red: import("chalk").ChalkInstance;
    green: import("chalk").ChalkInstance;
    yellow: import("chalk").ChalkInstance;
    blue: import("chalk").ChalkInstance;
    magenta: import("chalk").ChalkInstance;
    cyan: import("chalk").ChalkInstance;
    white: import("chalk").ChalkInstance;
    gray: import("chalk").ChalkInstance;
    grey: import("chalk").ChalkInstance;
    blackBright: import("chalk").ChalkInstance;
    redBright: import("chalk").ChalkInstance;
    greenBright: import("chalk").ChalkInstance;
    yellowBright: import("chalk").ChalkInstance;
    blueBright: import("chalk").ChalkInstance;
    magentaBright: import("chalk").ChalkInstance;
    cyanBright: import("chalk").ChalkInstance;
    whiteBright: import("chalk").ChalkInstance;
    bgBlack: import("chalk").ChalkInstance;
    bgRed: import("chalk").ChalkInstance;
    bgGreen: import("chalk").ChalkInstance;
    bgYellow: import("chalk").ChalkInstance;
    bgBlue: import("chalk").ChalkInstance;
    bgMagenta: import("chalk").ChalkInstance;
    bgCyan: import("chalk").ChalkInstance;
    bgWhite: import("chalk").ChalkInstance;
    bgGray: import("chalk").ChalkInstance;
    bgGrey: import("chalk").ChalkInstance;
    bgBlackBright: import("chalk").ChalkInstance;
    bgRedBright: import("chalk").ChalkInstance;
    bgGreenBright: import("chalk").ChalkInstance;
    bgYellowBright: import("chalk").ChalkInstance;
    bgBlueBright: import("chalk").ChalkInstance;
    bgMagentaBright: import("chalk").ChalkInstance;
    bgCyanBright: import("chalk").ChalkInstance;
    bgWhiteBright: import("chalk").ChalkInstance;
};
export default chalkX;
//# sourceMappingURL=index.d.ts.map