import { defineType } from "sanity";
import { globalContentFields } from "./sharedFields";

export const newsFeed = defineType({
  title: "News Feed",
  name: "newsFeed",
  type: "document",
  fields: globalContentFields,
});

export default newsFeed;
