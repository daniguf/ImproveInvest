import { defineField, defineType } from "sanity";
import { galleryField } from "./sharedFields";

const fields = [
  defineField({
    title: "News Feed Item Title",
    name: "title",
    type: "localeString", // Use the custom type
    validation: (rule) => [rule.required()],
  }),

  defineField({
    title: "Slug",
    name: "slug",
    type: "slug",
    options: {
      source: (document) => {
        const doc = document as {
          title?: { en?: string; de?: string; da?: string };
        };
        // Priority: English -> German -> Danish -> Fallback
        return doc?.title?.en || doc?.title?.de || doc?.title?.da || "untitled";
      },
    },
    validation: (rule) => rule.required(),
  }),
  galleryField,
  defineField({
    name: "content",
    title: "Content",
    type: "internationalizedArrayProjectContent", // Use the new custom type
  }),
];

export const newsfeed = defineType({
  title: "Newsfeed",
  name: "newsfeed",
  type: "document",
  fields: fields,
});

export default newsfeed;
