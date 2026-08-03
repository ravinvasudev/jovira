"use client";

import dynamic from "next/dynamic";

import { PackageTierCard } from "@/components/packages/PackageTierCard";
import type { PackageTierDialogProps } from "@/components/packages/PackageTierModal";
import type { PackageTier } from "@/types/package-tier";

type PackageCardProps = {
  tier: PackageTier;
  index: number;
};

const EventStylingModal = dynamic<PackageTierDialogProps>(
  () =>
    import("@/components/eventstyling/EventStylingModal").then(
      (module) => module.EventStylingModal,
    ),
  {
    loading: () => null,
  },
);

export function PackageCard({ tier, index }: PackageCardProps) {
  return (
    <PackageTierCard
      tier={tier}
      index={index}
      ModalComponent={EventStylingModal}
    />
  );
}
