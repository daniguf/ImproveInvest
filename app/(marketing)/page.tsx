import Hero from "@/components/features/hero/Hero";
import LandingPageContentSection from "@/components/features/landingPageContentSection/LandingPageContentSection";
import ProjectShowcaseCarousel from "@/components/features/projectShowcaseCarousel/ProjectShowcaseCarousel";
import { allProjectsQuery } from "@/lib/queries";
import { sanityFetch } from "@/lib/sanity-utils";
import { Project } from "@/sanity/schema/project";
import { cookies } from "next/headers";

export default async function HomePage() {
  const store = await cookies();
  const locale = store.get("locale")?.value || "da";
  const projects: Project[] = await sanityFetch({
    query: allProjectsQuery,
    params: { locale },
  });
  // console.log(projects);

  return (
    <div className="flex flex-col">
      {/* --- HERO SECTION --- */}
      <Hero />
      {/* --- PROJECTS CAROUSEL --- */}
      <section className="sm:h-[65dvh] flex flex-col justify-center items-center">
        
        <ProjectShowcaseCarousel projects={projects} />
      </section>

      {/* --- EMPTY SECTION --- */}
      <LandingPageContentSection />
    </div>
  );
}
