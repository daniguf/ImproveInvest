import { INavItem } from "./NavItem";

const base: INavItem = {
  category: { id: 1, label: "Home", href: "/" },
  handleOpen: () => {},
  isOpen: false,
  isAnyOpen: false,
};

export const mockNavItemProps = base;
