"use client";

import { type ComponentType, type ReactNode, type Ref } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

/**
 * Below-the-fold entrance: fade + 12px rise + 3px blur that clears
 * (--dur-reveal, --ease-enter). `delay` staggers distinct pieces of a
 * section (heading → copy → actions); use --stagger-piece multiples.
 */
export function Reveal({
  children,
  delay = 0,
  className = "",
  as = "div",
  innerRef,
  id,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
  innerRef?: Ref<HTMLElement>;
  id?: string;
}) {
  const ref = useScrollReveal<HTMLElement>(0.12, innerRef);
  const Tag = as as unknown as ComponentType<Record<string, unknown>>;

  return (
    <Tag
      ref={ref}
      id={id}
      className={`reveal-up ${className}`}
      style={delay ? ({ "--rd": `${delay}s` } as React.CSSProperties) : undefined}
    >
      {children}
    </Tag>
  );
}
