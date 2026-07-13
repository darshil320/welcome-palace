"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { GuideLines } from "@/components/GuideLines";
import { Reveal } from "@/components/Reveal";
import { MaskReveal } from "@/components/MaskReveal";
import type { Faq } from "@/lib/faqs";

// Full-width FAQ accordion for sub-pages (rooms, banquet, catering, shadi).
// Pairs with faqSchema(items) JSON-LD on the same page. Distinct from the
// home Faq (which has the two-column image layout).
export function FaqBlock({
  items,
  eyebrow = "FAQ",
  heading = "Frequently Asked Questions",
}: {
  items: Faq[];
  eyebrow?: string;
  heading?: string;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="relative overflow-hidden py-[clamp(56px,8vh,104px)] [scroll-margin-top:84px]">
      <GuideLines />
      <div className="relative z-10 mx-auto max-w-[820px] px-[clamp(18px,4vw,54px)]">
        <div className="mb-[clamp(28px,4vw,44px)] text-center">
          <Reveal className="mx-auto inline-flex rounded-full border border-line-soft px-3.5 py-[7px] text-[11px] font-semibold tracking-[0.14em] text-muted uppercase">
            {eyebrow}
          </Reveal>
          <h2 className="mt-4 font-display text-[clamp(28px,4vw,46px)] leading-[1.05] font-semibold tracking-tight">
            <MaskReveal lines={[{ content: heading }]} />
          </h2>
        </div>

        <div>
          {items.map((item, i) => {
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
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-[22px] py-5 text-left font-semibold text-[16px] text-ink"
                >
                  {item.question}
                  <span
                    className={`inline-flex h-[26px] w-[26px] flex-none items-center justify-center rounded-full border text-[11px] transition-[transform,background-color,color,border-color] duration-[350ms] ${
                      isOpen ? "rotate-45 border-gold bg-gold text-[#1c1608]" : "border-line-strong text-ink"
                    }`}
                  >
                    <Plus className="w-[11px] h-[11px]" />
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
    </section>
  );
}
