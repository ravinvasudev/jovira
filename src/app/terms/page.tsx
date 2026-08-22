import { PolicyList } from "@/components/policies/PolicyBlocks";
import { PolicyPageShell } from "@/components/policies/PolicyPageShell";
import { companyMetadata } from "@/data/company";
import { termsOfServiceBlocks } from "@/data/site-policies";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: companyMetadata.pages.terms.title,
  description: companyMetadata.pages.terms.description,
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
