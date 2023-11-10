import { defineType, defineField } from "sanity";

export default defineType({
  name: "privacyPolicy",
  type: "document",
  fields: [
    defineField({
      name: "content",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
  ],
});
