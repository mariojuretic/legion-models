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
    defineField({
      name: "landingPageContentType",
      type: "string",
      initialValue: "random",
      options: {
        list: [
          {
            value: "random",
            title: "Random",
          },
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
      name: "landingPageRedirectMilliseconds",
      type: "number",
      validation: (Rule) => Rule.required().integer().positive(),
    }),
  ],
});
