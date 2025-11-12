"use client";

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!;

const config = defineConfig({
  projectId,
  dataset,
  title: "Improve Invest",
  basePath: "/sanity-studio",
  plugins: [structureTool()],
  schema: { types: [] },
});

export default config;
