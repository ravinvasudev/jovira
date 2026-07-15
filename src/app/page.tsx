import { ConsultationSection } from "@/components/sections/ConsultationSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { InspirationSection } from "@/components/sections/InspirationSection";
import { PackagesSection } from "@/components/sections/PackagesSection";
import { ServicesSection } from "@/components/sections/ServicesSection";

export default function Home() {
  return (
    <div className="w-full">
      <HeroSection />
      <ServicesSection />
      <PackagesSection />
      <InspirationSection />
      <ConsultationSection />
    </div>
  );
}
