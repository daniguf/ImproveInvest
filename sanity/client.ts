import { createClient } from "@sanity/client";
import { apiVersion, dataset, projectId } from "./env";

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // ✅ safe for production, set `false` if you need instant drafts
});
