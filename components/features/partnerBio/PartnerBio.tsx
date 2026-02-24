import partnerBioData from "@/messages/global.json";
import { useMessages } from "next-intl";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import ProductOwnerCard from "../producOwnerCard/ProductOwnerCard";

type PartnerKey = keyof typeof partnerBioData.partners;

type PartnerBioProps = {
  name: PartnerKey;
  img_src: StaticImport;
};

const PartnerBio = ({ name, img_src }: PartnerBioProps) => {
  const messages = useMessages();

  const partnersContent =
    messages.about.articles.article_1.section_2.paragraphs.partners;

  const partner = partnerBioData.partners[name];
  const content = partnersContent[name];

  if (!partner || !content) {
    return null;
  }

  return (
    <div className="xl:flex gap-6 w-full xl:max-h-[80dvh] py-12 xl:p-8">
      <div className="flex-1 h-full xl:grid grid-cols-1 grid-rows-6">
        <p className="font-extrabold row-span-2 content-center items-center max-xl:mb-8">
          {partner.name}
          {partner.role && (
            <span className="ml-1 text-gray-300">{partner.role}</span>
          )}
        </p>
        <p className="mb-8">{content.description.paragraphs.p1}</p>
        <p className="max-xl:mb-8">{content.description.paragraphs.p2}</p>
      </div>
      <ProductOwnerCard
        src={img_src}
        alt={partner.name}
        href={partner.references.linkedIn}
      />
    </div>
  );
};

export default PartnerBio;
