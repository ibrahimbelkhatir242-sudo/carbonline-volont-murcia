import Hero from "@/components/Hero";
import BrandSelection from "@/components/BrandSelection";
import FeaturedProducts from "@/components/FeaturedProducts";
import WhySection from "@/components/WhySection";
import CarbonShowcase from "@/components/CarbonShowcase";
import InstalledSection from "@/components/InstalledSection";
import VideoSection from "@/components/VideoSection";
import CompatibilitySelector from "@/components/CompatibilitySelector";
import TrustSection from "@/components/TrustSection";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <BrandSelection />
      <FeaturedProducts />
      <WhySection />
      <CarbonShowcase />
      <InstalledSection />
      <VideoSection />
      <CompatibilitySelector />
      <TrustSection />
    </main>
  );
}
