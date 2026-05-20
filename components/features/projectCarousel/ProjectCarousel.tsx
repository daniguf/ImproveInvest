import { allNewsfeedItemsQuery, allProjectsQuery } from "@/lib/queries";
import { sanityFetch } from "@/lib/sanity-utils";
import { Project } from "@/sanity/schema/project";
import { cookies } from "next/headers";
import ProjectCarouselClient from "./ProjectCarouselClient";

export default async function ProjectCarousel() {
  const store = await cookies();
  const locale = store.get("locale")?.value || "da";

  const [projects, newsfeedItems] = await Promise.all([
    sanityFetch<Project[]>({
      query: allProjectsQuery,
      params: { locale },
    }),
    sanityFetch<Project[]>({
      query: allNewsfeedItemsQuery,
      params: { locale },
    }),
  ]);

  const allItems = [...projects, ...newsfeedItems].sort((a, b) =>
    a.title.localeCompare(b.title)
  );

  if (allItems.length === 0) return null;

  return <ProjectCarouselClient items={allItems} />;
}
