import type { Metadata } from "next";
import { Crown } from "lucide-react";
import { GuideLines } from "@/components/GuideLines";
import { MaskReveal } from "@/components/MaskReveal";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { cldVideo } from "@/lib/cloudinary";
import { cateringIntro, luxuryPlans, standardPlans, type CateringPlan } from "@/app/catering/content";
import { EnquiryForm } from "@/app/catering/EnquiryForm";
import { JsonLd } from "@/components/JsonLd";
import { FaqBlock } from "@/components/FaqBlock";
import { breadcrumbSchema, cateringSchema, faqSchema } from "@/lib/schema";
import { cateringFaqs } from "@/lib/faqs";

const description =
  "Pure veg, live-kitchen catering in Surat by Chandni Chowk Live Kitchen — heritage flavours, live counters and six curated plans from ₹650 to ₹1,850 per person.";

const title = "Catering | Chandni Chowk Live Kitchen - Welcome Palace Surat";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "catering in Surat",
    "pure veg catering Surat",
    "wedding catering Surat",
    "live kitchen catering",
    "Chandni Chowk Live Kitchen",
    "vegetarian caterer Piplod",
    "event catering per plate Surat",
  ],
  alternates: { canonical: "/catering" },
  openGraph: {
    type: "website",
    url: "/catering",
    title,
    description,
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Chandni Chowk Live Kitchen catering" }],
  },
  twitter: { card: "summary_large_image", title, description, images: ["/opengraph-image"] },
};

// Flatten the real per-person plans into {name, price, tagline} for Menu schema.
const menuPlans = [...standardPlans, ...luxuryPlans].map((p) => ({
  name: p.name,
  price: Number(p.price.replace(/[^0-9]/g, "")),
  tagline: p.tagline,
}));

function PlanCard({ plan, index }: { plan: CateringPlan; index: number }) {
  return (
    <Reveal
      delay={0.06 * (index % 3)}
      className={`relative flex h-full flex-col rounded-[24px] p-[clamp(24px,3vw,32px)] ${
        plan.luxury
          ? "border-2 border-gold bg-[linear-gradient(165deg,#1a1712_0%,#241f16_100%)] text-white shadow-[0_30px_70px_-40px_rgba(154,123,43,0.55)]"
          : "border border-line bg-white"
      }`}
    >
      {plan.luxury ? (
        <span className="absolute top-6 right-6 inline-flex items-center gap-1.5 rounded-full bg-gold px-3 py-1.5 text-[10.5px] font-bold tracking-[0.12em] text-[#1c1608] uppercase">
          <Crown className="w-[11px] h-[11px]" />
          Luxury
        </span>
      ) : null}

      <h3
        className={`font-display text-[22px] font-semibold tracking-tight ${plan.luxury ? "text-white" : "text-ink"}`}
      >
        {plan.name}
      </h3>
      <p className={`mt-1.5 text-[13.5px] font-medium ${plan.luxury ? "text-white/70" : "text-muted"}`}>
        {plan.tagline}
      </p>

      <div className="mt-5 flex items-baseline gap-1.5">
        <span className={`font-display text-[38px] font-semibold ${plan.luxury ? "text-gold" : "text-gold-deep"}`}>
          {plan.price}
        </span>
        <span className={`text-[13px] font-semibold ${plan.luxury ? "text-white/60" : "text-muted-2"}`}>
          /person
        </span>
      </div>

      <div className={`mt-5 h-px w-full ${plan.luxury ? "bg-white/12" : "bg-line"}`} />

      <ul className="mt-5 grid gap-2.5">
        {plan.items.map((item) => (
          <li
            key={item.label}
            className={`flex items-center justify-between text-[13.5px] font-medium ${
              plan.luxury ? "text-white/85" : "text-ink-soft"
            }`}
          >
            <span>{item.label}</span>
            <span
              className={`inline-flex min-w-[26px] items-center justify-center rounded-full px-2 py-0.5 text-[12px] font-semibold ${
                plan.luxury ? "bg-white/10 text-gold" : "bg-chip text-ink-soft"
              }`}
            >
              {item.count}
            </span>
          </li>
        ))}
      </ul>

      {plan.highlight ? (
        <div className="mt-4 rounded-xl border border-gold/50 bg-gold/10 px-3.5 py-2.5 text-[13px] font-semibold text-gold">
          {plan.highlight}
        </div>
      ) : null}
    </Reveal>
  );
}

export default function CateringPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Catering", path: "/catering" },
        ])}
      />
      <JsonLd data={cateringSchema(menuPlans)} />
      <JsonLd data={faqSchema(cateringFaqs)} />
      <PageHero
        videoSrc={cldVideo("new/chandni-chowk-1.mp4")}
        eyebrow="Taste of Heritage"
        title="Chandni Chowk Live Kitchen"
        subtitle="Pure Veg • Live Counters • Heritage Flavours of Surat"
      />

      {/* Intro */}
      <section className="relative overflow-hidden py-[clamp(56px,8vh,104px)]">
        <GuideLines />
        <div className="relative z-10 mx-auto max-w-[1180px] px-[clamp(18px,4vw,54px)]">
          <div className="max-w-[640px]">
            <Reveal className="inline-flex rounded-full border border-line-soft px-3.5 py-[7px] text-[11px] font-semibold tracking-[0.14em] text-muted uppercase">
              Taste of Heritage
            </Reveal>
            <h2 className="mt-4 font-display text-[clamp(30px,4.4vw,54px)] leading-[1.08] font-semibold tracking-tight">
              <MaskReveal
                lines={[
                  { content: "Chandni Chowk" },
                  {
                    content: <>
                      <em className="italic">Live Kitchen</em>
                    </>,
                    delaySeconds: 0.1,
                  },
                ]}
              />
            </h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {cateringIntro.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <Reveal
                  key={feature.title}
                  delay={0.08 * i}
                  className="flex flex-col gap-4 rounded-[22px] border border-line bg-panel p-[26px]"
                >
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gold-soft text-gold-deep">
                    <Icon className="text-[20px]" />
                  </span>
                  <h3 className="font-display text-[19px] font-semibold">{feature.title}</h3>
                  <p className="text-[14.5px] leading-[1.65] font-medium text-muted-2">{feature.description}</p>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Standard Plans */}
      <section className="relative overflow-hidden bg-white py-[clamp(56px,8vh,104px)]">
        <GuideLines />
        <div className="relative z-10 mx-auto max-w-[1180px] px-[clamp(18px,4vw,54px)]">
          <div className="max-w-[640px]">
            <Reveal className="inline-flex rounded-full border border-line-soft px-3.5 py-[7px] text-[11px] font-semibold tracking-[0.14em] text-muted uppercase">
              Standard Plans
            </Reveal>
            <Reveal
              delay={0.08}
              as="h2"
              className="mt-4 font-display text-[clamp(28px,3.8vw,44px)] leading-[1.1] font-semibold tracking-tight"
            >
              Everyday menus, done right
            </Reveal>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {standardPlans.map((plan, i) => (
              <PlanCard key={plan.name} plan={plan} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Luxury Plans */}
      <section className="relative overflow-hidden bg-[linear-gradient(180deg,#faf8f4_0%,#efece6_100%)] py-[clamp(56px,8vh,104px)]">
        <GuideLines />
        <div className="relative z-10 mx-auto max-w-[1180px] px-[clamp(18px,4vw,54px)]">
          <div className="max-w-[640px]">
            <Reveal className="inline-flex items-center gap-2 rounded-full border border-gold/60 bg-gold-soft px-3.5 py-[7px] text-[11px] font-semibold tracking-[0.14em] text-gold-deep uppercase">
              <Crown className="w-[11px] h-[11px]" />
              Luxury Plans · Minimum 500 Guests
            </Reveal>
            <Reveal
              delay={0.08}
              as="h2"
              className="mt-4 font-display text-[clamp(28px,3.8vw,44px)] leading-[1.1] font-semibold tracking-tight"
            >
              For grand & royal celebrations
            </Reveal>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {luxuryPlans.map((plan, i) => (
              <PlanCard key={plan.name} plan={plan} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FaqBlock items={cateringFaqs} eyebrow="Catering FAQ" heading="Catering Questions, Answered" />

      {/* Enquiry Form */}
      <section className="relative overflow-hidden py-[clamp(56px,8vh,104px)]">
        <GuideLines />
        <div className="relative z-10 mx-auto max-w-[1180px] px-[clamp(18px,4vw,54px)]">
          <EnquiryForm />
        </div>
      </section>
    </>
  );
}
