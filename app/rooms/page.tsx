import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { GuideLines } from "@/components/GuideLines";
import { Reveal } from "@/components/Reveal";
import { MaskReveal } from "@/components/MaskReveal";
import { TariffCard } from "@/components/TariffCard";
import { RomanticStay } from "@/components/RomanticStay";
import { RoomsClient } from "@/app/rooms/RoomsClient";
import { PariwarNiwasBooking } from "@/app/rooms/PariwarNiwasBooking";
import { ThemedDecorSection } from "@/app/rooms/ThemedDecorSection";
import { roomTariffRows, roomAmenities } from "@/app/rooms/content";
import { waLink } from "@/lib/content";
import { FaCheck } from "react-icons/fa6";

export const metadata: Metadata = {
  title: "Rooms & Booking | Welcome Palace Surat",
  description:
    "Book one of 15 luxury rooms at Welcome Palace, Piplod, Surat — Deluxe Rooms from ₹3,500, Suite Rooms from ₹4,500, Honeymoon Suites with Jacuzzi from ₹5,500, Pariwar Niwas family residence at ₹11,000/night.",
};

export default function RoomsPage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <PageHero
        videoSrc="/videos/hero.mp4"
        eyebrow="15 Luxury Rooms · Piplod, Surat"
        title="Rooms & Stays"
        subtitle="Deluxe · Suite · Honeymoon · Family · Pariwar Niwas"
      />

      {/* ── Interactive Room Booking ──────────────────────────────────────
          RoomsClient owns all modal + cart state (client component).
          Wraps: RoomCategorySection, RoomSelectorModal, BookingModal, EnquiryCartPanel
      ─────────────────────────────────────────────────────────────────── */}
      <RoomsClient />

      {/* ── Tariff Overview ──────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-panel py-[clamp(56px,8vh,104px)]">
        <GuideLines />
        <div className="relative z-10 mx-auto max-w-[1180px] px-[clamp(18px,4vw,54px)]">
          <div className="grid gap-8 md:grid-cols-[1.1fr_1fr]">
            {/* Tariff card */}
            <Reveal>
              <TariffCard
                title="Room Tariffs"
                badge="Flexible Stay Slots"
                rows={roomTariffRows}
                extras={["3-hour slot available", "6-hour slot available", "12-hour slot available", "5% GST on all bookings"]}
                footnote="Prices shown are per night (24 hrs). Short-stay slots (3h/6h/12h) are priced separately. 1-guest discount available."
                className="border-2 border-line-strong bg-white shadow-[0_30px_70px_-40px_rgba(20,16,10,0.25)]"
              >
                <a
                  href={waLink("Hi Welcome Palace! I'd like to book a room. Please share availability.")}
                  target="_blank"
                  rel="noopener"
                  className="mt-5 inline-flex items-center justify-center gap-[9px] rounded-full bg-ink px-[22px] py-3.5 text-[14px] font-semibold text-white no-underline transition-transform duration-[220ms] hover:scale-[1.02]"
                >
                  <FaCheck className="text-[11px]" />
                  Book Now via WhatsApp
                </a>
              </TariffCard>
            </Reveal>

            {/* Amenities */}
            <Reveal delay={0.1}>
              <div className="flex flex-col gap-5 rounded-[22px] border border-line bg-white p-[26px]">
                <div className="text-[11px] font-semibold tracking-[0.14em] text-gold-deep uppercase">
                  Every Room Includes
                </div>
                <h3 className="font-display text-[24px] font-semibold leading-tight">
                  Premium Amenities
                </h3>
                <div className="grid grid-cols-1 gap-3">
                  {roomAmenities.map((a) => (
                    <div key={a} className="flex items-center gap-3 text-[14px] font-medium text-ink-soft">
                      <span className="flex h-5 w-5 flex-none items-center justify-center rounded-full bg-gold-soft text-[9px] text-gold-deep">
                        <FaCheck />
                      </span>
                      {a}
                    </div>
                  ))}
                </div>
                <div className="mt-2 rounded-[14px] bg-gold-soft/50 px-4 py-3 text-[13px] font-medium text-gold-deep">
                  Flexible check-in · Romantic décor add-ons available · Family packages on request
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Pariwar Niwas Booking ─────────────────────────────────────────── */}
      <PariwarNiwasBooking />

      {/* ── Romantic Stay ────────────────────────────────────────────────── */}
      <RomanticStay />

      {/* ── Themed Decorations Gallery ───────────────────────────────────── */}
      <ThemedDecorSection />

      {/* ── Final CTA ────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-panel py-[clamp(56px,8vh,90px)]">
        <GuideLines />
        <div className="relative z-10 mx-auto max-w-[720px] px-[clamp(18px,4vw,54px)] text-center">
          <Reveal className="inline-flex rounded-full border border-line-soft px-3.5 py-[7px] text-[11px] font-semibold tracking-[0.14em] text-muted uppercase">
            Your Peaceful Retreat Awaits
          </Reveal>
          <Reveal delay={0.08} as="h2" className="mt-4 font-display text-[clamp(28px,4.2vw,50px)] leading-[1.08] font-semibold tracking-tight">
            <MaskReveal trigger="scroll" lines={[{ content: "Ready to Book Your Stay?" }]} />
          </Reveal>
          <Reveal delay={0.16} as="p" className="mx-auto mt-4 max-w-[52ch] text-[15px] leading-[1.75] font-medium text-muted">
            Call us or send a WhatsApp message — our hospitality team will confirm your room within 2 hours.
          </Reveal>
          <Reveal delay={0.22} className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href={waLink("Hi Welcome Palace! I'd like to book a room. Please help me with availability.")}
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-2.5 rounded-full bg-ink px-[28px] py-4 text-[15px] font-semibold text-white no-underline transition-transform duration-[220ms] hover:scale-[1.03]"
            >
              Enquire on WhatsApp
            </a>
            <a
              href="tel:+918000014410"
              className="inline-flex items-center gap-2.5 rounded-full border border-line-strong px-[28px] py-4 text-[15px] font-semibold text-ink no-underline transition-colors hover:border-ink hover:bg-ink hover:text-white"
            >
              +91 80000 14410
            </a>
          </Reveal>
        </div>
      </section>
    </>
  );
}
