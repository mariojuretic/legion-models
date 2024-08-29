import { defineType, defineField } from "sanity";

export default defineType({
  name: "seo",
  type: "object",
  fields: [
    defineField({
      name: "title",
      type: "string",
    }),
    defineField({
      name: "description",
      type: "string",
    }),
  ],
});
