import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

export interface ILandingPageContentSection {
  sampleTextProp: string;
}

interface ISecondSectionElement {
  children: React.ReactNode;
  path_d: string;
  header: string;
}

const SecondSectionElement: React.FC<ISecondSectionElement> = ({
  children,
  path_d,
  header,
}) => {
  return (
    <div className="relative flex flex-col gap-1 p-8 lg:p-12 shadow-2xl shadow-black text-md text-primary bg-blue-50 transition-all duration-300 rounded rounded-br-4xl hover:rounded sm:opacity-95 hover:opacity-100">
      <div className="flex justify-center items-center">
        <div className="absolute lg:right-11/12 lg:bottom-auto right-1/2 bottom-11/12 bg-[#131c2e] p-4 rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="40px"
            viewBox="0 -960 960 960"
            width="40px"
            fill="#FFFFFf"
          >
            <path d={path_d} />
          </svg>
        </div>
        <h4 className="text-primary font-bold text-start py-8 sm:px-4 text-xl">
          {header}
        </h4>
      </div>
      {children}
    </div>
  );
};

const LandingPageContentSection: React.FC = () => {
  const t = useTranslations("home");
  return (
    <>
      {/* ATTRAKTIV INVESTERING I RENOVATION AF EJENDOMME */}
      <section className="relative min-h-[70dvh] max-w-[1128px] mx-auto flex flex-col gap-x-8 lg:flex-row items-center justify-center py-14 px-8 ">
        <div className="h-full w-full flex flex-col items-center justify-center">
          <div className="flex flex-col justify-center">
            <h2 className="text-white font-extrabold text-3xl">
              {t("29c1007")}
            </h2>
            <p className="text-tertiary my-4">{t("section_1.paragraph_1")}</p>
            <ul className="flex flex-col gap-y-1.5">
              <li className="flex">
                <p className="text-tertiary">{t("section_1.paragraph_2")}</p>
              </li>
              <li className="flex">
                <p className="text-tertiary">{t("section_1.paragraph_3")}</p>
              </li>
              <li className="flex">
                <p className="text-tertiary">{t("section_1.paragraph_4")}</p>
              </li>
              <li className="flex">
                <p className="text-tertiary">{t("section_1.paragraph_5")}</p>
              </li>
              <li className="flex">
                <p className="text-tertiary">{t("section_1.paragraph_6")}</p>
              </li>
              <li className="flex">
                <p className="text-tertiary">{t("section_1.paragraph_7")}</p>
              </li>
              <li className="flex">
                <p className="text-tertiary">{t("section_1.paragraph_8")}</p>
              </li>
            </ul>
          </div>
        </div>
        <div className="py-8 lg:py-0 content-center">
          <Image
            src="/other/Picture-4-scaled.jpg"
            alt=""
            height={400}
            width={266}
            quality={100}
            className="h-auto w-[350px] sm:w-[550px] lg:w-[1100px] rounded shadow-xl shadow-black"
          />
        </div>
      </section>
      {/* Med Improve Invest A/S får du: */}
      <section className="bg-linear-to-b from-primary via-primary to-secondary w-full flex flex-col py-8 px-8 sm:px-14 gap-8 justify-center items-center">
        <div className="max-w-[1128px]">
          <h2 className="w-full text-center text-white font-bold text-4xl py-16">
            {t("6929745")}
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <SecondSectionElement
              path_d="M680-600h80v-80h-80v80Zm0 160h80v-80h-80v80Zm0 160h80v-80h-80v80Zm0 160v-80h160v-560H480v56l-80-58v-78h520v720H680Zm-640 0v-400l280-200 280 200v400H360v-200h-80v200H40Zm80-80h80v-200h240v200h80v-280L320-622 120-480v280Zm560-360ZM440-200v-200H200v200-200h240v200Z"
              header={t("section_2.block_1.header")}
            >
              <p className="list-item ">{t("section_2.block_1.paragraph_1")}</p>
              <p className="list-item ">{t("section_2.block_1.paragraph_2")}</p>
              <p className="list-item ">{t("section_2.block_1.paragraph_3")}</p>
            </SecondSectionElement>
            <SecondSectionElement
              path_d="M160-200v-440 440-15 15Zm0 80q-33 0-56.5-23.5T80-200v-440q0-33 23.5-56.5T160-720h160v-80q0-33 23.5-56.5T400-880h160q33 0 56.5 23.5T640-800v80h160q33 0 56.5 23.5T880-640v171q-18-13-38-22.5T800-508v-132H160v440h283q3 21 9 41t15 39H160Zm240-600h160v-80H400v80ZM720-40q-83 0-141.5-58.5T520-240q0-83 58.5-141.5T720-440q83 0 141.5 58.5T920-240q0 83-58.5 141.5T720-40Zm20-208v-112h-40v128l86 86 28-28-74-74Z"
              header={t("section_2.block_2.header")}
            >
              <p className="list-item ">{t("section_2.block_2.paragraph_1")}</p>
              <p className="list-item ">{t("section_2.block_2.paragraph_2")}</p>
              <p className="list-item ">{t("section_2.block_2.paragraph_3")}</p>
              <p className="list-item ">{t("section_2.block_2.paragraph_4")}</p>
              <p className="list-item ">{t("section_2.block_2.paragraph_5")}</p>
              <p className="list-item ">{t("section_2.block_2.paragraph_6")}</p>
            </SecondSectionElement>
            <SecondSectionElement
              path_d="M320-414v-306h120v306l-60-56-60 56Zm200 60v-526h120v406L520-354ZM120-216v-344h120v224L120-216Zm0 98 258-258 142 122 224-224h-64v-80h200v200h-80v-64L524-146 382-268 232-118H120Z"
              header={t("section_2.block_3.header")}
            >
              <p className="list-item ">{t("section_2.block_3.paragraph_1")}</p>
              <p className="list-item ">{t("section_2.block_3.paragraph_2")}</p>
              <p className="list-item ">{t("section_2.block_3.paragraph_3")}</p>
              <p className="list-item ">{t("section_2.block_3.paragraph_4")}</p>
              <p className="list-item ">{t("section_2.block_3.paragraph_5")}</p>
            </SecondSectionElement>
            <SecondSectionElement
              path_d="M530-80q-11 0-20.5-5.5T495-100q-5-9-5-20t6-21l170-280q6-10 15-15t19-5q10 0 19 5t15 15l170 280q6 10 6 21t-5 20q-5 9-14 14.5T870-80H530Zm170-40q8 0 14-6t6-14q0-8-6-14t-14-6q-8 0-14 6t-6 14q0 8 6 14t14 6Zm-377-40q-11 0-20.5-5.5T288-181l-78-139h58l40 80h92v-40h-68l-40-80H188l-57-100q-2-5-3.5-10t-1.5-10q0-4 5-20l57-100h104l40-80h68v-40h-92l-40 80h-58l78-139q5-10 14.5-15.5T323-800h97q17 0 28.5 11.5T460-760v160h-60l-40 40h100v120h-88l-40-80h-92l-40 40h108l40 80h112v164l-33 54q-3 5-5 10.5t-4 11.5h-95Zm357-40h40v-120h-40v120ZM500-302v-258h100l-40-40h-60v-160q0-17 11.5-28.5T540-800h97q11 0 20.5 5.5T672-779l78 139h-58l-40-80h-92v40h68l40 80h104l57 100q3 5 4 10t1 10q0 1-5 20l-12 21-15-23q-17-27-43.5-43T700-521q-32 0-58.5 16T598-462l-98 160Z"
              header={t("section_2.block_4.header")}
            >
              <p className="list-item ">{t("section_2.block_4.paragraph_1")}</p>
              <p className="list-item ">{t("section_2.block_4.paragraph_2")}</p>
              <p className="list-item ">{t("section_2.block_4.paragraph_3")}</p>
              <p className="list-item ">{t("section_2.block_4.paragraph_4")}</p>
            </SecondSectionElement>
          </div>
        </div>
      </section>
      {/* BEGRÆNSET RISIKO */}
      <section className="max-w-[1128px] flex flex-col mx-auto py-8 px-8 sm:px-14 gap-8 justify-center items-center text-primary">
        <h2 className="py-8 text-white font-bold text-4xl">{t("52f4110")}</h2>
        <div className="group grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-5 gap-x-4">
          <div className="flex flex-col gap-4 p-8 rounded-lg bg-blue-50 shadow shadow-gray-50 transition-all duration-300 ease-in-out opacity-100 hover:opacity-100 hover:-translate-2.5 group-hover:opacity-70 group-hover:translate-none -translate-2.5">
            <p className="list-item list-inside">{t("section_3.81aee53")}</p>
            <p className="list-item list-inside">{t("section_3.fa44e87")}</p>
          </div>
          <div className="flex flex-col gap-4 p-8 rounded-lg bg-blue-50 shadow shadow-gray-50 transition-all duration-300 ease-in-out sm:opacity-70 hover:opacity-100 hover:-translate-2.5">
            <p className="list-item list-inside">{t("section_3.25bab45")}</p>
            <p className="list-item list-inside">{t("section_3.0aee6db")}</p>
            <p className="list-item list-inside">{t("section_3.e2c2fb9")}</p>
          </div>
          <div className="flex flex-col gap-4 p-8 rounded-lg bg-blue-50 shadow shadow-gray-50 transition-all duration-300 ease-in-out sm:opacity-70 hover:opacity-100 hover:-translate-2.5">
            <p className="list-item list-inside">{t("section_3.414f1ac")}</p>
            <p className="list-item list-inside">{t("section_3.a7c8044")}</p>
            <p className="list-item list-inside">{t("section_3.44a6fb4")}</p>
          </div>
        </div>
        <div>
          <p className="flex sm:flex-row flex-col gap-1 text-center text-white">
            <span>{t("section_3.c58db7c")}</span>
            <Link href={"/priip-kid"} className="text-white underline">
              {t("section_3.bx354d4")}
            </Link>
          </p>
        </div>
      </section>
      {/* EN VIGTIG SAMFUNDSMÆSSIG MEGATREND */}
      <section className="max-w-[1128px] flex flex-col md:flex-row mx-auto py-16 px-8 sm:px-14 gap-y-8 justify-center items-center text-white">
        <div className="flex-1 max-h-dvh mx-auto max-w-dvw">
          <Image
            src="/other/potrait_Skærmbillede 2025-11-26 204620.jpg"
            alt=""
            height={495}
            width={286}
            quality={100}
            className="max-w-dvw mx-auto rounded"
          />
        </div>
        <div className="flex-1">
          <h2 className="max-w-dvw text-white font-extrabold text-3xl mb-4">
            {t("888c09c")}
          </h2>
          <div className="flex flex-col gap-y-8">
            <p>{t("section_4.e31e18a")}</p>
            <p>{t("section_4.1fbf97e")}</p>
            <p>{t("section_4.1a7dafe")}</p>
            <p>{t("section_4.869c435")}</p>
            <p>{t("section_4.db14352")}</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default LandingPageContentSection;
