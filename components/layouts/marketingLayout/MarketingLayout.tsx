import Header from "@/components/ui/header/Header";
import LayoutBody from "@/components/layouts/layoutBody/LayoutBody";

export interface IMarketingLayout {
  children: React.ReactNode;
}

const MarketingLayout = ({ children }: IMarketingLayout) => (
  <LayoutBody Header={Header}>{children}</LayoutBody>
);

export default MarketingLayout;
