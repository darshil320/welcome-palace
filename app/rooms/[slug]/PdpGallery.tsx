"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Play } from "lucide-react";
import { type PdpMedia } from "@/app/rooms/[slug]/pdp-content";

export function PdpGallery({ media, title }: { media: PdpMedia[]; title: string }) {
  const [active, setActive] = useState(0);
  const current = media[active] ?? media[0];
  const trackRef = useRef<HTMLDivElement | null>(null);

  // Scroll active thumbnail into view on mobile
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const btn = track.children[active] as HTMLElement | undefined;
    if (btn) {
      btn.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    }
  }, [active]);

  if (!current) return null;

  return (
    <div>
      {/* Main viewport */}
      <div className="relative aspect-[16/10] overflow-hidden rounded-[18px] sm:rounded-[22px] shadow-[0_20px_60px_-24px_rgba(20,16,10,0.35)]">
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
            sizes="(max-width: 1024px) 100vw, 60vw"
            className="object-cover"
          />
        )}
        <div className="img-warm" />
      </div>

      {/* Thumbnails — horizontal scroll on mobile, grid on desktop */}
      {media.length > 1 && (
        <div
          ref={trackRef}
          className="mt-3 flex gap-2 overflow-x-auto pb-1 sm:grid sm:grid-cols-6 sm:gap-2.5 sm:overflow-x-visible hide-scrollbar"
        >
          {media.map((m, i) => (
            <button
              key={m.src}
              type="button"
              id={`pdp-thumb-${i}`}
              onClick={() => setActive(i)}
              aria-label={`Show ${m.alt}`}
              className={`relative flex-none w-[72px] sm:w-auto aspect-[4/3] overflow-hidden rounded-[8px] sm:rounded-[10px] transition-all duration-200 ${
                i === active
                  ? "ring-2 ring-gold-deep ring-offset-2 ring-offset-cream"
                  : "opacity-75 hover:opacity-100"
              }`}
            >
              {m.type === "video" ? (
                <>
                  {/* Static poster frame — don't preload the whole video for thumbnails */}
                  <div className="absolute inset-0 bg-ink/30" />
                  <span className="absolute inset-0 flex items-center justify-center">
                    <Play className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-white" fill="currentColor" />
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
  );
}
