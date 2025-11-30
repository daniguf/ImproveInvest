import { defineArrayMember, defineField } from "sanity";

export const globalContentFields = [
  defineField({
    title: "Project Title",
    name: "title",
    type: "string",
    validation: (rule) => [
      rule.required(),
      rule.required().min(3).error("A title of min. 3 characters is required"),
      rule.max(50).warning("Shorter titles are usually better"),
    ],
  }),
  defineField({
    name: "address",
    title: "Address Of Property",
    type: "string",
  }),

  defineField({
    title: "Slug",
    name: "slug",
    type: "slug",
    options: { source: "title" },
    validation: (rule) => rule.required(),
  }),
  defineField({
    name: "gallery",
    title: "Gallery",
    type: "array",
    of: [
      defineArrayMember({
        type: "object",
        name: "Image",
        title: "Image",
        validation: (Rule) =>
          Rule.custom((images) => {
            if (!Array.isArray(images)) return true;
            const featured = images.filter((img) => img.isFeatured);
            return featured.length <= 1 || "Only one image can be featured";
          }),
        fields: [
          {
            name: "image",
            type: "image",
            options: { hotspot: true },
          },
          {
            name: "caption",
            type: "string",
          },
          {
            name: "isFeatured",
            type: "boolean",
            title: "Use as display image",
          },
        ],
      }),
      defineArrayMember({
        name: "videoFile",
        title: "Video",
        type: "file",
        options: {
          accept: "video/*", // Accepts all video formats
        },
      }),
    ],
  }),
  defineField({
    name: "content",
    title: "Content",
    type: "array",
    of: [defineArrayMember({ type: "block" })],
  }),
];
