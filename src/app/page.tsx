import { BalloonInstallationSection } from "@/components/sections/BalloonInstallationSection";
import { ConsultationSection } from "@/components/sections/ConsultationSection";
import { EventStylingSection } from "@/components/sections/EventStylingSection";
import { GrabGoBouquetsSection } from "@/components/sections/GrabGoBouquetSection";
import { GrabGoPartyReadySection } from "@/components/sections/GrabGoPartyReadySection";
import { HeroSection } from "@/components/sections/HeroSection";
import { InspirationSection } from "@/components/sections/InspirationSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { SectionDivider } from "@/components/ux/SectionDivider";
import { company, companyMetadata } from "@/data/company";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: companyMetadata.pages.home.title,
  description: companyMetadata.pages.home.description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: companyMetadata.openGraph.home.title,
    description: companyMetadata.openGraph.home.description,
    url: `${company.siteUrl}/`,
    siteName: company.name,
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
