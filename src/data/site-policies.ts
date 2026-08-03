export type FaqItem = {
  question: string;
  answer: string;
};

export type PolicyBlock = {
  title: string;
  points: string[];
};

export const faqItems: FaqItem[] = [
  {
    question: "What does JOVIRA provide?",
    answer:
      "JOVIRA provides consultation-led event styling and decoration, including Event Styling, Balloon Installation, and Grab 'n Go package options tailored to your celebration.",
  },
  {
    question: "Does JOVIRA provide venues?",
    answer:
      "No. Customers provide the venue, and JOVIRA transforms that space with styling, décor design, setup support, and finishing details.",
  },
  {
    question: "What events do you style?",
    answer:
      "We style birthdays, graduations, personal milestones, and seasonal celebrations such as Valentine’s Day, Mother’s Day, Father’s Day, and Christmas.",
  },
  {
    question: "What is the difference between full styling and Grab 'n Go?",
    answer:
      "Event Styling and Balloon Installation include larger on-site design and installation support. Grab 'n Go packages are prepared in advance for pickup or delivery and are ideal for low-stress, ready-to-use celebration moments.",
  },
  {
    question: "How do I choose the right package?",
    answer:
      "Start with the free consultation form. We guide you based on your event type, theme, space, and budget, then recommend the best-fit package.",
  },
  {
    question: "Are package prices fixed?",
    answer:
      "Displayed package prices are starting prices in CAD and may vary based on customisation, logistics, and add-ons requested for your event.",
  },
  {
    question: "Do you offer delivery for Grab 'n Go orders?",
    answer:
      "Yes. Grab 'n Go orders can be arranged for pickup or delivery based on availability, timing, and location details shared during booking.",
  },
  {
    question: "How can I contact JOVIRA after submitting a request?",
    answer:
      "You can reach us through our social channels while we review your submission. We use your submitted details only to respond to your request and coordinate service.",
  },
];

export const termsOfServiceBlocks: PolicyBlock[] = [
  {
    title: "1. Service scope",
    points: [
      "JOVIRA provides event styling and decoration services for customer-provided venues, including consultation, concept planning, and décor setup support.",
      "Venue rental services are not included.",
      "Service availability may vary by event date, scope, and location.",
    ],
  },
  {
    title: "2. Quotes, packages, and booking",
    points: [
      "Package listings and website pricing are informational and represent starting rates in CAD.",
      "Final quotes may change based on theme complexity, timing, travel, requested inclusions, and custom requirements.",
      "A booking is confirmed only after explicit acceptance from both customer and JOVIRA under the agreed terms.",
    ],
  },
  {
    title: "3. Customer responsibilities",
    points: [
      "Customers are responsible for accurate event details, safe venue access, and required permissions for setup and takedown.",
      "Customers must provide clear timing windows and contact information for day-of coordination.",
      "Customers are responsible for any venue rules that affect installation, removal, or use of décor elements.",
    ],
  },
  {
    title: "4. Changes and cancellations",
    points: [
      "Date or scope change requests are handled based on availability and may require revised pricing.",
      "Late changes can affect material availability, design execution, or logistics timelines.",
      "Cancellation and refund handling follows the Refund Policy below.",
    ],
  },
  {
    title: "5. Media and website content",
    points: [
      "Website images, package examples, and inspiration references illustrate style direction and may not represent exact deliverables for every booking.",
      "Customers should review final inclusions in their confirmed quote.",
    ],
  },
];

export const privacyPolicyBlocks: PolicyBlock[] = [
  {
    title: "1. Information we collect",
    points: [
      "When you submit a consultation or booking request, we collect details such as your name, email, phone number, event information, and notes you choose to provide.",
      "We may also collect referral and voucher details when relevant to your request.",
    ],
  },
  {
    title: "2. How we use your information",
    points: [
      "We use your information to respond to inquiries, provide package guidance, prepare quotes, coordinate bookings, and deliver requested services.",
      "We do not use your information for unrelated purposes.",
    ],
  },
  {
    title: "3. Information sharing",
    points: [
      "We do not sell your personal information.",
      "Information is shared only when needed for operations (for example, service coordination tools) and only to support your request.",
    ],
  },
  {
    title: "4. Data retention",
    points: [
      "We retain request and booking information only as long as needed for service delivery, follow-up, and reasonable business recordkeeping.",
      "If you want your request data removed, contact us and we will process your request where feasible.",
    ],
  },
  {
    title: "5. Your choices",
    points: [
      "You may request updates or corrections to your submitted information.",
      "By using this website and submitting forms, you consent to this policy and to communication needed to fulfil your request.",
    ],
  },
];

export const refundPolicyBlocks: PolicyBlock[] = [
  {
    title: "1. Policy overview",
    points: [
      "Because event styling and custom décor involve time-sensitive planning and tailored preparation, refunds are evaluated based on how far production and scheduling have progressed.",
      "Confirmed bookings and prepared items may be partially refundable or non-refundable depending on work already completed.",
    ],
  },
  {
    title: "2. Custom and themed work",
    points: [
      "Custom design, personalised elements, and themed preparation are generally non-refundable once production has started.",
      "Seasonal and date-sensitive materials may not be reusable and can reduce refund eligibility.",
    ],
  },
  {
    title: "3. Grab 'n Go orders",
    points: [
      "Grab 'n Go pickup or delivery orders are prepared for specific dates and are generally non-refundable once prepared.",
      "If timing allows, rescheduling may be offered at JOVIRA's discretion and based on availability.",
    ],
  },
  {
    title: "4. Service interruptions",
    points: [
      "If JOVIRA cannot deliver confirmed services due to circumstances within our control, we will provide a suitable remedy, which may include rescheduling, service credit, or a partial/full refund based on the undelivered scope.",
      "Force majeure events (for example severe weather or venue restrictions) are handled case-by-case with a focus on fair rescheduling options.",
    ],
  },
  {
    title: "5. Requesting refund support",
    points: [
      "To request a cancellation or refund review, contact JOVIRA as soon as possible with your booking details.",
      "Approved refunds are returned to the original payment method where possible.",
    ],
  },
];
