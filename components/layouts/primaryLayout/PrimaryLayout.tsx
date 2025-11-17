import Footer from "@/components/ui/footer/Footer";
import Header from "@/components/ui/header/Header";

export interface IPrimaryLayout {
  children: React.ReactNode;
}

const PrimaryLayout = ({ children }: IPrimaryLayout) => {
  return (
    <>
      <Header />
      <main className="relative max-w-[1128px] mx-auto my-9 px-4 sm:px-8">
        {children}
      </main>
      <Footer />
    </>
  );
};

export default PrimaryLayout;
