import { type ReactNode } from "react";
import { Check } from "lucide-react";

export function TariffCard({
  title,
  badge,
  rows,
  extras,
  footnote,
  children,
  className = "",
}: {
  title: string;
  badge?: string;
  rows: { label: string; time?: string; price: string }[];
  extras?: string[];
  footnote?: string;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex flex-col rounded-[22px] border border-line bg-panel p-[26px] ${className}`}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="font-display text-[24px] font-semibold">{title}</h3>
        {badge ? (
          <span className="inline-flex items-center gap-[7px] rounded-full bg-gold-soft px-[13px] py-[7px] text-[11.5px] font-semibold text-gold-deep">
            <Check className="w-[10px] h-[10px]" />
            {badge}
          </span>
        ) : null}
      </div>

      <div className="mt-[18px]">
        {rows.map((row, i) => (
          <div
            key={row.label}
            className={`flex justify-between py-[11px] ${i < rows.length - 1 ? "border-b border-[#efeae1]" : ""}`}
          >
            <span className="text-[15px] font-medium text-ink-soft">
              {row.label} {row.time ? <span className="text-[13px] text-faint">· {row.time}</span> : null}
            </span>
            <span className="text-[16px] font-semibold">{row.price}</span>
          </div>
        ))}
      </div>

      {extras && extras.length > 0 ? (
        <div className="mt-4 flex flex-wrap gap-1.5 border-t border-[#efeae1] pt-3.5 text-[12.5px] font-medium text-muted-2">
          {extras.map((extra, i) => (
            <span key={extra}>
              {i > 0 && "· "}
              {extra}
            </span>
          ))}
        </div>
      ) : null}

      {footnote ? (
        <p className="mt-3 text-[12px] leading-[1.5] font-medium text-faint italic">{footnote}</p>
      ) : null}

      {children}
    </div>
  );
}
