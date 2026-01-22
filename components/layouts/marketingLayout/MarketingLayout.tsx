import Footer from "@/components/ui/footer/Footer";
import Header from "@/components/ui/header/Header";

export interface IMarketingLayout {
  children: React.ReactNode;
}

const MarketingLayout = ({ children }: IMarketingLayout) => {
  return (
    <>
      <Header /> 
      <main className="relative max-w-dvw flex flex-col mx-auto mb-9">
        {children}
      </main>
      <Footer />
    </>
  );
};

export default MarketingLayout;
