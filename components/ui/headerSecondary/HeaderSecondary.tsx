import LanguageSwitcher from "../languageSwitcher/LanguageSwitcher";
import MobileNav from "../mobileNav/MobileNav";
import NavItems from "../navItems/NavItems";

export interface IHeaderSecondary {
  sampleTextProp: string;
}

const HeaderSecondary: React.FC = () => {
  return (
    <header className="top-0 sticky w-full h-25 p-[1em] bg-primary shadow-2xl z-10 text-white">
      <div className="flex relative justify-end items-center max-w-[1028px] mx-auto">
        <nav className="hidden xl:flex justify-center">
          <NavItems />
          <LanguageSwitcher />
        </nav>
        <MobileNav />
      </div>
    </header>
  );
};

export default HeaderSecondary;
