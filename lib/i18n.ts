// Single source of truth for the locales the app supports.
//
// The same list used to be duplicated in `sanity/sanity.config.ts`,
// `sanity/schema/localeStringType.ts` and `.storybook/preview.ts` (all da/en/de)
// while `project.inlang/settings.json` claimed `en` only. Everything that needs
// the list should import from here.

export const LOCALES = ["da", "en", "de"] as const;

export type Locale = (typeof LOCALES)[number];

/** Danish is the application default (`i18n/request.ts` falls back to it). */
export const DEFAULT_LOCALE: Locale = "da";

/** Human-readable names in each language's own words, for UI locale switchers. */
export const LOCALE_LABELS: Record<Locale, string> = {
  da: "Dansk",
  en: "English",
  de: "Deutsch",
};

/** English names, used for the language list in the Sanity Studio. */
export const LOCALE_TITLES: Record<Locale, string> = {
  da: "Danish",
  en: "English",
  de: "German",
};

export function isLocale(value: string | null | undefined): value is Locale {
  return value != null && (LOCALES as readonly string[]).includes(value);
}

/**
 * Narrow an untrusted value (a cookie, a query parameter) to a supported locale.
 * Anything unrecognised — including path-traversal attempts aimed at the
 * `messages/${locale}.json` dynamic import — resolves to the default locale.
 */
export function resolveLocale(value: string | null | undefined): Locale {
  return isLocale(value) ? value : DEFAULT_LOCALE;
}
