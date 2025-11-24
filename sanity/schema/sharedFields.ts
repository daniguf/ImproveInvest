import { defineArrayMember, defineField } from "sanity";

export const globalContentFields = [
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
    name: "videoFile",
    title: "Video File",
    type: "file",
    options: {
      accept: "video/*", // Accepts all video formats
    },
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
];
