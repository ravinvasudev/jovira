"use client";

import dynamic from "next/dynamic";

import { PackageTierCard } from "@/components/packages/PackageTierCard";
import type { PackageTierDialogProps } from "@/components/packages/PackageTierModal";
import type { PackageTier } from "@/types/package-tier";

type GrabGoBouquetCardProps = {
  tier: PackageTier;
  index: number;
};

const GrabGoBouquetModal = dynamic<PackageTierDialogProps>(
  () =>
    import("@/components/grabgobouquets/GrabGoBouquetModal").then(
      (module) => module.GrabGoBouquetModal,
    ),
  {
    loading: () => null,
  },
);

export function GrabGoBouquetCard({ tier, index }: GrabGoBouquetCardProps) {
  return (
    <PackageTierCard
      tier={tier}
      index={index}
      ModalComponent={GrabGoBouquetModal}
    />
  );
}
