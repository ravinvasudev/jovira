import { PolicyList } from "@/components/policies/PolicyBlocks";
import { PolicyPageShell } from "@/components/policies/PolicyPageShell";
import { refundPolicyBlocks } from "@/data/site-policies";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Refund Policy | JOVIRA",
  description:
    "Read JOVIRA's refund terms for custom event styling, prepared decor items, and booking changes.",
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
