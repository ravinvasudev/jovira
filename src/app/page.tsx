import { BalloonStylingSection } from "@/components/sections/BalloonStylingSection";
import { ConsultationSection } from "@/components/sections/ConsultationSection";
import { EventStylingSection } from "@/components/sections/EventStylingSection";
import { GrabGoBouquetsSection } from "@/components/sections/GrabGoBouquetSection";
import { GrabGoPartyReadySection } from "@/components/sections/GrabGoPartyReadySection";
import { HeroSection } from "@/components/sections/HeroSection";
import { InspirationSection } from "@/components/sections/InspirationSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { SectionDivider } from "@/components/ux/SectionDivider";

export default function Home() {
  return (
    <div className="w-full">
      <HeroSection />
      <ServicesSection />

      <SectionDivider variant="drape" from="bg-muted" to="bg-background" flip />
      <EventStylingSection />

      <SectionDivider variant="drape" from="bg-background" to="bg-muted" />
      <BalloonStylingSection />

      <SectionDivider variant="drape" from="bg-muted" to="bg-background" flip />
      <GrabGoPartyReadySection />

      <SectionDivider variant="drape" from="bg-background" to="bg-muted" />
      <GrabGoBouquetsSection />

      <SectionDivider variant="drape" from="bg-muted" to="bg-background" flip />
      <InspirationSection />

      <SectionDivider variant="drape" from="bg-background" to="bg-muted" />
      <ConsultationSection />
    </div>
  );
}
