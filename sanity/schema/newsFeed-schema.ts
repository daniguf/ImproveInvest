import { defineArrayMember, defineField, defineType } from "sanity";

export const newsFeed = defineType({
  title: "News Feed",
  name: "newsFeed",
  type: "document",
  fields: [
    defineField({
      title: "Name",
      name: "name",
      type: "string",
    }),
    defineField({
      title: "Slug",
      name: "slug",
      type: "slug",
      options: { source: "name" },
    }),
    defineField({
      title: "Image",
      name: "image",
      type: "image",
      fields: [{ title: "Alt", name: "alt", type: "string" }],
    }),
    defineField({
      title: "URL",
      name: "url",
      type: "url",
    }),
    defineField({
      name: "content",
      title: "Content",
      type: "array",
      of: [defineArrayMember({ type: "block" })],
    }),
  ],
});

export default newsFeed;
