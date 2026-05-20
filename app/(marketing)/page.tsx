import BuildingsWithIdententyAndPotential from "@/components/features/buildingsWithIdententyAndPotential/BuildingsWithIdententyAndPotential";
import Governance from "@/components/features/governance/Governance";
import Hero from "@/components/features/hero/Hero";
import HowWeCreateValue from "@/components/features/howWeCreateValue/HowWeCreateValue";
import InvestmentModel from "@/components/features/investmentModel/InvestmentModel";
import MarketStrategy from "@/components/features/marketStrategy/MarketStrategy";
import ProjectCarousel from "@/components/features/projectCarousel/ProjectCarousel";
import WhyInvest from "@/components/features/whyInvest/WhyInvest";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProjectCarousel />
      <WhyInvest sampleTextProp="" />
      <MarketStrategy />
      <InvestmentModel />
      <HowWeCreateValue />
      <BuildingsWithIdententyAndPotential />
      <Governance />
    </>
  );
}
