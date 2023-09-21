import { defineType, defineField, defineArrayMember } from "sanity";

export default defineType({
  name: "contact",
  type: "document",
  fields: [
    defineField({
      name: "address",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "phones",
      type: "array",
      of: [
        defineArrayMember({
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "emails",
      type: "array",
      of: [
        defineArrayMember({
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "socials",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "name",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "url",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
          ],
        }),
      ],
    }),
  ],
});
