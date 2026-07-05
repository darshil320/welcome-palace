import { type ReactNode } from "react";
import { MaskReveal } from "@/components/MaskReveal";

export function PageHero({
  videoSrc,
  eyebrow,
  title,
  subtitle,
}: {
  videoSrc: string;
  eyebrow?: string;
  title: ReactNode;
  subtitle?: string;
}) {
  return (
    <section className="px-[clamp(12px,2.4vw,26px)] pt-[88px]">
      <div className="relative flex h-[min(58svh,560px)] min-h-[380px] items-center justify-center overflow-hidden rounded-3xl">
        <video autoPlay muted loop playsInline preload="auto" className="absolute inset-0 h-full w-full object-cover">
          <source src={videoSrc} type="video/mp4" />
        </video>
        <div className="img-warm" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(20,16,10,0.5)_0%,rgba(20,16,10,0.35)_45%,rgba(20,16,10,0.72)_100%)]" />

        <div className="relative z-10 mx-auto max-w-[900px] px-6 text-center">
          {eyebrow ? (
            <div className="mb-4 inline-flex items-center gap-3 text-[12px] font-semibold tracking-[0.22em] text-gold uppercase">
              <span className="h-px w-6.5 bg-gold" />
              {eyebrow}
              <span className="h-px w-6.5 bg-gold" />
            </div>
          ) : null}
          <h1 className="m-0 font-display text-[clamp(36px,6vw,72px)] leading-[1] font-semibold tracking-tight text-white">
            <MaskReveal trigger="mount" lines={[{ content: title }]} />
          </h1>
          {subtitle ? (
            <p className="mx-auto mt-4 max-w-[60ch] text-[15px] font-medium tracking-wide text-white/85 uppercase">
              {subtitle}
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
