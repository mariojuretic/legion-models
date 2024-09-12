import { defineType, defineField, defineArrayMember } from "sanity";
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
      name: "date",
      type: "datetime",
      options: {
        dateFormat: "MMMM D, YYYY",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: {
        source: (doc: SanityDocument) => {
          const title = doc.title as string;
          const date = moment(doc.date).format("YYYY-MM-DD");

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
      name: "model",
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
    defineField({
      name: "thumbnail",
      type: "object",
      fields: [
        defineField({
          name: "default",
          type: "image",
          fields: [
            defineField({
              name: "alt",
              type: "string",
            }),
          ],
        }),
        defineField({
          name: "hover",
          type: "image",
          fields: [
            defineField({
              name: "alt",
              type: "string",
            }),
          ],
        }),
      ],
      options: {
        columns: 2,
      },
    }),
    defineField({
      name: "details",
      type: "text",
    }),
    defineField({
      name: "type",
      type: "string",
      initialValue: "image",
      options: {
        list: [
          { value: "image", title: "Image" },
          { value: "video", title: "Video" },
        ],
      },
    }),
    defineField({
      name: "images",
      type: "array",
      of: [
        defineArrayMember({
          type: "image",
          fields: [
            defineField({
              name: "alt",
              type: "string",
            }),
            defineField({
              name: "source",
              type: "string",
            }),
          ],
        }),
      ],
      hidden: ({ document }) => document?.type !== "image",
      validation: (Rule) =>
        Rule.custom((value, context) => {
          if (context.document?.type === "image" && !value) {
            return "Required";
          } else {
            return true;
          }
        }),
    }),
    defineField({
      name: "videos",
      type: "array",
      of: [
        defineArrayMember({
          type: "mux.video",
        }),
      ],
      hidden: ({ document }) => document?.type !== "video",
      validation: (Rule) =>
        Rule.custom((value, context) => {
          if (context.document?.type === "video" && !value) {
            return "Required";
          } else {
            return true;
          }
        }),
    }),
    defineField({
      name: "seo",
      type: "seo",
    }),
  ],
  orderings: [
    {
      title: "Date",
      name: "date",
      by: [{ field: "date", direction: "desc" }],
    },
  ],
});
