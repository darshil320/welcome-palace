"use client";

import { useEffect, useRef, useState } from "react";
import { X, Sparkles } from "lucide-react";
import { longStayOffer } from "@/app/rooms/content";
import { waLink } from "@/lib/content";

const DISMISS_KEY = "wp-offer-popup-dismissed";
const SHOW_DELAY_MS = 2500;

export function OfferPopup() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(DISMISS_KEY)) return;
    const timer = setTimeout(() => setOpen(true), SHOW_DELAY_MS);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open) dialog.showModal();
    else dialog.close();
  }, [open]);

  function dismiss() {
    sessionStorage.setItem(DISMISS_KEY, "1");
    setOpen(false);
  }

  const { minNights, pricePerNight, roomType, regularPricePerNight } = longStayOffer;
  const totalSavings = (regularPricePerNight - pricePerNight) * minNights;

  return (
    <dialog
      ref={dialogRef}
      id="offer-popup"
      onClose={dismiss}
      onClick={(e) => {
        if (e.target === dialogRef.current) dismiss();
      }}
      className="room-dialog m-auto w-[92%] max-w-[440px] rounded-[24px] border-0 p-0 shadow-[0_40px_120px_-20px_rgba(20,16,10,0.5)] outline-none backdrop:bg-[rgba(20,16,10,0.65)] backdrop:backdrop-blur-sm"
    >
      <div className="relative overflow-hidden rounded-[24px] bg-[linear-gradient(150deg,#1c1608_0%,#2a2011_60%,#1c1608_100%)] px-[clamp(22px,5vw,34px)] py-[clamp(28px,5vw,38px)] text-center">
        <div className="pointer-events-none absolute -top-20 -right-20 h-64 w-64 rounded-full bg-gold/20 blur-3xl" />
        <button
          id="close-offer-popup"
          onClick={dismiss}
          aria-label="Close offer"
          className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
        >
          <X className="w-[13px] h-[13px]" />
        </button>

        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full bg-gold px-3.5 py-[7px] text-[11px] font-semibold tracking-[0.12em] text-[#1c1608] uppercase">
            <Sparkles className="w-[11px] h-[11px]" />
            Limited Offer
          </div>
          <h3 className="mt-4 font-display text-[clamp(24px,5vw,30px)] font-semibold leading-tight text-white">
            Stay {minNights}+ nights,
            <br />
            pay just <span className="text-gold">₹{pricePerNight.toLocaleString()}/night</span>
          </h3>
          <p className="mx-auto mt-3 max-w-[30ch] text-[14px] font-medium text-white/70">
            {roomType} only ·{" "}
            <span className="line-through text-white/50">₹{regularPricePerNight.toLocaleString()}/night</span>{" "}
            regular rate · save ₹{totalSavings.toLocaleString()} over {minNights} nights
          </p>

          <a
            id="claim-offer-popup"
            href={waLink(
              `Hi Welcome Palace! I'd like to claim the Long Stay Offer — ${roomType}, ₹${pricePerNight}/night for ${minNights}+ nights. Please share availability.`
            )}
            target="_blank"
            rel="noopener"
            onClick={dismiss}
            className="mt-6 inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-white px-7 py-[15px] text-[14.5px] font-semibold text-ink no-underline transition-transform duration-[220ms] hover:scale-[1.02]"
          >
            Claim This Offer
          </a>
          <button
            onClick={dismiss}
            className="mt-3 text-[12.5px] font-medium text-white/50 transition-colors hover:text-white/75"
          >
            Not now
          </button>
        </div>
      </div>
    </dialog>
  );
}
