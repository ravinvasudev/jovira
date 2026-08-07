import { BalloonStylingSection } from "@/components/sections/BalloonStylingSection";
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
  title: "Jovira | Event Styling & Balloon Decoration in Canada",
  description:
    "Explore Jovira services, packages, inspiration, and balloon installation options for celebrations in and around Fredericton, New Brunswick, Canada including Oromocto, New Maryland, Hanwell.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Jovira | Event Styling & Balloon Decoration in Canada",
    description:
      "Explore event styling, packages, and installation options with inspiration from celebrations in and around Fredericton, New Brunswick, Canada including Oromocto, New Maryland, Hanwell.",
    url: "https://www.jovira.ca/",
    type: "website",
    images: [
      {
        url: "/logo.jpeg",
        width: 1200,
        height: 630,
        alt: "Jovira event styling and balloon installation showcase",
      },
    ],
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
