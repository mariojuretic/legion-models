import { defineType, defineField } from "sanity";

export default defineType({
  name: "settings",
  type: "document",
  fields: [
    defineField({
      name: "theme",
      type: "string",
      initialValue: "dark",
      options: {
        list: [
          {
            value: "dark",
            title: "Dark",
          },
          {
            value: "light",
            title: "Light",
          },
        ],
      },
    }),
  ],
});
