import { defineType, defineField } from "sanity";

export default defineType({
  name: "application",
  type: "document",
  fields: [
    defineField({
      name: "fullName",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "gender",
      type: "string",
      options: {
        list: [
          {
            value: "male",
            title: "Male",
          },
          {
            value: "female",
            title: "Female",
          },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "birthday",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "email",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "phone",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "height",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "location",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "instagram",
      type: "string",
    }),
    defineField({
      name: "headshot",
      type: "image",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "profileHeadshot",
      type: "image",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "halfBodyShot",
      type: "image",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "fullBodyShot",
      type: "image",
      validation: (Rule) => Rule.required(),
    }),
  ],
  readOnly: true,
});
