"use client";

import {
  PackageTierModal,
  type PackageTierDialogProps,
} from "@/components/packages/PackageTierModal";
import { stylingGoodToKnowNotes } from "@/data/styling-installation-notes";

type EventStylingModalProps = PackageTierDialogProps;

export function EventStylingModal({
  tier,
  open,
  onClose,
}: EventStylingModalProps) {
  return (
    <PackageTierModal
      tier={tier}
      open={open}
      onClose={onClose}
      flow="eventStyling"
      source={`event-styling-${tier.id}-reserve`}
      notes={stylingGoodToKnowNotes}
      ctaLabel={`Reserve ${tier.name} Package`}
      ctaSpacingClassName="mt-8"
    />
  );
}
