"use client";

import {
    PackageTierModal,
    type PackageTierDialogProps,
} from "@/components/packages/PackageTierModal";
import { stylingGoodToKnowNotes } from "@/data/styling-installation-notes";

type BalloonInstallationModalProps = PackageTierDialogProps;

export function BalloonInstallationModal({
  tier,
  open,
  onClose,
}: BalloonInstallationModalProps) {
  return (
    <PackageTierModal
      tier={tier}
      open={open}
      onClose={onClose}
      flow="balloonInstallation"
      source={`balloon-installation-${tier.id}-reserve`}
      notes={stylingGoodToKnowNotes}
      ctaLabel={`Reserve ${tier.name} Package`}
      ctaSpacingClassName="mt-8"
    />
  );
}
