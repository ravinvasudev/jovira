export type FaqItem = {
  question: string;
  answer: string;
};

export type PolicyBlock = {
  title: string;
  content: string;
  points: string[];
  subContent: string;
};

export const faqItems: FaqItem[] = [
  {
    question: "What services does JOVIRA offer?",
    answer:
      "JOVIRA specializes in premium balloon installation and event décor, including custom balloon installations, Grab 'n Go balloon creations, backdrops, marquee displays, and complete celebration styling for birthdays, baby showers, graduations, corporate events, and more.",
  },
  {
    question:
      "What is the difference between Event Styling and Grab 'n Go Collections?",
    answer:
      "Event Styling includes a personalized design experience with professional setup and installation at your venue. Grab 'n Go Collections are professionally prepared balloon arrangements available for pickup or delivery, offering a convenient way to celebrate.",
  },
  {
    question: "Do you provide event venues?",
    answer:
      "At this time, JOVIRA specializes in creating beautifully styled celebrations at your chosen venue through premium balloon artistry, custom décor design, and professional installation.",
  },
  //As we continue to grow, venue-related services may be introduced in the future.
  {
    question: "Do you provide tables, chairs, or linens?",
    answer:
      "No. Our services focus on balloon installation and decorative elements. Venue furniture, linens, catering equipment, and related rentals are not included unless specifically stated in your quotation.",
  },
  {
    question: "Does JOVIRA offer wedding décor?",
    answer:
      "No. JOVIRA currently specializes in balloon installation and décor for birthdays, baby showers, graduations, corporate events, and other milestone celebrations. Wedding décor services are not offered at this time.",
  },
  {
    question: "Do you provide helium balloons?",
    answer:
      "Helium balloon services are not currently available through JOVIRA. We specialize in premium air-filled balloon artistry, creating elegant organic garlands, custom installations, and statement balloon displays. As our services continue to grow, additional offerings may be introduced in the future.",
  },
  {
    question: "Can I customize my design?",
    answer:
      "Absolutely. Every JOVIRA creation can be personalized to complement your celebration theme, colour palette, venue, and style. Custom designs are quoted based on your specific requirements.",
  },
  {
    question: "How do I choose the right package?",
    answer:
      "Every celebration is unique. Share your event details through our inquiry form, and we'll recommend the package that best suits your vision, venue, style, and budget.",
  },
  {
    question: "How does JOVIRA's pricing work?",
    answer:
      "JOVIRA offers both fixed-price Signature Inspiration Designs and fully customized celebrations. Inspiration setups featured in our gallery may be booked at their advertised price when the same design, and inclusions are selected without modifications. Custom creations begin at the listed starting price, with the final investment tailored to your design preferences, venue requirements, travel, and overall event scope.",
  },
  {
    question: "How do I secure my booking?",
    answer:
      "Your event date is reserved once the required retainer payment has been received, all booking details have been completed, and written confirmation has been provided by JOVIRA.",
  },
  {
    question: "How far in advance should I book?",
    answer:
      "We recommend booking as early as possible, particularly for weekends, holidays, and peak celebration seasons. Availability is limited and bookings are confirmed on a first-confirmed, first-served basis.",
  },
  {
    question: "Can I book at the last minute?",
    answer:
      "Last-minute bookings may be accommodated depending on availability. Full payment is required to confirm bookings made on short notice.",
  },
  {
    question: "Do you provide delivery, setup, and pickup?",
    answer:
      "Yes. Professional delivery, setup, takedown and pickup are available for eligible services. Availability and applicable fees depend on your selected package, event location, and project requirements.",
  },
  {
    question: "How long does setup take?",
    answer:
      "Setup time depends on the size and complexity of your selected décor. To ensure a seamless experience, we recommend allowing a minimum of one hour for professional setup when booking your venue. Larger or more intricate installations may require additional time, and your confirmed setup schedule will be provided before your event.",
  },
  {
    question: "What is a Grab 'n Go balloon arrangement?",
    answer:
      "Grab 'n Go arrangements are professionally designed balloon creations prepared in advance for convenient pickup or delivery. They are ideal for clients who want beautiful balloon décor without on-site installation.",
  },
  {
    question: "Will my Grab 'n Go order fit in my vehicle?",
    answer:
      "Some JOVIRA Grab 'n Go creations can measure up to 7 ft in size. For safe transportation, we recommend using an SUV with all rear seats folded down. Prior to pickup, we'll confirm the most suitable vehicle based on your selected design to help ensure your balloon arrangement arrives in perfect condition.",
  },
  {
    question: "How long do air-filled balloons last?",
    answer:
      "Indoor air-filled balloons typically last several days or longer when kept in a cool, dry environment away from direct sunlight, heat, and sharp objects. Actual longevity may vary depending on environmental conditions.",
  },
  {
    question: "Can balloon colours be customized?",
    answer:
      "Yes. We offer a carefully selected range of premium balloon colours and can match most celebration themes and colour palettes.",
  },
  {
    question: "Can balloon installations be moved after setup?",
    answer:
      "For the best appearance and structural integrity, balloon installations should remain in their installed location. Moving them after setup may affect their stability or overall design.",
  },
  {
    question: "Can I reschedule or cancel my booking?",
    answer:
      "Reschedule and cancellation requests are handled in accordance with our Booking Agreement and Refund Policy. Please contact us as soon as possible if your event plans change.",
  },
  {
    question: "Do you offer refunds?",
    answer:
      "Refund eligibility depends on the stage of your booking and preparation. Please refer to our Refund Policy for complete details.",
  },
  {
    question: "What happens if my event is affected by severe weather?",
    answer:
      "If severe weather impacts your event, we'll work with you to explore available rescheduling options in accordance with our Booking Agreement and subject to availability.",
  },
];

export const termsOfServiceBlocks: PolicyBlock[] = [
  {
    title: "1. Service Scope",
    content:
      "JOVIRA creates thoughtfully designed balloon artistry and contemporary event styling experiences that transform meaningful occasions into beautifully curated celebrations.",
    points: [
      "Premium Event Styling",
      "Custom Balloon Installations",
      "Designer Grab ’n Go Collections",
      "Balloon Garlands & Statement Displays",
      "Marquee Displays",
      "Custom Décor Solutions",
    ],
    subContent:
      "Our services are designed for birthdays, milestone celebrations, corporate occasions, seasonal events, and other memorable gatherings. Every JOVIRA creation is carefully crafted to reflect your vision, celebration style, venue, and personal preferences.",
  },
  {
    title: "2. Design Flexibility & Creative Interpretation",
    content:
      "Every JOVIRA creation is handcrafted with careful attention to detail. While we strive to bring your vision to life, each installation is uniquely created for your celebration.",
    subContent: "",
    points: [
      "Inspiration images are welcomed as creative guidance and may be interpreted based on venue conditions, available materials, and design requirements.",
      "Minor variations in colours, arrangement, and decorative elements may occur due to the handcrafted nature of our work.",
      "Creative adjustments may be made to ensure the highest-quality result while maintaining the overall approved design aesthetic.",
    ],
  },
  {
    title: "3. Consultations, Quotes & Booking Confirmation",
    content:
      "Every JOVIRA celebration begins with understanding your vision and creating a tailored experience that meets your event needs.",
    subContent: "",
    points: [
      "Website packages and pricing are provided as guidance and represent starting investments in Canadian Dollars (CAD).",
      "Final quotations may vary based on design complexity, event timing, travel requirements, requested enhancements, and custom elements.",
      "A booking is officially confirmed only once required details, applicable payments, and written confirmation have been completed by both the client and JOVIRA.",
    ],
  },
  {
    title: "4. Service Availability",
    content:
      "JOVIRA services are offered based on availability and event scheduling capacity.",
    subContent: "",
    points: [
      "Submitting an inquiry or receiving a quotation does not reserve your event date.",
      "Event dates are secured only after booking requirements and confirmation have been completed.",
    ],
  },
  {
    title: "5. Client Responsibilities",
    content:
      "To ensure a seamless celebration experience, clients are responsible for providing accurate information and suitable event conditions.",
    subContent: "",
    points: [
      "Clients must provide accurate event details, appropriate venue access, and any required permissions for setup and removal.",
      "Clients are responsible for providing confirmed timelines, venue instructions, and reliable contact information for event coordination.",
      "Venue rules, restrictions, or requirements that affect installation, removal, or décor placement must be communicated to JOVIRA in advance.",
    ],
  },
  {
    title: "6. Venue Access & Setup Requirements",
    content:
      "A smooth installation experience depends on proper venue preparation and access.",
    subContent: "",
    points: [
      "Clients are responsible for ensuring the setup area is ready, accessible, and free from obstacles at the agreed installation time.",
      "Any venue restrictions, access limitations, or setup requirements must be communicated to JOVIRA before the event date.",
      "Delays caused by unavailable access, venue restrictions, or incomplete information may affect setup timelines and additional charges may apply.",
    ],
  },
  {
    title: "7. Rental Items & Décor Care",
    content:
      "JOVIRA rental items are provided with care and should be handled responsibly throughout the rental period.",
    subContent: "",
    points: [
      "Clients are responsible for the safe handling and return of rental items in their original condition.",
      "Damage, loss, or missing items may result in additional charges or deduction from the applicable security deposit.",
      "Rental items must be returned within the agreed timeframe.",
    ],
  },
  {
    title: "8. Changes & Cancellations",
    content:
      "We understand that celebration details may evolve. JOVIRA will make every effort to accommodate requests whenever possible.",
    subContent: "",
    points: [
      "Changes to event dates, services, designs, or scope are subject to availability and may require updated pricing or revised timelines.",
      "Late changes may impact material availability, design execution, and service logistics.",
      "Cancellation requests and refund eligibility are handled according to JOVIRA’s Refund Policy.",
    ],
  },
  {
    title: "9. Creative Content & Portfolio Use",
    content:
      "JOVIRA takes pride in showcasing the creativity and craftsmanship behind each celebration we create.",
    subContent: "",
    points: [
      "Website images, package examples, and inspiration references represent creative direction and may vary from the final installation based on customization and event requirements.",
      "Clients should refer to their confirmed quotation for final inclusions, services, and design details.",
      "JOVIRA may photograph completed installations for portfolio, website, and social media purposes unless otherwise requested in writing before the event.",
    ],
  },
  {
    title: "10. Related Policies",
    content:
      "These Terms of Service should be reviewed together with JOVIRA’s Privacy Policy, Refund Policy, Booking Agreement, and Balloon Care Guide.",
    subContent: "",
    points: [
      "Together, these documents provide the complete understanding of the services, responsibilities, and expectations associated with your JOVIRA experience.",
    ],
  },
];

export const privacyPolicyBlocks: PolicyBlock[] = [
  {
    title: "1. Information We Collect",
    content:
      "At JOVIRA, we collect only the information needed to provide a personalized and seamless experience from your initial inquiry through your celebration.",
    subContent: "",
    points: [
      "Information may include your name, email address, phone number, event details, preferences, and any additional notes you choose to share.",
      "Referral information, promotional codes, or voucher details may also be collected when relevant to your request.",
    ],
  },
  {
    title: "2. How We Use Your Information",
    content:
      "Your information helps us understand your vision, provide thoughtful recommendations, and deliver a smooth and personalized JOVIRA experience.",
    subContent: "",
    points: [
      "We use your information to respond to inquiries, provide design guidance, prepare quotations, manage bookings, and deliver requested services.",
      "Your information is used only for purposes connected to your relationship with JOVIRA and is never used for unrelated activities.",
    ],
  },
  {
    title: "3. Information Sharing",
    content:
      "Your privacy and trust are important to us. JOVIRA handles your information with care and discretion.",
    subContent: "",
    points: [
      "We do not sell, rent, or trade your personal information.",
      "Information may only be shared with trusted service providers when necessary to support operations, process requests, or deliver your requested services.",
    ],
  },
  {
    title: "4. Data Retention",
    content:
      "JOVIRA retains information responsibly to support service delivery, communication, and appropriate business records.",
    subContent: "",
    points: [
      "Inquiry and booking information is retained only for as long as reasonably required for operational purposes and recordkeeping.",
      "If you would like your information reviewed, updated, or removed, please contact JOVIRA and we will assist where applicable.",
    ],
  },
  {
    title: "5. Your Choices & Consent",
    content:
      "We respect your choices and remain committed to transparency in how your information is collected and used.",
    subContent: "",
    points: [
      "You may request updates or corrections to the personal information you have provided.",
      "By submitting an inquiry, booking request, or using this website, you consent to the collection and use of information necessary to provide JOVIRA services.",
    ],
  },
  {
    title: "6. Privacy Questions",
    content:
      "If you have questions about how JOVIRA manages your information, we welcome you to contact us. We are committed to protecting your privacy and maintaining your trust.",
    subContent: "",
    points: [],
  },
];

export const refundPolicyBlocks: PolicyBlock[] = [
  {
    title: "1. Refund Policy Overview",
    content:
      "At JOVIRA, every celebration is thoughtfully planned and prepared with dedicated time, creativity, and attention to detail. Due to the customized nature of our services, refund eligibility is determined based on the stage of preparation, production, and scheduling completed.",
    subContent: "",
    points: [
      "Booking retainers are non-refundable as they secure your event date and begin the planning process.",
      "Confirmed bookings, customized designs, and prepared items may be partially refundable or non-refundable depending on the work completed and resources committed.",
      "Each request is reviewed individually with fairness, transparency, and consideration of the circumstances involved.",
    ],
  },
  {
    title: "2. Custom & Bespoke Designs",
    content:
      "Every JOVIRA creation is thoughtfully designed and handcrafted to bring your celebration vision to life. Custom details require dedicated planning, preparation, and specially selected materials.",
    subContent: "",
    points: [
      "Due to the personalized nature of custom designs, bespoke elements and themed décor cannot be cancelled or refunded once production has begun.",
      "Seasonal, specialty, and date-specific materials may be prepared exclusively for your celebration and may not be reusable, which can affect refund eligibility.",
    ],
  },
  {
    title: "3. Grab ’n Go Collections",
    content:
      "JOVIRA’s Grab ’n Go Collections are thoughtfully prepared in advance for your selected celebration date, offering the convenience of a beautifully styled arrangement ready to enjoy.",
    subContent: "",
    points: [
      "Due to their customized and time-sensitive preparation, Grab ’n Go Collections cannot be cancelled or refunded once preparation has begun.",
      "If requested in advance, rescheduling options may be considered based on availability and at JOVIRA’s sole discretion.",
    ],
  },
  {
    title: "4. Unforeseen Circumstances",
    content:
      "At JOVIRA, we are committed to delivering every celebration with care and professionalism. In rare situations where circumstances affect our ability to provide confirmed services, we will communicate promptly and work toward the best possible resolution.",
    subContent: "",
    points: [
      "If JOVIRA is unable to complete the confirmed service due to circumstances within our control, we will provide an appropriate resolution, which may include rescheduling, service credit, or a refund adjustment based on the portion of service affected.",
      "Situations beyond our control, including severe weather, venue restrictions, or unexpected circumstances, will be reviewed individually with a focus on fair and reasonable solutions.",
    ],
  },
  {
    title: "5. Refund Requests & Support",
    content:
      "If you require assistance with a cancellation or refund request, our team is happy to review your inquiry with care and transparency.",
    subContent: "",
    points: [
      "Please contact JOVIRA as soon as possible with your booking details and reason for the request.",
      "All refund requests are reviewed according to this Refund Policy and the stage of preparation completed.",
      "Approved refunds will be processed to the original payment method where applicable.",
      "Our team will provide a response after carefully reviewing your request.",
    ],
  },
];
