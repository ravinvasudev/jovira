"use client";

import { budgetRanges, eventTypes } from "@/data/consultation-options";
import { useMemo, useState } from "react";

type FormData = {
  fullName: string;
  email: string;
  phone: string;
  eventDate: string;
  eventType: string;
  budgetRange: string;
  location: string;
  message: string;
};

const steps: Array<{
  key: keyof FormData;
  label: string;
  placeholder?: string;
  type: "text" | "email" | "tel" | "date" | "textarea" | "select";
  required?: boolean;
  options?: readonly string[];
}> = [
  {
    key: "fullName",
    label: "What should we call you?",
    placeholder: "Your full name",
    type: "text",
    required: true,
  },
  {
    key: "email",
    label: "Where can we send consultation details?",
    placeholder: "you@example.com",
    type: "email",
    required: true,
  },
  {
    key: "phone",
    label: "Do you have a preferred callback number?",
    placeholder: "+1 (___) ___-____",
    type: "tel",
  },
  {
    key: "eventDate",
    label: "When is your celebration date?",
    type: "date",
  },
  {
    key: "eventType",
    label: "Which type of event are we styling?",
    type: "select",
    required: true,
    options: eventTypes,
  },
  {
    key: "budgetRange",
    label: "What décor budget range feels right?",
    type: "select",
    options: budgetRanges,
  },
  {
    key: "location",
    label: "Where is the customer-provided venue located?",
    placeholder: "City and venue details",
    type: "text",
    required: true,
  },
  {
    key: "message",
    label: "Tell us your celebration vision.",
    placeholder:
      "Share your theme ideas, colours, and must-have décor moments.",
    type: "textarea",
    required: true,
  },
];

export function ConsultationForm() {
  const [stepIndex, setStepIndex] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    eventDate: "",
    eventType: "",
    budgetRange: "",
    location: "",
    message: "",
  });

  const currentStep = useMemo(() => steps[stepIndex], [stepIndex]);
  const progress = ((stepIndex + 1) / steps.length) * 100;

  const onChange = (value: string) => {
    setFormData((prev) => ({ ...prev, [currentStep.key]: value }));
  };

  const canAdvance = () => {
    if (!currentStep.required) {
      return true;
    }

    return formData[currentStep.key].trim().length > 0;
  };

  const handleNext = () => {
    if (!canAdvance()) {
      return;
    }

    setStepIndex((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const handleBack = () => {
    setStepIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!canAdvance()) {
      return;
    }

    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="rounded-[1.25rem] border border-border bg-surface p-6 text-foreground">
        <h3 className="text-xl font-semibold tracking-tight text-brand-strong">
          Thank you for sharing your consultation details.
        </h3>
        <p className="mt-3 text-sm leading-7 text-foreground/85">
          Your submission preview is captured in this flow. We’ll connect your
          preferred backend workflow next so entries can be delivered instantly
          to your operations tools.
        </p>
      </div>
    );
  }

  return (
    <form
      className="space-y-5"
      aria-label="Consultation request form"
      onSubmit={handleSubmit}
    >
      <div
        aria-hidden
        className="h-2 w-full overflow-hidden rounded-full bg-muted"
      >
        <div
          className="h-full rounded-full bg-brand transition-[width] duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      <p className="text-xs font-semibold uppercase tracking-[0.13em] text-brand-strong">
        Step {stepIndex + 1} of {steps.length}
      </p>

      <div
        key={currentStep.key}
        className="space-y-3 [animation:fadeInRise_300ms_ease]"
      >
        <label className="block text-sm font-semibold text-foreground">
          {currentStep.label}
        </label>

        {currentStep.type === "textarea" ? (
          <textarea
            value={formData[currentStep.key]}
            onChange={(event) => onChange(event.target.value)}
            rows={5}
            required={currentStep.required}
            className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-foreground outline-none ring-brand/30 placeholder:text-foreground/50 focus:ring-2"
            placeholder={currentStep.placeholder}
          />
        ) : null}

        {currentStep.type === "select" ? (
          <select
            value={formData[currentStep.key]}
            onChange={(event) => onChange(event.target.value)}
            required={currentStep.required}
            className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-foreground outline-none ring-brand/30 focus:ring-2"
          >
            <option value="" disabled>
              Select an option
            </option>
            {currentStep.options?.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        ) : null}

        {currentStep.type !== "textarea" && currentStep.type !== "select" ? (
          <input
            type={currentStep.type}
            value={formData[currentStep.key]}
            onChange={(event) => onChange(event.target.value)}
            required={currentStep.required}
            autoComplete={
              currentStep.key === "fullName"
                ? "name"
                : currentStep.key === "email"
                  ? "email"
                  : currentStep.key === "phone"
                    ? "tel"
                    : "off"
            }
            className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-foreground outline-none ring-brand/30 placeholder:text-foreground/50 focus:ring-2"
            placeholder={currentStep.placeholder}
          />
        ) : null}
      </div>

      <p className="text-xs text-foreground/70">
        By submitting, you confirm the venue is customer-provided and request a
        consultation with Jovira.
      </p>

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={handleBack}
          disabled={stepIndex === 0}
          className="inline-flex items-center justify-center rounded-full border border-border px-5 py-2.5 text-sm font-semibold text-foreground transition hover:border-brand disabled:cursor-not-allowed disabled:opacity-40"
        >
          Back
        </button>

        {stepIndex < steps.length - 1 ? (
          <button
            type="button"
            onClick={handleNext}
            className="inline-flex items-center justify-center rounded-full bg-brand px-6 py-2.5 text-sm font-semibold text-[#0b162c] transition hover:bg-[#e1be4e]"
          >
            Next
          </button>
        ) : (
          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-full bg-brand px-6 py-2.5 text-sm font-semibold text-[#0b162c] transition hover:bg-[#e1be4e]"
          >
            Request Consultation
          </button>
        )}
      </div>
    </form>
  );
}
