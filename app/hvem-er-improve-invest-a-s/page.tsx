import { useTranslations } from "next-intl";
import Image from "next/image";

const WhoIsImproveInvest = () => {
  const t = useTranslations("hvem-er-improve-invest-a-s");
  return (
    <div className="flex flex-col">
      {/* HVEM ER IMPROVE INVEST A/S? */}
      <section className="flex flex-col">
        <h2 className="mb-8 text-primary text-4xl font-bold">{t("bcd2427")}</h2>
        <div className="flex flex-col sm:flex-row gap-4 gap-x-8 text-md text-tertiary">
          <div className="flex flex-col gap-4">
            <p>{t("cfc7c7e")}</p>
            <p>{t("7c6c981")}</p>
            <p>{t("7ad0e79")}</p>
            <p>{t("4209968")}</p>
            <p>{t("e4544db")}</p>
          </div>
          <div className="flex flex-col gap-4">
            <p>{t("a644292")}</p>
            <p>{t("efb2273")}</p>
            <div className="flex flex-col justify-evenly">
              <h3 className="font-bold">{t("7ffb906")}</h3>
              <div className="flex justify-center my-4">
                <Image
                  src="/productOwners/Screenshot_4.png"
                  className="h-auto w-[493px]"
                  alt="Owners and Signature"
                  width={493}
                  height={266}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Om Os */}
      <section>
        {/* <h2 className="text-primary text-5xl font-bold">{t("bcd2427")}</h2> */}
      </section>
    </div>
  );
};

export default WhoIsImproveInvest;
