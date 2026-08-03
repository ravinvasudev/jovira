"use client";

import { AddressAutocomplete } from "@/components/ux/AddressAutocomplete";
import {
  eventTypes,
  hearAboutOptions,
  venueTypes,
} from "@/data/consultation-options";
import {
  getInspirationItemFromSource,
  getInspirationOfferPricing,
} from "@/data/inspiration-items";
import {
  formatCadCurrency,
  getPackagePricingForJourney,
  getPackagesForJourney,
} from "@/data/package-pricing";
import { parseConsultationIntent } from "@/lib/consultation-intent";
import { journeyLabels, type JourneyType } from "@/types/consultation";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { FaCanadianMapleLeaf } from "react-icons/fa";

type FormData = {
  formType: JourneyType | "";
  fullName: string;
  email: string;
  contactNumber: string;
  eventDate: string;
  eventType: string;
  eventStartTime: string;
  eventEndTime: string;
  venueAddress: string;
  venueType: string;
  eventTheme: string;
  packageChoice: string;
  delivery: "" | "Yes" | "No";
  pickupDate: string;
  pickupTime: string;
  deliveryDate: string;
  deliveryTime: string;
  hearAbout: string;
  referralCode: string;
  giftCardOrVoucher: string;
  additionalNotes: string;
  entrySource: string;
  seasonalOffer: string;
};

type FieldType =
  | "text"
  | "email"
  | "tel"
  | "date"
  | "time"
  | "textarea"
  | "select";

type FieldConfig = {
  key: keyof FormData;
  label: string;
  placeholder?: string;
  type: FieldType;
  required?: boolean;
  options?: readonly string[];
  readOnly?: boolean;
};

type StepConfig = {
  id: string;
  title: string;
  description?: string;
  fields: FieldConfig[];
};

const deliveryOptions = ["No", "Yes"] as const;
const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const contactNumberPattern = /^\(\d{3}\) \d{3}-\d{4}$/;
const minimumEventDurationMinutes = 120;
const minimumEventLeadDays = 7;
const minimumGrabGoLeadBusinessDays = 2;
const millisecondsPerDay = 24 * 60 * 60 * 1000;

const pathChoices: Array<{
  id: JourneyType;
  title: string;
  description: string;
}> = [
  {
    id: "consultation",
    title: "Request Free Consultation",
    description:
      "Best for planning support, ideas, and package guidance before booking.",
  },
  {
    id: "eventStyling",
    title: "Book Event Styling Package",
    description:
      "Best if you’re ready to book full event styling at your venue.",
  },
  {
    id: "balloonStyling",
    title: "Book Balloon Installation Package",
    description:
      "Best if you’re ready to book full balloon installation at your venue.",
  },
  {
    id: "grabAndGo",
    title: "Book Grab 'n Go Package",
    description:
      "Best for quick décor orders with pick-up or delivery preferences.",
  },
  // {
  //   id: "offer",
  //   title: "Claim Special Offer",
  //   description:
  //     "Best if you want to start from a featured offer and see the matching package options.",
  // },
];

const eventLeadFields = (): FieldConfig[] => [
  {
    key: "eventType",
    label: "Event type",
    type: "select",
    required: true,
    options: eventTypes,
  },
];

const eventTimingFields: FieldConfig[] = [
  {
    key: "eventDate",
    label: "Event date",
    type: "date",
    required: true,
  },
  {
    key: "eventStartTime",
    label: "Event start time",
    type: "time",
    required: true,
  },
  {
    key: "eventEndTime",
    label: "Event end time",
    type: "time",
    required: true,
  },
];

const venueFields: FieldConfig[] = [
  {
    key: "venueType",
    label: "Venue type",
    type: "select",
    required: true,
    options: venueTypes,
  },
  {
    key: "venueAddress",
    label: "Venue address",
    placeholder: "Civic number, street, city, province, postal code",
    type: "text",
    required: true,
  },
];

const styleAndPackageFields = (
  formType: JourneyType,
  packageLabel?: string,
): FieldConfig[] => [
  {
    key: "eventTheme",
    label: "Event theme",
    placeholder: "Elegant, playful, luxury, seasonal, or your custom concept",
    type: "text",
    required: true,
  },
  packageLabel
    ? {
        key: "packageChoice",
        label: "Offer package",
        type: "text",
        required: true,
        readOnly: true,
      }
    : {
        key: "packageChoice",
        label: "Package choice",
        type: "select",
        required: true,
        options: getPackagesForJourney(formType),
      },
];

const marketingFields: FieldConfig[] = [
  {
    key: "hearAbout",
    label: "Where did you hear about us?",
    type: "select",
    options: hearAboutOptions,
  },
  {
    key: "referralCode",
    label: "Referral code",
    placeholder: "Enter your referral code if available",
    type: "text",
  },
  {
    key: "giftCardOrVoucher",
    label: "Gift card or voucher code",
    placeholder: "Enter your gift card or voucher code",
    type: "text",
  },
  {
    key: "additionalNotes",
    label: "Additional notes",
    placeholder:
      "Share details that help us style your event beautifully and smoothly.",
    type: "textarea",
  },
];

const additionalNotesField: FieldConfig = {
  key: "additionalNotes",
  label: "Additional notes",
  placeholder:
    "Share details that help us style your event beautifully and smoothly.",
  type: "textarea",
};

const contactFields: FieldConfig[] = [
  {
    key: "fullName",
    label: "Full name",
    placeholder: "Your full name",
    type: "text",
    required: true,
  },
  {
    key: "email",
    label: "Email address",
    placeholder: "you@example.com",
    type: "email",
    required: true,
  },
  {
    key: "contactNumber",
    label: "Contact number",
    placeholder: "(000) 000-0000",
    type: "tel",
    required: true,
  },
];

function createInitialFormData(): FormData {
  return {
    formType: "",
    fullName: "",
    email: "",
    contactNumber: "",
    eventDate: "",
    eventType: "",
    eventStartTime: "",
    eventEndTime: "",
    venueAddress: "",
    venueType: "",
    eventTheme: "",
    packageChoice: "",
    delivery: "",
    pickupDate: "",
    pickupTime: "",
    deliveryDate: "",
    deliveryTime: "",
    hearAbout: "",
    referralCode: "",
    giftCardOrVoucher: "",
    additionalNotes: "",
    entrySource: "",
    seasonalOffer: "",
  };
}

function getStepsForJourney(
  formType: JourneyType,
  formData: FormData,
  inspirationOfferPackageLabel?: string,
): StepConfig[] {
  if (formType === "consultation") {
    return [
      {
        id: "contact",
        title: "How can we reach you?",
        description:
          "Share your best contact details so we can confirm your consultation and next steps.",
        fields: contactFields,
      },
      {
        id: "consultation-notes",
        title: "Tell us about your celebration",
        description:
          "Tell us what you are celebrating and the atmosphere you want to create.",
        fields: [
          {
            ...additionalNotesField,
            placeholder:
              "Theme, vibe, preferences, and any details that matter to you.",
          },
        ],
      },
    ];
  }

  if (formType === "grabAndGo") {
    const deliveryFields: FieldConfig[] = [
      {
        key: "delivery",
        label: "Do you need delivery?",
        type: "select",
        required: true,
        options: deliveryOptions,
      },
    ];

    if (formData.delivery === "Yes") {
      deliveryFields.push(
        {
          key: "venueAddress",
          label: "Delivery address",
          placeholder: "Civic number, street, city, province, postal code",
          type: "text",
          required: true,
        },
        {
          key: "deliveryDate",
          label: "Preferred delivery date",
          type: "date",
          required: true,
        },
        {
          key: "deliveryTime",
          label: "Preferred delivery time",
          type: "time",
          required: true,
        },
      );
    }

    if (formData.delivery === "No") {
      deliveryFields.push(
        {
          key: "pickupDate",
          label: "Pickup date",
          type: "date",
          required: true,
        },
        {
          key: "pickupTime",
          label: "Pickup time",
          type: "time",
          required: true,
        },
      );
    }

    return [
      {
        id: "pickup-delivery",
        title:
          formData.delivery === "Yes"
            ? "Delivery details"
            : formData.delivery === "No"
              ? "Pickup details"
              : "Pickup or delivery",
        description:
          formData.delivery === "Yes"
            ? "Set your preferred delivery date and time for a smooth handoff."
            : formData.delivery === "No"
              ? "Choose your pickup date and time so your order is ready when you arrive."
              : "Choose pickup or delivery first, then we will collect timing details.",
        fields: deliveryFields,
      },
      {
        id: "theme-package",
        title: "Theme and package",
        description:
          "Choose the style and package that best fits your celebration.",
        fields: [...eventLeadFields(), ...styleAndPackageFields(formType)],
      },
      {
        id: "contact",
        title: "How can we reach you?",
        description:
          "Share your contact details so we can confirm your booking and next steps.",
        fields: contactFields,
      },
      {
        id: "marketing",
        title: "How you found us",
        description:
          "Optional details that help us improve your experience and apply any offers.",
        fields: marketingFields,
      },
    ];
  }

  return [
    {
      id: "event-schedule",
      title: "Event schedule",
      description:
        "Your timeline helps us prepare every styling detail with precision.",
      fields: [...eventLeadFields(), ...eventTimingFields],
    },
    {
      id: "venue",
      title: "Venue details",
      description: "Venue details help us coordinate setup logistics smoothly.",
      fields: venueFields,
    },
    {
      id: "theme-package",
      title: "Theme and package",
      description: inspirationOfferPackageLabel
        ? "Your inspiration offer package has been preselected for this request."
        : "Select your style direction and package so we can shape your quote.",
      fields: styleAndPackageFields(formType, inspirationOfferPackageLabel),
    },
    {
      id: "contact",
      title: "How can we reach you?",
      description:
        "Share your contact details so we can confirm availability and next steps.",
      fields: contactFields,
    },
    {
      id: "marketing",
      title: "How you found us",
      description:
        "Optional details on referrals and offers to help us serve you better.",
      fields: marketingFields,
    },
  ];
}

function toMinutes(time: string) {
  const [hours, minutes] = time.split(":").map((value) => Number(value));
  if (
    Number.isNaN(hours) ||
    Number.isNaN(minutes) ||
    hours < 0 ||
    hours > 23 ||
    minutes < 0 ||
    minutes > 59
  ) {
    return null;
  }

  return hours * 60 + minutes;
}

function toUtcTimestamp(dateValue: string) {
  const match = dateValue.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!match) {
    return null;
  }

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const timestamp = Date.UTC(year, month - 1, day);
  const parsed = new Date(timestamp);

  if (
    parsed.getUTCFullYear() !== year ||
    parsed.getUTCMonth() !== month - 1 ||
    parsed.getUTCDate() !== day
  ) {
    return null;
  }

  return timestamp;
}

function getTodayUtcStartTimestamp() {
  const now = new Date();
  return Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
}

function addBusinessDays(date: Date, days: number): Date {
  const result = new Date(date);
  let added = 0;
  while (added < days) {
    result.setDate(result.getDate() + 1);
    const dow = result.getDay();
    if (dow !== 0 && dow !== 6) added++;
  }
  return result;
}

function isValidContactNumber(value: string) {
  return contactNumberPattern.test(value);
}

function formatContactNumber(value: string) {
  const digitsOnly = value.replace(/\D/g, "").slice(0, 10);

  if (digitsOnly.length === 0) {
    return "";
  }

  if (digitsOnly.length < 3) {
    return `(${digitsOnly}`;
  }

  if (digitsOnly.length === 3) {
    return `(${digitsOnly}) `;
  }

  if (digitsOnly.length < 6) {
    return `(${digitsOnly.slice(0, 3)}) ${digitsOnly.slice(3)}`;
  }

  if (digitsOnly.length === 6) {
    return `(${digitsOnly.slice(0, 3)}) ${digitsOnly.slice(3)}-`;
  }

  return `(${digitsOnly.slice(0, 3)}) ${digitsOnly.slice(3, 6)}-${digitsOnly.slice(6)}`;
}

export function ConsultationForm() {
  const searchParams = useSearchParams();
  const parsedIntent = useMemo(
    () => parseConsultationIntent(new URLSearchParams(searchParams.toString())),
    [searchParams],
  );
  const inspirationOffer = useMemo(
    () => getInspirationItemFromSource(parsedIntent.source),
    [parsedIntent.source],
  );
  const [formType, setFormType] = useState<JourneyType | "">("");
  const [stepIndex, setStepIndex] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isIntentFlow, setIsIntentFlow] = useState(false);
  const [packageLocked, setPackageLocked] = useState(false);
  const intentSignatureRef = useRef("");
  const [formData, setFormData] = useState<FormData>(createInitialFormData());

  useEffect(() => {
    const signature = searchParams.toString();

    if (!parsedIntent.flow || signature === intentSignatureRef.current) {
      return;
    }

    const flow = parsedIntent.flow;

    const initialData = createInitialFormData();
    initialData.formType = flow;
    initialData.entrySource = parsedIntent.source ?? "";
    initialData.seasonalOffer = parsedIntent.seasonalOffer ? "1" : "";

    if (inspirationOffer) {
      initialData.packageChoice = inspirationOffer.offer.packageLabel;
    } else if (parsedIntent.packageChoice) {
      initialData.packageChoice = parsedIntent.packageChoice;
    }

    queueMicrotask(() => {
      setFormType(flow);
      setStepIndex(0);
      setSubmitted(false);
      setSubmitError(null);
      setIsIntentFlow(true);
      setPackageLocked(parsedIntent.lockPackage);
      setFormData(initialData);
      intentSignatureRef.current = signature;
    });
  }, [inspirationOffer, parsedIntent, searchParams]);

  const steps = useMemo(() => {
    if (!formType) {
      return [];
    }

    return getStepsForJourney(
      formType,
      formData,
      inspirationOffer?.offer.packageLabel,
    );
  }, [formData, formType, inspirationOffer?.offer.packageLabel]);

  const currentStep = steps[stepIndex];
  const totalSteps = steps.length;
  const progress = formType
    ? ((stepIndex + 1) / Math.max(totalSteps, 1)) * 100
    : 0;

  const pricing = useMemo(() => {
    if (!formType) {
      return null;
    }

    if (formType === "offer" && inspirationOffer) {
      return getInspirationOfferPricing(inspirationOffer);
    }

    if (!formData.packageChoice) {
      return null;
    }

    return getPackagePricingForJourney(formType, formData.packageChoice, {
      seasonalOffer: parsedIntent.seasonalOffer,
    });
  }, [
    formData.packageChoice,
    formType,
    inspirationOffer,
    parsedIntent.seasonalOffer,
  ]);

  const minimumEventDateValue = useMemo(() => {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    date.setDate(date.getDate() + minimumEventLeadDays);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }, []);

  const minimumPickupDeliveryDateValue = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const earliest = addBusinessDays(today, minimumGrabGoLeadBusinessDays);

    const year = earliest.getFullYear();
    const month = String(earliest.getMonth() + 1).padStart(2, "0");
    const day = String(earliest.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }, []);

  const onChange = (key: keyof FormData, value: string) => {
    setSubmitError(null);

    if (key === "contactNumber") {
      setFormData((prev) => ({
        ...prev,
        contactNumber: (() => {
          const previousValue = prev.contactNumber;
          const isDeleting = value.length < previousValue.length;

          if (isDeleting) {
            const previousDigits = previousValue.replace(/\D/g, "");
            const nextDigits = value.replace(/\D/g, "");

            // If a formatting character was deleted, also remove the preceding digit
            // so backspace/delete behaves naturally.
            if (previousDigits.length === nextDigits.length) {
              return formatContactNumber(previousDigits.slice(0, -1));
            }
          }

          return formatContactNumber(value);
        })(),
      }));
      return;
    }

    setFormData((prev) => {
      if (key === "delivery") {
        return {
          ...prev,
          delivery: value as FormData["delivery"],
          pickupDate: "",
          pickupTime: "",
          deliveryDate: "",
          deliveryTime: "",
        };
      }

      return { ...prev, [key]: value };
    });
  };

  const getValidationErrorForFields = (fields: FieldConfig[]) => {
    for (const field of fields) {
      const value = formData[field.key].trim();

      if (field.required && value.length === 0) {
        return `Please complete ${field.label.toLowerCase()}.`;
      }
    }

    if (fields.some((field) => field.key === "email") && formData.email) {
      if (!emailPattern.test(formData.email)) {
        return "Please enter a valid email address.";
      }
    }

    if (
      fields.some((field) => field.key === "contactNumber") &&
      formData.contactNumber
    ) {
      if (!isValidContactNumber(formData.contactNumber)) {
        return "Please enter a valid contact number in the format (123) 456-7890.";
      }
    }

    const hasEventDateField = fields.some((field) => field.key === "eventDate");
    const eventDateStamp =
      formData.eventDate.length > 0 ? toUtcTimestamp(formData.eventDate) : null;

    if (hasEventDateField && formData.eventDate.length > 0) {
      if (eventDateStamp === null) {
        return "Please provide a valid event date.";
      }

      const minimumEventDateStamp =
        getTodayUtcStartTimestamp() + minimumEventLeadDays * millisecondsPerDay;

      if (eventDateStamp < minimumEventDateStamp) {
        return "Event date must be at least 7 days from today.";
      }
    }

    if (
      fields.some((field) => field.key === "eventStartTime") &&
      fields.some((field) => field.key === "eventEndTime") &&
      formData.eventStartTime &&
      formData.eventEndTime
    ) {
      const eventStart = toMinutes(formData.eventStartTime);
      const eventEnd = toMinutes(formData.eventEndTime);

      if (eventStart === null || eventEnd === null) {
        return "Please provide valid event start and end times.";
      }

      if (eventEnd <= eventStart) {
        return "Event end time must be later than event start time.";
      }

      if (eventEnd - eventStart < minimumEventDurationMinutes) {
        return "Please ensure there is at least a 2-hour gap between start and end time.";
      }
    }

    const hasDeliveryDateField = fields.some(
      (field) => field.key === "deliveryDate",
    );
    const hasPickupDateField = fields.some(
      (field) => field.key === "pickupDate",
    );

    if (hasDeliveryDateField && formData.deliveryDate) {
      const deliveryDateStamp = toUtcTimestamp(formData.deliveryDate);

      if (deliveryDateStamp === null) {
        return "Please provide a valid delivery date.";
      }

      const earliestDelivery = addBusinessDays(
        new Date(),
        minimumGrabGoLeadBusinessDays,
      );
      const minimumDeliveryStamp = Date.UTC(
        earliestDelivery.getFullYear(),
        earliestDelivery.getMonth(),
        earliestDelivery.getDate(),
      );

      if (deliveryDateStamp < minimumDeliveryStamp) {
        return "Delivery date must be at least 2 business days from today.";
      }

      if (eventDateStamp !== null && deliveryDateStamp >= eventDateStamp) {
        return "Delivery date must be before the event date.";
      }
    }

    if (hasPickupDateField && formData.pickupDate) {
      const pickupDateStamp = toUtcTimestamp(formData.pickupDate);

      if (pickupDateStamp === null) {
        return "Please provide a valid pickup date.";
      }

      const earliestPickup = addBusinessDays(
        new Date(),
        minimumGrabGoLeadBusinessDays,
      );
      const minimumPickupStamp = Date.UTC(
        earliestPickup.getFullYear(),
        earliestPickup.getMonth(),
        earliestPickup.getDate(),
      );

      if (pickupDateStamp < minimumPickupStamp) {
        return "Pickup date must be at least 2 business days from today.";
      }

      if (eventDateStamp !== null && pickupDateStamp >= eventDateStamp) {
        return "Pickup date must be before the event date.";
      }
    }

    return null;
  };

  const getSubmissionValidationError = () => {
    for (const step of steps) {
      const error = getValidationErrorForFields(step.fields);
      if (error) {
        return error;
      }
    }

    return null;
  };

  const choosePath = (path: JourneyType) => {
    const nextState = createInitialFormData();
    nextState.formType = path;

    setFormType(path);
    setStepIndex(0);
    setSubmitted(false);
    setSubmitError(null);
    setIsIntentFlow(false);
    setPackageLocked(false);
    intentSignatureRef.current = "";
    setFormData(nextState);
  };

  const handleNext = () => {
    if (!currentStep) {
      return;
    }

    const stepError = getValidationErrorForFields(currentStep.fields);
    if (stepError) {
      setSubmitError(stepError);
      return;
    }

    setSubmitError(null);

    setStepIndex((prev) => Math.min(prev + 1, Math.max(steps.length - 1, 0)));
  };

  const handleBack = () => {
    if (!formType) {
      return;
    }

    if (stepIndex === 0) {
      setFormType("");
      setSubmitError(null);
      return;
    }

    setStepIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Prevent implicit submissions before the final step (e.g. Enter key or button morph timing).
    if (stepIndex < steps.length - 1) {
      return;
    }

    if (!formType) {
      setSubmitError("Please select a booking option to continue.");
      return;
    }

    const submissionError = getSubmissionValidationError();
    if (submissionError) {
      setSubmitError(submissionError);
      return;
    }

    setSubmitError(null);
    setIsSubmitting(true);

    try {
      const payload = {
        ...formData,
        formType,
        cost: pricing?.cost ?? "",
        discount: pricing?.discount ?? "",
        discountPercent: pricing?.discountPct ?? "",
        effectiveCost: pricing?.effectiveCost ?? "",
      };

      const response = await fetch("/api/consultation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as {
          error?: string;
        } | null;
        throw new Error(
          data?.error ??
            "We couldn't submit your request right now. Please try again.",
        );
      }

      setSubmitted(true);
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "We couldn't submit your request right now. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="rounded-[1.25rem] border border-border bg-surface p-6 text-foreground">
        <h3 className="text-xl font-extrabold tracking-tight text-accent">
          Thank you for starting your Jovira journey.
        </h3>
        <p className="mt-3 text-sm leading-7 text-foreground/85">
          We’ve received your {formType ? journeyLabels[formType] : "request"}{" "}
          and will follow up with you shortly.
        </p>
      </div>
    );
  }

  const renderInput = (field: FieldConfig) => {
    if (field.key === "venueAddress") {
      return (
        <AddressAutocomplete
          value={formData.venueAddress}
          onChange={(val) => onChange("venueAddress", val)}
          required={field.required}
          placeholder={field.placeholder}
        />
      );
    }

    if (field.type === "textarea") {
      return (
        <textarea
          value={formData[field.key]}
          onChange={(event) => onChange(field.key, event.target.value)}
          rows={2}
          required={field.required}
          className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-foreground outline-none ring-brand/30 placeholder:text-foreground/50 focus:ring-2"
          placeholder={field.placeholder}
        />
      );
    }

    if (field.type === "select") {
      return (
        <select
          value={formData[field.key]}
          onChange={(event) => onChange(field.key, event.target.value)}
          required={field.required}
          disabled={field.key === "packageChoice" && packageLocked}
          className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-foreground outline-none ring-brand/30 focus:ring-2"
        >
          <option value="" disabled>
            Select an option
          </option>
          {field.options?.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      );
    }

    if (field.key === "contactNumber") {
      return (
        <div className="relative">
          <span
            aria-hidden
            className="pointer-events-none absolute left-4 top-1/2 inline-flex h-5 w-8 -translate-y-1/2 items-center justify-center overflow-hidden rounded-[0.2rem] border border-border bg-white"
          >
            <span
              aria-hidden
              className="absolute inset-y-0 left-0 w-2 bg-red-500"
            />
            <span
              aria-hidden
              className="absolute inset-y-0 right-0 w-2 bg-red-500"
            />
            <FaCanadianMapleLeaf className="relative text-[0.72rem] text-red-500" />
          </span>
          <input
            type={field.type}
            value={formData[field.key]}
            onChange={(event) => onChange(field.key, event.target.value)}
            required={field.required}
            autoComplete="tel"
            className="w-full rounded-xl border border-border bg-surface py-3 pl-13 pr-4 text-sm text-foreground outline-none ring-brand/30 placeholder:text-foreground/50 focus:ring-2"
            placeholder={field.placeholder}
            inputMode="numeric"
            pattern="^\\(\\d{3}\\) \\d{3}-\\d{4}$"
            maxLength={14}
          />
        </div>
      );
    }

    return (
      <input
        type={field.type}
        value={formData[field.key]}
        onChange={(event) => onChange(field.key, event.target.value)}
        required={field.required}
        autoComplete={
          field.key === "fullName"
            ? "name"
            : field.key === "email"
              ? "email"
              : "off"
        }
        readOnly={field.readOnly}
        aria-readonly={field.readOnly}
        className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-foreground outline-none ring-brand/30 placeholder:text-foreground/50 focus:ring-2"
        placeholder={field.placeholder}
        min={
          field.key === "eventDate"
            ? minimumEventDateValue
            : field.key === "pickupDate" || field.key === "deliveryDate"
              ? minimumPickupDeliveryDateValue
              : undefined
        }
      />
    );
  };

  return (
    <form
      className="space-y-5"
      aria-label="Jovira booking and consultation form"
      onSubmit={handleSubmit}
    >
      {formType ? (
        <>
          <div
            aria-hidden
            className="h-2 w-full overflow-hidden rounded-full bg-brand"
          >
            <div
              className="h-full rounded-full bg-brand transition-[width] duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>

          <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-accent">
            Step {stepIndex + 1} of {totalSteps}
          </p>

          {currentStep ? (
            <div
              key={currentStep.id}
              className="space-y-3 animate-[fadeInRise_300ms_ease]"
            >
              <div>
                <p className="text-sm font-extrabold text-foreground">
                  {currentStep.title}
                </p>
                {currentStep.description ? (
                  <p className="mt-1 text-xs text-foreground/70">
                    {currentStep.description}
                  </p>
                ) : null}
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {currentStep.fields.map((field) => {
                  const isWideField =
                    field.type === "textarea" ||
                    field.key === "venueAddress" ||
                    field.key === "eventTheme" ||
                    field.key === "packageChoice" ||
                    field.key === "additionalNotes" ||
                    field.key === "delivery";

                  return (
                    <div
                      key={field.key}
                      className={
                        isWideField ? "space-y-2 md:col-span-2" : "space-y-2"
                      }
                    >
                      <label className="block text-sm font-extrabold text-foreground">
                        {field.label}
                      </label>
                      {renderInput(field)}

                      {field.key === "packageChoice" && pricing ? (
                        <div className="rounded-xl border border-border bg-muted px-4 py-3 text-xs text-foreground/85">
                          <p>
                            Cost:{" "}
                            <strong>{formatCadCurrency(pricing.cost)}</strong>
                          </p>
                          <p>
                            Discount:{" "}
                            <strong>
                              {formatCadCurrency(pricing.discount)}
                            </strong>{" "}
                            ({pricing.discountPct}%)
                          </p>
                          <p>
                            Effective Cost:{" "}
                            <strong>
                              {formatCadCurrency(pricing.effectiveCost)}
                            </strong>
                          </p>
                          {packageLocked ? (
                            <p className="mt-1 text-foreground/65">
                              This package was preselected from your chosen
                              offer.
                            </p>
                          ) : null}
                        </div>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            </div>
          ) : null}
        </>
      ) : (
        <div className="space-y-4 animate-[fadeInRise_300ms_ease]">
          <label className="block text-sm font-extrabold text-foreground">
            How would you like to start your JOVIRA journey?
          </label>
          <div className="grid gap-3">
            {pathChoices.map((choice) => (
              <button
                key={choice.id}
                type="button"
                onClick={() => choosePath(choice.id)}
                className="rounded-xl border border-border bg-surface-soft px-4 py-4 text-left transition hover:border-accent"
              >
                <span className="block text-sm font-extrabold text-foreground">
                  {choice.title}
                </span>
                <span className="mt-1 block text-xs text-foreground/75">
                  {choice.description}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      <p className="text-xs text-foreground/70">
        By submitting, you agree to our{" "}
        <Link href="/terms" className="underline hover:text-accent">
          Terms of Service
        </Link>
        {", "}
        <Link href="/privacy-policy" className="underline hover:text-accent">
          Privacy Policy
        </Link>
        {", "}
        and{" "}
        <Link href="/refund-policy" className="underline hover:text-accent">
          Refund Policy
        </Link>
        . We only use your information to respond to your request.
      </p>

      {submitError ? (
        <p
          role="alert"
          aria-live="polite"
          className="rounded-sm border border-[rgb(190_24_24/28%)] bg-[rgb(254_242_242)] px-4 py-3 text-xs font-semibold text-[rgb(153_27_27)]"
        >
          {submitError}
        </p>
      ) : null}

      {formType ? (
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            key="back-step"
            onClick={handleBack}
            disabled={isSubmitting}
            className="inline-flex items-center justify-center rounded-sm border border-border px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.08em] text-foreground transition hover:border-accent disabled:cursor-not-allowed disabled:opacity-40"
          >
            Back
          </button>

          {stepIndex < steps.length - 1 && (
            <button
              type="button"
              key="next-step"
              onClick={handleNext}
              disabled={isSubmitting}
              className="jov-cta jov-cta-primary px-6 py-2.5 text-sm"
            >
              Next
            </button>
          )}

          {stepIndex >= steps.length - 1 && (
            <button
              type="submit"
              key="submit-request"
              disabled={isSubmitting}
              className="jov-cta jov-cta-primary px-6 py-2.5 text-sm"
            >
              {isSubmitting ? "Submitting..." : "Submit Request"}
            </button>
          )}
        </div>
      ) : null}
    </form>
  );
}
