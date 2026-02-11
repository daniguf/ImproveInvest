import MaxWidthWrapper from "@/components/layouts/maxWidthWrapper/MaxWidthWrapper";
import Heading from "@/components/ui/heading/Heading";
import { MoveUpRight } from "lucide-react";
import { useMessages } from "next-intl";
import Image from "next/image";
import Link from "next/link";

export interface IBuildingsWithIdententyAndPotential {
  sampleTextProp: string;
}

const BuildingsWithIdententyAndPotential = () => {
  const messages = useMessages();
  const bodyContentHeading =
    messages.landing_page.buildings_with_identity_and_potential.heading;
  const bodyContentSubHeading =
    messages.landing_page.buildings_with_identity_and_potential.sub_heading;
  const bodyContentParagraph =
    messages.landing_page.buildings_with_identity_and_potential.paragraph;
  const bodyContentCta =
    messages.landing_page.buildings_with_identity_and_potential.cta;

  return (
    <section className="w-full h-full text-white">
      <MaxWidthWrapper>
        <div className="flex flex-col w-full h-full">
          <div className="w-full text-start flex-1">
            <Heading>{bodyContentHeading}</Heading>
          </div>
          <div className="w-full flex flex-col gap-4 py-8 flex-2">
            <h3 className="font-semibold text-lg">{bodyContentSubHeading}</h3>
            <p className="">{bodyContentParagraph}</p>
          </div>
          <div className="relative h-full flex-9">
            <div className="relative h-full w-full">
              <Image
                src={"/laboratorium.jpg"}
                alt="Ellehammers Laboratorium"
                height={700}
                width={1128}
                className="object-cover mx-auto"
                quality={100}
              />
              <div className="absolute w-full bottom-0 right-0">
                <div className="relative flex justify-end p-12">
                  <Link href={"/projekter"}>
                    <div className="flex gap-4 py-4 px-6 border-2 backdrop-blur-2xl">
                      {bodyContentCta}
                      <MoveUpRight />
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </section>
  );
};

export default BuildingsWithIdententyAndPotential;
