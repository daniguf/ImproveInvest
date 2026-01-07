import { useTranslations } from "next-intl";
import Image from "next/image";

export interface IHero {
  sampleTextProp: string;
}

const Hero: React.FC = () => {
  const t = useTranslations("home");
  return (
    <section className="relative h-[70dvh] flex items-center justify-center overflow-hidden mb-11">
      <div className="absolute inset-0 bg-linear-to-b from-gray-900/60 to-gray-950/90 z-1" />
      <Image
        // src="/other/Picture-2-scaled.webp"
        src="https://static.wixstatic.com/media/d41eec_d79162328feb4212b6aac934b0e28683~mv2.jpg/v1/fit/w_1006,h_682,q_90,enc_avif,quality_auto/d41eec_d79162328feb4212b6aac934b0e28683~mv2.jpg"
        alt="Hero background"
        fill
        className="object-cover"
        priority
      />
      <div className="relative text-center px-6 z-2">
        <h1 className="text-4xl sm:text-6xl font-extrabold mb-6 bg-linear-to-r text-white bg-clip-text">
          {t("0513cdd")}
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
          {t("64337c7")}
        </p>
        <a
          href="projekter"
          className="inline-block m-2 px-8 py-4 text-white bg-blue-600 hover:bg-blue-700 rounded-full font-semibold text-lg transition-colors"
        >
          {t("123sd14")}
        </a>
        <a
          href="kontakt"
          className="inline-block m-2 px-8 py-4 text-white bg-blue-600 hover:bg-blue-700 rounded-full font-semibold text-lg transition-colors"
        >
          {t("45628s12")}
        </a>
      </div>
    </section>
  );
};

export default Hero;
