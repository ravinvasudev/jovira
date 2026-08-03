import { PolicyList } from "@/components/policies/PolicyBlocks";
import { PolicyPageShell } from "@/components/policies/PolicyPageShell";
import { termsOfServiceBlocks } from "@/data/site-policies";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | JOVIRA",
  description:
    "Read JOVIRA's Terms of Service for event styling and decoration services in Canada.",
};

export default function TermsPage() {
  return (
    <PolicyPageShell
      title="Terms of Service"
      description="These terms apply to consultations, package inquiries, and confirmed JOVIRA styling services."
    >
      <PolicyList blocks={termsOfServiceBlocks} />
    </PolicyPageShell>
  );
}
