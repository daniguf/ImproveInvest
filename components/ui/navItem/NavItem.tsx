"use client";

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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="16px"
                viewBox="0 -960 960 960"
                width="16px"
                fill="#1f1f1f"
              >
                <path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="16px"
                viewBox="0 -960 960 960"
                width="16px"
                fill="#1f1f1f"
              >
                <path d="M480-528 296-344l-56-56 240-240 240 240-56 56-184-184Z" />
              </svg>
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
