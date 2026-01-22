"use client";

import { urlFor } from "@/sanity/image";
import { getFeaturedImage, Project } from "@/sanity/schema/project";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useState } from "react";

export interface IProjectShowcaseCarousel {
  projects: Project[];
}

export default function ProjectShowcaseCarousel({
  projects,
}: IProjectShowcaseCarousel) {
  const t = useTranslations("home");

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentIndex((current) =>
      current === projects.length - 1 ? 0 : current + 1
    );
  }, [projects.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((current) =>
      current === 0 ? projects.length - 1 : current - 1
    );
  }, [projects.length]);

  if (!projects || projects.length === 0) return null;

  return (
    <>
      <div className="p-8">
        <h2 className="text-white text-2xl font-extrabold">
          {t("projects_carousel_headline")}
        </h2>
      </div>
      <div className="relative w-full max-w-[1128] mx-auto px-4 sm:px-6 lg:px-8 bg-primary rounded">
        {/* Carousel Container */}
        <div className="relative overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {projects.map((project) => (
              <div
                key={project._id}
                className="w-full shrink-0 border-b border-gray-300 pb-4"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center min-h-[400px]">
                  {/* Image Container */}
                  <div className="relative">
                    <div className="aspect-3/2 relative overflow-hidden rounded-lg">
                      <Image
                        src={
                          urlFor(getFeaturedImage(project)?.image).url() || ""
                        }
                        alt={getFeaturedImage(project)?.caption || ""}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                    </div>
                  </div>

                  {/* Text Content */}
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-3xl font-bold text-white mb-2">
                        {project.title}
                      </h2>
                      <p className="text-xl text-white">{project.address}</p>
                    </div>

                    <Link
                      href={`/projekter/${project.slug.current}`}
                      className="inline-flex items-center text-lg font-medium text-blue-600 hover:text-blue-800 transition-colors group"
                    >
                      {t("projects_carousel_item_navigation")}
                      <svg
                        className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full shadow-lg transition-all hover:scale-105 z-10"
          aria-label="Previous project"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full shadow-lg transition-all hover:scale-105 z-10"
          aria-label="Next project"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </>
  );
}
