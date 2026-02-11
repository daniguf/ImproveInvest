"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { Fragment, RefObject, useEffect, useRef, useState } from "react";
import { useOnClickOutside } from "usehooks-ts";
import NavItem from "../navItem/NavItem";

export interface INavItems {
  sampleTextProp: string;
}

const NavItems: React.FC = () => {
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
    // { id: 4, label: t("contact"), href: "/kontakt" },
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
          <Fragment key={category.id}>
            {i == 2 ? (
              <div className="flex justify-center items-center mx-40">
                <Link href={"/"}>
                  <Image
                    src={"/logo/brand/improve-invest-white.png"}
                    alt="logo"
                    width={200}
                    height={61}
                    quality={100}
                  />
                </Link>
              </div>
            ) : (
              <></>
            )}
            <NavItem
              category={category}
              handleOpen={handleOpen}
              isAnyOpen={isAnyOpen}
              isOpen={isOpen}
            />
          </Fragment>
        );
      })}
    </div>
  );
};

export default NavItems;
