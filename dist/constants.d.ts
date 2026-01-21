/**
 * ANSI escape code constants for extended terminal features.
 *
 * @see https://sw.kovidgoyal.net/kitty/underlines/
 * @see https://gist.github.com/egmontkob/eb114294efbcd5adb1944c9f3cb5feda
 */
/**
 * Extended underline style codes.
 * Uses colon-separated parameters (ISO 8613-6): \x1b[4:Nm
 */
export declare const UNDERLINE_CODES: {
    /** No underline */
    readonly none: "\u001B[4:0m";
    /** Standard single underline */
    readonly single: "\u001B[4:1m";
    /** Double underline (two parallel lines) */
    readonly double: "\u001B[4:2m";
    /** Curly/wavy underline (spell check style) */
    readonly curly: "\u001B[4:3m";
    /** Dotted underline */
    readonly dotted: "\u001B[4:4m";
    /** Dashed underline */
    readonly dashed: "\u001B[4:5m";
    /** Reset extended underline (same as none) */
    readonly reset: "\u001B[4:0m";
};
/** Standard underline on (SGR 4) - works on all terminals */
export declare const UNDERLINE_STANDARD = "\u001B[4m";
/** Standard underline off (SGR 24) */
export declare const UNDERLINE_RESET_STANDARD = "\u001B[24m";
/**
 * Reset underline color to default (SGR 59)
 */
export declare const UNDERLINE_COLOR_RESET = "\u001B[59m";
/**
 * Build underline color escape code for RGB values.
 * Format: \x1b[58:2::r:g:bm (SGR 58 with RGB color space)
 */
export declare function buildUnderlineColorCode(r: number, g: number, b: number): string;
/** OSC 8 hyperlink start sequence */
export declare const HYPERLINK_START = "\u001B]8;;";
/** OSC 8 hyperlink end sequence (ST - String Terminator) */
export declare const HYPERLINK_END = "\u001B\\";
/**
 * Build a hyperlink escape sequence.
 * Format: \x1b]8;;<url>\x1b\\ <text> \x1b]8;;\x1b\\
 */
export declare function buildHyperlink(text: string, url: string): string;
//# sourceMappingURL=constants.d.ts.map