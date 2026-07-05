"use client";

import { useState } from "react";
import { FormShell } from "@/components/form/FormShell";
import { SelectField, SubmitButton, TextAreaField, TextField } from "@/components/form/fields";
import { waLink } from "@/lib/content";
import { banquetRequiredOptions, banquetSlotOptions, cateringOptions } from "@/app/shadi-wala-ghar/content";

const todayIso = () => new Date().toISOString().split("T")[0];

export function EnquiryForm() {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [guests, setGuests] = useState("");
  const [checkIn, setCheckIn] = useState(todayIso());
  const [checkOut, setCheckOut] = useState("");
  const [catering, setCatering] = useState<string>(cateringOptions[0]);
  const [banquetRequired, setBanquetRequired] = useState<string>(banquetRequiredOptions[0]);
  const [banquetSlot, setBanquetSlot] = useState<string>(banquetSlotOptions[0]);
  const [special, setSpecial] = useState("");
  const [dateError, setDateError] = useState("");

  const needsBanquet = banquetRequired === banquetRequiredOptions[1];

  function handleCheckOutChange(value: string) {
    setCheckOut(value);
    setDateError(checkIn && value && value <= checkIn ? "Check-out date must be after check-in date." : "");
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (checkOut && checkIn && checkOut <= checkIn) {
      setDateError("Check-out date must be after check-in date.");
      return;
    }

    const lines = [
      "Hi Welcome Palace! I'd like to enquire about the Shadi Wala Ghar (entire floor buyout).",
      `Name: ${name}`,
      `Mobile: ${mobile}`,
      `Guests Staying: ${guests}`,
      `Check-in: ${checkIn}`,
      `Check-out: ${checkOut}`,
      `Catering: ${catering}`,
      `Banquet Hall Required: ${banquetRequired}`,
    ];

    if (needsBanquet) {
      lines.push(`Banquet Slot: ${banquetSlot}`);
    }

    if (special.trim()) {
      lines.push(`Special Requirements: ${special.trim()}`);
    }

    window.open(waLink(lines.join("\n")), "_blank");
  }

  return (
    <FormShell
      eyebrow="Family Stay + Celebration"
      title="Shaadi Wala Ghar Enquiry"
      footnote="Our team will contact you within 2 hours with availability & best package quote."
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
          label="Mobile Number"
          required
          type="tel"
          name="mobile"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          placeholder="+91 63563 20206"
        />
        <TextField
          label="Number of Guests Staying"
          required
          type="number"
          name="guests"
          min={1}
          max={65}
          value={guests}
          onChange={(e) => setGuests(e.target.value)}
          placeholder="e.g. 25"
        />
        <div className="grid gap-5 sm:grid-cols-2">
          <TextField
            label="Check-in Date"
            required
            type="date"
            name="checkIn"
            value={checkIn}
            onChange={(e) => {
              setCheckIn(e.target.value);
              setDateError(checkOut && e.target.value && checkOut <= e.target.value ? "Check-out date must be after check-in date." : "");
            }}
          />
          <TextField
            label="Check-out Date"
            required
            type="date"
            name="checkOut"
            min={checkIn}
            value={checkOut}
            onChange={(e) => handleCheckOutChange(e.target.value)}
          />
        </div>
        {dateError ? <p className="-mt-2 text-[12.5px] font-medium text-red-600">{dateError}</p> : null}

        <SelectField
          label="Catering Option"
          required
          name="catering"
          value={catering}
          onChange={(e) => setCatering(e.target.value)}
        >
          {cateringOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </SelectField>

        <SelectField
          label="Banquet Hall Required?"
          required
          name="banquetRequired"
          value={banquetRequired}
          onChange={(e) => setBanquetRequired(e.target.value)}
        >
          {banquetRequiredOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </SelectField>

        <div className={`acc-body ${needsBanquet ? "is-open" : ""}`}>
          <div>
            <div className="pt-1">
              <SelectField
                label="Banquet Slot"
                required={needsBanquet}
                name="banquetSlot"
                value={banquetSlot}
                onChange={(e) => setBanquetSlot(e.target.value)}
              >
                {banquetSlotOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </SelectField>
            </div>
          </div>
        </div>

        <TextAreaField
          label="Special Requirements / Narration"
          name="special"
          value={special}
          onChange={(e) => setSpecial(e.target.value)}
          placeholder="Any special requests, decoration, extra bedding, etc."
        />

        <SubmitButton>SUBMIT SHAADI WALA GHAR ENQUIRY</SubmitButton>
      </form>
    </FormShell>
  );
}
