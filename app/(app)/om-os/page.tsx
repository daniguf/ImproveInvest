import ContactForm from "@/components/features/contactForm/ContactForm";
import PartnerBio from "@/components/features/partnerBio/PartnerBio";
import MaxWidthWrapper from "@/components/layouts/maxWidthWrapper/MaxWidthWrapper";
import Heading from "@/components/ui/heading/Heading";
import SubHeading from "@/components/ui/subHeading/SubHeading";
import { useMessages } from "next-intl";

import christian_portrait from "@/public/productOwners/christian/CS-1.png";
import jacques_portrait from "@/public/productOwners/jacques/JS-1.png";

const About = () => {
  const messages = useMessages();
  const bodyContentHeading = messages.about.title;
  const bodyContentArticle1 = messages.about.articles.article_1;

  return (
    <section className="h-full w-full text-white">
      <MaxWidthWrapper>
        <div>
          <Heading>{bodyContentHeading}</Heading>
          {/* Section 1 */}
          <div className="flex flex-col gap-4 mt-8">
            <p>{bodyContentArticle1.section_1.paragraphs.p1}</p>
            <p>{bodyContentArticle1.section_1.paragraphs.p2}</p>
            <p>{bodyContentArticle1.section_1.paragraphs.p3}</p>
            <p>{bodyContentArticle1.section_1.paragraphs.p4}</p>
            <p>{bodyContentArticle1.section_1.paragraphs.p5}</p>
            <p>{bodyContentArticle1.section_1.paragraphs.p6}</p>
          </div>
          {/* Section 2 */}
          <div className="py-32">
            <SubHeading>{bodyContentArticle1.section_2.subheading}</SubHeading>
            <p className="">{bodyContentArticle1.section_2.paragraphs.p1}</p>
            {/* Partners Bios*/}
            <div className="flex flex-col gap-32 border-b">
              {/* Jacques */}
              <PartnerBio name="jacques_skovgaard" img_src={jacques_portrait} />
              {/* Christian */}
              <PartnerBio
                name="christian_storinggaard"
                img_src={christian_portrait}
              />
            </div>
          </div>
          {/* Section 3 */}
          <div className="flex flex-col gap-2 mb-8">
            <SubHeading>{bodyContentArticle1.section_3.subheading}</SubHeading>
            <p>{bodyContentArticle1.section_3.paragraphs.p1}</p>
          </div>
          {/* Section 4 */}
          <div className="flex flex-col gap-2 mb-8">
            <SubHeading>{bodyContentArticle1.section_4.subheading}</SubHeading>
            <p>{bodyContentArticle1.section_4.paragraphs.p1}</p>
            <p>{bodyContentArticle1.section_4.paragraphs.p2}</p>
          </div>
          {/* Section 5 */}
          <div className="flex flex-col gap-2 mb-8" id="contact-form">
            <SubHeading>{bodyContentArticle1.section_5.subheading}</SubHeading>
            <p>{bodyContentArticle1.section_5.paragraphs.p1}</p>
            <p>{bodyContentArticle1.section_5.paragraphs.p2}</p>
            <p>{bodyContentArticle1.section_5.paragraphs.p3}</p>
          </div>
          {/* Contact Form */}
          <div className="flex flex-col justify-start items-start gap-y-4">
            <SubHeading>
              {bodyContentArticle1.section_5.paragraphs.contact_form_heading}
            </SubHeading>
            <ContactForm />
          </div>
          {/* Section 6 */}
        </div>
      </MaxWidthWrapper>
    </section>
  );
};

export default About;
