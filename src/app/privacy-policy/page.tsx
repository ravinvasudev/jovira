import { PolicyList } from "@/components/policies/PolicyBlocks";
import { PolicyPageShell } from "@/components/policies/PolicyPageShell";
import { privacyPolicyBlocks } from "@/data/site-policies";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | JOVIRA",
  description:
    "Read how JOVIRA collects, uses, and protects personal information submitted through our website.",
};

export default function PrivacyPolicyPage() {
  return (
    <PolicyPageShell
      title="Privacy Policy"
      description="We only use submitted information to respond to your request and coordinate services."
    >
      <PolicyList blocks={privacyPolicyBlocks} />
    </PolicyPageShell>
  );
}
