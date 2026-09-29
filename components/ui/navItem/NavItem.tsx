"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";

type Category = {
  id: number;
  label: string;
  href?: string;
  featured?: {
    name: string;
    href: string;
  }[];
};

export interface INavItem {
  category: Category;
  handleOpen: () => void;
  isOpen: boolean;
  isAnyOpen: boolean;
}

const NavItem: React.FC<INavItem> = ({
  category,
  handleOpen,
  isOpen,
  isAnyOpen,
}: INavItem) => {
  const haveDropDown = (category.featured?.length ?? 0) > 0;

  return (
    <div className="flex relative">
      <div className="relative flex items-center">
        <div
          className={`flex items-center gap-1.5 cursor-pointer p-2 rounded-md hover:underline underline-offset-8 ${isOpen ? "underline underline-offset-8" : null}`}
          onClick={handleOpen}
        >
          {category.href ? (
            <Link href={category.href}>{category.label}</Link>
          ) : (
            category.label
          )}
          {haveDropDown ? (
            isOpen ? (
              <ChevronUp size={16} color="#1f1f1f" />
            ) : (
              <ChevronDown size={16} color="#1f1f1f" />
            )
          ) : null}
        </div>

        {haveDropDown ? (
          isOpen ? (
            <div
              className={`absolute inset-x-0 top-full text-sm min-w-56 ${isAnyOpen ? "" : ""}`}
            >
              <div
                className="absolute inset-0 bg-white shadow"
                aria-hidden="true"
              />
              <div className="relative mx-auto bg-white">
                {category.featured?.map((item) => (
                  <div
                    key={item.name}
                    className="relative px-4 text-base sm:text-sm"
                  >
                    <Link
                      href={item.href}
                      className="relative my-6 block font-medium text-gray-900 sm:text-nowrap hover:underline underline-offset-8"
                    >
                      {item.name}
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          ) : null
        ) : null}
      </div>
    </div>
  );
};

export default NavItem;
