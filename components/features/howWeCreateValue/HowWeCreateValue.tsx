"use client";

import MaxWidthWrapper from "@/components/layouts/maxWidthWrapper/MaxWidthWrapper";
import Heading from "@/components/ui/heading/Heading";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useMessages } from "next-intl";
import Image from "next/image";
import { useLayoutEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function HowWeCreateValue() {
  const messages = useMessages();
  const bodyContentHeading = messages.landing_page.how_we_create_value.heading;
  const bodyContentPoints = messages.landing_page.how_we_create_value.points;

  const containerRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray<HTMLElement>(".value-panel");
      // const lastIndex = panels.length - 1;

      panels.forEach((panel) => {
        ScrollTrigger.create({
          trigger: panel,
          start: "top center",
          end: "bottom bottom",
          snap: 1,
          // markers: true,
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <section ref={containerRef} className="relative w-full">
        <div className="relative value-panel h-screen sm:flex items-center justify-center  bg-variant">
          <MaxWidthWrapper>
            <div className="relative h-5/6 text-white flex flex-col">
              <span className="hidden sm:block absolute -left-10 h-full bg-blue-600 w-1"></span>
              <span className="hidden sm:block absolute -bottom-10 w-1/3 bg-blue-800 h-1"></span>
              <div className="h-1/4 flex flex-col justify-center gap-y-8">
                <Heading>{bodyContentHeading}</Heading>
                <h2 className="text-3xl underline-anim">
                  {bodyContentPoints[0].heading}
                </h2>
              </div>
              <div className="sm:flex h-full">
                <div className="flex-1 sm:grid grid-cols-4 grid-rows-3 p-4 max-sm:py-8">
                  <p className="col-span-3 col-start-1 row-start-2">
                    {bodyContentPoints[0].description}
                  </p>
                </div>
                <div className="flex flex-1 justify-center items-center">
                  <Image
                    src={"/selektiv_udvælgelse.png"}
                    alt="Partner Jacques Skovgaard tegner"
                    height="100"
                    width={570}
                    quality={100}
                  />
                </div>
              </div>
            </div>
          </MaxWidthWrapper>
        </div>

        <div className="relative value-panel h-screen sm:flex items-center justify-center">
          <MaxWidthWrapper>
            <div className="relative h-5/6 text-white flex flex-col">
              <span className="hidden sm:block absolute -left-10 h-full bg-blue-700 w-1"></span>
              <span className="hidden sm:block absolute -bottom-10 w-2/3 bg-blue-800 h-1"></span>
              <div className="h-1/4 flex flex-col justify-center text-end">
                <h2 className="text-3xl underline-anim">
                  {bodyContentPoints[1].heading}
                </h2>
              </div>
              <div className="sm:flex h-full">
                <div className="flex flex-1 justify-center items-center">
                  <Image
                    src={"/renovering_og_konvertering.jpg"}
                    alt="Partnere ved renovering"
                    height="100"
                    width={570}
                    quality={100}
                  />
                </div>
                <div className="flex-1 sm:grid grid-cols-4 grid-rows-3 p-4">
                  <p className="col-span-3 col-start-2 row-start-3">
                    {bodyContentPoints[1].description}
                  </p>
                </div>
              </div>
            </div>
          </MaxWidthWrapper>
        </div>

        <div className="relative value-panel h-screen sm:flex items-center justify-center bg-variant">
          <MaxWidthWrapper>
            <div className="relative h-5/6 text-white flex flex-col">
              <span className="hidden sm:block absolute -left-10 h-full bg-blue-800 w-1"></span>
              <span className="hidden sm:block absolute -bottom-10 w-full bg-blue-800 h-1 animate-pulse"></span>
              <div className="h-1/4 flex flex-col justify-center">
                <h2 className="text-3xl underline-anim">
                  {bodyContentPoints[2].heading}
                </h2>
              </div>
              <div className="sm:flex h-full">
                <div className="flex-1 sm:grid grid-cols-4 grid-rows-3 p-4">
                  <p className="col-span-3 col-start-1 row-start-1">
                    {bodyContentPoints[2].description}
                  </p>
                </div>
                <div className="flex flex-1 justify-center items-center">
                  <Image
                    src={"/realisering_og_genivestering.jpg"}
                    alt="Trapper"
                    height="100"
                    width={570}
                    quality={100}
                  />
                </div>
              </div>
            </div>
          </MaxWidthWrapper>
        </div>
      </section>
    </>
  );
}
