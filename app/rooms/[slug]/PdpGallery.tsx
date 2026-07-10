"use client";

import Image from "next/image";
import { useState } from "react";
import { Play } from "lucide-react";
import { type PdpMedia } from "@/app/rooms/[slug]/pdp-content";

export function PdpGallery({ media, title }: { media: PdpMedia[]; title: string }) {
  const [active, setActive] = useState(0);
  const current = media[active] ?? media[0];

  if (!current) return null;

  return (
    <div>
      {/* Main viewport */}
      <div className="relative aspect-[16/10] overflow-hidden rounded-[22px] shadow-[0_20px_60px_-24px_rgba(20,16,10,0.35)]">
        {current.type === "video" ? (
          <video
            key={current.src}
            autoPlay
            muted
            loop
            playsInline
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

      {/* Thumbnails */}
      {media.length > 1 && (
        <div className="mt-3 grid grid-cols-5 gap-2.5 sm:grid-cols-6">
          {media.map((m, i) => (
            <button
              key={m.src}
              type="button"
              id={`pdp-thumb-${i}`}
              onClick={() => setActive(i)}
              aria-label={`Show ${m.alt}`}
              className={`relative aspect-[4/3] overflow-hidden rounded-[10px] transition-all duration-200 ${
                i === active
                  ? "ring-2 ring-gold-deep ring-offset-2 ring-offset-cream"
                  : "opacity-75 hover:opacity-100"
              }`}
            >
              {m.type === "video" ? (
                <>
                  <video muted playsInline preload="metadata" className="absolute inset-0 h-full w-full object-cover">
                    <source src={`${m.src}#t=0.5`} type="video/mp4" />
                  </video>
                  <span className="absolute inset-0 flex items-center justify-center bg-[rgba(20,16,10,0.35)]">
                    <Play className="h-4 w-4 text-white" fill="currentColor" />
                  </span>
                </>
              ) : (
                <Image
                  src={m.src}
                  alt={`${title} thumbnail ${i + 1}`}
                  fill
                  sizes="120px"
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
