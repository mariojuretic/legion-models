import { defineType, defineField } from "sanity";

export default defineType({
  name: "development",
  type: "document",
  fields: [
    defineField({
      name: "message",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
  ],
});
