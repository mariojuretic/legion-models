import { defineType, defineField, defineArrayMember } from "sanity";

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
    defineField({
      name: "portfolioImage",
      type: "image",
      fields: [
        defineField({
          name: "source",
          type: "string",
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "digitals",
      type: "array",
      of: [
        defineArrayMember({
          type: "image",
        }),
      ],
    }),
    defineField({
      name: "shows",
      type: "array",
      of: [
        defineArrayMember({
          type: "image",
        }),
      ],
    }),
    defineField({
      name: "covers",
      type: "array",
      of: [
        defineArrayMember({
          type: "image",
        }),
      ],
    }),
    defineField({
      name: "campaigns",
      type: "array",
      of: [
        defineArrayMember({
          type: "image",
        }),
      ],
    }),
    defineField({
      name: "dateOfBirth",
      type: "date",
      options: {
        dateFormat: "MMMM D, YYYY",
      },
    }),
    defineField({
      name: "color",
      type: "simplerColor",
      options: {
        colorList: [
          { label: "Blue", value: "#2563eb" },
          { label: "Red", value: "#dc2626" },
          { label: "Green", value: "#22c55e" },
          { label: "Yellow", value: "#facc15" },
          { label: "Orange", value: "#f97316" },
          { label: "Pink", value: "#f472b6" },
        ],
      },
    }),
  ],
});
