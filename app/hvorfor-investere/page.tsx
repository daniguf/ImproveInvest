import { useTranslations } from "next-intl";

const TextBlock = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex flex-col gap-y-2">{children}</div>;
};

const Header = ({ children }: { children: string }) => {
  return <h3 className="text-lg font-bold text-primary">{children}</h3>;
};

const Paragraph = ({ children }: { children: string }) => {
  return <p className="text-md text-tertiary">{children}</p>;
};

const WhyInvest = () => {
  const t = useTranslations("hvorfor-investere");
  return (
    <article className="flex flex-col gap-y-8 mb-5">
      <h3 className="font-bold text-4xl text-primary">{t("2b14617")}</h3>
      <TextBlock>
        <Paragraph>{t("block_1")}</Paragraph>
        <Paragraph>{t("block_2")}</Paragraph>
        <Paragraph>{t("block_3")}</Paragraph>
        <Paragraph>{t("block_4")}</Paragraph>
        <Paragraph>{t("block_5")}</Paragraph>
        <Paragraph>{t("block_6")}</Paragraph>
      </TextBlock>
      <div className="flex flex-col sm:flex-row gap-4">
        <TextBlock>
          <Header>{t("2e93d30")}</Header>
          <ul className="flex flex-col gap-1.5 text-md list-disc px-4 text-tertiary">
            <li>{t("block_7")}</li>
            <li>{t("block_8")}</li>
            <li>{t("block_9")}</li>
            <li>{t("block_10")}</li>
          </ul>
        </TextBlock>
        <TextBlock>
          <Header>{t("0a0ecfd")}</Header>
          <ul className="flex flex-col gap-1.5 text-md list-disc px-4 text-tertiary">
            <li>{t("block_11")}</li>
            <li>{t("block_12")}</li>
            <li>{t("block_13")}</li>
            <li>{t("block_14")}</li>
            <li>{t("block_15")}</li>
            <li>{t("block_16")}</li>
            <li>{t("block_17")}</li>
            <li>{t("block_18")}</li>
          </ul>
        </TextBlock>
      </div>
    </article>
  );
};

export default WhyInvest;
