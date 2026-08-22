import { PolicyList } from "@/components/policies/PolicyBlocks";
import { PolicyPageShell } from "@/components/policies/PolicyPageShell";
import { companyMetadata } from "@/data/company";
import { privacyPolicyBlocks } from "@/data/site-policies";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: companyMetadata.pages.privacyPolicy.title,
  description: companyMetadata.pages.privacyPolicy.description,
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
