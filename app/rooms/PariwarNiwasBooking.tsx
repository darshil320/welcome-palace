"use client";

import { useState, useEffect } from "react";
import { ArrowRight, Check, X } from "lucide-react";
import { GuideLines } from "@/components/GuideLines";
import { Reveal } from "@/components/Reveal";
import { WarmVideo } from "@/components/WarmVideo";
import { FeatureIcon } from "@/components/FeatureIcon";
import { pariwarFeatures, waLink } from "@/lib/content";
import { pariwarPricing, getNumberOfNights } from "@/app/rooms/content";
import { cldVideo } from "@/lib/cloudinary";

type BookingType = "full" | "room1" | "room2" | "both";
type StayPeriod = "short" | "long";

function buildPariwarMessage(
  bookingType: BookingType,
  stayPeriod: StayPeriod,
  checkIn: string,
  checkOut: string,
  guests: number,
  guestName: string,
  guestPhone: string,
  totalPrice: number
) {
  const typeLabel =
    bookingType === "full"
      ? "Full Pariwar Niwas (2 Rooms + Hall + Kitchen)"
      : bookingType === "both"
      ? "Both Rooms Only"
      : bookingType === "room1"
      ? "Room 1 Only"
      : "Room 2 Only";

  return [
    "Hi Welcome Palace! I'd like to enquire about Pariwar Niwas.",
    `Booking: ${typeLabel}`,
    `Stay: ${stayPeriod === "long" ? "Long Stay (≥10 nights)" : "Short Stay"}`,
    `Check-in: ${checkIn}`,
    `Check-out: ${checkOut}`,
    `Guests: ${guests}`,
    `Name: ${guestName}`,
    `Phone: ${guestPhone}`,
    `Estimated Total: ₹${totalPrice.toLocaleString()} (excl. GST)`,
  ].join("\n");
}

const todayIso = () => new Date().toISOString().split("T")[0];

export function PariwarNiwasBooking() {
  const [bookingType, setBookingType] = useState<BookingType>("full");
  const [stayPeriod, setStayPeriod] = useState<StayPeriod>("short");
  const [checkIn, setCheckIn] = useState(todayIso());
  const [checkOut, setCheckOut] = useState(todayIso());
  const [guests, setGuests] = useState(4);
  const [guestName, setGuestName] = useState("");
  const [guestPhone, setGuestPhone] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [price, setPrice] = useState<number | null>(null);

  const numRooms = bookingType === "full" || bookingType === "both" ? 2 : 1;
  const isFullBooking = bookingType === "full";
  const maxGuests = isFullBooking ? 12 : numRooms * 4;

  // Recalculate price reactively
  useEffect(() => {
    setError(null);
    if (!checkIn || !checkOut) { setPrice(null); return; }
    const nights = getNumberOfNights(checkIn, checkOut);
    if (stayPeriod === "long" && nights < pariwarPricing.longStayMinNights) {
      setError(`Long Stay requires minimum ${pariwarPricing.longStayMinNights} nights.`);
      setPrice(null);
      return;
    }
    const rate = isFullBooking
      ? (stayPeriod === "long" ? pariwarPricing.fullLong : pariwarPricing.fullShort)
      : (stayPeriod === "long" ? pariwarPricing.roomLong : pariwarPricing.roomShort);
    let total = isFullBooking ? rate * nights : rate * nights * numRooms;
    if (!isFullBooking) {
      const baseAllowed = numRooms * 2;
      const extra = Math.max(0, guests - baseAllowed);
      total += extra * (stayPeriod === "long" ? pariwarPricing.extraGuestLong : pariwarPricing.extraGuestShort) * nights;
    }
    setPrice(total);
  }, [bookingType, stayPeriod, checkIn, checkOut, guests, numRooms, isFullBooking]);

  // Keep guests within max
  useEffect(() => {
    if (guests > maxGuests) setGuests(maxGuests);
  }, [maxGuests, guests]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!guestName.trim()) { alert("Please enter your name."); return; }
    if (!guestPhone.trim() || guestPhone.trim().length < 10) { alert("Please enter a valid 10-digit phone number."); return; }
    if (error) { alert(error); return; }
    const msg = buildPariwarMessage(
      bookingType, stayPeriod, checkIn, checkOut,
      guests, guestName.trim(), guestPhone.trim(), price ?? 0
    );
    window.open(
      `https://wa.me/918000014410?text=${encodeURIComponent(msg)}`,
      "_blank"
    );
  }

  return (
    <section
      id="pariwar"
      className="relative overflow-hidden bg-white py-[clamp(56px,8vh,104px)] [scroll-margin-top:84px]"
    >
      <GuideLines />
      <div className="relative z-10 mx-auto max-w-[1180px] px-[clamp(18px,4vw,54px)]">
        {/* Header */}
        <div className="mb-[clamp(36px,5vw,56px)] text-center">
          <Reveal className="inline-flex rounded-full border border-line-soft px-3.5 py-[7px] text-[11px] font-semibold tracking-[0.14em] text-muted uppercase">
            Exclusive Group Stay
          </Reveal>
          <Reveal delay={0.08} as="h2" className="mt-4 font-display text-[clamp(30px,4.4vw,54px)] leading-[1.02] font-semibold tracking-tight">
            Pariwar Niwas
          </Reveal>
          <Reveal delay={0.14} as="p" className="mx-auto mt-4 max-w-[56ch] text-[16px] leading-[1.75] font-medium text-muted">
            The ultimate &ldquo;Home Away From Home&rdquo; — 2 private bedrooms, hall, kitchen and up to 12 guests under one roof.
          </Reveal>
        </div>

        <div className="grid items-start gap-[clamp(32px,5vw,64px)] lg:grid-cols-[1fr_1.1fr]">
          {/* LEFT — Video + Features */}
          <Reveal className="space-y-6">
            <div className="aspect-[4/5] overflow-hidden rounded-[22px] shadow-[0_30px_60px_-34px_rgba(20,16,10,0.35)]">
              <WarmVideo src={cldVideo("pariwar-niwas.mp4")} className="h-full w-full rounded-[22px]" />
            </div>
            <div className="grid grid-cols-2 gap-x-6 gap-y-3">
              {pariwarFeatures.map((feat) => (
                <div key={feat.label} className="flex items-center gap-3">
                  <FeatureIcon name={feat.icon} className="w-5 text-center text-[15px] text-gold-deep" />
                  <span className="text-[14px] font-medium text-ink-soft">{feat.label}</span>
                </div>
              ))}
            </div>
          </Reveal>

          {/* RIGHT — Booking form */}
          <Reveal delay={0.1} className="flex flex-col rounded-[24px] border-2 border-gold/50 bg-panel p-[clamp(20px,4vw,36px)] shadow-[0_20px_60px_-30px_rgba(20,16,10,0.2)]">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            
            {/* Booking type */}
            <div>
              <div className="mb-3 text-[11px] font-semibold tracking-[0.14em] text-gold-deep uppercase">
                Booking Type
              </div>
              <div className="grid grid-cols-2 gap-2">
                {([
                  { id: "full", label: "Full Pariwar Niwas", sub: "2 Rooms + Hall + Kitchen" },
                  { id: "room1", label: "Room 1 Only", sub: "Single room" },
                  { id: "room2", label: "Room 2 Only", sub: "Single room" },
                  { id: "both", label: "Both Rooms", sub: "Without hall/kitchen" },
                ] as { id: BookingType; label: string; sub: string }[]).map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    id={`pariwar-type-${opt.id}`}
                    onClick={() => setBookingType(opt.id)}
                    className={`flex flex-col items-start gap-0.5 rounded-[14px] border px-4 py-3 text-left transition-all duration-200 ${
                      bookingType === opt.id
                        ? "border-gold bg-gold-soft text-ink"
                        : "border-line bg-white text-ink-soft hover:border-gold/50"
                    }`}
                  >
                    <span className="text-[13px] font-semibold">{opt.label}</span>
                    <span className="text-[11px] text-muted-2">{opt.sub}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Stay period */}
            <div>
              <div className="mb-3 text-[11px] font-semibold tracking-[0.14em] text-gold-deep uppercase">
                Stay Period
              </div>
              <div className="grid grid-cols-2 gap-2">
                {([
                  { id: "short", label: "Short Stay", sub: "Any duration" },
                  { id: "long", label: "Long Stay", sub: "Min. 10 nights · Special rate" },
                ] as { id: StayPeriod; label: string; sub: string }[]).map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    id={`pariwar-period-${opt.id}`}
                    onClick={() => setStayPeriod(opt.id)}
                    className={`flex flex-col items-start gap-0.5 rounded-[14px] border px-4 py-3 text-left transition-all duration-200 ${
                      stayPeriod === opt.id
                        ? "border-gold bg-gold-soft text-ink"
                        : "border-line bg-white text-ink-soft hover:border-gold/50"
                    }`}
                  >
                    <span className="text-[13px] font-semibold">{opt.label}</span>
                    <span className="text-[11px] text-muted-2">{opt.sub}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Dates */}
            <div className="grid grid-cols-2 gap-4">
              <label className="block">
                <span className="mb-1.5 block text-[13px] font-semibold text-ink-soft">Check-in Date</span>
                <input
                  type="date"
                  id="pariwar-checkin"
                  required
                  min={todayIso()}
                  value={checkIn}
                  onChange={(e) => {
                    setCheckIn(e.target.value);
                    if (checkOut < e.target.value) setCheckOut(e.target.value);
                  }}
                  className="w-full rounded-xl border border-line bg-white px-4 py-3 text-[15px] font-medium text-ink transition-colors focus:border-gold focus:outline-none"
                />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-[13px] font-semibold text-ink-soft">Check-out Date</span>
                <input
                  type="date"
                  id="pariwar-checkout"
                  required
                  min={checkIn}
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="w-full rounded-xl border border-line bg-white px-4 py-3 text-[15px] font-medium text-ink transition-colors focus:border-gold focus:outline-none"
                />
              </label>
            </div>

            {/* Guests */}
            <label className="block">
              <span className="mb-1.5 block text-[13px] font-semibold text-ink-soft">
                Number of Guests (max {maxGuests})
              </span>
              <select
                id="pariwar-guests"
                value={guests}
                onChange={(e) => setGuests(parseInt(e.target.value))}
                className="w-full rounded-xl border border-line bg-white px-4 py-3 text-[15px] font-medium text-ink transition-colors focus:border-gold focus:outline-none appearance-none"
              >
                {Array.from({ length: maxGuests }, (_, i) => i + 1).map((n) => (
                  <option key={n} value={n}>{n} Guest{n > 1 ? "s" : ""}</option>
                ))}
              </select>
            </label>

            {/* Name + Phone */}
            <div className="grid grid-cols-2 gap-4">
              <label className="block">
                <span className="mb-1.5 block text-[13px] font-semibold text-ink-soft">
                  Your Name <span className="text-gold-deep">*</span>
                </span>
                <input
                  type="text"
                  id="pariwar-name"
                  required
                  placeholder="Full name"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  className="w-full rounded-xl border border-line bg-white px-4 py-3 text-[15px] font-medium text-ink placeholder:text-faint transition-colors focus:border-gold focus:outline-none"
                />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-[13px] font-semibold text-ink-soft">
                  Phone <span className="text-gold-deep">*</span>
                </span>
                <input
                  type="tel"
                  id="pariwar-phone"
                  required
                  placeholder="10-digit number"
                  maxLength={10}
                  value={guestPhone}
                  onChange={(e) => setGuestPhone(e.target.value)}
                  className="w-full rounded-xl border border-line bg-white px-4 py-3 text-[15px] font-medium text-ink placeholder:text-faint transition-colors focus:border-gold focus:outline-none"
                />
              </label>
            </div>

            {/* Live price display */}
            <div
              className={`rounded-[16px] p-4 text-center transition-colors duration-300 ${
                error
                  ? "bg-red-50 border border-red-200"
                  : price !== null
                  ? "bg-[#f0faf3] border border-[#c3e6cb]"
                  : "bg-panel border border-line"
              }`}
            >
              {error ? (
                <div className="flex items-center justify-center gap-2 text-[14px] font-semibold text-red-600">
                  <X className="w-[14px] h-[14px]" />
                  {error}
                </div>
              ) : price !== null ? (
                <>
                  <div className="text-[11px] font-semibold tracking-[0.12em] text-[#2e7d32] uppercase mb-1">
                    Estimated Price (excl. 5% GST)
                  </div>
                  <div className="font-display text-[32px] font-semibold text-[#2e7d32]">
                    ₹{price.toLocaleString()}
                  </div>
                  <div className="text-[12px] text-[#4a9f59] font-medium mt-0.5">
                    for {getNumberOfNights(checkIn, checkOut)} night{getNumberOfNights(checkIn, checkOut) > 1 ? "s" : ""} · {guests} guest{guests > 1 ? "s" : ""}
                  </div>
                </>
              ) : (
                <div className="text-[14px] font-medium text-muted-2">
                  Select dates & guests to see live price
                </div>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              id="pariwar-enquire-whatsapp"
              className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-ink px-8 py-4 text-[15px] font-semibold text-white transition-transform duration-[220ms] hover:scale-[1.015]"
            >
              <Check className="w-[12px] h-[12px]" />
              Enquire on WhatsApp
              <ArrowRight className="w-[12px] h-[12px] transition-transform duration-[220ms] group-hover:translate-x-1" />
            </button>

            <p className="text-center text-[11.5px] font-medium text-faint">
              Our team responds within 2 hours · No advance payment required
            </p>
          </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
