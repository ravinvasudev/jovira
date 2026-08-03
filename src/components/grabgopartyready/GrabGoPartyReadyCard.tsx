"use client";

import dynamic from "next/dynamic";

import { PackageTierCard } from "@/components/packages/PackageTierCard";
import type { PackageTierDialogProps } from "@/components/packages/PackageTierModal";
import type { PackageTier } from "@/types/package-tier";

type GrabGoPartyReadyCardProps = {
  tier: PackageTier;
  index: number;
};

const GrabGoPartyReadyModal = dynamic<PackageTierDialogProps>(
  () =>
    import("@/components/grabgopartyready/GrabGoPartyReadyModal").then(
      (module) => module.GrabGoPartyReadyModal,
    ),
  {
    loading: () => null,
  },
);

export function GrabGoPartyReadyCard({
  tier,
  index,
}: GrabGoPartyReadyCardProps) {
  return (
    <PackageTierCard
      tier={tier}
      index={index}
      ModalComponent={GrabGoPartyReadyModal}
    />
  );
}
