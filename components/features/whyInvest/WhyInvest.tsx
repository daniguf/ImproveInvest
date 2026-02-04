import MaxWidthWrapper from "@/components/layouts/maxWidthWrapper/MaxWidthWrapper";
import Heading from "@/components/ui/heading/Heading";
import { BookKey, ChartCandlestick, HardHat, ShieldCheck } from "lucide-react";
import { useMessages } from "next-intl";
import React from "react";

export interface IWhyInvest {
  sampleTextProp: string;
}

type Props = {
  icon: React.ReactNode; // exactly one
  paragraphs: React.ReactNode[]; // one or many
};

export interface IWhyInvestFeaturesGridItem {
  children: Props;
}

const WhyInvestFeaturesGridItem = ({
  children,
}: IWhyInvestFeaturesGridItem) => {
  const { icon, paragraphs } = children;
  return (
    <div className="flex gap-4 w-full">
      <div className="text-white">{icon}</div>
      <div className="w-full text-center text-sm text-white">{paragraphs}</div>
    </div>
  );
};

const WhyInvest: React.FC<IWhyInvest> = () => {
  const messages = useMessages();
  const bodyContentHeading = messages.landing_page.why_invest.heading;
  const bodyContentPoints = messages.landing_page.why_invest.points;
  const bodyContentDisclaimer = messages.landing_page.why_invest.disclaimer;
  return (
    <section className="w-full h-full">
      <MaxWidthWrapper>
        <div className="flex flex-col w-full h-full">
          <div className="w-full py-10">
            <Heading>{bodyContentHeading}</Heading>
          </div>
          <div className="grid grid-cols-2 grid-rows-2 gap-36 py-10">
            <WhyInvestFeaturesGridItem>
              {{
                icon: <ChartCandlestick color="white" size={48} />,
                paragraphs: [
                  <>
                    <p>{bodyContentPoints[0]}</p>
                    <p>{bodyContentPoints[1]}</p>
                  </>,
                ],
              }}
            </WhyInvestFeaturesGridItem>
            <WhyInvestFeaturesGridItem>
              {{
                icon: <BookKey color="white" size={48} />,
                paragraphs: [
                  <>
                    <p>{bodyContentPoints[2]}</p>
                    <p>{bodyContentPoints[3]}</p>
                  </>,
                ],
              }}
            </WhyInvestFeaturesGridItem>
            <WhyInvestFeaturesGridItem>
              {{
                icon: <ShieldCheck color="white" size={48} />,
                paragraphs: [
                  <>
                    <p>{bodyContentPoints[4]}</p>
                  </>,
                ],
              }}
            </WhyInvestFeaturesGridItem>
            <WhyInvestFeaturesGridItem>
              {{
                icon: <HardHat color="white" size={48} />,
                paragraphs: [
                  <>
                    <p>{bodyContentPoints[5]}</p>
                    <p>{bodyContentPoints[6]}</p>
                  </>,
                ],
              }}
            </WhyInvestFeaturesGridItem>
          </div>
          <div className="w-full">
            <p className="text-white text-xs font-semibold">
              {bodyContentDisclaimer}
            </p>
          </div>
        </div>
      </MaxWidthWrapper>
    </section>
  );
};

export default WhyInvest;
