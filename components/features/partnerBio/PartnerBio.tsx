import partnerBioData from "@/messages/global.json";
import { useMessages } from "next-intl";
import ProductOwnerCard from "../producOwnerCard/ProductOwnerCard";

type PartnerKey = keyof typeof partnerBioData.partners;

type PartnerBioProps = {
  name: PartnerKey;
};

const PartnerBio = ({ name }: PartnerBioProps) => {
  const messages = useMessages();

  const partnersContent =
    messages.about.articles.article_1.section_2.paragraphs.partners;

  const partner = partnerBioData.partners[name];
  const content = partnersContent[name];

  if (!partner || !content) {
    return null;
  }

  return (
    <div className="sm:flex gap-6 w-full sm:max-h-[80dvh] py-12 sm:p-8">
      <div className="flex-1 h-full sm:grid grid-cols-1 grid-rows-6">
        <p className="font-extrabold row-span-2 content-center items-center max-sm:mb-8">
          {partner.name}
          {partner.role && (
            <span className="ml-1 text-gray-300">{partner.role}</span>
          )}
        </p>
        <p className="mb-8">{content.description.paragraphs.p1}</p>
        <p className="max-sm:mb-8">{content.description.paragraphs.p2}</p>
      </div>
      <ProductOwnerCard
        src={partner.image_src}
        alt={partner.name}
        href={partner.references.linkedIn}
      />
    </div>
  );
};

export default PartnerBio;
