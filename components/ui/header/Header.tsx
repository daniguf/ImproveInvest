import Link from "next/link";
import LanguageSwitcher from "../languageSwitcher/LanguageSwitcher";
import MobileNav from "../mobileNav/MobileNav";
import NavItems from "../navItems/NavItems";

export interface IHeader {
  sampleTextProp: string;
}

const Header: React.FC = () => {
  return (
    <header className="top-0 sticky w-full h-15 p-[1em] bg-white shadow-2xl z-10">
      <div className="flex relative justify-end items-center max-w-[1028px] mx-auto">
        <div className="mr-auto">
          <Link href="/">
            Improve <span className="font-bold">Invest</span>
          </Link>
        </div>
        <nav className="hidden sm:flex justify-center">
          <NavItems />
        </nav>
        <LanguageSwitcher />
        <MobileNav />
      </div>
    </header>
  );
};

export default Header;
