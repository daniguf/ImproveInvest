"use client";

import { useTranslations } from "next-intl";
import { RefObject, useEffect, useRef, useState } from "react";
import { useOnClickOutside } from "usehooks-ts";
import NavItem from "../navItem/NavItem";

export interface INavItems {
  sampleTextProp: string;
}

const NavItems: React.FC = () => {
  const t = useTranslations("header");

  const NAVIGABLE_ITEMS = [
    {
      id: 1,
      label: t("home"),
      href: "/",
    },
    {
      id: 2,
      label: t("aboutUs"),
      featured: [
        {
          name: t("whyInvest"),
          href: "/hvorfor-investere",
        },
        {
          name: t("whoIsImproveInvest"),
          href: "/hvem-er-improve-invest-a-s",
        },
      ],
    },
    { id: 3, label: t("contact"), href: "/kontakt" },
  ];

  const [activeIndex, setActiveIndex] = useState<null | number>();

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveIndex(null);
      }
    };

    document.addEventListener("keydown", handler);

    return () => {
      document.removeEventListener("keydown", handler);
    };
  }, []);

  const isAnyOpen = activeIndex !== null;

  const navRef = useRef<HTMLDivElement | null>(null);

  useOnClickOutside(navRef as RefObject<HTMLElement>, () =>
    setActiveIndex(null)
  );

  return (
    <div className="flex gap-4 h-full" ref={navRef}>
      {NAVIGABLE_ITEMS.map((category, i) => {
        const handleOpen = () => {
          if (activeIndex === i) {
            setActiveIndex(null);
          } else {
            setActiveIndex(i);
          }
        };

        const isOpen = i === activeIndex;

        return (
          <NavItem
            key={category.id}
            category={category}
            handleOpen={handleOpen}
            isAnyOpen={isAnyOpen}
            isOpen={isOpen}
          />
        );
      })}
    </div>
  );
};

export default NavItems;
