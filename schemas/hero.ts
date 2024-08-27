import { defineType, defineField } from "sanity";

export default defineType({
  name: "hero",
  type: "document",
  fields: [
    defineField({
      name: "media",
      type: "string",
      initialValue: "image",
      options: {
        list: [
          {
            value: "image",
            title: "Image",
          },
          {
            value: "video",
            title: "Video",
          },
        ],
      },
    }),
    defineField({
      name: "image",
      type: "image",
      hidden: ({ document }) => document?.media !== "image",
      validation: (Rule) =>
        Rule.custom((value, context) => {
          if (context.document?.media === "image" && !value) {
            return "Required";
          } else {
            return true;
          }
        }),
      fields: [
        defineField({
          name: "alt",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "video",
      type: "mux.video",
      hidden: ({ document }) => document?.media !== "video",
      validation: (Rule) =>
        Rule.custom((value, context) => {
          if (context.document?.media === "video" && !value) {
            return "Required";
          } else {
            return true;
          }
        }),
    }),
  ],
});
