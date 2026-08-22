import { FaqAccordion } from "@/components/policies/PolicyBlocks";
import { PolicyPageShell } from "@/components/policies/PolicyPageShell";
import { companyMetadata } from "@/data/company";
import { faqItems } from "@/data/site-policies";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: companyMetadata.pages.faqs.title,
  description: companyMetadata.pages.faqs.description,
};

export default function FaqsPage() {
  return (
    <PolicyPageShell
      title="Frequently Asked Questions"
      description="Answers to common questions about JOVIRA services, packages, and booking flow."
    >
      <FaqAccordion items={faqItems} />
    </PolicyPageShell>
  );
}
