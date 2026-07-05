import type { Metadata } from "next";
import { Check } from "lucide-react";
import { GuideLines } from "@/components/GuideLines";
import { Reveal } from "@/components/Reveal";
import { MaskReveal } from "@/components/MaskReveal";
import { WarmVideo } from "@/components/WarmVideo";
import { VideoTile } from "@/components/VideoTile";
import { PageHero } from "@/components/PageHero";
import { TariffCard } from "@/components/TariffCard";
import { cldVideo } from "@/lib/cloudinary";
import { FeatureIcon } from "@/components/FeatureIcon";
import { waLink } from "@/lib/content";
import {
  banquetEventTypes,
  banquetTariffExtras,
  banquetTariffRows,
  banquetVideoGallery,
  haldiMehandiHighlights,
} from "@/app/banquet/content";
import { EnquiryForm } from "@/app/banquet/EnquiryForm";

export const metadata: Metadata = {
  title: "Banquet Hall & Events | Welcome Palace Surat",
  description:
    "Book Welcome Palace's Banquet Hall in Surat for 125–175 guests — weddings, Satsang, Haldi, Mehandi, Sangeet, corporate meets and more, with outside catering allowed.",
};

export default function BanquetPage() {
  return (
    <>
      <PageHero
        videoSrc={cldVideo("banquet/wedding-function.mp4")}
        eyebrow="125–175 Guests · Full Privacy"
        title="Banquet Hall & Events"
        subtitle="Celebrations • Weddings • Corporate • Haldi • Mehandi • Sangeet • Satsang"
      />

      <section className="relative overflow-hidden py-[clamp(56px,8vh,104px)]">
        <GuideLines />
        <div className="relative z-10 mx-auto max-w-[1180px] px-[clamp(18px,4vw,54px)]">
          <Reveal className="inline-flex rounded-full border border-line-soft px-3.5 py-[7px] text-[11px] font-semibold tracking-[0.14em] text-muted uppercase">
            A Home-Like Royal Experience
          </Reveal>
          <h2 className="mt-4 max-w-[22ch] font-display text-[clamp(30px,4.4vw,54px)] leading-[1.12] font-semibold tracking-tight">
            <MaskReveal lines={[{ content: "Banquet Hall" }]} />
          </h2>
          <Reveal delay={0.1} as="p" className="mt-[18px] max-w-[62ch] text-[15px] leading-[1.7] font-medium text-muted-2">
            Perfectly designed for intimate gatherings of 125–150 guests. This is where memories are made —
            from the soulful chants of Satsang &amp; Mata Ki Chowki to the vibrant colors of Haldi, Mehandi,
            Sangeet and grand celebrations.
          </Reveal>

          <Reveal delay={0.16} className="mt-[38px] grid gap-6 md:grid-cols-[1.25fr_1fr]">
            <WarmVideo src={cldVideo("banquet-hall-tour.mp4")} className="min-h-[420px] rounded-[22px]" />

            <div className="flex flex-col rounded-[22px] border border-line bg-panel p-[26px]">
              <div className="text-[11px] font-semibold tracking-[0.14em] text-gold-deep uppercase">
                The Banquet Hall
              </div>
              <p className="mt-3.5 text-[15px] leading-[1.7] font-medium text-ink-soft">
                Perfect for up to 175 guests. Professional AV setup, projector, microphones, Wi-Fi &amp;
                elegant seating.
              </p>

              <div className="mt-6 grid grid-cols-2 gap-3">
                {banquetEventTypes.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center gap-2.5 rounded-2xl border border-line bg-white px-4 py-3.5"
                  >
                    <span className="inline-flex h-9 w-9 flex-none items-center justify-center rounded-full bg-gold-soft text-[14px] text-gold-deep">
                      <FeatureIcon name={item.icon} />
                    </span>
                    <span className="text-[13.5px] font-semibold text-ink-soft">{item.label}</span>
                  </div>
                ))}
              </div>

              <a
                href={waLink("Hi Welcome Palace! I'd like to enquire about the Banquet Hall. Please share available dates & slots.")}
                target="_blank"
                rel="noopener"
                className="mt-6 inline-flex items-center justify-center gap-[9px] rounded-full bg-ink px-[22px] py-3.5 text-[14px] font-semibold text-white no-underline transition-transform duration-[220ms] hover:scale-[1.02]"
              >
                Enquire on WhatsApp
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-[clamp(56px,8vh,104px)]">
        <div className="mx-auto max-w-[1180px] px-[clamp(18px,4vw,54px)]">
          <Reveal className="inline-flex rounded-full border border-line-soft px-3.5 py-[7px] text-[11px] font-semibold tracking-[0.14em] text-muted uppercase">
            In The Moment
          </Reveal>
          <Reveal delay={0.08} as="h2" className="mt-4 max-w-[24ch] font-display text-[clamp(28px,4vw,46px)] leading-[1.1] font-semibold tracking-tight">
            Every Celebration, Captured
          </Reveal>

          <div className="mt-[34px] grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6">
            {banquetVideoGallery.map((item, i) => (
              <Reveal key={item.label} delay={i * 0.08}>
                <VideoTile src={item.src} label={item.label} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-panel py-[clamp(56px,8vh,104px)]">
        <GuideLines />
        <div className="relative z-10 mx-auto max-w-[720px] px-[clamp(18px,4vw,54px)]">
          <Reveal>
            <TariffCard
              title="Banquet Tariff"
              badge="Outside Catering Allowed"
              rows={banquetTariffRows}
              extras={banquetTariffExtras}
              footnote="Comfortable for 125–150 guests, up to 175 maximum. Please confirm current pricing at booking."
              className="border-2 border-line-strong bg-white shadow-[0_30px_70px_-40px_rgba(20,16,10,0.35)]"
            >
              <a
                href={waLink("Hi Welcome Palace! I'd like to book the Banquet Hall. Please share available dates & slots.")}
                target="_blank"
                rel="noopener"
                className="mt-5 inline-flex items-center justify-center gap-[9px] rounded-full bg-ink px-[22px] py-3.5 text-[14px] font-semibold text-white no-underline transition-transform duration-[220ms] hover:scale-[1.02]"
              >
                <Check className="w-[11px] h-[11px]" />
                Book Banquet Now
              </a>
            </TariffCard>
          </Reveal>
        </div>
      </section>

      <section className="py-[clamp(56px,8vh,104px)]">
        <div className="mx-auto max-w-[1180px] px-[clamp(18px,4vw,54px)]">
          <Reveal className="inline-flex rounded-full border border-line-soft px-3.5 py-[7px] text-[11px] font-semibold tracking-[0.14em] text-muted uppercase">
            Colors & Traditions
          </Reveal>
          <Reveal delay={0.08} as="h2" className="mt-4 max-w-[24ch] font-display text-[clamp(28px,4vw,46px)] leading-[1.1] font-semibold tracking-tight">
            Haldi &amp; Mehandi Highlights
          </Reveal>

          <div className="mt-[34px] grid grid-cols-2 gap-5 md:grid-cols-4">
            {haldiMehandiHighlights.map((item, i) => (
              <Reveal key={item.label} delay={i * 0.08}>
                <VideoTile src={item.src} label={item.label} className="aspect-[4/5]" />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-[clamp(56px,8vh,104px)]">
        <GuideLines />
        <div className="relative z-10 mx-auto max-w-[1180px] px-[clamp(18px,4vw,54px)]">
          <EnquiryForm />
        </div>
      </section>
    </>
  );
}
