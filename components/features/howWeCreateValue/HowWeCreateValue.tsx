"use client";

import MaxWidthWrapper from "@/components/layouts/maxWidthWrapper/MaxWidthWrapper";
import Heading from "@/components/ui/heading/Heading";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useMessages } from "next-intl";
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
        <div className="value-panel h-screen flex items-center justify-center">
          <MaxWidthWrapper>
            <div className="h-5/6 text-white flex flex-col">
              <div className="h-1/4 flex flex-col justify-center gap-y-8">
                <Heading>{bodyContentHeading}</Heading>
                <h2 className="text-3xl">{bodyContentPoints[0].heading}</h2>
              </div>
              <div className="flex h-full">
                <div className="flex-1 grid grid-cols-4 grid-rows-3 p-4">
                  <p className="col-span-3 col-start-1 row-start-2">
                    {bodyContentPoints[0].description}
                  </p>
                </div>
                <div className="flex flex-1 justify-center items-center bg-amber-300">
                  IMAGE
                </div>
              </div>
            </div>
          </MaxWidthWrapper>
        </div>

        <div className="value-panel h-screen flex items-center justify-center">
          <MaxWidthWrapper>
            <div className="h-5/6 text-white flex flex-col">
              <div className="h-1/4 flex flex-col justify-center text-end">
                <h2 className="text-3xl">{bodyContentPoints[1].heading}</h2>
              </div>
              <div className="flex h-full">
                <div className="flex flex-1 justify-center items-center bg-amber-300">
                  IMAGE
                </div>
                <div className="flex-1 grid grid-cols-4 grid-rows-3 p-4">
                  <p className="col-span-3 col-start-2 row-start-1">
                    {bodyContentPoints[1].description}
                  </p>
                </div>
              </div>
            </div>
          </MaxWidthWrapper>
        </div>

        <div className="value-panel h-screen flex items-center justify-center">
          <MaxWidthWrapper>
            <div className="h-5/6 text-white flex flex-col">
              <div className="h-1/4 flex flex-col justify-center">
                <h2 className="text-3xl">{bodyContentPoints[2].heading}</h2>
              </div>
              <div className="flex h-full">
                <div className="flex-1 grid grid-cols-4 grid-rows-3 p-4">
                  <p className="col-span-3 col-start-1 row-start-1">
                    {bodyContentPoints[2].description}
                  </p>
                </div>
                <div className="flex flex-1 justify-center items-center bg-amber-300">
                  IMAGE
                </div>
              </div>
            </div>
          </MaxWidthWrapper>
        </div>
      </section>
    </>
  );
}
