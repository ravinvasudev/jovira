export const company = {
  name: "JOVIRA",
  siteUrl: "https://www.jovira.ca",
} as const;

const homeTitle =
  "JOVIRA | Event Styling & Balloon Installation · Fredericton, NB";
const homeDescription =
  "Custom balloon décor, event styling, and grab-and-go packages for birthdays and celebrations in Fredericton, Oromocto, New Maryland, and Hanwell, NB.";

export const companyMetadata = {
  site: {
    title: homeTitle,
    description: homeDescription,
  },
  pages: {
    home: {
      title: homeTitle,
      description: homeDescription,
    },
    about: {
      title: "About Us | JOVIRA",
      description: "Learn more about JOVIRA, our mission, and how we operate.",
    },
    faqs: {
      title: "FAQs | JOVIRA",
      description:
        "Frequently asked questions about JOVIRA event styling, balloon decor, and Grab 'n Go packages in Canada.",
    },
    policies: {
      title: "Policies Hub | JOVIRA",
      description:
        "Browse JOVIRA's policy pages and FAQs for event styling and decoration services in Canada.",
    },
    privacyPolicy: {
      title: "Privacy Policy | JOVIRA",
      description:
        "Read how JOVIRA collects, uses, and protects personal information submitted through our website.",
    },
    refundPolicy: {
      title: "Refund Policy | JOVIRA",
      description:
        "Read JOVIRA's refund terms for custom event styling, prepared decor items, and booking changes.",
    },
    terms: {
      title: "Terms of Service | JOVIRA",
      description:
        "Read JOVIRA's Terms of Service for event styling and decoration services in Canada.",
    },
  },
  openGraph: {
    home: {
      title: homeTitle,
      description: homeDescription,
    },
  },
  manifest: {
    name: "JOVIRA",
    shortName: "JOVIRA",
    description: homeDescription,
  },
  policiesHubLinks: [
    {
      href: "/terms",
      title: "Terms of Service",
      description:
        "Service conditions, booking scope, and customer responsibilities.",
    },
    {
      href: "/privacy-policy",
      title: "Privacy Policy",
      description:
        "How we collect and use information submitted through our forms.",
    },
    {
      href: "/refund-policy",
      title: "Refund Policy",
      description:
        "How cancellations, rescheduling, and refund reviews are handled.",
    },
    {
      href: "/faqs",
      title: "FAQs",
      description: "Answers to common service, package, and booking questions.",
    },
  ],
} as const;