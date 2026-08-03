import { isPackageAllowedForJourney } from "@/data/package-pricing";
import { isJourneyType, type JourneyType } from "@/types/consultation";

export type ConsultationIntent = {
  flow: JourneyType | null;
  packageChoice: string | null;
  lockPackage: boolean;
  source: string | null;
  seasonalOffer: boolean;
  inspirationItemId: string | null;
};

export function buildConsultationHref(intent: {
  flow?: JourneyType;
  packageChoice?: string;
  lockPackage?: boolean;
  source?: string;
  seasonalOffer?: boolean;
}) {
  const params = new URLSearchParams();

  if (intent.flow) {
    params.set("flow", intent.flow);
  }

  if (intent.packageChoice) {
    params.set("package", intent.packageChoice);
  }

  if (intent.lockPackage) {
    params.set("lockPackage", "1");
  }

  if (intent.source) {
    params.set("source", intent.source);
  }

  if (intent.seasonalOffer) {
    params.set("seasonalOffer", "1");
  }

  const query = params.toString();
  if (!query) {
    return "#consultation";
  }

  return `/?${query}#consultation`;
}

export function parseConsultationIntent(
  params: URLSearchParams,
): ConsultationIntent {
  const flowValue = params.get("flow")?.trim() ?? "";
  const flow = isJourneyType(flowValue) ? flowValue : null;
  const source = params.get("source")?.trim() || null;
  const seasonalOffer = params.get("seasonalOffer") === "1";
  const lockPackage = params.get("lockPackage") === "1";
  const inspirationMatch = source?.match(/^inspiration-(.+)-claim-offer$/);
  const inspirationItemId = inspirationMatch ? inspirationMatch[1] : null;

  if (!flow) {
    return {
      flow: null,
      packageChoice: null,
      lockPackage: false,
      source,
      seasonalOffer: false,
      inspirationItemId: null,
    };
  }

  const packageValue = params.get("package")?.trim() ?? "";
  const packageChoice =
    packageValue.length > 0 &&
    ((flow === "offer" && inspirationItemId !== null) ||
      isPackageAllowedForJourney(flow, packageValue))
      ? packageValue
      : null;

  return {
    flow,
    packageChoice,
    lockPackage: lockPackage && packageChoice !== null,
    source,
    seasonalOffer,
    inspirationItemId,
  };
}
