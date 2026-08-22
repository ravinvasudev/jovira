import { company, companyMetadata } from "@/data/company";
import { services } from "@/data/services";
import { aboutUsContent } from "@/data/about-us";
import { eventStylingTiers } from "@/data/event-styling-tiers";
import { balloonInstallationTiers } from "@/data/balloon-installation-tiers";
import { packageTiers as grabGoBouquetTiers } from "@/data/grab-go-bouquets";
import { grabGoPartyReadyTiers } from "@/data/grab-go-partyready";
import { eventTypes, venueTypes } from "@/data/consultation-options";
import { stylingGoodToKnowNotes as eventStylingGoodToKnowNotes } from "@/data/styling-installation-notes";
import { stylingGoodToKnowNotes as grabGoGoodToKnowNotes } from "@/data/grab-go-notes";
import { faqItems } from "@/data/site-policies";
import type { PackageTier } from "@/types/package-tier";

function formatPackageTier(tier: PackageTier): string {
  return [
    `- ${tier.name} (from ${tier.priceFrom}): ${tier.description}`,
    `  Includes: ${tier.includes.join("; ")}`,
    `  Recommended for: ${tier.recommendedFor}`,
  ].join("\n");
}

function formatPackageGroup(title: string, tiers: PackageTier[]): string {
  return [`${title}:`, ...tiers.map(formatPackageTier)].join("\n");
}

// Builds the knowledge block injected into the chatbot's system prompt.
export function buildChatbotContext(): string {
  const sections: string[] = [
    [
      "COMPANY OVERVIEW",
      `${company.name} (${company.siteUrl}) is an event styling and balloon installation studio serving Fredericton, Oromocto, New Maryland, and Hanwell, New Brunswick, Canada.`,
      companyMetadata.site.description,
      "Jovira does not provide event venues, tables, chairs, linens, catering equipment, helium balloons, or wedding décor.",
    ].join("\n"),

    [
      "ABOUT JOVIRA",
      ...aboutUsContent.map((block) => `${block.title}: ${block.content}`),
    ].join("\n"),

    [
      "CORE SERVICES",
      ...services.map(
        (service) =>
          `- ${service.title} — ${service.tagline} ${service.summary} Ideal for: ${service.idealFor}`,
      ),
    ].join("\n"),

    formatPackageGroup("EVENT STYLING PACKAGES", eventStylingTiers),
    formatPackageGroup(
      "BALLOON INSTALLATION PACKAGES",
      balloonInstallationTiers,
    ),
    formatPackageGroup("GRAB 'N GO BOUQUETS", grabGoBouquetTiers),
    formatPackageGroup(
      "GRAB 'N GO PARTY-READY COLLECTIONS",
      grabGoPartyReadyTiers,
    ),

    [
      "BOOKING & CONSULTATION DETAILS",
      `Event types Jovira styles for: ${eventTypes.join(", ")}.`,
      `Venue types Jovira can style: ${venueTypes.join(", ")}.`,
      "Customers provide the venue; Jovira transforms the space with décor — Jovira does not rent out venues.",
      "All packages and pricing are starting prices — final quotes depend on design complexity, venue, and add-ons, confirmed through a consultation.",
    ].join("\n"),

    [
      "GOOD TO KNOW — EVENT STYLING & BALLOON INSTALLATION",
      ...eventStylingGoodToKnowNotes,
    ].join("\n"),

    ["GOOD TO KNOW — GRAB 'N GO", ...grabGoGoodToKnowNotes].join("\n"),

    [
      "FREQUENTLY ASKED QUESTIONS",
      ...faqItems.map((item) => `Q: ${item.question}\nA: ${item.answer}`),
    ].join("\n\n"),
  ];

  return sections.join("\n\n").trim();
}
