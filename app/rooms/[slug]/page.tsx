import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, ChevronRight, Users } from "lucide-react";
import { GuideLines } from "@/components/GuideLines";
import { Reveal } from "@/components/Reveal";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { absoluteUrl } from "@/lib/seo";
import { waLink } from "@/lib/content";
import {
  roomData,
  roomCategories,
  roomAmenities,
  slotLabels,
  type StaySlot,
} from "@/app/rooms/content";
import { roomPdps, getPdpBySlug } from "@/app/rooms/[slug]/pdp-content";
import { PdpGallery } from "@/app/rooms/[slug]/PdpGallery";
import { PdpBooking } from "@/app/rooms/[slug]/PdpBooking";

export async function generateStaticParams() {
  return roomPdps.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const pdp = getPdpBySlug(slug);
  if (!pdp) return {};
  const title = `${pdp.title} | Welcome Palace Surat`;
  return {
    title,
    description: pdp.seoDescription,
    alternates: { canonical: `/rooms/${pdp.slug}` },
    openGraph: {
      type: "website",
      url: `/rooms/${pdp.slug}`,
      title,
      description: pdp.seoDescription,
      images: pdp.gallery.filter((m) => m.type === "image").slice(0, 1).map((m) => m.src),
    },
  };
}

const SLOTS: StaySlot[] = ["3", "6", "12", "24"];

function slotPrice(room: (typeof roomData)[number], slot: StaySlot): number {
  if (slot === "3") return room.base3;
  if (slot === "6") return room.base6;
  if (slot === "12") return room.base12;
  return room.base24;
}

/** HotelRoom schema with per-slot offers — the "PDP" structured data. */
function roomOfferSchema(pdp: NonNullable<ReturnType<typeof getPdpBySlug>>, rooms: typeof roomData) {
  const cheapest = rooms.reduce((a, b) => (a.base24 <= b.base24 ? a : b));
  return {
    "@context": "https://schema.org",
    "@type": "HotelRoom",
    name: pdp.title,
    description: pdp.seoDescription,
    image: pdp.gallery.filter((m) => m.type === "image").map((m) => m.src),
    url: absoluteUrl(`/rooms/${pdp.slug}`),
    occupancy: { "@type": "QuantitativeValue", maxValue: pdp.maxGuests, unitText: "person" },
    containedInPlace: { "@id": `${absoluteUrl("")}/#hotel` },
    offers: SLOTS.map((slot) => ({
      "@type": "Offer",
      name: `${pdp.title} · ${slotLabels[slot]}`,
      price: slotPrice(cheapest, slot),
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
      url: absoluteUrl(`/rooms/${pdp.slug}`),
    })),
  };
}

export default async function RoomPdpPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const pdp = getPdpBySlug(slug);
  if (!pdp) notFound();

  const category = roomCategories.find((c) => c.id === pdp.id)!;
  const rooms = roomData.filter((r) => category.rooms.includes(r.no));

  // Distinct room types within the category (e.g. Deluxe vs Premium Deluxe).
  const typeRows = rooms.filter(
    (room, i) => rooms.findIndex((r) => r.type === room.type) === i
  );

  const otherPdps = roomPdps.filter((p) => p.slug !== pdp.slug);

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Rooms", path: "/rooms" },
          { name: pdp.title, path: `/rooms/${pdp.slug}` },
        ])}
      />
      <JsonLd data={roomOfferSchema(pdp, rooms)} />

      {/* ── Breadcrumb + header ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-[108px] pb-[clamp(40px,6vh,72px)]">
        <GuideLines />
        <div className="relative z-10 mx-auto max-w-[1180px] px-[clamp(18px,4vw,54px)]">
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-[12px] font-medium text-muted">
            <Link href="/" className="no-underline text-muted transition-colors hover:text-ink">Home</Link>
            <ChevronRight className="w-[10px] h-[10px]" />
            <Link href="/rooms" className="no-underline text-muted transition-colors hover:text-ink">Rooms</Link>
            <ChevronRight className="w-[10px] h-[10px]" />
            <span className="text-ink">{pdp.title}</span>
          </nav>

          <div className="mt-5 grid gap-10 lg:grid-cols-[1.25fr_1fr] lg:items-start">
            {/* Gallery */}
            <Reveal>
              <PdpGallery media={pdp.gallery} title={pdp.title} />
            </Reveal>

            {/* Summary / buy box */}
            <Reveal delay={0.08}>
              <div className="lg:sticky lg:top-[104px] rounded-[22px] border border-line bg-white p-[26px]">
                <div className="text-[11px] font-semibold tracking-[0.14em] text-gold-deep uppercase">
                  {category.count}
                </div>
                <h1 className="mt-1.5 font-display text-[clamp(28px,3.6vw,40px)] leading-[1.08] font-semibold tracking-tight">
                  {pdp.title}
                </h1>
                <p className="mt-2 text-[14px] font-medium text-muted">{pdp.tagline}</p>

                <div className="mt-4 flex items-center gap-2 text-[13px] font-medium text-muted-2">
                  <Users className="w-[11px] h-[11px] text-gold-deep" />
                  Up to {pdp.maxGuests} guests per room
                </div>

                {/* Slot price table */}
                <div className="mt-5 overflow-hidden rounded-[14px] border border-line">
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-[12px] sm:text-[13px]" style={{ minWidth: "340px" }}>
                      <thead>
                        <tr className="bg-panel text-left">
                          <th className="px-3 sm:px-4 py-2.5 font-semibold text-muted uppercase tracking-[0.08em] text-[10px] sm:text-[11px]">Room Type</th>
                          {SLOTS.map((s) => (
                            <th key={s} className="px-2 sm:px-3 py-2.5 text-right font-semibold text-muted uppercase tracking-[0.08em] text-[10px] sm:text-[11px]">
                              {s}h
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {typeRows.map((room) => (
                          <tr key={room.type} className="border-t border-line">
                            <td className="px-3 sm:px-4 py-3 font-semibold">{room.type}</td>
                            {SLOTS.map((s) => (
                              <td key={s} className="px-2 sm:px-3 py-3 text-right font-medium text-ink-soft whitespace-nowrap">
                                ₹{slotPrice(room, s).toLocaleString()}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                <p className="mt-2 text-[12px] font-medium text-faint">
                  24h price is per night. 1-guest (−35%) and 2-guest (−15%) discounts on 24h stays · 5% GST applies.
                </p>

                {/* Highlights */}
                <div className="mt-5 grid gap-2.5">
                  {pdp.highlights.map((h) => (
                    <div key={h} className="flex items-center gap-3 text-[13.5px] font-medium text-ink-soft">
                      <span className="flex h-5 w-5 flex-none items-center justify-center rounded-full bg-gold-soft text-gold-deep">
                        <Check className="w-[9px] h-[9px]" />
                      </span>
                      {h}
                    </div>
                  ))}
                </div>

                <a
                  href={waLink(`Hi Welcome Palace! I'd like to book a ${pdp.title.replace(/s$/, "")}. Please share availability.`)}
                  target="_blank"
                  rel="noopener"
                  className="mt-6 inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-ink px-7 py-4 text-[15px] font-semibold text-white no-underline transition-transform duration-[220ms] hover:scale-[1.015]"
                >
                  Enquire on WhatsApp
                </a>
                <a
                  href="tel:+918000014410"
                  className="mt-2.5 inline-flex w-full items-center justify-center gap-2.5 rounded-full border border-line-strong px-7 py-3.5 text-[14px] font-semibold text-ink no-underline transition-colors hover:border-ink hover:bg-ink hover:text-white"
                >
                  +91 80000 14410
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Description + room list ─────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-panel py-[clamp(48px,7vh,88px)]">
        <GuideLines />
        <div className="relative z-10 mx-auto max-w-[1180px] px-[clamp(18px,4vw,54px)]">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr]">
            <Reveal>
              <div>
                <div className="inline-flex rounded-full border border-line-soft px-3.5 py-[7px] text-[11px] font-semibold tracking-[0.14em] text-muted uppercase">
                  About This Room
                </div>
                <h2 className="mt-4 font-display text-[clamp(24px,3.4vw,38px)] leading-[1.1] font-semibold tracking-tight">
                  Comfort, In Detail
                </h2>
                <p className="mt-4 max-w-[58ch] text-[15px] leading-[1.8] font-medium text-muted">
                  {pdp.description}
                </p>

                {/* Amenities */}
                <div className="mt-7 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                  {roomAmenities.map((a) => (
                    <div key={a} className="flex items-center gap-3 text-[13.5px] font-medium text-ink-soft">
                      <span className="flex h-5 w-5 flex-none items-center justify-center rounded-full bg-gold-soft text-gold-deep">
                        <Check className="w-[9px] h-[9px]" />
                      </span>
                      {a}
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div>
                <div className="mb-4 text-[11px] font-semibold tracking-[0.14em] text-gold-deep uppercase">
                  Choose Your Room
                </div>
                <PdpBooking category={pdp.id} roomNos={category.rooms} />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Other categories ────────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-[clamp(48px,7vh,88px)]">
        <GuideLines />
        <div className="relative z-10 mx-auto max-w-[1180px] px-[clamp(18px,4vw,54px)]">
          <Reveal className="inline-flex rounded-full border border-line-soft px-3.5 py-[7px] text-[11px] font-semibold tracking-[0.14em] text-muted uppercase">
            Explore More Stays
          </Reveal>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {otherPdps.map((p, i) => {
              const cat = roomCategories.find((c) => c.id === p.id)!;
              const cover = p.gallery.find((m) => m.type === "image");
              return (
                <Reveal key={p.slug} delay={i * 0.08}>
                  <Link
                    href={`/rooms/${p.slug}`}
                    className="group block no-underline"
                    aria-label={`View ${p.title}`}
                  >
                    <div className="relative aspect-[4/3] overflow-hidden rounded-[18px]">
                      {cover && (
                        <Image
                          src={cover.src}
                          alt={p.title}
                          fill
                          sizes="(max-width: 640px) 100vw, 33vw"
                          className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.2,0.7,0.2,1)] group-hover:scale-[1.06]"
                        />
                      )}
                      <div className="img-warm" />
                      <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_45%,rgba(20,16,10,0.78)_100%)]" />
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <h3 className="font-display text-[18px] font-semibold text-white">{p.title}</h3>
                        <div className="text-[12px] font-medium text-white/75">{cat.priceFrom}</div>
                      </div>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
