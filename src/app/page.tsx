import Header from "@/components/Header";
import HeroSection from "@/components/sections/HeroSection";
import DemoSection from "@/components/sections/DemoSection";
import SolutionsSection from "@/components/sections/SolutionsSection";
import WhyChooseSection from "@/components/sections/WhyChooseSection";
import PricingSection from "@/components/sections/PricingSection";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <div className="min-h-screen gradient-background">
      <Header />
      <main id="main-content">
        <HeroSection />
        <DemoSection />
        <SolutionsSection />
        <WhyChooseSection />
        <PricingSection />
      </main>
      <Footer />
    </div>
  );
}
