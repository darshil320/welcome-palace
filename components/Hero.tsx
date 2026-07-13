"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowRight, MapPin } from "lucide-react";
import { Magnetic } from "@/components/Magnetic";
import { WordsReveal } from "@/components/WordsReveal";
import { cldVideo, cldImage } from "@/lib/cloudinary";
import { contact } from "@/lib/content";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const mapUrl = contact.mapUrl;

export function Hero() {
  const [timedOut, setTimedOut] = useState(false);
  const reduced = usePrefersReducedMotion();
  const mediaRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const ctaPlay = reduced || timedOut;

  useEffect(() => {
    if (reduced) return;
    const timeout = setTimeout(() => setTimedOut(true), 700);
    return () => clearTimeout(timeout);
  }, [reduced]);

  // Scroll parallax: media lags behind the page, content drifts and fades.
  useEffect(() => {
    if (reduced) return;
    let frame = 0;

    // Media has 120px overhang top+bottom (see markup), so translate is capped
    // at 120px — it can never reveal a gap inside the overflow-hidden container.
    const MAX_SHIFT = 120;

    const update = () => {
      const media = mediaRef.current;
      const content = contentRef.current;
      if (!media || !content) return;

      // Measure the (untransformed) container, not the media itself.
      const container = media.parentElement;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      // Off-screen: leave the last (in-bounds) transform in place, do nothing.
      if (rect.bottom < 0 || rect.top > window.innerHeight) {
        frame = 0;
        return;
      }

      const y = window.scrollY;
      const viewport = window.innerHeight;

      media.style.transform = `translate3d(0, ${Math.min(y * 0.18, MAX_SHIFT).toFixed(1)}px, 0)`;

      const progress = Math.min(y / (viewport * 0.55), 1);
      content.style.opacity = String(1 - progress * 0.9);
      content.style.transform = `translate3d(0, ${(y * 0.1).toFixed(1)}px, 0)`;

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
  }, [reduced]);

  return (
    <section id="top" className="px-[clamp(12px,2.4vw,26px)] pt-[88px]">
      <div className="relative overflow-hidden rounded-3xl" style={{ height: "min(82svh, 760px)", minHeight: "520px" }}>
        <div ref={mediaRef} className="absolute inset-x-0 -top-[120px] -bottom-[120px]" style={{ willChange: "transform" }}>
          <video autoPlay muted loop playsInline preload="auto" poster={cldImage("hero-poster.jpg", "q_auto,f_auto,w_1200")} className="hero-zoom absolute inset-0 h-full w-full object-cover">
            <source src={cldVideo("hero.mp4")} type="video/mp4" />
          </video>
          <div className="img-warm" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(20,16,10,0.42)_0%,rgba(20,16,10,0)_34%,rgba(20,16,10,0)_55%,rgba(20,16,10,0.72)_100%)]" />
        </div>

        <div
          className={`absolute top-[clamp(20px,3.4vw,44px)] left-[clamp(24px,4vw,52px)] transition-opacity duration-1000 ${
            ctaPlay ? "opacity-100" : "opacity-0"
          }`}
        >
          <a
            href={mapUrl}
            target="_blank"
            rel="noopener"
            className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-2 text-[12px] font-semibold tracking-[0.08em] text-white backdrop-blur-md no-underline"
          >
            <MapPin className="w-[11px] h-[11px] text-gold" />
            Piplod, Surat · Est. 2013
          </a>
        </div>

        <Link
          href="#welcome"
          aria-label="Scroll to explore"
          className={`group absolute top-[clamp(20px,3.4vw,44px)] right-[clamp(24px,4vw,52px)] hidden h-[clamp(88px,9vw,116px)] w-[clamp(88px,9vw,116px)] items-center justify-center text-white transition-opacity duration-1000 md:flex ${
            ctaPlay ? "opacity-100" : "opacity-0"
          }`}
        >
          <svg viewBox="0 0 100 100" className="spin-slow absolute inset-0 h-full w-full" aria-hidden="true">
            <defs>
              <path id="heroCircle" d="M 50,50 m -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" />
            </defs>
            <text className="fill-white/85" style={{ fontSize: "8px", letterSpacing: "0.18em" }}>
              <textPath href="#heroCircle" textLength="236" lengthAdjust="spacingAndGlyphs">
                SCROLL TO EXPLORE · WELCOME PALACE ·
              </textPath>
            </text>
          </svg>
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/35 transition-colors duration-300 group-hover:border-gold group-hover:bg-gold group-hover:text-[#1c1608]">
            <ArrowDown className="w-[12px] h-[12px] transition-transform duration-300 group-hover:translate-y-0.5" />
          </span>
        </Link>

        <div
          ref={contentRef}
          className="absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-6 p-[clamp(24px,4vw,52px)] will-change-transform"
        >
          <h1 className="m-0 max-w-[16ch] font-display text-[clamp(38px,6vw,84px)] leading-[0.98] font-semibold tracking-tight text-white">
            <WordsReveal
              trigger="mount"
              segments={[
                { text: "Not just a hotel, but a place that feels like" },
                { text: "home", italic: true },
              ]}
            />
          </h1>

          <Magnetic>
            <Link
              href="#explore"
              className={`group inline-flex items-center gap-3 rounded-full bg-white py-[15px] pr-[15px] pl-[26px] text-[15px] font-semibold whitespace-nowrap text-ink no-underline ${
                ctaPlay ? "opacity-100" : "opacity-0"
              }`}
              style={{ transition: "opacity 1s ease" }}
            >
              Explore our stays
              <span className="inline-flex h-[38px] w-[38px] items-center justify-center rounded-full bg-ink text-white">
                <ArrowRight className="w-[13px] h-[13px] transition-transform duration-300 group-hover:translate-x-0.5" />
              </span>
            </Link>
          </Magnetic>
        </div>
      </div>
    </section>
  );
}
