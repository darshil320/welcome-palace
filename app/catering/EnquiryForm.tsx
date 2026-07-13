"use client";

import { type FormEvent, useState } from "react";
import { FormShell } from "@/components/form/FormShell";
import { SelectField, SubmitButton, TextAreaField, TextField } from "@/components/form/fields";
import { waLink } from "@/lib/content";
import { cateringPlanOptions } from "@/app/catering/content";

export function EnquiryForm() {
  const [submitError, setSubmitError] = useState<string | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitError(null);

    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("guestName") ?? "").trim();
    const mobile = String(data.get("mobileNumber") ?? "").trim();
    const guests = String(data.get("guestCount") ?? "").trim();
    const eventDate = String(data.get("eventDate") ?? "").trim();
    const plan = String(data.get("plan") ?? "").trim();
    const special = String(data.get("specialRequirements") ?? "").trim();

    if (!name || !mobile || !guests || !eventDate || !plan) {
      setSubmitError("Please fill in all required fields before submitting.");
      return;
    }

    const message = [
      "Hi Welcome Palace! I'd like to enquire about Chandni Chowk Catering.",
      `Name: ${name}`,
      `Mobile: ${mobile}`,
      `Guests: ${guests}`,
      `Event Date: ${eventDate}`,
      `Plan: ${plan}`,
      special ? `Special Requirements: ${special}` : null,
    ]
      .filter(Boolean)
      .join("\n");

    const url = waLink(message);
    window.open(url, "_blank");
  }

  return (
    <FormShell
      eyebrow="Premium Catering Experience"
      title="Chandni Chowk Catering Enquiry"
      footnote="Our team will contact you within 2 hours with the best quote & menu."
    >
      <form onSubmit={handleSubmit} className="grid gap-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <TextField label="Guest Name" name="guestName" required placeholder="Your full name" />
          <TextField
            label="Mobile Number"
            name="mobileNumber"
            type="tel"
            required
            placeholder="+91 XXXXX XXXXX"
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <TextField
            label="Number of Guests"
            name="guestCount"
            type="number"
            min={10}
            required
            placeholder="e.g. 250"
          />
          <TextField label="Event Date" name="eventDate" type="date" required />
        </div>

        <SelectField label="Selected Plan" name="plan" required defaultValue="">
          <option value="" disabled>
            Choose a catering plan
          </option>
          {cateringPlanOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </SelectField>

        <TextAreaField
          label="Special Requirements / Narration"
          name="specialRequirements"
          placeholder="Any special requests like Jain food, live counters, extra dessert, etc."
        />

        {submitError ? <p className="text-[13px] font-semibold text-red-600">{submitError}</p> : null}

        <SubmitButton>SUBMIT CATERING ENQUIRY</SubmitButton>
      </form>
    </FormShell>
  );
}
