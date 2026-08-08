import { BalloonInstallationSection } from "@/components/sections/BalloonInstallationSection";
import { ConsultationSection } from "@/components/sections/ConsultationSection";
import { EventStylingSection } from "@/components/sections/EventStylingSection";
import { GrabGoBouquetsSection } from "@/components/sections/GrabGoBouquetSection";
import { GrabGoPartyReadySection } from "@/components/sections/GrabGoPartyReadySection";
import { HeroSection } from "@/components/sections/HeroSection";
import { InspirationSection } from "@/components/sections/InspirationSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { SectionDivider } from "@/components/ux/SectionDivider";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JOVIRA | Event Styling & Balloon Installation · Fredericton, NB",
  description:
    "Custom balloon décor, event styling, and grab-and-go packages for birthdays and celebrations in Fredericton, Oromocto, New Maryland, and Hanwell, NB.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "JOVIRA | Event Styling & Balloon Installation · Fredericton, NB",
    description:
      "Custom balloon décor, event styling, and grab-and-go packages for birthdays and celebrations in Fredericton, Oromocto, New Maryland, and Hanwell, NB.",
    url: "https://www.jovira.ca/",
    siteName: "JOVIRA",
    type: "website",
  },
};

export default function Home() {
  return (
    <div className="w-full">
      <HeroSection />
      <ServicesSection />

      <SectionDivider variant="drape" from="bg-muted" to="bg-background" flip />
      <EventStylingSection />

      <SectionDivider variant="drape" from="bg-background" to="bg-muted" />
      <BalloonInstallationSection />

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
