import { PolicyList } from "@/components/policies/PolicyBlocks";
import { PolicyPageShell } from "@/components/policies/PolicyPageShell";
import { companyMetadata } from "@/data/company";
import { refundPolicyBlocks } from "@/data/site-policies";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: companyMetadata.pages.refundPolicy.title,
  description: companyMetadata.pages.refundPolicy.description,
};

export default function RefundPolicyPage() {
  return (
    <PolicyPageShell
      title="Refund Policy"
      description="Refund outcomes depend on timing, custom preparation, and confirmed service scope."
    >
      <PolicyList blocks={refundPolicyBlocks} />
    </PolicyPageShell>
  );
}
