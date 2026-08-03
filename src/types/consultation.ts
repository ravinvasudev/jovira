export const journeyTypes = [
  "consultation",
  "eventStyling",
  "balloonStyling",
  "grabAndGo",
  "offer",
] as const;

export type JourneyType = (typeof journeyTypes)[number];

export function isJourneyType(value: string): value is JourneyType {
  return journeyTypes.includes(value as JourneyType);
}

export const journeyLabels: Record<JourneyType, string> = {
  consultation: "Free Consultation",
  eventStyling: "Event Styling Package",
  balloonStyling: "Balloon Installation Package",
  grabAndGo: "Grab 'n Go Package",
  offer: "Special Offer",
};
