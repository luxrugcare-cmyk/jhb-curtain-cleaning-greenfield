"use client";

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./sanity/schemaTypes";

export default defineConfig({
  name: "jhbCurtainCleaning",
  title: "JHB Curtain Cleaning Content",
  projectId: "g5y9wcb1",
  dataset: "production",
  plugins: [structureTool()],
  schema: { types: schemaTypes },
});
