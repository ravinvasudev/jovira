import type { Service } from "@/types/service";

export const services: Service[] = [
  {
    id: "consultation-planning",
    title: "Event Styling",
    tagline: "Concept to lasting impression.",
    summary:
      "A guided full-service event planning designed to take the stress out of your celebration, where we shape your event concept.",
    deliverables: [
      "Style consultation tailored to your celebration goals",
      "Theme and colour direction with décor recommendations",
      "Setup flow guidance to keep event-day stress low",
    ],
    idealFor:
      "Families and hosts who want a clear plan before booking décor details.",
    image: "/services/event-styling.jpg",
    imageAlt:
      "Jovira consultation mood board with colour swatches and theme planning notes",
    navLink: "#event-styling",
  },
  {
    id: "balloon-backdrop-styling",
    title: "Balloon Installation",
    tagline: "Design with love, Styled to impress.",
    summary:
      "Eye-catching balloon installations designed to transform your space beautifully. It's a perfect photo moment for your celebration, and a fun way to wow your guests.",
    deliverables: [
      "Custom balloon installation concept",
      "Backdrop and focal-point arrangement",
      "On-site styling and finishing touches",
    ],
    idealFor:
      "Birthdays, graduations, and milestone moments that deserve a striking visual centrepiece.",
    image: "/services/balloon-styling.jpeg",
    imageAlt:
      "Jovira balloon arch in blush, sky blue, and sunshine tones framing a draped celebration backdrop",
    navLink: "#balloon-styling",
  },
  {
    id: "seasonal-event-decor",
    title: "Grab 'n Go",
    tagline: "Grab the magic, share the joy.",
    summary:
      "Keeping it lowkey? Pickup a pre-inflated setup from our studio. It’s a simple way to add an elevated touch to your celebration, and it’s ready to go when you are.",
    deliverables: [
      "Seasonal mood and décor board",
      "Cohesive styling for key photo areas",
      "Elegant details that match your space and guest experience",
    ],
    idealFor:
      "Valentine’s Day, Mother’s Day, Father’s Day, Christmas, and other themed celebrations.",
    image: "/services/grab-n-go.jpeg",
    imageAlt:
      "Seasonal Jovira décor with a festive wreath, warm gold stars, and holiday accents",
    navLink: "#grab-go-partyready",
  },
];
