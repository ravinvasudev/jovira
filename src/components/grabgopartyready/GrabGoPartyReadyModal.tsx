"use client";

import {
  PackageTierModal,
  type PackageTierDialogProps,
} from "@/components/packages/PackageTierModal";
import { stylingGoodToKnowNotes } from "@/data/grab-go-notes";

type GrabGoPartyReadyModalProps = PackageTierDialogProps;

export function GrabGoPartyReadyModal({
  tier,
  open,
  onClose,
}: GrabGoPartyReadyModalProps) {
  return (
    <PackageTierModal
      tier={tier}
      open={open}
      onClose={onClose}
      flow="grabAndGo"
      source={`grab-and-go-party-ready-${tier.id}-book-now`}
      notes={stylingGoodToKnowNotes}
      ctaLabel={`Book ${tier.name} Now!`}
      ctaSpacingClassName="mt-6"
    />
  );
}
