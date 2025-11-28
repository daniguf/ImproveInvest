import Hero from "@/components/features/hero/Hero";
import LandingPageContentSection from "@/components/features/landingPageContentSection/LandingPageContentSection";
import ProjectsCarousel from "@/components/features/projectsCarousel/ProjectsCarousel";
import { allProjectsQuery } from "@/lib/queries";
import { sanityClient } from "@/sanity/client";

export default async function HomePage() {
  const projects = await sanityClient.fetch(allProjectsQuery);

  return (
    <div className="flex flex-col">
      {/* --- HERO SECTION --- */}
      <Hero />
      {/* --- PROJECTS CAROUSEL --- */}
      <section>
        <ProjectsCarousel projects={projects} />
      </section>

      {/* --- EMPTY SECTION --- */}
      <LandingPageContentSection />
    </div>
  );
}
