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

const GDPR = () => {
  const t = useTranslations("gdpr");
  return (
    <article className="flex flex-col gap-y-8 mb-5 text-white">
      <h1 className="mb-8 font-bold text-3xl">GDPR</h1>
      <TextBlock>
        <Header>{t("a0ee3b9")}</Header>
        <Paragraph>{t("78bf675")}</Paragraph>
      </TextBlock>
      <TextBlock>
        <Header>{t("be8c4f9")}</Header>
        <Paragraph>{t("7aa5c13")}</Paragraph>
      </TextBlock>
      <TextBlock>
        <Header>{t("a6f8c51")}</Header>
        <Paragraph>{t("eac0431")}</Paragraph>
      </TextBlock>
      <TextBlock>
        <Header>{t("200e20d")}</Header>
        <Paragraph>{t("bf27475")}</Paragraph>
        <Paragraph>{t("05fc9b9")}</Paragraph>
        <Paragraph>{t("74d8ee3")}</Paragraph>
        <Paragraph>{t("a6108e3")}</Paragraph>
        <Paragraph>{t("50f22b4")}</Paragraph>
        <Paragraph>{t("d124e0b")}</Paragraph>
      </TextBlock>
      <TextBlock>
        <Header>{t("6a1f3bd")}</Header>
        <Paragraph>{t("11d03d5")}</Paragraph>
        <Paragraph>{t("653049f")}</Paragraph>
        <Paragraph>{t("def2ea9")}</Paragraph>
      </TextBlock>

      <TextBlock>
        <Header>{t("7520642")}</Header>
        <Paragraph>{t("ab2a6f5")}</Paragraph>
        <Paragraph>{t("2cd23d0")}</Paragraph>
        <Paragraph>{t("a6b0130")}</Paragraph>
        <Paragraph>{t("695fc56")}</Paragraph>
        <Paragraph>{t("79d0da2")}</Paragraph>
        <Paragraph>{t("09b91d5")}</Paragraph>
      </TextBlock>

      <TextBlock>
        <Header>{t("9d0b2f9")}</Header>
        <Paragraph>{t("6daefbf")}</Paragraph>
        <Paragraph>{t("91de827")}</Paragraph>
        <Paragraph>{t("389e0e8")}</Paragraph>
        <Paragraph>{t("c25ed32")}</Paragraph>
      </TextBlock>
      <TextBlock>
        <Header>{t("3929dbf")}</Header>
        <Paragraph>{t("625da4b")}</Paragraph>
        <Paragraph>{t("067f801")}</Paragraph>
        <Paragraph>{t("77e577b")}</Paragraph>
        <Paragraph>{t("07b6781")}</Paragraph>
        <Paragraph>{t("3297a3e")}</Paragraph>
      </TextBlock>

      <TextBlock>
        <Header>{t("739e478")}</Header>
        <Paragraph>{t("c747495")}</Paragraph>
        <Paragraph>{t("d17c441")}</Paragraph>
        <Paragraph>{t("255cec1")}</Paragraph>
        <Paragraph>{t("949396e")}</Paragraph>
      </TextBlock>
      <TextBlock>
        <Header>{t("50d2206")}</Header>
        <Paragraph>{t("eb65bc4")}</Paragraph>
        <Paragraph>{t("2c113cf")}</Paragraph>
        <Paragraph>{t("2a38db9")}</Paragraph>
      </TextBlock>
      <TextBlock>
        <Header>{t("7f71bab")}</Header>
        <Paragraph>{t("fc4b04d")}</Paragraph>
        <Paragraph>{t("2c74112")}</Paragraph>
      </TextBlock>
      <TextBlock>
        <Header>{t("dbb1d0d")}</Header>
        <Paragraph>{t("f1f56d7")}</Paragraph>
        <Paragraph>{t("faf40ab")}</Paragraph>
        <Paragraph>{t("0b433b8")}</Paragraph>
      </TextBlock>
      <TextBlock>
        <Header>{t("ec88e08")}</Header>
        <Paragraph>{t("9c7e51f")}</Paragraph>
        <Paragraph>{t("4f8a6b8")}</Paragraph>
      </TextBlock>
      <TextBlock>
        <Header>{t("18fdd5e")}</Header>
        <Paragraph>{t("dd726ae")}</Paragraph>
      </TextBlock>
      <TextBlock>
        <Header>{t("9b825ec")}</Header>
        <Paragraph>{t("357ab3b")}</Paragraph>
      </TextBlock>
      <TextBlock>
        <Header>{t("05f8c38")}</Header>
        <Paragraph>{t("bf64837")}</Paragraph>
      </TextBlock>
      <TextBlock>
        <Header>{t("93ebe09")}</Header>
        <Paragraph>{t("7b0de15")}</Paragraph>
      </TextBlock>

      <TextBlock>
        <Header>{t("c7fd320")}</Header>
        <Paragraph>{t("6063c18")}</Paragraph>
      </TextBlock>

      <TextBlock>
        <Header>{t("122a76f")}</Header>
        <Paragraph>{t("7b0de15")}</Paragraph>
      </TextBlock>

      <TextBlock>
        <Header>{t("0fcd963")}</Header>
        <Paragraph>{t("8971576")}</Paragraph>
      </TextBlock>
      <TextBlock>
        <Header>{t("194f2e8")}</Header>
        <Paragraph>{t("7842087")}</Paragraph>
        <Paragraph>{t("3903302")}</Paragraph>
      </TextBlock>
    </article>
  );
};

export default GDPR;
