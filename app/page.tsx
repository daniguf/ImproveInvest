import { useTranslations } from "next-intl";

const Home = () => {
  const t = useTranslations("HomePage");
  return <div className="">{t("title")}</div>;
};

export default Home;
