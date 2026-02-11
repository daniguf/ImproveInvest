import MaxWidthWrapper from "@/components/layouts/maxWidthWrapper/MaxWidthWrapper";
import Heading from "@/components/ui/heading/Heading";
import { useMessages } from "next-intl";
import Image from "next/image";

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
      <div className="h-56 w-full flex items-center justify-center text-center bg-primary">
        <Heading>{bodyContentHeading}</Heading>
      </div>
      <MaxWidthWrapper>
        <div className="flex w-full h-full gap-x-16">
          <div className="flex flex-col text-white text-sm w-1/2 gap-8">
            <p>{bodyContentParagraphs.p1}</p>
            <p>{bodyContentParagraphs.p2}</p>
            <p>{bodyContentParagraphs.p3}</p>
            <p>{bodyContentParagraphs.p4}</p>
          </div>
          <div className="flex w-1/2 bg-amber-300">
            <Image
              alt="Greater Copenhagen"
              src="/et_marked.png"
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
