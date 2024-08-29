import { defineType, defineField } from "sanity";

export default defineType({
  name: "about",
  type: "document",
  fields: [
    defineField({
      name: "description",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "seo",
      type: "seo",
    }),
  ],
});
