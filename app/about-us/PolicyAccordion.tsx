"use client";

import { useState } from "react";
import { CheckCircle, Plus } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { cancellationPolicies, generalTerms } from "@/app/about-us/content";

export function PolicyAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="mt-[38px]">
      <div className="grid items-start gap-4 md:grid-cols-3">
        {cancellationPolicies.map((policy, i) => {
          const isOpen = openIndex === i;
          return (
            <Reveal
              key={policy.title}
              delay={i * 0.08}
              className={`overflow-hidden rounded-2xl border bg-white transition-colors duration-300 ${
                isOpen ? "border-line-strong" : "border-line"
              }`}
            >
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-[22px] py-5 text-left font-display text-[17px] font-semibold text-ink"
              >
                {policy.title}
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
                  <ul className="space-y-2.5 px-[22px] pb-[22px]">
                    {policy.points.map((point) => (
                      <li key={point} className="flex gap-2.5 text-[14px] leading-[1.65] font-medium text-muted">
                        <CheckCircle className="mt-0.5 flex-none w-[13px] h-[13px] text-gold-deep" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>

      <Reveal delay={0.24} className="mt-6 rounded-2xl border border-line-soft bg-panel p-[26px]">
        <div className="text-[12px] font-semibold tracking-[0.14em] text-muted uppercase">General Terms</div>
        <ul className="mt-3.5 space-y-2.5">
          {generalTerms.map((term) => (
            <li key={term} className="flex gap-2.5 text-[14px] leading-[1.65] font-medium text-muted">
              <CheckCircle className="mt-0.5 flex-none w-[13px] h-[13px] text-gold-deep" />
              <span>{term}</span>
            </li>
          ))}
        </ul>
      </Reveal>
    </div>
  );
}
