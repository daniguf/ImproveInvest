import MaxWidthWrapper from "@/components/layouts/maxWidthWrapper/MaxWidthWrapper";
import Heading from "@/components/ui/heading/Heading";
import { useMessages } from "next-intl";
import Image from "next/image";

import map from "@/public/et_marked.png"

export interface IMarketStrategy {
  sampleTextProp: string;
}

const MarketStrategy = () => {
  const messages = useMessages();
  const bodyContentHeading = messages.landing_page.market_strategy.heading;
  const bodyContentParagraphs =
    messages.landing_page.market_strategy.paragraphs;

  return (
    <section className="w-full h-full">
      <div className="h-56 w-full flex items-center justify-center text-center bg-primary max-lg:px-8">
        <Heading>{bodyContentHeading}</Heading>
      </div>
      <MaxWidthWrapper>
        <div className="xl:flex w-full h-full gap-x-16">
          <div className="flex flex-col text-white text-sm xl:w-1/2 gap-8">
            <p className="text-lg font-bold">{bodyContentParagraphs.p1}</p>
            <p>{bodyContentParagraphs.p2}</p>
            <p>{bodyContentParagraphs.p3}</p>
            <p>{bodyContentParagraphs.p4}</p>
          </div>
          <div className="flex xl:w-1/2 max-xl:mt-8">
            <Image
              alt="Greater Copenhagen"
              src={map}
              placeholder="blur"
              quality={100}
              height={336}
              width={500}
            />
          </div>
        </div>
      </MaxWidthWrapper>
    </section>
  );
};

export default MarketStrategy;
