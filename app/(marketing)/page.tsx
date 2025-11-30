import Hero from "@/components/features/hero/Hero";
import LandingPageContentSection from "@/components/features/landingPageContentSection/LandingPageContentSection";
import ProjectShowcaseCarousel from "@/components/features/projectShowcaseCarousel/ProjectShowcaseCarousel";
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
        <ProjectShowcaseCarousel projects={projects} />
      </section>

      {/* --- EMPTY SECTION --- */}
      <LandingPageContentSection />
    </div>
  );
}
