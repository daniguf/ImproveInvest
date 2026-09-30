import Footer from "@/components/ui/footer/Footer";
import { ILayoutBody } from "@/components/layouts/layoutBody/types";

export interface ILayoutBodyProps extends ILayoutBody {
  Header: React.ComponentType;
}

// Shared body for the two route-group layout components, which differ only in
// which header they render.
const LayoutBody = ({ children, Header }: ILayoutBodyProps) => {
  return (
    <>
      <Header />
      <main className="relative max-w-dvw flex flex-col mx-auto">
        {children}
      </main>
      <Footer />
    </>
  );
};

export default LayoutBody;
