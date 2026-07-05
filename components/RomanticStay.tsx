import { ArrowRight } from "lucide-react";
import { GuideLines } from "@/components/GuideLines";
import { Parallax } from "@/components/Parallax";
import { Reveal } from "@/components/Reveal";
import { WarmVideo } from "@/components/WarmVideo";
import { FeatureIcon } from "@/components/FeatureIcon";
import { romanticFeatures, waLink } from "@/lib/content";
import { cldVideo, cldImage } from "@/lib/cloudinary";

const priceChips = [
  { label: "Romantic Décor", price: "+₹2,000" },
  { label: "Candle Light Dinner", price: "+₹1,200/couple" },
];

export function RomanticStay() {
  return (
    <section id="romantic" className="relative overflow-hidden py-[clamp(56px,8vh,104px)] [scroll-margin-top:84px]">
      <GuideLines />
      <div className="relative z-10 mx-auto max-w-[1180px] px-[clamp(18px,4vw,54px)]">
        <div className="grid items-center gap-[clamp(32px,5vw,72px)] md:grid-cols-[1fr_1.05fr]">
          <Parallax speed={0.06} className="order-first md:order-none">
            <Reveal className="aspect-[4/5] rounded-[22px] shadow-[0_30px_60px_-34px_rgba(20,16,10,0.35)]">
              <WarmVideo src={cldVideo("romantic-decor.mp4")} poster={cldImage("romantic-decor-poster.jpg")} className="h-full w-full rounded-[22px]" />
            </Reveal>
          </Parallax>

          <div>
            <Reveal className="inline-flex rounded-full border border-line-soft px-3.5 py-[7px] text-[11px] font-semibold tracking-[0.14em] text-muted uppercase">
              For Two
            </Reveal>
            <Reveal delay={0.08} as="h2" className="mt-4 font-display text-[clamp(30px,4.4vw,54px)] leading-[1.02] font-semibold tracking-tight">
              Romantic Couple <em className="font-normal italic">Stay</em>
            </Reveal>
            <Reveal delay={0.16} as="p" className="mt-5 max-w-[52ch] text-[16px] leading-[1.75] font-medium text-muted">
              Turn any room into a celebration of love — full romantic decoration with rose petals,
              candles and mood lighting, and an optional candlelight dinner for two.
            </Reveal>
            <Reveal delay={0.24} className="mt-7 grid grid-cols-2 gap-x-[26px] gap-y-3.5">
              {romanticFeatures.map((feature) => (
                <div key={feature.label} className="flex items-center gap-3">
                  <FeatureIcon name={feature.icon} className="w-5 text-center text-[14px] text-gold-deep" />
                  <span className="text-[15px] font-medium text-ink-soft">{feature.label}</span>
                </div>
              ))}
            </Reveal>
            <Reveal delay={0.32} className="mt-[26px] flex flex-wrap gap-3">
              {priceChips.map((chip) => (
                <span
                  key={chip.label}
                  className="inline-flex items-baseline gap-2 rounded-[14px] bg-gold-soft px-4 py-[11px]"
                >
                  <span className="text-[14px] font-semibold text-ink-soft">{chip.label}</span>
                  <span className="text-[14px] font-semibold text-gold-deep">{chip.price}</span>
                </span>
              ))}
            </Reveal>
            <Reveal delay={0.4}>
              <a
                href={waLink("Hi Welcome Palace! I'd like to book the Romantic Couple Stay.")}
                target="_blank"
                rel="noopener"
                className="group mt-7 inline-flex items-center gap-2.5 rounded-full bg-ink px-[26px] py-3.5 text-[15px] font-semibold text-white no-underline transition-transform duration-[220ms] hover:scale-[1.03]"
              >
                Book Romantic Stay Now
                <ArrowRight className="w-[12px] h-[12px] transition-transform duration-[220ms] group-hover:translate-x-1" />
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
