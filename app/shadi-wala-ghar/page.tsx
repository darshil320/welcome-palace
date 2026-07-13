import type { Metadata } from "next";
import { Check, Waves, Heart, Users } from "lucide-react";
import { GuideLines } from "@/components/GuideLines";
import { MaskReveal } from "@/components/MaskReveal";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { cldVideo } from "@/lib/cloudinary";
import { TariffCard } from "@/components/TariffCard";
import { WarmImage } from "@/components/WarmImage";
import {
  accommodationRows,
  banquetTariffExtras,
  banquetTariffRows,
  buyoutRow,
  eliteFeatures,
  gallery,
  occupancyStats,
} from "@/app/shadi-wala-ghar/content";
import { EnquiryForm } from "@/app/shadi-wala-ghar/EnquiryForm";
import { JsonLd } from "@/components/JsonLd";
import { FaqBlock } from "@/components/FaqBlock";
import { breadcrumbSchema, shadiServiceSchema, faqSchema } from "@/lib/schema";
import { shadiFaqs } from "@/lib/faqs";

const description =
  "Book the entire floor at Welcome Palace Surat — 16 rooms plus a private banquet hall so your whole family stays, eats and celebrates together, from ₹61,000 for a full 60-pax buyout.";

const title = "Shadi Wala Ghar | Welcome Palace Surat - Family Wedding Stay";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "Shadi Wala Ghar",
    "family wedding stay Surat",
    "entire floor booking Surat",
    "wedding home Surat",
    "family function venue Surat",
    "wedding accommodation Piplod",
    "group stay Surat wedding",
  ],
  alternates: { canonical: "/shadi-wala-ghar" },
  openGraph: {
    type: "website",
    url: "/shadi-wala-ghar",
    title,
    description,
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Shadi Wala Ghar family wedding stay" }],
  },
  twitter: { card: "summary_large_image", title, description, images: ["/opengraph-image"] },
};

const eliteHighlights = [
  { icon: Waves, label: "Jacuzzi Suites" },
  { icon: Users, label: "Family Groups" },
  { icon: Heart, label: "Full Privacy" },
];

export default function ShadiWalaGharPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Shadi Wala Ghar", path: "/shadi-wala-ghar" },
        ])}
      />
      <JsonLd data={shadiServiceSchema()} />
      <JsonLd data={faqSchema(shadiFaqs)} />
      <PageHero
        videoSrc={cldVideo("new/pariwar-niwas-hero.mp4")}
        eyebrow="Piplod, Surat"
        title="Shadi Wala Ghar"
        subtitle="Entire Floor • All Rooms • Banquet Hall • Family Stays Together"
      />

      {/* Intro */}
      <section className="relative overflow-hidden bg-white py-[clamp(56px,8vh,104px)]">
        <GuideLines />
        <div className="relative z-10 mx-auto max-w-[1180px] px-[clamp(18px,4vw,54px)]">
          <div className="grid items-center gap-[clamp(32px,5vw,72px)] md:grid-cols-[1fr_1fr]">
            <div>
              <Reveal className="inline-flex rounded-full border border-line-soft px-3.5 py-[7px] text-[11px] font-semibold tracking-[0.14em] text-muted uppercase">
                A Ghar-Jaisa Wedding Experience
              </Reveal>
              <h2 className="mt-4 font-display text-[clamp(30px,4.4vw,54px)] leading-[1.05] font-semibold tracking-tight">
                <MaskReveal
                  lines={[
                    { content: "Shaadi Wala" },
                    { content: <em className="italic">Ghar</em>, delaySeconds: 0.1 },
                  ]}
                />
              </h2>
              <Reveal delay={0.16} as="p" className="mt-5 max-w-[54ch] text-[16px] leading-[1.75] font-medium text-muted">
                Experience the true &ldquo;Shadi Wala Ghar&rdquo;. We provide an entire floor of rooms
                paired with our small banquet hall so your family stays together, eats together, and
                celebrates together under one roof.
              </Reveal>
              <Reveal delay={0.26} className="mt-7 flex flex-wrap gap-2.5">
                {["Entire Floor", "16 Rooms", "Private Banquet Hall", "Live Kitchen"].map((tag) => (
                  <span key={tag} className="rounded-full bg-chip px-[13px] py-[7px] text-[12px] font-semibold text-ink-soft">
                    {tag}
                  </span>
                ))}
              </Reveal>
            </div>

            <Reveal className="grid grid-cols-2 gap-4">
              <WarmImage
                src={gallery[0].src}
                alt={gallery[0].alt}
                fill
                sizes="(max-width: 820px) 50vw, 26vw"
                className="aspect-[4/5] rounded-[20px]"
              />
              <div className="flex flex-col gap-4">
                <WarmImage
                  src={gallery[1].src}
                  alt={gallery[1].alt}
                  fill
                  sizes="(max-width: 820px) 50vw, 26vw"
                  className="aspect-square rounded-[20px]"
                />
                <WarmImage
                  src={gallery[2].src}
                  alt={gallery[2].alt}
                  fill
                  sizes="(max-width: 820px) 50vw, 26vw"
                  className="aspect-square rounded-[20px]"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Accommodation Portfolio */}
      <section className="relative overflow-hidden bg-panel py-[clamp(56px,8vh,104px)]">
        <GuideLines />
        <div className="relative z-10 mx-auto max-w-[1180px] px-[clamp(18px,4vw,54px)]">
          <div className="mx-auto max-w-[640px] text-center">
            <Reveal className="inline-flex rounded-full border border-line-soft px-3.5 py-[7px] text-[11px] font-semibold tracking-[0.14em] text-muted uppercase">
              Accommodation Portfolio
            </Reveal>
            <Reveal delay={0.08} as="h2" className="mt-4 font-display text-[clamp(28px,3.8vw,44px)] leading-[1.1] font-semibold tracking-tight">
              Every room, one roof
            </Reveal>
          </div>

          <Reveal delay={0.14} className="mt-10 overflow-hidden rounded-[22px] border border-line bg-white">
            {accommodationRows.map((row, i) => (
              <div
                key={row.label}
                className={`flex flex-wrap items-center justify-between gap-3 px-[clamp(20px,3vw,32px)] py-5 ${
                  i < accommodationRows.length - 1 ? "border-b border-[#efeae1]" : ""
                }`}
              >
                <span className="text-[16px] font-semibold text-ink-soft">
                  {row.label} <span className="text-[13.5px] font-medium text-faint">· {row.detail}</span>
                </span>
                <span className="font-display text-[19px] font-semibold">{row.price}</span>
              </div>
            ))}

            <div className="relative overflow-hidden bg-ink px-[clamp(20px,3vw,32px)] py-7">
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,rgba(201,168,76,0.22),transparent_60%)]" />
              <div className="relative flex flex-wrap items-center justify-between gap-4">
                <div>
                  <span className="inline-flex items-center gap-[7px] rounded-full bg-gold px-[11px] py-[5px] text-[11px] font-semibold tracking-[0.08em] text-[#1c1608] uppercase">
                    Headline Offer
                  </span>
                  <div className="mt-2.5 font-display text-[22px] font-semibold text-white">
                    {buyoutRow.label} <span className="text-[15px] font-medium text-white/65">· {buyoutRow.detail}</span>
                  </div>
                </div>
                <span className="font-display text-[clamp(32px,4vw,44px)] font-semibold text-gold">
                  {buyoutRow.price}
                </span>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.2} className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="flex flex-wrap items-center gap-3 rounded-[18px] border border-line bg-white p-5">
              <Check className="w-[13px] h-[13px] text-gold-deep" />
              <span className="text-[14.5px] font-semibold text-ink-soft">
                Elite Features: 5 Luxury Jacuzzi Tubs &middot; 15&ndash;20 Extra Mattresses &middot; 100%
                Property Privacy
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-3 rounded-[18px] border border-line bg-white p-5">
              <Users className="w-[13px] h-[13px] text-gold-deep" />
              <span className="text-[14.5px] font-semibold text-ink-soft">
                Occupancy: On-Bed 40 Pax &middot; Niwas 12 Pax &middot; Total Guests 61 Pax
              </span>
            </div>
          </Reveal>

          <div className="mt-6 grid grid-cols-3 gap-4">
            {occupancyStats.map((stat, i) => (
              <Reveal key={stat.label} delay={0.1 * i} className="rounded-[18px] border border-line bg-white p-5 text-center">
                <div className="font-display text-[30px] font-semibold text-gold-deep">{stat.value}</div>
                <div className="mt-1 text-[12.5px] font-semibold tracking-[0.04em] text-muted uppercase">{stat.label}</div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.24} className="mt-6 flex flex-wrap gap-2.5">
            {eliteFeatures.map((feature) => (
              <span key={feature} className="inline-flex items-center gap-2 rounded-full bg-gold-soft px-[15px] py-2.5 text-[13px] font-semibold text-gold-deep">
                <Check className="w-[10px] h-[10px]" />
                {feature}
              </span>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Banquet & Special Events */}
      <section className="relative overflow-hidden bg-white py-[clamp(56px,8vh,104px)]">
        <GuideLines />
        <div className="relative z-10 mx-auto max-w-[1180px] px-[clamp(18px,4vw,54px)]">
          <div className="grid items-center gap-[clamp(32px,5vw,72px)] md:grid-cols-[1.05fr_1fr]">
            <div>
              <Reveal className="inline-flex rounded-full border border-line-soft px-3.5 py-[7px] text-[11px] font-semibold tracking-[0.14em] text-muted uppercase">
                Celebrate Under One Roof
              </Reveal>
              <Reveal delay={0.08} as="h2" className="mt-4 font-display text-[clamp(28px,3.8vw,44px)] leading-[1.08] font-semibold tracking-tight">
                Banquet &amp; Special Events
              </Reveal>
              <Reveal delay={0.16} as="p" className="mt-5 max-w-[48ch] text-[15.5px] leading-[1.75] font-medium text-muted">
                Pair your family floor with our banquet hall for Haldi, Sangeet, Mehandi or any function —
                bring your own caterer or use our in-house Chandni Chowk kitchen.
              </Reveal>
              <Reveal delay={0.24} className="mt-7 grid grid-cols-3 gap-3">
                {eliteHighlights.map(({ icon: Icon, label }) => (
                  <div key={label} className="flex flex-col items-center gap-2 rounded-[16px] border border-line bg-panel p-4 text-center">
                    <Icon className="text-[18px] text-gold-deep" />
                    <span className="text-[11.5px] font-semibold text-ink-soft">{label}</span>
                  </div>
                ))}
              </Reveal>
            </div>

            <Reveal delay={0.1}>
              <TariffCard
                title="Banquet & Special Events"
                badge="Outside Catering Allowed"
                rows={banquetTariffRows.map((row) => ({ label: row.label, time: row.time, price: row.price }))}
                extras={[...banquetTariffExtras]}
                footnote="A Unit of TW Hospitality Services Private Limited"
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FaqBlock items={shadiFaqs} eyebrow="Shadi Wala Ghar FAQ" heading="Family Wedding Stay Questions" />

      {/* Enquiry form */}
      <section className="relative overflow-hidden bg-panel py-[clamp(56px,8vh,104px)]">
        <GuideLines />
        <div className="relative z-10 mx-auto max-w-[1180px] px-[clamp(18px,4vw,54px)]">
          <EnquiryForm />
        </div>
      </section>
    </>
  );
}
