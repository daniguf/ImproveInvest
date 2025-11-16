"use client";

import Link from "next/link";
import { NAVIGABLE_ITEMS } from "../navItems/NavItems";

type Category = (typeof NAVIGABLE_ITEMS)[number];

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
    <div className="flex">
      <div className="relative flex items-center">
        <div
          className={`flex items-center gap-1.5 cursor-pointer p-2 rounded-md hover:bg-gray-100 ${isOpen ? "bg-gray-100" : null}`}
          onClick={handleOpen}
        >
          {category.label}
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
      </div>
      {haveDropDown ? (
        isOpen ? (
          <div
            className={`absolute inset-x-0 top-full text-sm ${isAnyOpen ? "" : ""}`}
          >
            <div
              className="absolute inset-0 top-1/2 bg-white shadow"
              aria-hidden="true"
            />
            <div className="relative bg-white">
              <div className="mx-auto max-w-7xl px-8">
                <div className="grid grid-cols-4 gap-x-8 gap-y-10 p-16">
                  <div className="col-span-4 col-start-1 grid grid-cols-3 gap-x-8">
                    {category.featured?.map((item) => (
                      <div
                        key={item.name}
                        className="group relative text-base sm:text-sm"
                      >
                        <div className="relative aspect-video overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                          <Link
                            href={item.href}
                            className="mt-6 block font-medium text-gray-900"
                          >
                            {item.name}
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null
      ) : null}
    </div>
  );
};

export default NavItem;
