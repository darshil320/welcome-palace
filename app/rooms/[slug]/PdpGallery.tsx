"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import { type PdpMedia } from "@/app/rooms/[slug]/pdp-content";

export function PdpGallery({ media, title }: { media: PdpMedia[]; title: string }) {
  const [active, setActive] = useState(0);
  const current = media[active] ?? media[0];
  const trackRef = useRef<HTMLDivElement | null>(null);
  const desktopThumbRef = useRef<HTMLDivElement | null>(null);

  // ── Mobile carousel: scroll-snap based ──────────────────────────
  const mobileTrackRef = useRef<HTMLDivElement | null>(null);
  const [mobileIdx, setMobileIdx] = useState(0);

  // Observe which slide is snapped into view
  useEffect(() => {
    const track = mobileTrackRef.current;
    if (!track) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const idx = Number((entry.target as HTMLElement).dataset.idx);
            if (!Number.isNaN(idx)) setMobileIdx(idx);
          }
        }
      },
      { root: track, threshold: 0.6 }
    );
    Array.from(track.children).forEach((child) => observer.observe(child));
    return () => observer.disconnect();
  }, [media.length]);

  const scrollToMobileSlide = useCallback((idx: number) => {
    const track = mobileTrackRef.current;
    if (!track) return;
    const slide = track.children[idx] as HTMLElement | undefined;
    if (slide) {
      track.scrollTo({ left: slide.offsetLeft, behavior: "smooth" });
    }
  }, []);

  // ── Desktop thumbnail scroll ────────────────────────────────────
  useEffect(() => {
    const track = desktopThumbRef.current;
    if (!track) return;
    const btn = track.children[active] as HTMLElement | undefined;
    if (btn) {
      const scrollLeft = btn.offsetLeft - track.clientWidth / 2 + btn.clientWidth / 2;
      track.scrollTo({ left: scrollLeft, behavior: "smooth" });
    }
  }, [active]);

  if (!current) return null;

  return (
    <>
      {/* ════════ MOBILE: Instagram-style carousel ════════ */}
      <div className="lg:hidden -mx-[clamp(18px,4vw,54px)]">
        {/* Scrollable track */}
        <div
          ref={mobileTrackRef}
          className="flex snap-x snap-mandatory overflow-x-auto hide-scrollbar"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {media.map((m, i) => (
            <div
              key={m.src}
              data-idx={i}
              className="relative w-full flex-none snap-center"
              style={{ aspectRatio: "4/3" }}
            >
              {m.type === "video" ? (
                <video
                  autoPlay={i === 0}
                  muted
                  loop
                  playsInline
                  preload={i < 2 ? "auto" : "none"}
                  className="absolute inset-0 h-full w-full object-cover"
                >
                  <source src={m.src} type="video/mp4" />
                </video>
              ) : (
                <Image
                  src={m.src}
                  alt={m.alt}
                  fill
                  priority={i === 0}
                  sizes="100vw"
                  className="object-cover"
                />
              )}
              <div className="img-warm" />
            </div>
          ))}
        </div>

        {/* Counter badge + dot indicators */}
        <div className="relative flex items-center justify-center gap-3 px-5 pt-3 pb-1">
          {/* Counter pill */}
          <div className="absolute left-5 top-3 flex items-center gap-1.5 rounded-full bg-ink/80 px-2.5 py-1 text-[11px] font-semibold text-white/90 backdrop-blur-sm">
            {mobileIdx + 1} / {media.length}
          </div>

          {/* Dots */}
          <div className="flex items-center gap-1.5">
            {media.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => scrollToMobileSlide(i)}
                aria-label={`Go to photo ${i + 1}`}
                className={`rounded-full transition-all duration-300 ${
                  i === mobileIdx
                    ? "h-[7px] w-[7px] bg-gold-deep"
                    : "h-[5px] w-[5px] bg-line-strong"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ════════ DESKTOP: Classic main + thumbnails ════════ */}
      <div className="hidden lg:block">
        {/* Main viewport */}
        <div className="group relative aspect-[16/10] overflow-hidden rounded-[22px] shadow-[0_20px_60px_-24px_rgba(20,16,10,0.35)]">
          {current.type === "video" ? (
            <video
              key={current.src}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              className="absolute inset-0 h-full w-full object-cover"
            >
              <source src={current.src} type="video/mp4" />
            </video>
          ) : (
            <Image
              key={current.src}
              src={current.src}
              alt={current.alt}
              fill
              priority={active === 0}
              sizes="60vw"
              className="object-cover"
            />
          )}
          <div className="img-warm" />

          {/* Prev / Next arrows on hover */}
          {media.length > 1 && (
            <>
              <button
                type="button"
                onClick={() => setActive((active - 1 + media.length) % media.length)}
                aria-label="Previous photo"
                className="absolute left-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-ink opacity-0 shadow-lg backdrop-blur-sm transition-opacity duration-200 group-hover:opacity-100 hover:bg-white"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => setActive((active + 1) % media.length)}
                aria-label="Next photo"
                className="absolute right-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-ink opacity-0 shadow-lg backdrop-blur-sm transition-opacity duration-200 group-hover:opacity-100 hover:bg-white"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </>
          )}

          {/* Counter badge */}
          <div className="absolute bottom-3 right-3 rounded-full bg-ink/70 px-2.5 py-1 text-[11px] font-semibold text-white/90 backdrop-blur-sm">
            {active + 1} / {media.length}
          </div>
        </div>

        {/* Thumbnails row */}
        {media.length > 1 && (
          <div
            ref={desktopThumbRef}
            className="mt-3 flex gap-2.5 overflow-x-auto pb-1 hide-scrollbar"
          >
            {media.map((m, i) => (
              <button
                key={m.src}
                type="button"
                id={`pdp-thumb-${i}`}
                onClick={() => setActive(i)}
                aria-label={`Show ${m.alt}`}
                className={`relative flex-none w-[80px] aspect-[4/3] overflow-hidden rounded-[10px] transition-all duration-200 ${
                  i === active
                    ? "ring-2 ring-gold-deep ring-offset-2 ring-offset-cream"
                    : "opacity-60 hover:opacity-100"
                }`}
              >
                {m.type === "video" ? (
                  <>
                    <div className="absolute inset-0 bg-ink/30" />
                    <span className="absolute inset-0 flex items-center justify-center">
                      <Play className="h-4 w-4 text-white" fill="currentColor" />
                    </span>
                  </>
                ) : (
                  <Image
                    src={m.src}
                    alt={`${title} thumbnail ${i + 1}`}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
