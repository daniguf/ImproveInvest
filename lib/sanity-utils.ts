import { sanityClient } from "@/sanity/client";

export async function sanityFetch<QueryResponse>({
  query,
  params = {},
  tags = [],
}: {
  query: string;
  params?: Record<string, unknown>;
  tags?: string[];
}): Promise<QueryResponse> {
  return sanityClient.fetch<QueryResponse>(query, params, {
    next: { tags, revalidate: 3600 }, // Adjust revalidation as needed
  });
}
