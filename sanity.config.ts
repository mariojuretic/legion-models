import { theme } from "https://themer.sanity.build/api/hues?default=737373;lightest:ffffff&primary=737373&transparent=737373&positive=22c55e;400&caution=facc15;300&critical=dc2626&darkest=000000";

import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { visionTool } from "@sanity/vision";

import { schemaTypes } from "./schemas";
import {
  Photo,
  DocumentText,
  UserCircle,
  Megaphone,
  Cog6Tooth,
} from "./components/StudioIcons";

const singletonActions = new Set(["publish", "discardChanges", "restore"]);
const singletonTypes = new Set(["about", "contact", "settings"]);

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
          .id("studio")
          .title("Studio")
          .items([
            S.documentTypeListItem("hero").title("Landing Page").icon(Photo),
            S.divider(),
            S.listItem()
              .id("about")
              .title("About Page")
              .icon(DocumentText)
              .child(
                S.document()
                  .id("about")
                  .title("About Page")
                  .documentId("about")
                  .schemaType("about"),
              ),
            S.listItem()
              .id("contact")
              .title("Contact Page")
              .icon(DocumentText)
              .child(
                S.document()
                  .id("contact")
                  .title("Contact Page")
                  .documentId("contact")
                  .schemaType("contact"),
              ),
            S.divider(),
            S.documentTypeListItem("model")
              .title("Model Database")
              .icon(UserCircle),
            S.documentTypeListItem("news").title("News").icon(Megaphone),
            S.divider(),
            S.listItem()
              .id("settings")
              .title("Settings")
              .icon(Cog6Tooth)
              .child(
                S.document()
                  .id("settings")
                  .title("Settings")
                  .documentId("settings")
                  .schemaType("settings"),
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
