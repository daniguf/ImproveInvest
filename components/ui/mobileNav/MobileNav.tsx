"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { useState, useTransition } from "react";

export interface IMobileNav {
  sampleTextProp: string;
}

const languageOptions = [
  { label: "DA", locale: "da" },
  { label: "EN", locale: "en" },
  { label: "DE", locale: "de" },
];

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
    <div className="block relative xl:hidden">
      {isMenuToggled ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#fff"
          onClick={handleMenuToggle}
          className="cursor-pointer"
        >
          <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#ffffff"
          onClick={handleMenuToggle}
          className="cursor-pointer"
        >
          <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
        </svg>
      )}
      {isMenuToggled ? (
        <div className="fixed top-21 right-0 h-dvh w-dvw bg-primary">
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

            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#ffffff"
              className="ml-3 mt-3"
            >
              <path d="M480-80q-82 0-155-31.5t-127.5-86Q143-252 111.5-325T80-480q0-83 31.5-155.5t86-127Q252-817 325-848.5T480-880q83 0 155.5 31.5t127 86q54.5 54.5 86 127T880-480q0 82-31.5 155t-86 127.5q-54.5 54.5-127 86T480-80Zm0-82q26-36 45-75t31-83H404q12 44 31 83t45 75Zm-104-16q-18-33-31.5-68.5T322-320H204q29 50 72.5 87t99.5 55Zm208 0q56-18 99.5-55t72.5-87H638q-9 38-22.5 73.5T584-178ZM170-400h136q-3-20-4.5-39.5T300-480q0-21 1.5-40.5T306-560H170q-5 20-7.5 39.5T160-480q0 21 2.5 40.5T170-400Zm216 0h188q3-20 4.5-39.5T580-480q0-21-1.5-40.5T574-560H386q-3 20-4.5 39.5T380-480q0 21 1.5 40.5T386-400Zm268 0h136q5-20 7.5-39.5T800-480q0-21-2.5-40.5T790-560H654q3 20 4.5 39.5T660-480q0 21-1.5 40.5T654-400Zm-16-240h118q-29-50-72.5-87T584-782q18 33 31.5 68.5T638-640Zm-234 0h152q-12-44-31-83t-45-75q-26 36-45 75t-31 83Zm-200 0h118q9-38 22.5-73.5T376-782q-56 18-99.5 55T204-640Z" />
            </svg>

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
