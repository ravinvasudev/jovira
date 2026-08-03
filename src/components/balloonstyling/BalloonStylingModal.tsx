"use client";

import {
  PackageTierModal,
  type PackageTierDialogProps,
} from "@/components/packages/PackageTierModal";
import { stylingGoodToKnowNotes } from "@/data/styling-installation-notes";

type BalloonStylingModalProps = PackageTierDialogProps;

export function BalloonStylingModal({
  tier,
  open,
  onClose,
}: BalloonStylingModalProps) {
  return (
    <PackageTierModal
      tier={tier}
      open={open}
      onClose={onClose}
      flow="balloonStyling"
      source={`balloon-styling-${tier.id}-reserve`}
      notes={stylingGoodToKnowNotes}
      ctaLabel={`Reserve ${tier.name} Package`}
      ctaSpacingClassName="mt-8"
    />
  );
}
