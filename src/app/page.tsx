import Header from "@/components/Header";
import HeroSection from "@/components/sections/HeroSection";
import SolutionsSection from "@/components/sections/SolutionsSection";
import WhyChooseSection from "@/components/sections/WhyChooseSection";
import PricingSection from "@/components/sections/PricingSection";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <div className="min-h-screen gradient-background">
      <Header />
      <HeroSection />
      <SolutionsSection />
      <WhyChooseSection />
      <PricingSection />
      <Footer />
    </div>
  );
}
