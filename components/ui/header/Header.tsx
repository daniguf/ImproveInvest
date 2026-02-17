import LanguageSwitcher from "../languageSwitcher/LanguageSwitcher";
import MobileNav from "../mobileNav/MobileNav";
import NavItems from "../navItems/NavItems";

export interface IHeader {
  sampleTextProp: string;
}

const Header: React.FC = () => {
  return (
    <header className="top-0 absolute w-full h-25 p-[1em] bg-transparent z-10">
      <div className="relative flex justify-center items-center h-full w-4/5 mx-auto border-b border-white/70 text-white/90">
        <div className="relative hidden xl:flex justify-center items-center h-full w-full mx-auto">
          <NavItems />
          <LanguageSwitcher />
          <div>
            <p className="ml-1">+45 20 80 39 39</p>
          </div>
        </div>
      </div>
      <div className="top-0 right-0 absolute xl:hidden w-full h-25 p-[1em] bg-primary z-10 text-white/90">
        <div className="relative flex justify-between items-center h-full w-4/5 mx-auto">
          <MobileNav />
        </div>
      </div>
    </header>
  );
};

export default Header;
