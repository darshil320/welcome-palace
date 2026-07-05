"use client";

import { useState } from "react";
import { FormShell } from "@/components/form/FormShell";
import { SelectField, SubmitButton, TextField } from "@/components/form/fields";
import { waLink } from "@/lib/content";
import { banquetSlotOptions } from "@/app/banquet/content";

const todayIso = () => new Date().toISOString().split("T")[0];

export function EnquiryForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [slot, setSlot] = useState<string>(banquetSlotOptions[0]);
  const [guests, setGuests] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const message = [
      "Hi Welcome Palace! I'd like to enquire about the Banquet Hall.",
      `Name: ${name}`,
      `Phone: ${phone}`,
      `Event Date: ${eventDate}`,
      `Slot: ${slot}`,
      `Guests: ${guests}`,
    ].join("\n");

    window.open(waLink(message), "_blank");
  }

  return (
    <FormShell
      eyebrow="Reserve Your Royal Date"
      title="Banquet Hall Enquiry"
      footnote="Our royal hospitality team will contact you within 2 hours."
    >
      <form onSubmit={handleSubmit} className="grid gap-5">
        <TextField
          label="Guest Name"
          required
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your full name"
        />
        <TextField
          label="Phone Number"
          required
          type="tel"
          name="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="+91 63563 20206"
        />
        <TextField
          label="Event Date"
          required
          type="date"
          name="eventDate"
          min={todayIso()}
          value={eventDate}
          onChange={(e) => setEventDate(e.target.value)}
        />
        <SelectField
          label="Select Slot"
          required
          name="slot"
          value={slot}
          onChange={(e) => setSlot(e.target.value)}
        >
          {banquetSlotOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </SelectField>
        <TextField
          label="Number of Guests"
          required
          type="number"
          name="guests"
          min={10}
          max={175}
          value={guests}
          onChange={(e) => setGuests(e.target.value)}
          placeholder="e.g. 85"
        />
        <SubmitButton>SUBMIT ENQUIRY</SubmitButton>
      </form>
    </FormShell>
  );
}
