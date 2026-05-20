"use client";

import MaxWidthWrapper from "@/components/layouts/maxWidthWrapper/MaxWidthWrapper";
import { urlFor } from "@/sanity/image";
import { getFeaturedImage, Project } from "@/sanity/schema/project";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

function getDocumentHref(doc: { _type: string; slug: { current: string } }) {
  const prefixes: Record<string, string> = {
    newsfeed: "/news",
    project: "/projekter",
  };
  const prefix = prefixes[doc._type] ?? "";

  return `${prefix}/${doc.slug.current}`;
}

export default function ProjectCarouselClient({ items }: { items: Project[] }) {
  const t = useTranslations("landing_page");
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

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

  const next = () => scrollTo(Math.min(activeIndex + 1, items.length - 1));
  const prev = () => scrollTo(Math.max(activeIndex - 1, 0));

  return (
    <MaxWidthWrapper>
      <div className="relative w-full">
        <h1 className="text-3xl font-bold mb-8 text-white">
          {t("projects_carousel_headline")}
        </h1>

        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth scrollbar-hide bg-primary rounded-xl"
          style={{ scrollbarWidth: "none" }}
        >
          {items.map((item) => (
            <div key={item._id} className="shrink-0 w-full snap-center p-4">
              <div className="rounded-2xl shadow-lg border border-gray-200 overflow-hidden bg-white max-w-xl mx-auto">
                {getFeaturedImage(item)?.image?.asset ? (
                  <div className="relative h-56 w-full">
                    <Image
                      src={urlFor(getFeaturedImage(item)?.image).url()}
                      alt={item.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                ) : (
                  <div className="h-56 w-full bg-gray-50 flex items-center justify-center">
                    <span className="text-6xl font-black text-gray-200 select-none">
                      IMPROVE INVEST
                    </span>
                  </div>
                )}

                <div className="p-6">
                  {item._type === "newsfeed" && (
                    <span className="text-xs font-semibold text-blue-600 uppercase tracking-widest mb-2 block">
                      News
                    </span>
                  )}
                  <h3 className="text-xl font-bold text-gray-900">
                    {item.title}
                  </h3>
                  {item.address && (
                    <p className="mt-2 text-sm text-gray-600">{item.address}</p>
                  )}
                  <a
                    href={getDocumentHref(item)}
                    className="inline-block mt-4 text-blue-600 hover:underline text-sm font-medium"
                  >
                    {t("projects_carousel_item_navigation")} →
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

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

        <div className="flex justify-center mt-6 gap-2">
          {items.map((_, i) => (
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
