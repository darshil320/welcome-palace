"use client";

import { useRef, type MouseEvent, type ReactNode } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/**
 * Pulls its child gently toward the cursor while hovered.
 * Fine-pointer devices only; inert under prefers-reduced-motion.
 */
export function Magnetic({
  children,
  strength = 0.22,
  className = "",
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const reduced = usePrefersReducedMotion();

  const onMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || reduced || !matchMedia("(pointer: fine)").matches) return;
    const rect = el.getBoundingClientRect();
    const x = (event.clientX - rect.left - rect.width / 2) * strength;
    const y = (event.clientY - rect.top - rect.height / 2) * strength;
    el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`;
  };

  const onMouseLeave = () => {
    const el = ref.current;
    if (el) el.style.transform = "";
  };

  return (
    <div ref={ref} onMouseMove={onMouseMove} onMouseLeave={onMouseLeave} className={`magnetic ${className}`}>
      {children}
    </div>
  );
}
