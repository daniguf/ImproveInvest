import MaxWidthWrapper from "@/components/layouts/maxWidthWrapper/MaxWidthWrapper";
import Heading from "@/components/ui/heading/Heading";
import { useMessages } from "next-intl";

export interface IInvestmentModel {
  sampleTextProp: string;
}

const InvestmentModel = () => {
  const messages = useMessages();
  const bodyContentHeading = messages.landing_page.investment_model.heading;
  const bodyContentSubHeading =
    messages.landing_page.investment_model.sub_heading;
  const bodyContentParagraphs =
    messages.landing_page.investment_model.paragraphs;
  const bodyContentCtaReadMoreText =
    messages.landing_page.investment_model.cta.read_more.text;

  return (
    <section className="w-full h-full">
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
          <div className="border border-white p-4">
            {bodyContentCtaReadMoreText}
          </div>
        </div>
      </MaxWidthWrapper>
    </section>
  );
};

export default InvestmentModel;
