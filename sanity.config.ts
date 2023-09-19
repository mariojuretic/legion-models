import { theme } from "https://themer.sanity.build/api/hues?default=737373;lightest:ffffff&primary=737373&transparent=737373&positive=22c55e;400&caution=facc15;300&critical=dc2626&darkest=000000";

import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { visionTool } from "@sanity/vision";

import { schemaTypes } from "./schemas";

const singletonActions = new Set(["publish", "discardChanges", "restore"]);
const singletonTypes = new Set(["about"]);

export default defineConfig({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,

  name: "legion-models",
  basePath: "/studio",
  title: "THE LEGION",

  plugins: [
    deskTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            S.listItem()
              .title("About")
              .id("about")
              .child(
                S.document()
                  .title("About")
                  .schemaType("about")
                  .documentId("about"),
              ),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
    templates: (templates) =>
      templates.filter(({ schemaType }) => !singletonTypes.has(schemaType)),
  },

  document: {
    actions: (input, context) =>
      singletonTypes.has(context.schemaType)
        ? input.filter(({ action }) => action && singletonActions.has(action))
        : input,
  },

  theme,
});
