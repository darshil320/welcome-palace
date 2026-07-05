"use client";

import { type ComponentType, type ReactNode, type Ref } from "react";
import { useInView } from "@/hooks/useInView";

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
  const { ref, isInView } = useInView<HTMLElement>(0.12, innerRef);
  const Tag = as as unknown as ComponentType<Record<string, unknown>>;

  return (
    <Tag
      ref={ref}
      id={id}
      className={`reveal-up ${isInView ? "is-in" : ""} ${className}`}
      style={{ "--rd": `${delay}s` } as React.CSSProperties}
    >
      {children}
    </Tag>
  );
}
