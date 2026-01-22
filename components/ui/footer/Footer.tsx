import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

export interface IFooter {
  sampleTextProp: string;
}

const Footer: React.FC = () => {
  const t = useTranslations("footer");

  return (
    <footer className="block w-full bg-primary text-white">
      <div className="max-w-[1128px] mx-auto gap-x-1.5">
        {/* Footer Top Kontakt */}
        <section className="flex p-4 justify-evenly">
          <div className="flex justify-start">
            <div className="px-2">
              <Image
                src="/logo/brand/improve-invest-white.png"
                height="140"
                width="140"
                alt="Logo"
              />
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <h4>{t("footer_top.contact_info.header")}</h4>
            <div className="flex gap-2 sm:gap-4 flex-col">
              <div className="flex flex-col">
                <span className="text-xs">
                  {t("footer_top.contact_info.company_name")}
                </span>
                <span className="text-xs">
                  {t("footer_top.contact_info.cvr")}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs">
                  {t("footer_top.contact_info.adress")}
                </span>
                <span className="text-xs">
                  {t("footer_top.contact_info.phone")}
                </span>
              </div>
            </div>
          </div>
        </section>
        {/* Footer Bottom Legal */}
        <section className="min-h-5 w-full border-t border-gray-500 py-4 px-8 flex flex-col gap-y-4 sm:flex-row sm:justify-between sm:gap-y-0">
          <div className="flex justify-center items-center gap-1.5 text-sm">
            <Link href={"/gdpr"} className="px-1.5 border-r">
              {t("footer_bottom_legal.hyperlinks.gdpr")}
            </Link>
            <Link href={"/esg"} className="px-1.5 border-r">
              {t("footer_bottom_legal.hyperlinks.esg")}
            </Link>
            <Link href={"/cookies"}>
              {t("footer_bottom_legal.hyperlinks.cookies")}
            </Link>
          </div>
          <div className="flex justify-center items-center gap-1.5 text-sm">
            <span>{t("footer_bottom_legal.copy_right")}</span>
          </div>
        </section>
      </div>
    </footer>
  );
};

export default Footer;
