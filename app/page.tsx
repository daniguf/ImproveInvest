import { useTranslations } from "next-intl";

const Home = () => {
  const t = useTranslations("home");
  return <div className="">{t("0513cdd")}</div>;
};

export default Home;
