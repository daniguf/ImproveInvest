"use client";

import { urlFor } from "@/sanity/image";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

type Project = {
  _id: string;
  name: string;
  slug: { current: string };
  image?: { asset: { _id: string }; alt?: string };
  videoFile?: { asset: { _id: string; url: string } };
  url?: string;
};

export interface IProjectsCarousel {
  projects: Project[];
}

export default function ProjectsCarousel({ projects }: IProjectsCarousel) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({
      left: dir === "left" ? -320 : 320,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative">
      <button
        onClick={() => scroll("left")}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-gray-800 hover:bg-gray-700 rounded-full p-3"
        aria-label="Previous"
      >
        ←
      </button>
      <button
        onClick={() => scroll("right")}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-gray-800 hover:bg-gray-700 rounded-full p-3"
        aria-label="Next"
      >
        →
      </button>

      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-hide scroll-smooth"
      >
        {projects.map((project) => (
          <Link
            key={project._id}
            href={`/projekter/${project.slug.current}`}
            className="flex-none w-80 snap-start group"
          >
            <div className="rounded-xl overflow-hidden bg-gray-800 shadow-lg hover:shadow-2xl transition-all duration-300">
              {/* --- MEDIA PREVIEW --- */}
              <div className="relative aspect-video">
                {project.image?.asset ? (
                  <Image
                    src={urlFor(project.image)
                      .width(800)
                      .height(450)
                      .quality(90)
                      .url()}
                    alt={project.image.alt || project.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : project.videoFile?.asset ? (
                  // ✅ Video-only project: show placeholder with icon
                  <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                    <svg
                      className="w-12 h-12 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span className="ml-2 text-gray-400">Video</span>
                  </div>
                ) : (
                  // ✅ No media: show minimal placeholder
                  <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                    <div className="text-gray-500 text-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="200px"
                        viewBox="0 -960 960 960"
                        width="100px"
                        fill="#FFFFFF"
                      >
                        <path d="M277-279h275v-60H277v60Zm0-171h406v-60H277v60Zm0-171h406v-60H277v60Zm-97 501q-24 0-42-18t-18-42v-600q0-24 18-42t42-18h600q24 0 42 18t18 42v600q0 24-18 42t-42 18H180Zm0-60h600v-600H180v600Zm0-600v600-600Z" />
                      </svg>

                      {/* <svg
                        className="w-10 h-10 mx-auto mb-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 12l-3-3m0 0l3-3m-3 3h12"
                        />
                      </svg>
                      <span className="text-sm">No preview</span> */}
                    </div>
                  </div>
                )}
              </div>

              {/* --- CARD CONTENT --- */}
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 group-hover:underline">
                  {project.name}
                </h3>
                {project.url && (
                  <p className="text-sm text-gray-400 truncate">
                    {project.url}
                  </p>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
