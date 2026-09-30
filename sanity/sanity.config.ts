"use client";

import { defineConfig, defineField } from "sanity";
import { internationalizedArray } from "sanity-plugin-internationalized-array";
import { structureTool } from "sanity/structure";
import { DEFAULT_LOCALE, LOCALE_TITLES, LOCALES } from "../lib/i18n";
import { dataset, projectId } from "./env";
import schemas from "./schema";

export default defineConfig({
  projectId,
  dataset,
  title: "Improve Invest",
  basePath: "/sanity-studio",
  plugins: [
    structureTool(),
    internationalizedArray({
      languages: LOCALES.map((id) => ({ id, title: LOCALE_TITLES[id] })),
      defaultLanguages: [DEFAULT_LOCALE],
      fieldTypes: [
        "string", // Creates type: 'internationalizedArrayString'
        // Define your Portable Text field inline here:
        defineField({
          name: "projectContent", // <-- The plugin creates a type from this name
          type: "array",
          of: [
            {
              type: "block",
            },
            // You can add other portable text types (e.g., images) here
          ],
        }),
      ],
    }),
  ],
  schema: { types: schemas },
});
