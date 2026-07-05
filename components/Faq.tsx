"use client";

import { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { GuideLines } from "@/components/GuideLines";
import { Reveal } from "@/components/Reveal";
import { WarmImage } from "@/components/WarmImage";
import { faqItems } from "@/lib/content";

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="relative overflow-hidden py-[clamp(56px,8vh,104px)] [scroll-margin-top:84px]">
      <GuideLines />
      <div className="relative z-10 mx-auto max-w-[1180px] px-[clamp(18px,4vw,54px)]">
        <div className="grid items-start gap-[clamp(28px,4vw,64px)] md:grid-cols-2">
          <div>
            <Reveal className="inline-flex rounded-full border border-line-soft px-3.5 py-[7px] text-[11px] font-semibold tracking-[0.14em] text-muted uppercase">
              FAQ
            </Reveal>
            <Reveal delay={0.08} as="h2" className="mt-4 font-display text-[clamp(30px,4.4vw,52px)] leading-[1.03] font-semibold tracking-tight">
              Got Questions?
              <br />
              We&apos;ve Got Answers!
            </Reveal>
            <Reveal delay={0.16} as="p" className="mt-[18px] mb-7 max-w-[46ch] text-[15px] leading-[1.7] font-medium text-muted-2">
              Everything you need to know about staying, celebrating and dining at Welcome Palace — from
              check-in to cancellations.
            </Reveal>
            <Reveal delay={0.24} className="aspect-[16/11] rounded-[20px]">
              <WarmImage
                src="/images/room-107.jpg"
                alt="Welcome Palace guest room"
                fill
                sizes="(max-width: 820px) 100vw, 50vw"
                className="h-full w-full rounded-[20px]"
              />
            </Reveal>
          </div>

          <div>
            {faqItems.map((item, i) => {
              const isOpen = openIndex === i;
              return (
                <Reveal
                  key={item.question}
                  delay={Math.min(i * 0.06, 0.3)}
                  className={`overflow-hidden rounded-2xl border bg-white transition-colors duration-300 ${
                    i > 0 ? "mt-3" : ""
                  } ${isOpen ? "border-line-strong" : "border-line"}`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 px-[22px] py-5 text-left font-semibold text-[16px] text-ink"
                  >
                    {item.question}
                    <span
                      className={`inline-flex h-[26px] w-[26px] flex-none items-center justify-center rounded-full border text-[11px] transition-[transform,background-color,color,border-color] duration-[350ms] ${
                        isOpen ? "rotate-45 border-gold bg-gold text-[#1c1608]" : "border-line-strong text-ink"
                      }`}
                    >
                      <FaPlus />
                    </span>
                  </button>
                  <div className={`acc-body ${isOpen ? "is-open" : ""}`}>
                    <div>
                      <div className="px-[22px] pb-[22px] text-[15px] leading-[1.7] font-medium text-muted">
                        {item.answer}
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
