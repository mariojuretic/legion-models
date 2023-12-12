import { defineType, defineField } from "sanity";
import { SanityDocument } from "next-sanity";
import moment from "moment";

export default defineType({
  name: "news",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: {
        source: (doc: SanityDocument) => {
          const title = doc.title as string;
          const date = moment(doc._createdAt).format("YYYY-MM-DD");

          return `${title}-${date}`;
        },
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "excerpt",
      type: "text",
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
  ],
});
