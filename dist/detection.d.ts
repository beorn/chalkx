/**
 * Terminal capability detection for extended ANSI features.
 *
 * Detects support for:
 * - Extended underline styles (curly, dotted, dashed, double)
 * - Underline color (SGR 58)
 * - Hyperlinks (OSC 8)
 */
/**
 * Check if the terminal supports extended underline styles.
 * Result is cached after first call.
 */
export declare function supportsExtendedUnderline(): boolean;
/**
 * Override extended underline support detection.
 * Useful for testing or forcing behavior in specific environments.
 *
 * @param supported - true/false to force, null to re-detect on next call
 */
export declare function setExtendedUnderlineSupport(supported: boolean | null): void;
/**
 * Reset detection cache, forcing re-detection on next call.
 */
export declare function resetDetectionCache(): void;
//# sourceMappingURL=detection.d.ts.map