import { defineType } from "sanity";
import { globalContentFields } from "./sharedFields";

export const project = defineType({
  title: "Projects",
  name: "project",
  type: "document",
  fields: globalContentFields,
});

export default project;
