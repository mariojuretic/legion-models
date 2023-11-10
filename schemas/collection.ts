import { defineType, defineField, defineArrayMember } from "sanity";

export default defineType({
  name: "collection",
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
      name: "models",
      type: "array",
      of: [
        defineArrayMember({
          type: "reference",
          to: [{ type: "model" }],
          options: {
            disableNew: true,
          },
        }),
      ],
    }),
  ],
});
