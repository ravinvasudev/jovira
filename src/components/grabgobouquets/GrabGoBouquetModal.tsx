"use client";

import {
  PackageTierModal,
  type PackageTierDialogProps,
} from "@/components/packages/PackageTierModal";
import { stylingGoodToKnowNotes } from "@/data/grab-go-notes";

type GrabGoBouquetModalProps = PackageTierDialogProps;

export function GrabGoBouquetModal({
  tier,
  open,
  onClose,
}: GrabGoBouquetModalProps) {
  return (
    <PackageTierModal
      tier={tier}
      open={open}
      onClose={onClose}
      flow="grabAndGo"
      source={`grab-and-go-bouquet-${tier.id}-book-now`}
      notes={stylingGoodToKnowNotes}
      ctaLabel={`Book ${tier.name} Now!`}
      ctaSpacingClassName="mt-6"
    />
  );
}
