"use client";

import MaxWidthWrapper from "@/components/layouts/maxWidthWrapper/MaxWidthWrapper";
import Heading from "@/components/ui/heading/Heading";
import { gsap } from "gsap";
import MotionPathPlugin from "gsap/MotionPathPlugin";
import { MoveUpRight } from "lucide-react";
import { useMessages } from "next-intl";
import { useLayoutEffect, useRef } from "react";

export interface IInvestmentModel {
  sampleTextProp: string;
}

gsap.registerPlugin(MotionPathPlugin);

const InvestmentModel = () => {
  const messages = useMessages();
  const bodyContentHeading = messages.landing_page.investment_model.heading;
  const bodyContentSubHeading =
    messages.landing_page.investment_model.sub_heading;
  const bodyContentParagraphs =
    messages.landing_page.investment_model.paragraphs;
  const bodyContentCtaReadMoreText =
    messages.landing_page.investment_model.cta.read_more.text;

  const containerRef = useRef<HTMLElement>(null);
  const animationRef = useRef<gsap.core.Tween | null>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Create animation and store reference
      animationRef.current = gsap.to("#rect", {
        duration: 5,
        repeat: 12,
        repeatDelay: 3,
        yoyo: true,
        ease: "power1.inOut",
        motionPath: {
          path: "#path",
          align: "#path",
          autoRotate: true,
          alignOrigin: [0.5, 0.5],
        },
      });
    }, containerRef);

    return () => {
      ctx.revert(); // Cleans up all animations in this context
    };
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-full">
      <svg
        width="65%"
        height="65%"
        viewBox="-20 0 557 190"
        id="svg"
        className="absolute -z-50 top-1/3 right-1/4"
        fill="#131c2e"
      >
        <circle cx="100" cy="100" r="3" />
        <circle cx="300" cy="20" r="3" />
        <path
          stroke="white"
          fill=""
          id="path"
          d="M9,100c0,0,18.53-41.58,49.91-65.11c30-22.5,65.81-24.88,77.39-24.88c33.87,0,57.55,11.71,77.05,28.47c23.09,19.85,40.33,46.79,61.71,69.77c24.09,25.89,53.44,46.75,102.37,46.75c22.23,0,40.62-2.83,55.84-7.43c27.97-8.45,44.21-22.88,54.78-36.7c14.35-18.75,16.43-36.37,16.43-36.37"
        />

        <svg
          id="rect"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="white"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-navigation-icon lucide-navigation"
        >
          <polygon points="3 11 22 2 13 21 11 13 3 11" />
        </svg>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          x={0}
          y={120}
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-hand-coins-icon lucide-hand-coins"
        >
          <path d="M11 15h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 17" />
          <path d="m7 21 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9" />
          <path d="m2 16 6 6" />
          <circle cx="16" cy="9" r="2.9" />
          <circle cx="6" cy="5" r="3" />
        </svg>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          x={35}
          y={5}
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-telescope-icon lucide-telescope"
        >
          <path d="m10.065 12.493-6.18 1.318a.934.934 0 0 1-1.108-.702l-.537-2.15a1.07 1.07 0 0 1 .691-1.265l13.504-4.44" />
          <path d="m13.56 11.747 4.332-.924" />
          <path d="m16 21-3.105-6.21" />
          <path d="M16.485 5.94a2 2 0 0 1 1.455-2.425l1.09-.272a1 1 0 0 1 1.212.727l1.515 6.06a1 1 0 0 1-.727 1.213l-1.09.272a2 2 0 0 1-2.425-1.455z" />
          <path d="m6.158 8.633 1.114 4.456" />
          <path d="m8 21 3.105-6.21" />
          <circle cx="12" cy="13" r="2" />
        </svg>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          x={120}
          y={15}
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-microscope-icon lucide-microscope"
        >
          <path d="M6 18h8" />
          <path d="M3 22h18" />
          <path d="M14 22a7 7 0 1 0 0-14h-1" />
          <path d="M9 14h2" />
          <path d="M9 12a2 2 0 0 1-2-2V6h6v4a2 2 0 0 1-2 2Z" />
          <path d="M12 6V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3" />
        </svg>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          x={200}
          y={5}
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-scale-icon lucide-scale"
        >
          <path d="M12 3v18" />
          <path d="m19 8 3 8a5 5 0 0 1-6 0zV7" />
          <path d="M3 7h1a17 17 0 0 0 8-2 17 17 0 0 0 8 2h1" />
          <path d="m5 8 3 8a5 5 0 0 1-6 0zV7" />
          <path d="M7 21h10" />
        </svg>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          x={250}
          y={120}
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-handshake-icon lucide-handshake"
        >
          <path d="m11 17 2 2a1 1 0 1 0 3-3" />
          <path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4" />
          <path d="m21 3 1 11h-2" />
          <path d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3" />
          <path d="M3 4h8" />
        </svg>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          x={480}
          y={30}
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-circle-dollar-sign-icon lucide-circle-dollar-sign"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" />
          <path d="M12 18V6" />
        </svg>
      </svg>

      <MaxWidthWrapper>
        <div className="flex flex-col py-4">
          <Heading>{bodyContentHeading}</Heading>
          <p className="text-white text-lg">{bodyContentSubHeading}</p>
        </div>
        <div className="flex justify-center items-center w-full text-white text-sm py-16">
          <div className="flex flex-col w-1/3 gap-4">
            <p>{bodyContentParagraphs.p1}</p>
            <p>{bodyContentParagraphs.p2}</p>
          </div>
        </div>
        <div className="flex justify-end items-center w-full text-white text-sm">
          <div className="flex border border-white p-4 gap-4">
            {bodyContentCtaReadMoreText} <MoveUpRight />
          </div>
        </div>
      </MaxWidthWrapper>
    </section>
  );
};

export default InvestmentModel;
