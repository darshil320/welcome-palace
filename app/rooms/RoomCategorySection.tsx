"use client";

import Image from "next/image";
import { useState } from "react";
import { ArrowRight, Bed, Star, Users } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { roomCategories, type RoomCategory } from "@/app/rooms/content";

interface Props {
  onSelectCategory: (category: RoomCategory) => void;
}

export function RoomCategorySection({ onSelectCategory }: Props) {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section
      id="book"
      className="relative overflow-hidden py-[clamp(56px,8vh,104px)] [scroll-margin-top:84px]"
    >
      {/* Subtle background texture */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(201,168,76,0.04)_0%,transparent_70%)]" />

      <div className="relative z-10 mx-auto max-w-[1180px] px-[clamp(18px,4vw,54px)]">
        {/* Section header */}
        <Reveal className="inline-flex rounded-full border border-line-soft px-3.5 py-[7px] text-[11px] font-semibold tracking-[0.14em] text-muted uppercase">
          15 Luxury Rooms · Piplod, Surat
        </Reveal>
        <div className="mt-4 flex flex-wrap items-end justify-between gap-5">
          <Reveal delay={0.06} as="h2" className="max-w-[22ch] font-display text-[clamp(30px,4.4vw,54px)] leading-[1.08] font-semibold tracking-tight">
            Choose Your Perfect{" "}
            <em className="font-normal italic text-gold-deep">Stay</em>
          </Reveal>
          <Reveal delay={0.1} className="text-[14px] font-medium text-muted max-w-[44ch]">
            All rooms include AC, Wi-Fi, LCD TV, daily housekeeping and 24/7 room service. 5% GST applicable.
          </Reveal>
        </div>

        {/* Category Grid */}
        <div className="mt-[clamp(32px,5vw,56px)] grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {roomCategories.map((cat, i) => (
            <Reveal key={cat.id} delay={i * 0.08}>
              <button
                id={`room-category-${cat.id.toLowerCase()}`}
                onClick={() => onSelectCategory(cat.id)}
                onMouseEnter={() => setHovered(cat.id)}
                onMouseLeave={() => setHovered(null)}
                className="group w-full cursor-pointer text-left"
                aria-label={`Browse ${cat.title}`}
              >
                {/* Image */}
                <div className="relative aspect-[4/5] overflow-hidden rounded-[20px] shadow-[0_12px_40px_-16px_rgba(20,16,10,0.28)]">
                  <Image
                    src={cat.image}
                    alt={cat.title}
                    fill
                    priority={i < 2}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.2,0.7,0.2,1)] group-hover:scale-[1.06]"
                  />
                  {/* Warm overlay */}
                  <div className="img-warm" />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_40%,rgba(20,16,10,0.82)_100%)]" />

                  {/* Price badge */}
                  <div className="absolute top-3 right-3 rounded-full bg-white/90 px-3 py-1.5 text-[11.5px] font-semibold text-ink backdrop-blur-sm">
                    {cat.priceFrom}
                  </div>

                  {/* Bottom info */}
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <div className="text-[11px] font-semibold tracking-[0.14em] text-gold uppercase mb-1">
                      {cat.subtitle}
                    </div>
                    <h3 className="font-display text-[20px] font-semibold leading-[1.1] text-white">
                      {cat.title}
                    </h3>
                    <div className="mt-1.5 flex items-center gap-1.5 text-[12px] font-medium text-white/70">
                      <Bed className="w-[10px] h-[10px]" />
                      {cat.count}
                    </div>

                    {/* CTA */}
                    <div
                      className={`mt-4 flex items-center gap-2 text-[13px] font-semibold text-gold transition-all duration-300 ${
                        hovered === cat.id ? "opacity-100 translate-y-0" : "opacity-70 translate-y-1"
                      }`}
                    >
                      Select Room
                      <ArrowRight
                        className={`text-[11px] transition-transform duration-300 ${
                          hovered === cat.id ? "translate-x-1.5" : ""
                        }`}
                      />
                    </div>
                  </div>
                </div>
              </button>
            </Reveal>
          ))}
        </div>

        {/* Amenities strip */}
        <Reveal delay={0.18} className="mt-[clamp(32px,4vw,48px)] flex flex-wrap justify-center gap-x-6 gap-y-2 border-t border-line pt-7">
          {[
            { icon: <Bed className="w-[10px] h-[10px]" />, label: "Premium Bedding" },
            { icon: <Star className="w-[10px] h-[10px]" />, label: "Daily Housekeeping" },
            { icon: <Users className="w-[10px] h-[10px]" />, label: "24/7 Room Service" },
            { icon: <Star className="w-[10px] h-[10px]" />, label: "Free Wi-Fi" },
            { icon: <Bed className="w-[10px] h-[10px]" />, label: "LCD TV" },
            { icon: <Star className="w-[10px] h-[10px]" />, label: "5% GST Inclusive Pricing" },
          ].map((a) => (
            <span key={a.label} className="flex items-center gap-1.5 text-[12.5px] font-medium text-muted-2">
              <span className="text-[10px] text-gold-deep">{a.icon}</span>
              {a.label}
            </span>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
