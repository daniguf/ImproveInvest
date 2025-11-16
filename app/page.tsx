import { useTranslations } from "next-intl";

const Home = () => {
  const t = useTranslations("home-2");
  return <div className="">{t("0513cdd")}</div>;
};

export default Home;
