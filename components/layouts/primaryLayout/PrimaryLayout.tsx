import Footer from "@/components/ui/footer/Footer";
import HeaderSecondary from "@/components/ui/headerSecondary/HeaderSecondary";

export interface IPrimaryLayout {
  children: React.ReactNode;
}

const PrimaryLayout = ({ children }: IPrimaryLayout) => {
  return (
    <>
      <HeaderSecondary />
      <main className="relative max-w-[1128px] mx-auto my-9 px-4 sm:px-8">
        {children}
      </main>
      <Footer />
    </>
  );
};

export default PrimaryLayout;
