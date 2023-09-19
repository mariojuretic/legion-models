import { theme } from "https://themer.sanity.build/api/hues?default=737373;lightest:ffffff&primary=737373&transparent=737373&positive=22c55e;400&caution=facc15;300&critical=dc2626&darkest=000000";

import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";

import { schemaTypes } from "./schemas";

export default defineConfig({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,

  name: "legion-models",
  basePath: "/studio",
  title: "THE LEGION",

  plugins: [deskTool()],

  schema: {
    types: schemaTypes,
  },

  theme,
});
