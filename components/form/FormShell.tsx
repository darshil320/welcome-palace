import { type ReactNode } from "react";
import { Reveal } from "@/components/Reveal";

export function FormShell({
  eyebrow,
  title,
  footnote,
  children,
}: {
  eyebrow: string;
  title: string;
  footnote?: string;
  children: ReactNode;
}) {
  return (
    <Reveal
      as="div"
      className="mx-auto max-w-[720px] rounded-[28px] border-2 border-gold/70 bg-white p-[clamp(28px,5vw,48px)] shadow-[0_30px_70px_-40px_rgba(20,16,10,0.35)]"
    >
      <div className="text-center">
        <div className="inline-flex rounded-full border border-line-soft px-3.5 py-[7px] text-[11px] font-semibold tracking-[0.14em] text-muted uppercase">
          {eyebrow}
        </div>
        <h2 className="mt-4 font-display text-[clamp(26px,3.6vw,40px)] leading-[1.05] font-semibold tracking-tight">
          {title}
        </h2>
      </div>

      <div className="mt-8 grid gap-5">{children}</div>

      {footnote ? (
        <p className="mt-6 text-center text-[13px] leading-[1.6] font-medium text-muted-2">{footnote}</p>
      ) : null}
    </Reveal>
  );
}
