import { Check, Sparkles } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { longStayOffer } from "@/app/rooms/content";
import { waLink } from "@/lib/content";

export function LongStayOffer() {
  const { minNights, pricePerNight, roomType, regularPricePerNight } = longStayOffer;
  const savingsPerNight = regularPricePerNight - pricePerNight;
  const totalSavings = savingsPerNight * minNights;

  return (
    <section className="relative overflow-hidden py-[clamp(20px,3vh,32px)]">
      <div className="mx-auto max-w-[1180px] px-[clamp(18px,4vw,54px)]">
        <Reveal>
          <div className="relative overflow-hidden rounded-[24px] bg-[linear-gradient(120deg,#1c1608_0%,#2a2011_60%,#1c1608_100%)] px-[clamp(24px,4vw,44px)] py-[clamp(26px,4vw,36px)] shadow-[0_30px_70px_-30px_rgba(20,16,10,0.5)]">
            <div className="pointer-events-none absolute -top-16 -right-16 h-56 w-56 rounded-full bg-gold/20 blur-3xl" />
            <div className="relative z-10 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-gold px-3.5 py-[7px] text-[11px] font-semibold tracking-[0.12em] text-[#1c1608] uppercase">
                  <Sparkles className="w-[11px] h-[11px]" />
                  Limited Offer · Long Stay
                </div>
                <h3 className="mt-3 font-display text-[clamp(22px,3vw,32px)] font-semibold leading-tight text-white">
                  Stay {minNights}+ nights, pay just{" "}
                  <span className="text-gold">₹{pricePerNight.toLocaleString()}/night</span>
                </h3>
                <p className="mt-2 text-[14px] font-medium text-white/70">
                  {roomType} only ·{" "}
                  <span className="text-white/85 line-through">₹{regularPricePerNight.toLocaleString()}/night</span>{" "}
                  regular rate · save ₹{totalSavings.toLocaleString()} over {minNights} nights
                </p>
                <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-[12.5px] font-medium text-white/75">
                  <span className="flex items-center gap-1.5">
                    <Check className="w-[10px] h-[10px] text-gold" />
                    AC · Wi-Fi · Daily housekeeping
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Check className="w-[10px] h-[10px] text-gold" />
                    Min. {minNights} consecutive nights
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Check className="w-[10px] h-[10px] text-gold" />
                    +5% GST
                  </span>
                </div>
              </div>

              <a
                href={waLink(
                  `Hi Welcome Palace! I'd like to book the Long Stay Offer — ${roomType}, ₹${pricePerNight}/night for ${minNights}+ nights. Please share availability.`
                )}
                target="_blank"
                rel="noopener"
                className="inline-flex flex-none items-center justify-center gap-2.5 rounded-full bg-white px-[26px] py-[15px] text-[14.5px] font-semibold text-ink no-underline transition-transform duration-[220ms] hover:scale-[1.03]"
              >
                Claim This Offer
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
