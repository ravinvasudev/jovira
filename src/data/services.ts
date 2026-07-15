import type { Service } from "@/types/service";

export const services: Service[] = [
  {
    id: "consultation-planning",
    title: "Consultation & Theme Planning",
    summary:
      "A guided planning session where we shape your event concept, colour story, and décor priorities around your venue.",
    deliverables: [
      "Style consultation tailored to your celebration goals",
      "Theme and colour direction with décor recommendations",
      "Setup flow guidance to keep event-day stress low",
    ],
    idealFor:
      "Families and hosts who want a clear plan before booking décor details.",
  },
  {
    id: "balloon-backdrop-styling",
    title: "Balloon & Backdrop Styling",
    summary:
      "Signature balloon arrangements and backdrop installations designed to transform your customer-provided venue beautifully.",
    deliverables: [
      "Custom balloon styling concept",
      "Backdrop and focal-point arrangement",
      "On-site styling and finishing touches",
    ],
    idealFor:
      "Birthdays, graduations, and milestone moments that deserve a striking visual centrepiece.",
  },
  {
    id: "seasonal-event-decor",
    title: "Seasonal Celebration Styling",
    summary:
      "Holiday and occasion-based décor concepts crafted for Canadian celebrations throughout the year.",
    deliverables: [
      "Seasonal mood and décor board",
      "Cohesive styling for key photo areas",
      "Elegant details that match your space and guest experience",
    ],
    idealFor:
      "Valentine’s Day, Mother’s Day, Father’s Day, Christmas, and other themed celebrations.",
  },
];
