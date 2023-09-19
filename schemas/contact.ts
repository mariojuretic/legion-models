import { defineType, defineField, defineArrayMember } from "sanity";

export default defineType({
  name: "contact",
  title: "Contact",
  type: "document",
  fields: [
    defineField({
      name: "address",
      title: "Address",
      type: "text",
    }),
    defineField({
      name: "phone",
      title: "Phone",
      type: "array",
      of: [
        defineArrayMember({
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "array",
      of: [
        defineArrayMember({
          type: "string",
        }),
      ],
    }),
  ],
});
