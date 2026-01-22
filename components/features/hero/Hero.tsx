import PointedArrowSVG from "@/components/assets/pointedArrow/PointedArrowSVG";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

export interface IHero {
  sampleTextProp: string;
}

const Hero: React.FC = () => {
  const t = useTranslations("home");
  return (
    <section className="h-[115dvh] relative">
      <div className="absolute inset-0 top-0 z-0">
        <Image
          src="/hero_background.jpeg"
          alt="Background"
          fill
          className="object-cover"
          quality={100}
          priority
        />
        <div className="relative h-[95dvh] w-full text-white">
          <div className="relative h-full translate-y-30 sm:translate-none sm:grid grid-cols-2 grid-rows-3">
            <div className="row-3 flex flex-col justify-center items-center fade-in">
              <div className="flex flex-col justify-center items-center mb-2 gap-4">
                {/* Header */}
                <div className="font-extrabold text-2xl sm:text-4xl break-keep w-2/3">
                  {t("0513bdd")}
                </div>
                {/* Sub header */}
                <div className="font-extralight w-3/5 text-md">
                  {t("0513cdd")}
                </div>
              </div>
              {/* CTA */}
              <Link href={"/hvem-er-improve-invest-a-s"}>
                <div className="group cursor-pointer p-2 flex justify-center items-end gap-x-1 border-b">
                  <p className="font-extrabold text-lg">{t("88a3559")}</p>
                  <PointedArrowSVG />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
