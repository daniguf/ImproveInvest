import MaxWidthWrapper from "@/components/layouts/maxWidthWrapper/MaxWidthWrapper";
import Heading from "@/components/ui/heading/Heading";
import { useMessages } from "next-intl";

export interface IGovernance {
  sampleTextProp: string;
}

const Governance = () => {
  const messages = useMessages();
  const bodyContentHeading = messages.landing_page.governance.heading;
  const bodyContentSubHeading = messages.landing_page.governance.sub_heading;
  const bodyContentParagraphs = messages.landing_page.governance.paragraphs;
  const bodyContentCta = messages.landing_page.governance.ctas;

  return (
    <section className="w-full h-full text-white">
      <MaxWidthWrapper>
        <div className="flex flex-col h-full">
          <div className="flex flex-col">
            <Heading>{bodyContentHeading}</Heading>
            <h3 className="font-semibold text-lg">{bodyContentSubHeading}</h3>
          </div>
          <div className="relative flex w-full justify-center items-start text-lg">
            <div className="flex-9 flex justify-center items-stretch mx-auto h-full">
              <div className="w-4/6 h-full flex flex-col gap-4 pt-8">
                <p>{bodyContentParagraphs.p1}</p>
                <p>{bodyContentParagraphs.p2}</p>
                <p>{bodyContentParagraphs.p3}</p>
              </div>
            </div>

            <span className="bg-white/75 min-h-[500px] w-1"></span>

            <div className="flex-9 flex justify-center items-stretch mx-auto h-full">
              <div className="w-4/6 h-full flex flex-col gap-12 pt-8">
                <div className="w-full h-full flex flex-col gap-4">
                  <p>{bodyContentParagraphs.p4}</p>
                  <p>{bodyContentParagraphs.p5}</p>
                  <p>{bodyContentParagraphs.p6}</p>
                </div>

                <div className="w-full h-full flex flex-col gap-6">
                  <div className="flex border-b-2 pb-2">
                    {bodyContentCta.meet_out_partners}
                  </div>
                  <div className="flex border-b-2 pb-2">
                    {bodyContentCta.contact}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </section>
  );
};

export default Governance;
