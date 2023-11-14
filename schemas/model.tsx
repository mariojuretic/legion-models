import { defineType, defineField, defineArrayMember } from "sanity";
import Image from "next/image";
import moment from "moment";

import urlFor from "@/lib/urlFor";

export default defineType({
  name: "model",
  type: "document",
  fields: [
    defineField({
      name: "name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: {
        source: "name",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      type: "string",
      initialValue: "new-faces",
      options: {
        list: [
          {
            value: "new-faces",
            title: "New Faces",
          },
          {
            value: "models",
            title: "Models",
          },
        ],
      },
    }),
    defineField({
      name: "hidden",
      type: "boolean",
      initialValue: false,
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
    defineField({
      name: "portfolioImage",
      type: "image",
      fields: [
        defineField({
          name: "source",
          type: "string",
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "digitals",
      type: "array",
      of: [
        defineArrayMember({
          type: "image",
          fields: [
            defineField({
              name: "source",
              type: "string",
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "shows",
      type: "array",
      of: [
        defineArrayMember({
          type: "image",
          fields: [
            defineField({
              name: "source",
              type: "string",
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "covers",
      type: "array",
      of: [
        defineArrayMember({
          type: "image",
          fields: [
            defineField({
              name: "source",
              type: "string",
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "campaigns",
      type: "array",
      of: [
        defineArrayMember({
          type: "image",
          fields: [
            defineField({
              name: "source",
              type: "string",
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "interview",
      type: "text",
    }),
    defineField({
      name: "instagram",
      type: "string",
    }),
    defineField({
      name: "dateOfBirth",
      type: "date",
      options: {
        dateFormat: "MMMM D, YYYY",
      },
    }),
    defineField({
      name: "color",
      type: "simplerColor",
      options: {
        colorList: [
          { label: "Blue", value: "#2563eb" },
          { label: "Red", value: "#dc2626" },
          { label: "Green", value: "#22c55e" },
          { label: "Yellow", value: "#facc15" },
          { label: "Orange", value: "#f97316" },
          { label: "Pink", value: "#f472b6" },
        ],
      },
    }),
    defineField({
      name: "contract",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "contractExpirationDate",
      type: "date",
      hidden: ({ document }) => !document?.contract,
      options: {
        dateFormat: "MMMM D, YYYY",
      },
    }),
    defineField({
      name: "notes",
      type: "text",
    }),
  ],
  preview: {
    select: {
      name: "name",
      portfolioImage: "portfolioImage",
      color: "color",
      contract: "contract",
      contractExpirationDate: "contractExpirationDate",
    },
    prepare: ({
      name,
      portfolioImage,
      color,
      contract,
      contractExpirationDate,
    }) => ({
      title: name,
      subtitle:
        contract &&
        contractExpirationDate &&
        `Contract until ${moment(contractExpirationDate).format(
          "MMMM D, YYYY",
        )}`,
      media: (
        <Image
          src={urlFor(portfolioImage).url()}
          alt={name}
          fill
          style={{
            objectFit: "cover",
            objectPosition: "center",
            border: color ? `1px solid ${color.value}` : "none",
          }}
          sizes="35px"
        />
      ),
    }),
  },
  orderings: [
    {
      title: "Name",
      name: "name",
      by: [{ field: "name", direction: "asc" }],
    },
    {
      title: "Color",
      name: "color",
      by: [{ field: "color", direction: "asc" }],
    },
  ],
});