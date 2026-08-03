import { FaqAccordion } from "@/components/policies/PolicyBlocks";
import { PolicyPageShell } from "@/components/policies/PolicyPageShell";
import { faqItems } from "@/data/site-policies";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQs | JOVIRA",
  description:
    "Frequently asked questions about JOVIRA event styling, balloon decor, and Grab 'n Go packages in Canada.",
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
