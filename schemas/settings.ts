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
    defineField({
      name: "landingPageSeo",
      description: "Default values, used as fallback values for all pages.",
      type: "seo",
    }),
    defineField({
      name: "mainBoardSeo",
      type: "seo",
    }),
    defineField({
      name: "getScoutedSeo",
      type: "seo",
    }),
    defineField({
      name: "newsSeo",
      type: "seo",
    }),
  ],
});
