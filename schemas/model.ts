import { defineType, defineField } from "sanity";

export default defineType({
  name: "model",
  type: "document",
  fields: [
    defineField({
      name: "name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: {
        source: "name",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      type: "string",
      initialValue: "new-faces",
      options: {
        list: [
          {
            value: "new-faces",
            title: "New Faces",
          },
          {
            value: "models",
            title: "Models",
          },
        ],
      },
    }),
    defineField({
      name: "hidden",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "thumbnail",
      type: "object",
      fields: [
        defineField({
          name: "default",
          type: "image",
        }),
        defineField({
          name: "hover",
          type: "image",
        }),
      ],
      options: {
        columns: 2,
      },
    }),
  ],
});
