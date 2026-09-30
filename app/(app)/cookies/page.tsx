import MaxWidthWrapper from "@/components/layouts/maxWidthWrapper/MaxWidthWrapper";
import { useTranslations } from "next-intl";

const TextBlock = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex flex-col gap-y-4">{children}</div>;
};

const Header = ({ children }: { children: string }) => {
  return <h3 className="text-md font-bold">{children}</h3>;
};

const Paragraph = ({ children }: { children: string }) => {
  return <p className="text-sm">{children}</p>;
};

const Cookies = () => {
  const t = useTranslations("cookies");

  return (
    <MaxWidthWrapper>
      <article className="flex flex-col gap-y-8 mb-5 text-white">
        <h1 className="mb-8 font-bold text-3xl">{t("title")}</h1>
        <TextBlock>
          <Header>{t("purpose.heading")}</Header>
          <Paragraph>{t("purpose.paragraph_1")}</Paragraph>
        </TextBlock>
        <TextBlock>
          <Header>{t("cookie_definition.heading")}</Header>
          <Paragraph>{t("cookie_definition.paragraph_1")}</Paragraph>
        </TextBlock>
        <TextBlock>
          <Header>{t("company_use_of_cookies.heading")}</Header>
          <ol className="list-disc list-inside text-sm">
            <li className="list-none">{t("block_3.cookie_policy_intro")}</li>
            <li>{t("block_3.cookie_policy_a")}</li>
            <li>{t("block_3.cookie_policy_b")}</li>
            <li>{t("block_3.cookie_policy_c")}</li>
            <li>{t("block_3.cookie_policy_d")}</li>
            <li>{t("block_3.cookie_policy_e")}</li>
            <li className="list-none">{t("block_3.cookie_policy_outro")}</li>
          </ol>
        </TextBlock>
        <TextBlock>
          <Header>{t("complaints.heading")}</Header>
          <Paragraph>{t("complaints.paragraph_1")}</Paragraph>
        </TextBlock>
        <TextBlock>
          <Header>{t("entry_into_force.heading")}</Header>
          <Paragraph>{t("entry_into_force.description")}</Paragraph>
          <p className="text-sm">{t("entry_into_force.guide_to_contact")}</p>
          <ul className="text-sm">
            <li>{t("entry_into_force.contact.company")}</li>
            <li>{t("entry_into_force.contact.address")}</li>
            <li>{t("entry_into_force.contact.cvr")}</li>
            <li>{t("entry_into_force.contact.email")}</li>
            <li>{t("entry_into_force.contact.phone")}</li>
          </ul>
        </TextBlock>
      </article>
    </MaxWidthWrapper>
  );
};

export default Cookies;
