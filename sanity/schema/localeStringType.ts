import { defineType } from "sanity";

// Since schemas are code, we can programmatically build
// fields to hold translated values. We'll use this array
// of languages to determine which fields to define.
const supportedLanguages = [
  { id: "da", title: "Danish", isDefault: true },
  { id: "en", title: "English" },
  { id: "de", title: "German" },
];

export const baseLanguage = supportedLanguages.find((l) => l.isDefault);

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
