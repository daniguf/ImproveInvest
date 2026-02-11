import Footer from "@/components/ui/footer/Footer";
import HeaderSecondary from "@/components/ui/headerSecondary/HeaderSecondary";

export interface IPrimaryLayout {
  children: React.ReactNode;
}

const PrimaryLayout = ({ children }: IPrimaryLayout) => {
  return (
    <>
      <HeaderSecondary />
      <main className="relative max-w-dvw flex flex-col mx-auto">
        {children}
      </main>
      <Footer />
    </>
  );
};

export default PrimaryLayout;
