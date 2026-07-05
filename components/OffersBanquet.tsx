"use client";

import { useState } from "react";
import { FaArrowRightLong, FaCheck } from "react-icons/fa6";
import { GuideLines } from "@/components/GuideLines";
import { Reveal } from "@/components/Reveal";
import { MaskReveal } from "@/components/MaskReveal";
import { banquetTags, homeFullDayOffer, tariffExtras, tariffRows, waLink } from "@/lib/content";

type Tab = "banquet" | "home";

export function OffersBanquet() {
  const [tab, setTab] = useState<Tab>("banquet");
  const rows = tariffRows[tab];

  return (
    <section id="offers" className="relative overflow-hidden bg-white py-[clamp(56px,8vh,104px)] [scroll-margin-top:84px]">
      <GuideLines />
      <div className="relative z-10 mx-auto max-w-[1180px] px-[clamp(18px,4vw,54px)]">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <Reveal className="inline-flex rounded-full border border-line-soft px-3.5 py-[7px] text-[11px] font-semibold tracking-[0.14em] text-muted uppercase">
              A Ghar-Jaisa Experience
            </Reveal>
            <h2 className="mt-4 max-w-[22ch] font-display text-[clamp(30px,4.4vw,54px)] leading-[1.12] font-semibold tracking-tight">
              <MaskReveal
                lines={[{ content: "Celebrations you" }, { content: "won't forget", delaySeconds: 0.1 }]}
              />
            </h2>
          </div>
          <Reveal as="p" className="max-w-[38ch] text-[15px] leading-[1.7] font-medium text-muted-2">
            Perfectly designed for intimate gatherings of 125–150 guests, up to 175 maximum. Ideal for
            Satsang, Haldi, Sangeet, corporate meets &amp; more — with in-house or outside catering and full
            privacy.
          </Reveal>
        </div>

        <Reveal className="mt-[38px] grid gap-6 md:grid-cols-2">
          <div className="relative min-h-[300px] overflow-hidden rounded-[22px]">
            <video autoPlay muted loop playsInline preload="metadata" className="absolute inset-0 h-full w-full object-cover">
              <source src="/videos/banquet-hall-tour.mp4" type="video/mp4" />
            </video>
            <div className="img-warm" />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(20,16,10,0)_34%,rgba(20,16,10,0.86)_100%)]" />
            <div className="absolute inset-x-0 bottom-0 p-[26px]">
              <h3 className="font-display text-[24px] font-semibold text-white">Banquet Hall</h3>
              <div className="mt-3.5 flex flex-wrap gap-2">
                {banquetTags.map((tag) => (
                  <span key={tag} className="rounded-full bg-white/92 px-3 py-1.5 text-[12px] font-semibold text-ink">
                    {tag}
                  </span>
                ))}
              </div>
              <p className="mt-3.5 text-[13px] leading-[1.6] font-medium text-white/82">
                Professional AV setup, projector, microphones, Wi-Fi &amp; elegant seating.
              </p>
            </div>
          </div>

          <div className="flex flex-col rounded-[22px] border border-line bg-panel p-[26px]">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h3 className="font-display text-[24px] font-semibold">Banquet Tariff</h3>
              <span className="inline-flex items-center gap-[7px] rounded-full bg-gold-soft px-[13px] py-[7px] text-[11.5px] font-semibold text-gold-deep">
                <FaCheck className="text-[10px]" />
                Outside Catering Allowed
              </span>
            </div>

            <div className="mt-[18px] mb-4 flex w-fit gap-1.5 rounded-full bg-[#efeae1] p-[5px]">
              <button
                type="button"
                onClick={() => setTab("banquet")}
                className={`rounded-full px-[15px] py-[9px] text-[12px] font-semibold transition-colors duration-[250ms] ${
                  tab === "banquet" ? "bg-ink text-white" : "text-muted"
                }`}
              >
                Banquet page
              </button>
              <button
                type="button"
                onClick={() => setTab("home")}
                className={`rounded-full px-[15px] py-[9px] text-[12px] font-semibold transition-colors duration-[250ms] ${
                  tab === "home" ? "bg-ink text-white" : "text-muted"
                }`}
              >
                Homepage
              </button>
            </div>

            <div>
              {rows.map((row, i) => (
                <div
                  key={row.label}
                  className={`flex justify-between py-[11px] ${i < rows.length - 1 ? "border-b border-[#efeae1]" : ""}`}
                >
                  <span className="text-[15px] font-medium text-ink-soft">
                    {row.label} <span className="text-[13px] text-faint">· {row.time}</span>
                  </span>
                  <span className="text-[16px] font-semibold">{row.price}</span>
                </div>
              ))}
              {tab === "home" && (
                <div className="flex items-center justify-between pt-3 pb-0.5">
                  <span className="inline-flex items-center gap-2 text-[15px] font-semibold">
                    Full Day{" "}
                    <span className="rounded-full bg-gold px-[9px] py-[3px] text-[11px] text-[#1c1608]">OFFER</span>
                  </span>
                  <span className="inline-flex items-baseline gap-[7px]">
                    <span className="text-[14px] font-medium text-line-strong line-through">
                      {homeFullDayOffer.original}
                    </span>
                    <span className="text-[18px] font-semibold text-gold-deep">
                      {homeFullDayOffer.discounted}
                    </span>
                  </span>
                </div>
              )}
            </div>

            <div className="mt-4 flex flex-wrap gap-1.5 border-t border-[#efeae1] pt-3.5 text-[12.5px] font-medium text-muted-2">
              {tariffExtras.map((extra, i) => (
                <span key={extra}>
                  {i > 0 && "· "}
                  {extra}
                </span>
              ))}
            </div>

            <p className="mt-3 text-[12px] leading-[1.5] font-medium text-faint italic">
              Two published rate cards exist for this hall — shown by source. Please confirm current
              pricing at booking. Comfortable for 125–150 guests, up to 175 maximum.
            </p>

            <a
              href={waLink("Hi Welcome Palace! I'd like to book the Banquet Hall. Please share available dates & slots.")}
              target="_blank"
              rel="noopener"
              className="mt-5 inline-flex items-center justify-center gap-[9px] rounded-full bg-ink px-[22px] py-3.5 text-[14px] font-semibold text-white no-underline"
            >
              Book Banquet Now
              <FaArrowRightLong className="text-[12px]" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
