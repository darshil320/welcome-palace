"use client";

import { FaArrowLeft, FaArrowRight, FaArrowRightLong } from "react-icons/fa6";
import { GuideLines } from "@/components/GuideLines";
import { Reveal } from "@/components/Reveal";
import { WarmImage } from "@/components/WarmImage";
import { useCarousel } from "@/hooks/useCarousel";
import { spaces, waLink } from "@/lib/content";

const TRACK_ID = "exploreTrack";

export function ExploreCarousel() {
  const { atStart, atEnd, scrollByStep } = useCarousel(TRACK_ID);

  return (
    <section id="explore" className="relative overflow-hidden py-[clamp(56px,8vh,104px)] [scroll-margin-top:84px]">
      <GuideLines />
      <div className="relative z-10 mx-auto max-w-[1180px] px-[clamp(18px,4vw,54px)]">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <Reveal className="inline-flex rounded-full border border-line-soft px-3.5 py-[7px] text-[11px] font-semibold tracking-[0.14em] text-muted uppercase">
              Our Spaces
            </Reveal>
            <Reveal delay={0.08} as="h2" className="mt-4 max-w-[16ch] font-display text-[clamp(30px,4.4vw,54px)] leading-[1.02] font-semibold tracking-tight">
              Every stay, celebration &amp; feast
            </Reveal>
          </div>
          <Reveal className="flex flex-none gap-3">
            <button
              type="button"
              onClick={() => scrollByStep(-1)}
              disabled={atStart}
              aria-label="Previous"
              className="inline-flex h-[52px] w-[52px] items-center justify-center rounded-full border border-line-strong text-ink transition-colors duration-[250ms] hover:not-disabled:bg-ink hover:not-disabled:text-white disabled:opacity-30"
            >
              <FaArrowLeft />
            </button>
            <button
              type="button"
              onClick={() => scrollByStep(1)}
              disabled={atEnd}
              aria-label="Next"
              className="inline-flex h-[52px] w-[52px] items-center justify-center rounded-full border border-line-strong text-ink transition-colors duration-[250ms] hover:not-disabled:bg-ink hover:not-disabled:text-white disabled:opacity-30"
            >
              <FaArrowRight />
            </button>
          </Reveal>
        </div>

        <Reveal
          id={TRACK_ID}
          className="mt-9 flex gap-5 overflow-x-auto pb-1 [scroll-snap-type:x_mandatory] hide-scrollbar"
        >
          {spaces.map((space) => (
            <a
              key={space.name}
              href={waLink(space.message)}
              target="_blank"
              rel="noopener"
              className="w-[300px] flex-none [scroll-snap-align:start] text-inherit no-underline"
            >
              <WarmImage
                src={space.image}
                alt={space.alt}
                fill
                sizes="300px"
                className="aspect-[4/5] rounded-[18px]"
              >
                <span className="absolute top-3.5 left-3.5 rounded-full bg-white/92 px-3 py-[5px] text-[11px] font-semibold tracking-[0.04em] text-ink">
                  {space.tag}
                </span>
                <span className="absolute right-3.5 bottom-3.5 inline-flex h-10 w-10 translate-y-2 items-center justify-center rounded-full bg-white/92 text-ink opacity-0 transition-[opacity,transform] duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  <FaArrowRightLong className="-rotate-45 text-[12px]" />
                </span>
                <span className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(20,16,10,0)_65%,rgba(20,16,10,0.28)_100%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </WarmImage>
              <div className="mt-3.5 flex items-center justify-between">
                <span className="font-display text-[18px] font-semibold">{space.name}</span>
                <span className="text-[13px] font-semibold text-gold-deep">{space.price}</span>
              </div>
            </a>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
