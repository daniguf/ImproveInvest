import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

export interface IHero {
  sampleTextProp: string;
}

const Hero: React.FC = () => {
  const t = useTranslations("landing_page.hero");
  return (
    <section className="h-[105dvh] relative">
      <div className="absolute inset-0 top-0 z-0">
        <Image
          src="/hero_background.jpeg"
          alt="Background"
          fill
          className="object-cover max-xl:blur-xs"
          quality={100}
          priority
        />
        <div className="relative h-[90dvh] w-full text-white">
          <div className="relative h-full translate-y-30 xl:translate-none xl:grid grid-cols-2 grid-rows-3">
            <div className="row-3 flex flex-col justify-center items-center fade-in">
              <div className="flex flex-col justify-center items-center mb-2 gap-4">
                {/* Header */}
                <div className="font-extrabold text-2xl xl:text-4xl break-keep w-2/3 text-center">
                  {t("headline")}
                </div>
                {/* Sub header */}
                <div className="font-bold xl:font-extralight w-3/5 xl:text-sm text-center">
                  {t("paragraphs.p1")}
                </div>
                <div className="font-bold xl:font-extralight w-3/5 xl:text-sm text-center">
                  {t("paragraphs.p2")}
                </div>
              </div>
              {/* CTA */}
              <div className="flex gap-x-8 py-4 max-xl:flex-col max-xl:gap-y-8 max-xl:px-4">
                <Link href={"/om-os#contact-form"}>
                  <div className="border border-white p-2 px-4 xl:text-xs xl:font-black hover:bg-white hover:text-black transition-colors max-xl:py-4">
                    {t("ctas.contact.text")}
                  </div>
                </Link>
                <Link href={"/mira"}>
                  <div className="border border-white p-2 px-4 xl:text-xs xl:font-black hover:bg-white hover:text-black transition-colors max-xl:py-4">
                    {t("ctas.read_more.text")}
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
