import {
  getInspirationItemFromSource,
  getInspirationOfferPricing,
} from "@/data/inspiration-items";
import {
  getPackagePricingForJourney,
  isPackageAllowedForJourney,
} from "@/data/package-pricing";
import {
  isJourneyType,
  journeyLabels,
  type JourneyType,
} from "@/types/consultation";
import { NextResponse } from "next/server";
import { Resend } from "resend";

type IntakePayload = {
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
  cost: string;
  discount: string;
  discountPercent: string;
  effectiveCost: string;
  delivery: string;
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

const requiredFieldsByType: Record<JourneyType, Array<keyof IntakePayload>> = {
  consultation: ["fullName", "email", "contactNumber"],
  eventStyling: [
    "fullName",
    "email",
    "contactNumber",
    "eventType",
    "eventDate",
    "eventStartTime",
    "eventEndTime",
    "venueAddress",
    "venueType",
    "eventTheme",
    "packageChoice",
  ],
  balloonStyling: [
    "fullName",
    "email",
    "contactNumber",
    "eventType",
    "eventDate",
    "eventStartTime",
    "eventEndTime",
    "venueAddress",
    "venueType",
    "eventTheme",
    "packageChoice",
  ],
  grabAndGo: [
    "fullName",
    "email",
    "contactNumber",
    "eventType",
    "eventTheme",
    "packageChoice",
    "delivery",
  ],
  offer: [
    "fullName",
    "email",
    "contactNumber",
    "eventType",
    "eventDate",
    "eventStartTime",
    "eventEndTime",
    "venueAddress",
    "venueType",
    "eventTheme",
    "packageChoice",
  ],
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const contactNumberPattern = /^\(\d{3}\) \d{3}-\d{4}$/;
const minimumEventDurationMinutes = 120;
const minimumEventLeadDays = 7;
const millisecondsPerDay = 24 * 60 * 60 * 1000;

function toSafeText(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function buildPayloadFromBody(body: unknown): IntakePayload {
  const data = body as Partial<IntakePayload>;

  return {
    formType: toSafeText(data.formType) as IntakePayload["formType"],
    fullName: toSafeText(data.fullName),
    email: toSafeText(data.email),
    contactNumber: toSafeText(data.contactNumber),
    eventDate: toSafeText(data.eventDate),
    eventType: toSafeText(data.eventType),
    eventStartTime: toSafeText(data.eventStartTime),
    eventEndTime: toSafeText(data.eventEndTime),
    venueAddress: toSafeText(data.venueAddress),
    venueType: toSafeText(data.venueType),
    eventTheme: toSafeText(data.eventTheme),
    packageChoice: toSafeText(data.packageChoice),
    cost: toSafeText(data.cost),
    discount: toSafeText(data.discount),
    discountPercent: toSafeText(data.discountPercent),
    effectiveCost: toSafeText(data.effectiveCost),
    delivery: toSafeText(data.delivery),
    pickupDate: toSafeText(data.pickupDate),
    pickupTime: toSafeText(data.pickupTime),
    deliveryDate: toSafeText(data.deliveryDate),
    deliveryTime: toSafeText(data.deliveryTime),
    hearAbout: toSafeText(data.hearAbout),
    referralCode: toSafeText(data.referralCode),
    giftCardOrVoucher: toSafeText(data.giftCardOrVoucher),
    additionalNotes: toSafeText(data.additionalNotes),
    entrySource: toSafeText(data.entrySource),
    seasonalOffer: toSafeText(data.seasonalOffer),
  };
}

function getPricingForPayload(payload: IntakePayload) {
  const inspirationOffer = getInspirationItemFromSource(payload.entrySource);

  if (inspirationOffer) {
    return getInspirationOfferPricing(inspirationOffer);
  }

  if (payload.formType === "consultation") {
    return null;
  }

  if (!isJourneyType(payload.formType)) {
    return null;
  }

  return getPackagePricingForJourney(payload.formType, payload.packageChoice, {
    seasonalOffer: payload.seasonalOffer === "1",
  });
}

function getFieldsForEmail(payload: IntakePayload, formType: JourneyType) {
  if (formType === "consultation") {
    return [
      ["Submission Type", journeyLabels[formType]],
      ["Full Name", payload.fullName],
      ["Email", payload.email],
      ["Contact Number", payload.contactNumber],
      ["Additional Information", payload.additionalNotes || "—"],
    ] as Array<[string, string]>;
  }

  if (formType === "eventStyling" || formType === "balloonStyling") {
    const pricing = getPricingForPayload(payload);

    return [
      ["Submission Type", journeyLabels[formType]],
      ["Full Name", payload.fullName],
      ["Email", payload.email],
      ["Contact Number", payload.contactNumber],
      ["Event Type", payload.eventType],
      ["Event Date", payload.eventDate],
      ["Event Start Time", payload.eventStartTime],
      ["Event End Time", payload.eventEndTime],
      ["Venue Address", payload.venueAddress],
      ["Venue Type", payload.venueType],
      ["Event Theme", payload.eventTheme],
      ["Package Choice", payload.packageChoice],
      ["Cost", pricing ? String(pricing.cost) : payload.cost || "—"],
      [
        "Discount",
        pricing ? String(pricing.discount) : payload.discount || "—",
      ],
      [
        "Effective Cost",
        pricing ? String(pricing.effectiveCost) : payload.effectiveCost || "—",
      ],
      ["Where Did You Hear About Us", payload.hearAbout || "—"],
      ["Referral Code", payload.referralCode || "—"],
      ["Gift Card or Voucher", payload.giftCardOrVoucher || "—"],
      ["Additional Information", payload.additionalNotes || "—"],
    ] as Array<[string, string]>;
  }

  if (formType === "grabAndGo") {
    const pricing = getPricingForPayload(payload);

    return [
      ["Submission Type", journeyLabels[formType]],
      ["Full Name", payload.fullName],
      ["Email", payload.email],
      ["Contact Number", payload.contactNumber],
      ["Event Type", payload.eventType],
      ["Event Theme", payload.eventTheme],
      ["Package Choice", payload.packageChoice],
      ["Cost", pricing ? String(pricing.cost) : payload.cost || "—"],
      [
        "Discount",
        pricing ? String(pricing.discount) : payload.discount || "—",
      ],
      [
        "Effective Cost",
        pricing ? String(pricing.effectiveCost) : payload.effectiveCost || "—",
      ],
      ["Delivery", payload.delivery],
      [
        "Delivery Address",
        payload.delivery === "Yes" ? payload.venueAddress || "—" : "—",
      ],
      ["Pickup Date", payload.pickupDate || "—"],
      ["Pickup Time", payload.pickupTime || "—"],
      ["Delivery Date", payload.deliveryDate || "—"],
      ["Delivery Time", payload.deliveryTime || "—"],
      ["Where Did You Hear About Us", payload.hearAbout || "—"],
      ["Referral Code", payload.referralCode || "—"],
      ["Gift Card or Voucher", payload.giftCardOrVoucher || "—"],
      ["Additional Information", payload.additionalNotes || "—"],
    ] as Array<[string, string]>;
  }

  const pricing = getPricingForPayload(payload);

  return [
    ["Submission Type", journeyLabels[formType]],
    ["Full Name", payload.fullName],
    ["Email", payload.email],
    ["Contact Number", payload.contactNumber],
    ["Event Type", payload.eventType],
    ["Event Date", payload.eventDate],
    ["Event Start Time", payload.eventStartTime],
    ["Event End Time", payload.eventEndTime],
    ["Venue Address", payload.venueAddress],
    ["Venue Type", payload.venueType],
    ["Event Theme", payload.eventTheme],
    ["Package Choice", payload.packageChoice],
    ["Cost", pricing ? String(pricing.cost) : payload.cost || "—"],
    ["Discount", pricing ? String(pricing.discount) : payload.discount || "—"],
    [
      "Effective Cost",
      pricing ? String(pricing.effectiveCost) : payload.effectiveCost || "—",
    ],
    ["Where Did You Hear About Us", payload.hearAbout || "—"],
    ["Referral Code", payload.referralCode || "—"],
    ["Gift Card or Voucher", payload.giftCardOrVoucher || "—"],
    ["Additional Information", payload.additionalNotes || "—"],
  ] as Array<[string, string]>;
}

function hasMissingRequiredField(
  payload: IntakePayload,
  formType: JourneyType,
) {
  const requiredFields = requiredFieldsByType[formType];
  return requiredFields.some((field) => payload[field].length === 0);
}

function toMinutes(time: string) {
  if (!/^\d{2}:\d{2}$/.test(time)) {
    return null;
  }

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

function hasInvalidTimeRange(payload: IntakePayload) {
  if (!payload.eventStartTime || !payload.eventEndTime) {
    return false;
  }

  const start = toMinutes(payload.eventStartTime);
  const end = toMinutes(payload.eventEndTime);

  if (start === null || end === null) {
    return true;
  }

  return end <= start || end - start < minimumEventDurationMinutes;
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

function hasInvalidEventDateLeadTime(payload: IntakePayload) {
  if (payload.formType === "consultation" || payload.formType === "grabAndGo") {
    return false;
  }

  const eventDateStamp = toUtcTimestamp(payload.eventDate);
  if (eventDateStamp === null) {
    return true;
  }

  const minimumEventDateStamp =
    getTodayUtcStartTimestamp() + minimumEventLeadDays * millisecondsPerDay;

  return eventDateStamp < minimumEventDateStamp;
}

function hasInvalidContactNumber(contactNumber: string) {
  return !contactNumberPattern.test(contactNumber);
}

function hasInvalidDeliveryPickupSelection(payload: IntakePayload) {
  if (payload.formType !== "grabAndGo") {
    return false;
  }

  if (payload.delivery === "Yes") {
    return (
      payload.venueAddress.length === 0 ||
      payload.deliveryDate.length === 0 ||
      payload.deliveryTime.length === 0
    );
  }

  if (payload.delivery === "No") {
    return payload.pickupDate.length === 0 || payload.pickupTime.length === 0;
  }

  return true;
}

function hasInvalidPackage(payload: IntakePayload, formType: JourneyType) {
  if (formType === "consultation") {
    return false;
  }

  if (getInspirationItemFromSource(payload.entrySource)) {
    return false;
  }

  return !isPackageAllowedForJourney(formType, payload.packageChoice);
}

export async function POST(request: Request) {
  const resendApiKey = process.env.RESEND_API_KEY;
  const fromEmail =
    process.env.CONSULTATION_FROM_EMAIL ?? "Jovira <no-reply@jovira.ca>";
  const sheetsWebhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;

  if (!resendApiKey) {
    return NextResponse.json(
      {
        error: "Server is missing RESEND_API_KEY configuration.",
      },
      { status: 500 },
    );
  }

  let payload: IntakePayload;

  try {
    const body = await request.json();
    payload = buildPayloadFromBody(body);
  } catch {
    return NextResponse.json(
      { error: "Invalid request payload." },
      { status: 400 },
    );
  }

  if (!payload.formType) {
    return NextResponse.json(
      { error: "Please select a submission type to continue." },
      { status: 422 },
    );
  }

  if (!isJourneyType(payload.formType)) {
    return NextResponse.json(
      { error: "Please select a valid submission type." },
      { status: 422 },
    );
  }

  if (hasMissingRequiredField(payload, payload.formType)) {
    return NextResponse.json(
      { error: "Please complete all required fields." },
      { status: 422 },
    );
  }

  if (!emailPattern.test(payload.email)) {
    return NextResponse.json(
      { error: "Please provide a valid email address." },
      { status: 422 },
    );
  }

  if (hasInvalidContactNumber(payload.contactNumber)) {
    return NextResponse.json(
      {
        error:
          "Please provide a valid contact number in the format (123) 456-7890.",
      },
      { status: 422 },
    );
  }

  if (hasInvalidEventDateLeadTime(payload)) {
    return NextResponse.json(
      { error: "Event date must be at least 7 days from today." },
      { status: 422 },
    );
  }

  if (
    (payload.formType === "eventStyling" ||
      payload.formType === "balloonStyling" ||
      payload.formType === "offer") &&
    hasInvalidTimeRange(payload)
  ) {
    return NextResponse.json(
      {
        error:
          "Event end time must be later than start time with at least a 2-hour difference.",
      },
      { status: 422 },
    );
  }

  if (hasInvalidDeliveryPickupSelection(payload)) {
    return NextResponse.json(
      {
        error:
          "Please provide delivery date and time for delivery, or pickup date and time for pickup.",
      },
      { status: 422 },
    );
  }

  if (hasInvalidPackage(payload, payload.formType)) {
    return NextResponse.json(
      { error: "Please choose a valid package for this submission type." },
      { status: 422 },
    );
  }

  const pricing =
    payload.formType === "consultation" ? null : getPricingForPayload(payload);

  const resend = new Resend(resendApiKey);

  let emailTemplate = "";
  let variables: Record<string, string> = {};

  if (payload.formType === "consultation") {
    emailTemplate = "booking-ack-consult";
    variables = {
      emailSubject: `JOVIRA: ${journeyLabels[payload.formType]} request received`,
      fullname: payload.fullName,
      phone: payload.contactNumber,
    };
  } else if (
    payload.formType === "eventStyling" ||
    payload.formType === "balloonStyling"
  ) {
    emailTemplate = "booking-ack-styling";
    variables = {
      emailSubject: `JOVIRA: ${journeyLabels[payload.formType]} request received`,
      fullname: payload.fullName,
      service: journeyLabels[payload.formType],
      date: payload.eventDate,
      time: payload.eventStartTime,
      theme: payload.eventTheme,
      package: payload.packageChoice,
      phone: payload.contactNumber,
    };
  } else if (payload.formType === "grabAndGo") {
    emailTemplate = "booking-ack-grab-and-go";
    variables = {
      emailSubject: `JOVIRA: ${journeyLabels[payload.formType]} request received`,
      fullname: payload.fullName,
      service: journeyLabels[payload.formType],
      date: payload.deliveryDate ? payload.deliveryDate : payload.pickupDate,
      time: payload.deliveryTime ? payload.deliveryTime : payload.pickupTime,
      theme: payload.eventTheme,
      package: payload.packageChoice,
      phone: payload.contactNumber,
    };
  }

  try {
    await resend.emails.send({
      from: fromEmail,
      to: [payload.email],
      replyTo: payload.email,
      template: {
        id: emailTemplate,
        variables: variables,
      },
    });

    if (sheetsWebhookUrl) {
      fetch(sheetsWebhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: journeyLabels[payload.formType],
          submissionType: payload.formType,
          name: payload.fullName,
          email: payload.email,
          phoneNumber: payload.contactNumber,
          eventType: payload.eventType,
          eventDate: payload.eventDate,
          eventStartTime: payload.eventStartTime,
          eventEndTime: payload.eventEndTime,
          venueAddress: payload.venueAddress,
          venueType: payload.venueType,
          eventTheme: payload.eventTheme,
          package: payload.packageChoice,
          cost: pricing?.cost ?? payload.cost,
          discount: pricing?.discount ?? payload.discount,
          discountPercent: pricing?.discountPct ?? payload.discountPercent,
          effectiveCost: pricing?.effectiveCost ?? payload.effectiveCost,
          delivery: payload.delivery,
          pickupDate: payload.pickupDate,
          pickupTime: payload.pickupTime,
          deliveryDate: payload.deliveryDate,
          deliveryTime: payload.deliveryTime,
          whereDidYouHearAboutUs: payload.hearAbout,
          referralCode: payload.referralCode,
          joviraGiftCardOrVoucher: payload.giftCardOrVoucher,
          additionalInformation: payload.additionalNotes,
          entrySource: payload.entrySource,
          submittedAt: new Date().toISOString(),
        }),
      }).catch((error: unknown) => {
        console.error("Google Sheets webhook failed", error);
      });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Consultation email send failed", error);

    return NextResponse.json(
      {
        error:
          "We couldn't submit your request right now. Please try again in a moment.",
      },
      { status: 500 },
    );
  }
}

function buildHtml(payload: IntakePayload, formType: JourneyType) {
  const rows = getFieldsForEmail(payload, formType);

  return `
    <div style="font-family:Inter,Arial,sans-serif;color:#1f2937;line-height:1.5;max-width:680px">
      <h2 style="margin:0 0 12px 0;color:#1746a2">New Jovira ${escapeHtml(journeyLabels[formType])} request</h2>
      <p style="margin:0 0 16px 0">A new intake form was submitted from jovira.ca.</p>
      <table style="border-collapse:collapse;width:100%">
        ${rows
          .map(
            ([label, value]) => `
              <tr>
                <th style="text-align:left;padding:10px;border:1px solid #e5e7eb;background:#f8fafc;width:220px">${escapeHtml(label)}</th>
                <td style="padding:10px;border:1px solid #e5e7eb;white-space:pre-wrap">${escapeHtml(value)}</td>
              </tr>
            `,
          )
          .join("")}
      </table>
    </div>
  `;
}
