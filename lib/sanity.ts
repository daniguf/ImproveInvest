import { apiVersion, dataset, projectId } from "@/sanity/env";
import { createClient } from "@sanity/client";

const useCdn = true;

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn,
});
