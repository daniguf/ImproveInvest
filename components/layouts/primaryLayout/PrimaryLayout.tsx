import HeaderSecondary from "@/components/ui/headerSecondary/HeaderSecondary";
import LayoutBody from "@/components/layouts/layoutBody/LayoutBody";

export interface IPrimaryLayout {
  children: React.ReactNode;
}

const PrimaryLayout = ({ children }: IPrimaryLayout) => (
  <LayoutBody Header={HeaderSecondary}>{children}</LayoutBody>
);

export default PrimaryLayout;
