"use client";

import MaxWidthWrapper from "@/components/layouts/maxWidthWrapper/MaxWidthWrapper";
import { urlFor } from "@/sanity/image";
import { getFeaturedImage, Project } from "@/sanity/schema/project";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function ProjectCarousel({ projects }: { projects: Project[] }) {
  const t = useTranslations("landing_page");

  // lib/utils.ts
  function getDocumentHref(doc: { _type: string; slug: { current: string } }) {
    const prefixes: Record<string, string> = {
      newsfeed: "/news",
      project: "/projekter",
    };
    const prefix = prefixes[doc._type] ?? "";
    return `${prefix}/${doc.slug.current}`;
  }

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Scroll to slide
  const scrollTo = (index: number) => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const children = container.children;
    if (children[index]) {
      children[index].scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "start",
      });
    }
  };

  // Update active dot on scroll
  const handleScroll = () => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const scrollLeft = container.scrollLeft;
    const childWidth = container.clientWidth;
    const index = Math.round(scrollLeft / childWidth);
    setActiveIndex(index);
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll, { passive: true });
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, []);

  const next = () => scrollTo(Math.min(activeIndex + 1, projects.length - 1));
  const prev = () => scrollTo(Math.max(activeIndex - 1, 0));

  return (
    <MaxWidthWrapper>
      <div className="relative w-full">
        <h1 className="text-3xl font-bold mb-8 text-white">
          {t("pc.projects_carousel_headline")}
        </h1>

        {/* Scrollable track */}
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth scrollbar-hide bg-primary rounded-xl"
          style={{ scrollbarWidth: "none" }}
        >
          {projects.map((project) => {
            return (
              <div
                key={project._id}
                className="shrink-0 w-full snap-center p-4"
              >
                <div className="rounded-2xl shadow-lg border border-gray-200 overflow-hidden bg-white max-w-xl mx-auto">
                  {/* Image */}
                  {getFeaturedImage(project)?.image?.asset ? (
                    <div className="relative h-56 w-full">
                      <Image
                        src={
                          urlFor(getFeaturedImage(project)?.image).url() || ""
                        }
                        alt={project.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                  ) : (
                    <div className="h-56 bg-gray-100 flex items-center justify-center text-gray-400">
                      No image
                    </div>
                  )}

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900">
                      {project.title}
                    </h3>
                    {project.address && (
                      <p className="mt-2 text-sm text-gray-600">
                        {project.address}
                      </p>
                    )}
                    {/* Add a link if needed */}
                    <a
                      href={getDocumentHref(project)}
                      className="inline-block mt-4 text-blue-600 hover:underline text-sm font-medium"
                    >
                      {t("pc.projects_carousel_item_navigation")} →
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Arrows */}
        <button
          onClick={prev}
          className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-md transition z-10 font-black"
          aria-label="Previous slide"
        >
          ←
        </button>
        <button
          onClick={next}
          className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-md transition z-10 font-black"
          aria-label="Next slide"
        >
          →
        </button>

        {/* Dots */}
        <div className="flex justify-center mt-6 gap-2">
          {projects.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollTo(i)}
              className={`w-3 h-3 rounded-full transition-colors ${
                i === activeIndex ? "bg-blue-600" : "bg-gray-300"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </MaxWidthWrapper>
  );
}
