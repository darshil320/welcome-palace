"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { GuideLines } from "@/components/GuideLines";
import { Reveal } from "@/components/Reveal";
import { CountUp } from "@/components/CountUp";
import { heroStats, mosaicImages } from "@/lib/content";

export function WelcomeSection() {
  const mosaicRef = useRef<HTMLDivElement | null>(null);
  const headRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;

    const update = () => {
      const mosaic = mosaicRef.current;
      const head = headRef.current;
      if (mosaic) {
        if (reduced) {
          mosaic.style.setProperty("--p", "1");
          head?.style.setProperty("--pt", "1");
        } else {
          const rect = mosaic.getBoundingClientRect();
          const start = window.innerHeight * 0.98;
          const end = window.innerHeight * 0.28;
          const progress = Math.min(Math.max((start - rect.top) / (start - end), 0), 1);
          mosaic.style.setProperty("--p", String(progress));
          head?.style.setProperty("--pt", String(progress));
        }
      }
      frame = 0;
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section id="welcome" className="relative overflow-hidden py-[clamp(64px,9vh,120px)] pb-[clamp(30px,5vh,60px)]">
      <GuideLines />
      <div className="relative z-10 mx-auto max-w-[1180px] px-[clamp(18px,4vw,54px)] text-center">
        <div ref={headRef} className="rooms-head">
          <Reveal className="text-[12px] font-semibold tracking-[0.2em] text-gold-deep uppercase">
            A Unit of TW Hospitality Services · Est. 2013
          </Reveal>
          <Reveal delay={0.08} as="h2" className="mt-4 font-display text-[clamp(32px,4.6vw,60px)] leading-[1.02] font-semibold tracking-tight">
            Welcome to <em className="font-normal italic text-gold-deep">Welcome Palace</em>
          </Reveal>
          <Reveal delay={0.16} as="p" className="mx-auto mt-[18px] max-w-[60ch] text-[16px] leading-[1.75] font-medium text-muted">
            We specialise in the &ldquo;Shadi Wala Ghar&rdquo; concept. With 15 premium luxury rooms and our
            dedicated Pariwar Niwas, we offer a private sanctuary where your entire family stays together
            under one roof — dining, resting and celebrating as one.
          </Reveal>
        </div>

        <div
          ref={mosaicRef}
          className="mosaic-grid mx-auto mt-[clamp(34px,5vw,56px)] grid grid-cols-3 gap-6"
        >
          {mosaicImages.map((img) => (
            <div key={img.src} className="mosaic-item group relative aspect-square overflow-hidden">
              <Image src={img.src} alt={img.alt} fill sizes="(max-width: 820px) 50vw, 33vw" className="object-cover transition-transform duration-[1.6s] ease-[cubic-bezier(0.2,0.7,0.2,1)] group-hover:scale-105" />
              <div className="img-warm" />
            </div>
          ))}
        </div>

        <div className="mx-auto mt-[clamp(38px,5vw,58px)] grid max-w-[960px] grid-cols-2 gap-5 border-t border-line pt-8 sm:grid-cols-4">
          {heroStats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.08}>
              <CountUp
                target={stat.value}
                suffix={stat.suffix}
                className="font-display text-[clamp(28px,3.2vw,42px)] font-semibold"
              />
              <div className="mt-1.5 text-[13px] font-medium text-muted-2">{stat.label}</div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
