import { Reveal } from "@/components/Reveal";
import { VideoTile } from "@/components/VideoTile";
import { themedDecorations } from "@/app/rooms/content";

export function ThemedDecorSection() {
  return (
    <section className="py-[clamp(56px,8vh,104px)]">
      <div className="mx-auto max-w-[1180px] px-[clamp(18px,4vw,54px)]">
        {/* Header */}
        <Reveal className="inline-flex rounded-full border border-line-soft px-3.5 py-[7px] text-[11px] font-semibold tracking-[0.14em] text-muted uppercase">
          Add-on Experiences
        </Reveal>
        <div className="mt-4 flex flex-wrap items-end justify-between gap-5">
          <Reveal delay={0.06} as="h2" className="max-w-[22ch] font-display text-[clamp(28px,4vw,46px)] leading-[1.1] font-semibold tracking-tight">
            Themed Room{" "}
            <em className="font-normal italic text-gold-deep">Decorations</em>
          </Reveal>
          <Reveal delay={0.1} className="max-w-[44ch] text-[14px] font-medium text-muted-2">
            Turn any room into a personalized experience. Starting from ₹2,000 · Customised on request.
          </Reveal>
        </div>

        {/* Decoration grid */}
        <div className="mt-[clamp(28px,4vw,44px)] grid grid-cols-2 gap-4 sm:grid-cols-4">
          {themedDecorations.map((item, i) => (
            <Reveal key={item.label} delay={i * 0.06}>
              <VideoTile src={item.src} label={item.label} className="aspect-[4/5]" />
            </Reveal>
          ))}
        </div>

        {/* Price chips */}
        <Reveal delay={0.12} className="mt-8 flex flex-wrap gap-3 border-t border-line pt-6">
          {[
            { label: "Romantic Décor", price: "₹2,000" },
            { label: "Birthday Décor", price: "₹1,500" },
            { label: "Anniversary Décor", price: "₹1,800" },
            { label: "Candle Light Dinner", price: "₹1,200 / couple" },
            { label: "Special Occasion Décor", price: "from ₹1,500" },
          ].map((chip) => (
            <span
              key={chip.label}
              className="inline-flex items-baseline gap-2 rounded-[14px] bg-gold-soft px-4 py-[11px]"
            >
              <span className="text-[13.5px] font-semibold text-ink-soft">
                {chip.label}
              </span>
              <span className="text-[13.5px] font-semibold text-gold-deep">
                {chip.price}
              </span>
            </span>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
