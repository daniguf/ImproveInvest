// Sanity credentials. Both are `NEXT_PUBLIC_*` because the embedded Studio and
// the browser-side image URLs need them; they are configuration, not secrets.
//
// Next.js loads `.env.local` automatically. The explicit check below exists
// because `createClient()` otherwise fails with "Configuration must contain
// `projectId`", which does not say which variable is missing or where to set it.
const sanitize = (value: string | undefined) => value?.trim() ?? "";

const rawProjectId = sanitize(process.env.NEXT_PUBLIC_SANITY_PROJECT_ID);
const rawDataset = sanitize(process.env.NEXT_PUBLIC_SANITY_DATASET);

if (!rawProjectId || !rawDataset) {
  const missing = [
    !rawProjectId && "NEXT_PUBLIC_SANITY_PROJECT_ID",
    !rawDataset && "NEXT_PUBLIC_SANITY_DATASET",
  ]
    .filter(Boolean)
    .join(" and ");

  throw new Error(
    `Missing Sanity environment variable${missing.includes(" and ") ? "s" : ""}: ` +
      `${missing}. Copy .env.example to .env.local, fill in the values from ` +
      "https://sanity.io/manage (project -> API), then restart the dev server. " +
      'See the README section "Environment variables".'
  );
}

export const projectId: string = rawProjectId;
export const dataset: string = rawDataset;
export const apiVersion = "2023-01-01"; // use any recent API version
