export type LocalizedString = {
    tr: string;
    en: string;
};

export const SUPPORTED_LANGUAGES = ["tr", "en"] as const;
export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];

/**
 * Resolves a localized string to the current language.
 * Falls back to English, then Turkish, then empty string.
 */
export function getLocalizedValue(
    value: LocalizedString | string | undefined,
    language: string
): string {
    if (!value) return "";
    if (typeof value === "string") return value;
    const lang = language as SupportedLanguage;
    return value[lang] || value.en || value.tr || "";
}

export function emptyLocalizedString(): LocalizedString {
    return { tr: "", en: "" };
}
