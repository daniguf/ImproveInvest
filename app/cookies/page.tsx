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
    <article className="flex flex-col gap-y-8 mb-5">
      <h1 className="mb-8 font-bold text-3xl">{t("c6b9b1e")}</h1>
      <TextBlock>
        <Header>{t("2dd59b5")}</Header>
        <Paragraph>{t("db9219a")}</Paragraph>
      </TextBlock>
      <TextBlock>
        <Header>{t("2d4b431")}</Header>
        <Paragraph>{t("d29e018")}</Paragraph>
      </TextBlock>
      <TextBlock>
        <Header>{t("30b150d")}</Header>
        {/* <Paragraph>{t("0b09044")}</Paragraph> */}
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
        <Header>{t("4aae4b6")}</Header>
        <Paragraph>{t("f320935")}</Paragraph>
      </TextBlock>
      <TextBlock>
        <Header>{t("aeaca04")}</Header>
        <Paragraph>{t("7527009")}</Paragraph>
      </TextBlock>
      <TextBlock>
        <Header>{t("513d953")}</Header>
        <Paragraph>{t("54924cf")}</Paragraph>
      </TextBlock>
      <TextBlock>
        <Header>{t("e0fe9a5")}</Header>
        <Paragraph>{t("cb602d8")}</Paragraph>
      </TextBlock>
      <TextBlock>
        <Header>{t("bb67bdd")}</Header>
        <Paragraph>{t("effective_date.description")}</Paragraph>
        <p className="text-sm">{t("effective_date.guide_to_contact")}</p>
        <ul className="text-sm">
          <li>{t("effective_date.contact.company")}</li>
          <li>{t("effective_date.contact.address")}</li>
          <li>{t("effective_date.contact.cvr")}</li>
          <li>{t("effective_date.contact.email")}</li>
          <li>{t("effective_date.contact.phone")}</li>
        </ul>
      </TextBlock>
    </article>
  );
};

export default Cookies;
