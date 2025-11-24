"use client";

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { dataset, projectId } from "./env";
import schemas from "./schema";

export default defineConfig({
  projectId,
  dataset,
  title: "Improve Invest",
  basePath: "/sanity-studio",
  plugins: [structureTool()],
  schema: { types: schemas },
});
