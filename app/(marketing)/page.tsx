import Hero from "@/components/features/hero/Hero";
import MarketStrategy from "@/components/features/marketStrategy/MarketStrategy";
import WhyInvest from "@/components/features/whyInvest/WhyInvest";

export default function HomePage() {
  return (
    <>
      <Hero />
      <WhyInvest sampleTextProp="" />
      <MarketStrategy />
    </>
  );
}
