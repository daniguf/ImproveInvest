import { useTranslations } from "next-intl";
import Image from "next/image";

const WhoIsImproveInvest = () => {
  const t = useTranslations("hvem-er-improve-invest-a-s");
  return (
    <div className="flex flex-col">
      {/* HVEM ER IMPROVE INVEST A/S? */}
      <section className="flex flex-col">
        <h2 className="mb-8 text-white text-4xl font-bold">{t("bcd2427")}</h2>
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
                  quality={100}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Om Os */}
      <section className="mt-9 bg-[#f6f7f8] rounded-xs">
        <div className="w-full py-9 px-7">
          <h2 className="text-center sm:text-start text-secondary text-5xl font-bold">
            {t("5e8a5f1")}
          </h2>
        </div>
        <div className="flex sm:flex-row flex-col justify-evenly gap-y-4 sm:gap-y-0 pb-12">
          {/* <div className="h-full grid grid-cols-2 grid-rows-2"> */}
          {/* Christian */}
          <div className="h-full w-full flex flex-col justify-center p-4 pb-12 border-r border-gray-400">
            <div className="w-4/5 flex flex-col mx-auto">
              <h3 className="font-bold text-secondary mb-2">{t("77e32ff")}</h3>
              <div className="flex flex-col justify-center gap-y-4 mx-auto text-secondary text-md">
                <p>{t("6adf9e5")}</p>
                <p>{t("d515940")}</p>
              </div>
            </div>
          </div>
          {/* Jacques */}
          <div className="h-full w-full flex flex-col justify-center p-4 pb-12">
            <div className="w-4/5 sm:w-3/4 flex flex-col mx-auto">
              <h3 className="font-bold text-secondary mb-2">{t("32ee4d1")}</h3>
              <div className="flex flex-col justify-center gap-y-4 mx-auto text-secondary text-md">
                <p>{t("7b7a0cb")}</p>
                <p>{t("d5fbc21")}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col p-4 py-14 text-white text-md bg-secondary">
          <p className="mx-auto w-4/5 sm:w-3/4">{t("b7cba11")}</p>
          <div className="w-full flex flex-col sm:flex-row justify-evenly">
            <div className="flex flex-col justify-center mx-auto">
              <p className="py-6">{t("abc83eb")}</p>
              <div className="bg-white px-3">
                <Image
                  src="/logo/affliateBrands/partner-revision-logo.jpg"
                  className="h-auto w-[200px]"
                  alt="partner accountant"
                  width={250}
                  height={166}
                />
              </div>
            </div>
            <div className="mx-auto">
              <p className="py-6">{t("f04c315")}</p>
              <div>
                <Image
                  src="/logo/affliateBrands/jasmikne.png"
                  className="h-auto w-[200px]"
                  alt="partner accountant"
                  width={250}
                  height={166}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WhoIsImproveInvest;
