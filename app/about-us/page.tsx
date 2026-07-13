import type { Metadata } from "next";
import { ArrowRight, MapPin, Phone } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { MaskReveal } from "@/components/MaskReveal";
import { GuideLines } from "@/components/GuideLines";
import { WarmVideo } from "@/components/WarmVideo";
import { WarmImage } from "@/components/WarmImage";
import { CountUp } from "@/components/CountUp";
import { FeatureIcon } from "@/components/FeatureIcon";
import { cldImage, cldVideo } from "@/lib/cloudinary";
import { contact, waLink } from "@/lib/content";
import { journeyMilestones, missionVisionValues, highlightCards } from "@/app/about-us/content";
import { Testimonials } from "@/app/about-us/Testimonials";
import { PolicyAccordion } from "@/app/about-us/PolicyAccordion";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";

const description =
  "Welcome Palace - Surat's premium Shadi Wala Ghar & luxury hotel since 2013. A unit of TW Hospitality Services Pvt. Ltd. Rooms, Banquet, Live Kitchen, Catering & more.";

const title = "About Us | Welcome Palace - Luxury Stay & Banquets Surat";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "about Welcome Palace",
    "TW Hospitality Services",
    "hotel Piplod Surat since 2013",
    "Shadi Wala Ghar Surat",
    "Welcome Palace reviews",
  ],
  alternates: { canonical: "/about-us" },
  openGraph: {
    type: "website",
    url: "/about-us",
    title,
    description,
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "About Welcome Palace" }],
  },
  twitter: { card: "summary_large_image", title, description, images: ["/opengraph-image"] },
};

export default function AboutUsPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "About Us", path: "/about-us" },
        ])}
      />
      <PageHero
        videoSrc={cldVideo("new/pariwar-niwas-hero.mp4")}
        eyebrow="Piplod, Surat · Est. 2013"
        title="About Welcome Palace"
        subtitle="Your Home for Memorable Celebrations & Luxury Family Stays in Surat"
      />

      {/* Our Story */}
      <section className="relative overflow-hidden py-[clamp(56px,8vh,104px)]">
        <GuideLines />
        <div className="relative z-10 mx-auto max-w-[1180px] px-[clamp(18px,4vw,54px)]">
          <div className="grid items-center gap-[clamp(32px,5vw,72px)] md:grid-cols-[1fr_1.05fr]">
            <Reveal className="aspect-[4/5] rounded-[22px] shadow-[0_30px_60px_-34px_rgba(20,16,10,0.35)] md:order-2">
              <WarmVideo src={cldVideo("new/room-101-tour.mp4")} className="h-full w-full rounded-[22px]">
                <span className="absolute top-5 left-5 rounded-full bg-white/92 px-3.5 py-[7px] text-[11px] font-semibold tracking-[0.08em] text-ink uppercase">
                  Property Experience
                </span>
              </WarmVideo>
            </Reveal>

            <div className="md:order-1">
              <Reveal className="inline-flex rounded-full border border-line-soft px-3.5 py-[7px] text-[11px] font-semibold tracking-[0.14em] text-muted uppercase">
                A Unit of TW Hospitality Services Private Limited
              </Reveal>
              <Reveal
                delay={0.08}
                as="h2"
                className="mt-4 font-display text-[clamp(30px,4.4vw,54px)] leading-[1.05] font-semibold tracking-tight"
              >
                Welcome to Your <em className="italic">Shadi Wala Ghar</em>
              </Reveal>
              <Reveal delay={0.16} as="p" className="mt-5 max-w-[54ch] text-[16px] leading-[1.75] font-medium text-muted">
                Welcome Palace is more than just a hotel — it is Surat&rsquo;s most preferred destination for
                luxury family stays and grand celebrations. We pioneered the &ldquo;Shadi Wala Ghar&rdquo;
                concept, where your entire family stays together under one roof with a private banquet hall,
                live kitchen, and complete privacy.
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Our Journey */}
      <section className="relative overflow-hidden bg-panel py-[clamp(56px,8vh,104px)]">
        <GuideLines />
        <div className="relative z-10 mx-auto max-w-[1180px] px-[clamp(18px,4vw,54px)]">
          <div className="mx-auto max-w-[640px] text-center">
            <Reveal className="mx-auto inline-flex rounded-full border border-line-soft px-3.5 py-[7px] text-[11px] font-semibold tracking-[0.14em] text-muted uppercase">
              Our Journey
            </Reveal>
            <h2 className="mt-4 font-display text-[clamp(30px,4.4vw,52px)] leading-[1.05] font-semibold tracking-tight">
              <MaskReveal lines={[{ content: "From Furniture Craft to" }, { content: "Hospitality Excellence", delaySeconds: 0.1 }]} />
            </h2>
          </div>

          <div className="relative mx-auto mt-[54px] max-w-[820px]">
            <div className="absolute top-0 bottom-0 left-[15px] w-px bg-line-soft md:left-1/2" />
            <div className="space-y-10">
              {journeyMilestones.map((milestone, i) => (
                <Reveal
                  key={milestone.year}
                  delay={i * 0.1}
                  className={`relative flex flex-col gap-4 pl-10 md:w-1/2 md:pl-0 ${
                    i % 2 === 0 ? "md:pr-12 md:text-right" : "md:ml-auto md:pl-12"
                  }`}
                >
                  <span
                    className={`absolute top-1.5 left-[9px] h-3 w-3 rounded-full border-2 border-gold bg-white md:top-1.5 ${
                      i % 2 === 0 ? "md:right-[-7px] md:left-auto" : "md:left-[-7px]"
                    }`}
                  />
                  <div className="rounded-[20px] border border-line bg-white p-6">
                    <span className="inline-flex rounded-full bg-gold-soft px-3 py-1 text-[12px] font-semibold text-gold-deep">
                      {milestone.year}
                    </span>
                    <h3 className="mt-3 font-display text-[19px] font-semibold text-ink">{milestone.title}</h3>
                    <p className="mt-2.5 text-[14.5px] leading-[1.7] font-medium text-muted">{milestone.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision & Values */}
      <section className="relative overflow-hidden py-[clamp(56px,8vh,104px)]">
        <GuideLines />
        <div className="relative z-10 mx-auto max-w-[1180px] px-[clamp(18px,4vw,54px)]">
          <div className="mx-auto max-w-[640px] text-center">
            <Reveal className="mx-auto inline-flex rounded-full border border-line-soft px-3.5 py-[7px] text-[11px] font-semibold tracking-[0.14em] text-muted uppercase">
              What Drives Us
            </Reveal>
            <Reveal
              delay={0.08}
              as="h2"
              className="mt-4 font-display text-[clamp(30px,4.4vw,52px)] leading-[1.05] font-semibold tracking-tight"
            >
              Mission, Vision &amp; Values
            </Reveal>
          </div>

          <div className="mt-[42px] grid gap-6 md:grid-cols-3">
            <Reveal className="rounded-[22px] border border-line bg-white p-[30px]">
              <span className="inline-flex rounded-full bg-gold-soft px-3 py-1 text-[11px] font-semibold tracking-[0.1em] text-gold-deep uppercase">
                Mission
              </span>
              <p className="mt-4 text-[15px] leading-[1.75] font-medium text-muted">{missionVisionValues.mission}</p>
            </Reveal>
            <Reveal delay={0.08} className="rounded-[22px] border border-line bg-white p-[30px]">
              <span className="inline-flex rounded-full bg-gold-soft px-3 py-1 text-[11px] font-semibold tracking-[0.1em] text-gold-deep uppercase">
                Vision
              </span>
              <p className="mt-4 text-[15px] leading-[1.75] font-medium text-muted">{missionVisionValues.vision}</p>
            </Reveal>
            <Reveal delay={0.16} className="rounded-[22px] border border-line bg-dark-2 p-[30px] text-white">
              <span className="inline-flex rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold tracking-[0.1em] text-gold uppercase">
                Core Values
              </span>
              <ul className="mt-4 grid grid-cols-2 gap-y-2.5 gap-x-3">
                {missionVisionValues.values.map((value) => (
                  <li key={value} className="flex items-center gap-2 text-[14px] font-medium text-white/85">
                    <span className="h-1.5 w-1.5 flex-none rounded-full bg-gold" />
                    {value}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Blessings of Baba Neem Karoli */}
      <section className="relative overflow-hidden bg-gold-soft/40 py-[clamp(56px,8vh,104px)]">
        <div className="relative z-10 mx-auto max-w-[880px] px-[clamp(18px,4vw,54px)] text-center">
          <Reveal className="mx-auto h-[104px] w-[104px] overflow-hidden rounded-full border-4 border-white shadow-[0_20px_44px_-20px_rgba(154,123,43,0.5)]">
            <WarmImage
              src={cldImage("baba-neem-karoli.jpg")}
              alt="Baba Neem Karoli, spiritual guide"
              fill
              sizes="104px"
              className="h-full w-full rounded-full"
            />
          </Reveal>
          <Reveal
            delay={0.08}
            as="h2"
            className="mt-6 font-display text-[clamp(26px,3.6vw,42px)] leading-[1.1] font-semibold tracking-tight text-ink"
          >
            With the Blessings of Baba Neem Karoli
          </Reveal>
          <Reveal delay={0.16} as="p" className="mx-auto mt-4 max-w-[62ch] text-[16px] leading-[1.8] font-medium text-ink-soft">
            Guided by the divine blessings of Baba Neem Karoli, TW Hospitality Services Pvt. Ltd. thrives in
            delivering exceptional hospitality and timeless craftsmanship. His teachings of love and service
            inspire us to create meaningful experiences for our guests.
          </Reveal>
        </div>
      </section>

      {/* Why Families Choose Welcome Palace */}
      <section className="relative overflow-hidden py-[clamp(56px,8vh,104px)]">
        <GuideLines />
        <div className="relative z-10 mx-auto max-w-[1180px] px-[clamp(18px,4vw,54px)]">
          <div className="mx-auto max-w-[640px] text-center">
            <Reveal className="mx-auto inline-flex rounded-full border border-line-soft px-3.5 py-[7px] text-[11px] font-semibold tracking-[0.14em] text-muted uppercase">
              Why Families Choose Us
            </Reveal>
            <h2 className="mt-4 font-display text-[clamp(30px,4.4vw,52px)] leading-[1.05] font-semibold tracking-tight">
              <MaskReveal lines={[{ content: "Everything Your Celebration" }, { content: "Needs, in One Place", delaySeconds: 0.1 }]} />
            </h2>
          </div>

          <div className="mt-[42px] grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {highlightCards.map((card, i) => (
              <Reveal key={card.title} delay={i * 0.08} className="group flex flex-col overflow-hidden rounded-[22px] border border-line bg-white">
                <WarmImage
                  src={card.image}
                  alt={card.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="aspect-[4/3] w-full"
                >
                  <span className="absolute top-3.5 left-3.5 flex h-9 w-9 items-center justify-center rounded-full bg-white/92 text-[14px] text-gold-deep">
                    <FeatureIcon name={card.icon} />
                  </span>
                </WarmImage>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-display text-[17px] font-semibold text-ink">{card.title}</h3>
                  <p className="mt-2 flex-1 text-[13.5px] leading-[1.6] font-medium text-muted">{card.description}</p>
                  <div className="mt-4 border-t border-line-soft pt-3.5">
                    {card.stat.kind === "count" ? (
                      <div className="flex items-baseline gap-1.5">
                        <CountUp
                          target={card.stat.target}
                          suffix={card.stat.suffix}
                          className="font-display text-[20px] font-semibold text-gold-deep"
                        />
                        <span className="text-[12px] font-medium text-muted-2">{card.stat.caption}</span>
                      </div>
                    ) : (
                      <div className="font-display text-[17px] font-semibold text-gold-deep">{card.stat.value}</div>
                    )}
                    <div className="mt-1 text-[11px] font-semibold tracking-[0.06em] text-faint uppercase">
                      {card.statLabel}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Cancellation Policy */}
      <section className="relative overflow-hidden bg-panel py-[clamp(56px,8vh,104px)]">
        <GuideLines />
        <div className="relative z-10 mx-auto max-w-[1180px] px-[clamp(18px,4vw,54px)]">
          <div className="mx-auto max-w-[640px] text-center">
            <Reveal className="mx-auto inline-flex rounded-full border border-line-soft px-3.5 py-[7px] text-[11px] font-semibold tracking-[0.14em] text-muted uppercase">
              Booking Policy
            </Reveal>
            <Reveal
              delay={0.08}
              as="h2"
              className="mt-4 font-display text-[clamp(30px,4.4vw,52px)] leading-[1.05] font-semibold tracking-tight"
            >
              Cancellation Policy
            </Reveal>
            <Reveal delay={0.16} as="p" className="mx-auto mt-4 max-w-[52ch] text-[15px] leading-[1.7] font-medium text-muted-2">
              Clear, fair terms for rooms, banquet bookings and catering services.
            </Reveal>
          </div>

          <PolicyAccordion />
        </div>
      </section>

      {/* Testimonials */}
      <section className="relative overflow-hidden py-[clamp(56px,8vh,104px)]">
        <GuideLines />
        <div className="relative z-10 mx-auto max-w-[1180px] px-[clamp(18px,4vw,54px)]">
          <div className="mx-auto max-w-[640px] text-center">
            <Reveal className="mx-auto inline-flex rounded-full border border-line-soft px-3.5 py-[7px] text-[11px] font-semibold tracking-[0.14em] text-muted uppercase">
              Guest Stories
            </Reveal>
            <h2 className="mt-4 font-display text-[clamp(30px,4.4vw,52px)] leading-[1.05] font-semibold tracking-tight">
              <MaskReveal lines={[{ content: "What Our Families Say" }]} />
            </h2>
          </div>

          <Testimonials />
        </div>
      </section>

      {/* Visit Us / Location */}
      <section className="relative overflow-hidden py-[clamp(56px,8vh,104px)]">
        <GuideLines />
        <div className="relative z-10 mx-auto max-w-[1180px] px-[clamp(18px,4vw,54px)]">
          <div className="grid items-start gap-[clamp(28px,4vw,64px)] md:grid-cols-2">
            <div>
              <Reveal className="inline-flex rounded-full border border-line-soft px-3.5 py-[7px] text-[11px] font-semibold tracking-[0.14em] text-muted uppercase">
                Visit Us
              </Reveal>
              <Reveal
                delay={0.08}
                as="h2"
                className="mt-4 font-display text-[clamp(30px,4.4vw,52px)] leading-[1.05] font-semibold tracking-tight"
              >
                Find Us in Piplod, Surat
              </Reveal>
              <Reveal delay={0.16} className="mt-6 flex items-start gap-3.5 rounded-2xl border border-line bg-white p-5">
                <MapPin className="mt-0.5 flex-none w-[18px] h-[18px] text-gold-deep" />
                <p className="text-[15px] leading-[1.7] font-medium text-ink-soft">{contact.fullAddress}</p>
              </Reveal>

              <Reveal delay={0.24} className="mt-5 space-y-3">
                {contact.aboutPagePhones.map((phone) => (
                  <a
                    key={phone}
                    href={`tel:${phone.replace(/\s+/g, "")}`}
                    className="flex items-center gap-3.5 rounded-2xl border border-line bg-white p-4 text-[15px] font-semibold text-ink-soft no-underline transition-colors duration-[220ms] hover:border-line-strong"
                  >
                    <Phone className="w-[15px] h-[15px] text-gold-deep" />
                    {phone}
                  </a>
                ))}
              </Reveal>

              <Reveal delay={0.32} className="mt-6">
                <a
                  href={waLink("Hi Welcome Palace! I'd like to know more about your property and services.")}
                  target="_blank"
                  rel="noopener"
                  className="inline-flex items-center gap-2.5 rounded-full bg-ink px-[26px] py-3.5 text-[15px] font-semibold text-white no-underline transition-transform duration-[220ms] hover:scale-[1.03]"
                >
                  Chat on WhatsApp
                  <ArrowRight className="w-[13px] h-[13px]" />
                </a>
              </Reveal>
            </div>

            <Reveal delay={0.16} className="overflow-hidden rounded-2xl border border-line">
              <iframe
                src={contact.mapEmbed}
                width="100%"
                height="440"
                style={{ border: 0, display: "block" }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Welcome Palace location in Piplod, Surat"
              />
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
