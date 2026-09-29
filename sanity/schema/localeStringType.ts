import { defineType } from "sanity";

import { DEFAULT_LOCALE, LOCALE_TITLES, LOCALES } from "../../lib/i18n";

// Since schemas are code, we can programmatically build
// fields to hold translated values. The language list comes
// from lib/i18n.ts so it cannot drift from the rest of the app.
const supportedLanguages = LOCALES.map((id) => ({
  id,
  title: LOCALE_TITLES[id],
  isDefault: id === DEFAULT_LOCALE,
}));

export const localeString = defineType({
  title: "Localized string",
  name: "localeString",
  type: "object",
  // Fieldsets can be used to group object fields.
  // Here we omit a fieldset for the "default language",
  // making it stand out as the main field.
  fieldsets: [
    {
      title: "Translations",
      name: "translations",
      options: { collapsible: true },
    },
  ],
  // Dynamically define one field per language
  fields: supportedLanguages.map((lang) => ({
    title: lang.title,
    name: lang.id,
    type: "string",
    fieldset: lang.isDefault ? undefined : "translations",
    validation: (rule) => [
      rule.required().min(3).error("A title of min. 3 characters is required"),
      rule.max(50).warning("Shorter titles are usually better"),
      // Note: Validation would now apply to the language object
      // You might want to customize this further.
    ],
  })),
});
