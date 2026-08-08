export const journeyTypes = [
  "consultation",
  "eventStyling",
  "balloonInstallation",
  "grabAndGo",
  "offer",
] as const;

export type JourneyType = (typeof journeyTypes)[number];

export function isJourneyType(value: string): value is JourneyType {
  return journeyTypes.includes(value as JourneyType);
}

export const journeyLabels: Record<JourneyType, string> = {
  consultation: "Free Consultation",
  eventStyling: "Event Styling Service",
  balloonInstallation: "Balloon Installation Service",
  grabAndGo: "Grab 'n Go Service",
  offer: "Special Offer",
};
