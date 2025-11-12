"use client";

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import schemas from "./schema";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!;

const config = defineConfig({
  projectId,
  dataset,
  title: "Improve Invest",
  basePath: "/sanity-studio",
  plugins: [structureTool()],
  schema: { types: schemas },
});

export default config;
