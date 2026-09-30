import { getLocale } from "@/lib/i18n.server";
import { allNewsfeedItemsQuery, allProjectsQuery } from "@/lib/queries";
import { sanityFetch } from "@/lib/sanity-utils";
import { Project } from "@/types/project";
import ProjectCarouselClient from "./ProjectCarouselClient";

export default async function ProjectCarousel() {
  const locale = await getLocale();

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
