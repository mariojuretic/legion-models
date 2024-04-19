import { theme } from "https://themer.sanity.build/api/hues?default=737373;lightest:ffffff&primary=737373&transparent=737373&positive=22c55e;400&caution=facc15;300&critical=dc2626&darkest=000000";

import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { muxInput } from "sanity-plugin-mux-input";
import { simplerColorInput } from "sanity-plugin-simpler-color-input";
import { deskTool } from "sanity/desk";

import { createPublishWithShareAction, ShareWithEmailAction } from "./actions";
import {
  ArchiveBox,
  ClipboardDocumentCheck,
  Cog6Tooth,
  DocumentText,
  Megaphone,
  Photo,
  ShieldCheck,
  UserCircle,
} from "./components/StudioIcons";
import { schemaTypes } from "./schemas";
import { COLOR_LIST } from "./schemas/model";

const singletonActions = new Set(["publish", "discardChanges", "restore"]);
const singletonTypes = new Set([
  "about",
  "contact",
  "development",
  "privacyPolicy",
  "cookiePolicy",
  "termsOfUse",
  "settings",
]);

export default defineConfig({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,

  name: "legion-models",
  basePath: "/studio",
  title: "LEGION MODEL MANAGEMENT",

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
            S.listItem()
              .id("development")
              .title("Development Page")
              .icon(DocumentText)
              .child(
                S.document()
                  .id("development")
                  .title("Development Page")
                  .documentId("development")
                  .schemaType("development"),
              ),
            S.divider(),
            S.documentTypeListItem("model").title("Models").icon(UserCircle),
            S.listItem()
              .id("models")
              .title("Filtered Models")
              .child(
                S.list()
                  .id("colors")
                  .title("Filtered Models")
                  .items([
                    ...COLOR_LIST.map((color) =>
                      S.listItem()
                        .id(color.label.toLowerCase())
                        .title(color.label)
                        .child(() =>
                          S.documentList()
                            .id("models" + color.label.toLowerCase())
                            .title("Models")
                            .filter(`_type == "model" && color.label == $color`)
                            .params({ color: color.label }),
                        ),
                    ),
                    S.listItem()
                      .id("uncategorized")
                      .title("Uncategorized")
                      .child(() =>
                        S.documentList()
                          .id("models-uncategorized")
                          .title("Models")
                          .filter(`_type == "model" && color == null`),
                      ),
                  ]),
              ),
            S.documentTypeListItem("collection")
              .title("Packages")
              .icon(ArchiveBox),
            S.documentTypeListItem("news").title("News").icon(Megaphone),
            S.divider(),
            S.documentTypeListItem("application")
              .title("Applications")
              .icon(ClipboardDocumentCheck),
            S.divider(),
            S.listItem()
              .id("privacyPolicy")
              .title("Privacy Policy")
              .icon(ShieldCheck)
              .child(
                S.document()
                  .id("privacyPolicy")
                  .title("Privacy Policy")
                  .documentId("privacyPolicy")
                  .schemaType("privacyPolicy"),
              ),
            S.listItem()
              .id("cookiePolicy")
              .title("Cookie Policy")
              .icon(ShieldCheck)
              .child(
                S.document()
                  .id("cookiePolicy")
                  .title("Cookie Policy")
                  .documentId("cookiePolicy")
                  .schemaType("cookiePolicy"),
              ),
            S.listItem()
              .id("termsOfUse")
              .title("Terms of Use")
              .icon(ShieldCheck)
              .child(
                S.document()
                  .id("termsOfUse")
                  .title("Terms of Use")
                  .documentId("termsOfUse")
                  .schemaType("termsOfUse"),
              ),
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
    simplerColorInput(),
    muxInput(),
  ],

  schema: {
    types: schemaTypes,
    templates: (templates) =>
      templates.filter(({ schemaType }) => !singletonTypes.has(schemaType)),
  },

  document: {
    actions: (prev, context) => {
      const actions =
        context.schemaType === "collection"
          ? [
              ...prev.map((originalAction) =>
                originalAction.action === "publish"
                  ? createPublishWithShareAction(originalAction)
                  : originalAction,
              ),
              ShareWithEmailAction,
            ]
          : prev;

      return singletonTypes.has(context.schemaType)
        ? actions.filter(({ action }) => action && singletonActions.has(action))
        : actions;
    },
  },

  theme,
});
