"use client";
import { LOCALES } from "@/lib/i18n";
import { Globe, Menu, X } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useState, useTransition } from "react";

const languageOptions = LOCALES.map((locale) => ({
  label: locale.toUpperCase(),
  locale,
}));

const MobileNav: React.FC = () => {
  const t = useTranslations("navigation");

  const NAVIGABLE_ITEMS = [
    {
      id: 1,
      label: t("mira"),
      href: "/mira",
    },
    {
      id: 2,
      label: t("projects"),
      href: "/projekter",
    },
    {
      id: 3,
      label: t("investors"),
      href: "/investorer",
    },
    {
      id: 3,
      label: t("about"),
      href: "/om-os",
    },
  ];

  const [isPending, startTransition] = useTransition();

  function changeLocale(nextLocale: string) {
    startTransition(() => {
      document.cookie = `locale=${nextLocale}; path=/; max-age=31536000; SameSite=Lax`;
      window.location.reload();
    });
    setisMenuToggled(false);
  }

  const [isMenuToggled, setisMenuToggled] = useState(false);

  const handleMenuToggle = () => {
    setisMenuToggled((prev) => (prev = !prev));
  };

  return (
    <div className="relative xl:hidden flex justify-between w-full">
      <div className="flex justify-start items-center mx-4">
        <Link href={"/"}>
          <Image
            src={"/logo/brand/improve-invest-white.png"}
            alt="logo"
            width={100}
            height={50}
            quality={100}
          />
        </Link>
      </div>
      {isMenuToggled ? (
        <X
          size={50}
          onClick={handleMenuToggle}
          className="cursor-pointer text-white"
        />
      ) : (
        <Menu
          size={50}
          onClick={handleMenuToggle}
          className="cursor-pointer text-white"
        />
      )}
      {isMenuToggled ? (
        <div className="fixed top-21 right-0 h-dvh w-dvw bg-primary max-w-dvw">
          <ul className="relative w-full mx-auto">
            {NAVIGABLE_ITEMS.map((item) => (
              <li
                key={item.label}
                className="cursor-pointer p-4 bg-primary border-b-2 my-0.5"
              >
                <Link
                  href={item.href}
                  className="relative block h-full w-full font-bold"
                  onClick={handleMenuToggle}
                >
                  {item.label}
                </Link>
              </li>
            ))}

            <Globe size={24} className="ml-3 mt-3 text-white" />

            <div className="relative mx-auto bg-primary ">
              {languageOptions.map((item, i) => (
                <div key={i} className="relative px-3 text-base sm:text-xs">
                  <div className="relative my-5 block cursor-pointer font-extrabold text-white sm:text-nowrap hover:underline underline-offset-8">
                    <div
                      onClick={() => changeLocale(item.locale)}
                      className={isPending ? "opacity-40" : ""}
                    >
                      {item.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ul>
        </div>
      ) : null}
    </div>
  );
};

export default MobileNav;
