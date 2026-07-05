"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, MapPin, Star } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { WarmImage } from "@/components/WarmImage";
import { useCarousel } from "@/hooks/useCarousel";
import { cldImage } from "@/lib/cloudinary";
import { waLink } from "@/lib/content";

const TRACK_ID = "exploreTrack";

const tags = ["Entire Floor", "5 Jacuzzi Tubs", "100% Privacy", "Live Kitchen"];

export function ShadiWalaGharFeature() {
  const { atStart, atEnd, scrollByStep } = useCarousel(TRACK_ID);

  return (
    <section id="featured" className="py-[clamp(30px,5vh,60px)] pb-[clamp(56px,8vh,100px)]">
      <div className="mx-auto max-w-[1180px] px-[clamp(18px,4vw,54px)]">
        <Reveal className="grid items-stretch gap-6 md:grid-cols-[1.25fr_1fr]">
          <WarmImage
            src={cldImage("banquet-mehandi.jpg")}
            alt="Shadi Wala Ghar — entire floor buyout, mehandi ceremony setup"
            fill
            sizes="(max-width: 820px) 100vw, 62vw"
            priority
            className="min-h-[420px] rounded-[22px]"
          >
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(20,16,10,0)_40%,rgba(20,16,10,0.86)_100%)]" />
            <div className="absolute inset-x-0 bottom-0 p-[clamp(22px,3vw,34px)]">
              <span className="inline-flex items-center gap-[7px] rounded-full bg-white/92 px-[13px] py-1.5 text-[12px] font-semibold text-ink">
                <MapPin className="w-[11px] h-[11px] text-gold-deep" />
                Piplod, Surat
              </span>
              <h3 className="mt-4 font-display text-[clamp(26px,3.4vw,40px)] leading-[1.03] font-semibold tracking-[-0.015em] text-white">
                Shadi Wala Ghar
              </h3>
              <p className="mt-3 max-w-[48ch] text-[14.5px] leading-[1.6] font-medium text-white/82">
                The entire floor of rooms paired with our banquet hall — so your whole family stays, eats
                and celebrates together under one roof. All-rooms buyout up to 60 pax.
              </p>
              <div className="mt-[22px] flex flex-wrap gap-3">
                <a
                  href={waLink("Hi Welcome Palace! I'd like to enquire about the Shadi Wala Ghar (entire floor buyout).")}
                  target="_blank"
                  rel="noopener"
                  className="inline-flex items-center gap-[9px] rounded-full bg-white px-[22px] py-[13px] text-[14px] font-semibold text-ink no-underline transition-transform duration-[220ms] hover:scale-[1.03]"
                >
                  Book Now
                </a>
                <Link
                  href="#offers"
                  className="group inline-flex items-center gap-[9px] rounded-full border border-white/55 px-[22px] py-[13px] text-[14px] font-semibold text-white no-underline"
                >
                  See Details{" "}
                  <ArrowRight className="w-[12px] h-[12px] transition-transform duration-[220ms] group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </WarmImage>

          <div className="flex flex-col gap-4">
            <div className="grid flex-1 grid-cols-2 gap-4">
              <WarmImage
                src={cldImage("banquet-haldi-detail.jpeg")}
                alt="Haldi ceremony detail"
                fill
                sizes="(max-width: 820px) 50vw, 20vw"
                priority
                className="min-h-[150px] rounded-[18px]"
              />
              <div className="flex flex-col items-center justify-center rounded-[18px] bg-ink p-[18px] text-center text-white">
                <div className="text-[11px] font-semibold tracking-[0.12em] text-white/60 uppercase">
                  Family rating
                </div>
                <div className="mt-1.5 mb-1 font-display text-[44px] leading-none font-semibold">5.0</div>
                <div className="flex gap-0.5 text-[12px] tracking-[2px] text-gold">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-[12px] h-[12px]" />
                  ))}
                </div>
              </div>
            </div>

            <div className="rounded-[18px] border border-line bg-white p-5">
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span key={tag} className="rounded-full bg-chip px-[13px] py-[7px] text-[12px] font-semibold text-ink-soft">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="mt-[18px] flex items-center justify-between border-t border-[#efeae1] pt-4">
                <div>
                  <div className="text-[12px] font-medium text-muted-2">All-rooms buyout</div>
                  <div className="font-display text-[24px] font-semibold">₹61,000</div>
                </div>
                <div className="flex gap-2.5">
                  <button
                    type="button"
                    onClick={() => scrollByStep(-1)}
                    disabled={atStart}
                    aria-label="Previous space"
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line-strong text-[13px] text-ink transition-colors duration-[250ms] hover:not-disabled:bg-ink hover:not-disabled:text-white disabled:opacity-30"
                  >
                    <ArrowLeft className="w-[13px] h-[13px]" />
                  </button>
                  <button
                    type="button"
                    onClick={() => scrollByStep(1)}
                    disabled={atEnd}
                    aria-label="Next space"
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line-strong text-[13px] text-ink transition-colors duration-[250ms] hover:not-disabled:bg-ink hover:not-disabled:text-white disabled:opacity-30"
                  >
                    <ArrowRight className="w-[13px] h-[13px]" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
