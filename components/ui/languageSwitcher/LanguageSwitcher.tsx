"use client";

import GlobeSVG from "@/components/assets/globe/GlobeSVG";
import { RefObject, useRef, useState, useTransition } from "react";
import { useOnClickOutside } from "usehooks-ts";

export interface ILanguageSwitcher {
  sampleTextProp: string;
}

const languageOptions = [
  { label: "DA", locale: "da" },
  { label: "EN", locale: "en" },
  { label: "DE", locale: "de" },
];

const LanguageSwitcher: React.FC = () => {
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);

  function changeLocale(nextLocale: string) {
    startTransition(() => {
      document.cookie = `locale=${nextLocale}; path=/; max-age=31536000; SameSite=Lax`;
      window.location.reload();
    });
    setIsOpen(false);
  }

  const navRef = useRef<HTMLDivElement | null>(null);

  useOnClickOutside(navRef as RefObject<HTMLElement>, () => setIsOpen(false));

  return (
    <div
      className="hidden sm:flex relative ml-7 items-center justify-center"
      ref={navRef}
    >
      <div className="relative flex items-center justify-center">
        <GlobeSVG setIsOpen={setIsOpen} />
        {isOpen ? (
          <div className="absolute top-full -right-1/3 text-sm">
            <div
              className="absolute inset-0 bg-white shadow"
              aria-hidden="true"
            />
            <div className="relative mx-auto bg-white ">
              {languageOptions.map((item, i) => (
                <div key={i} className="relative px-3 text-base sm:text-xs">
                  <div className="relative my-5 block cursor-pointer font-extrabold text-gray-900 sm:text-nowrap hover:underline underline-offset-8">
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
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default LanguageSwitcher;
