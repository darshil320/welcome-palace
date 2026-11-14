"use client";

import { useEffect, useRef } from "react";

function formatCount(value: number, suffix: string) {
  return `${Math.round(value).toLocaleString("en-IN")}${suffix}`;
}

const COUNT_MS = 1500;

/**
 * Stat that counts up once when it scrolls into view. The final value is in
 * the static HTML; the per-frame count writes textContent directly (no React
 * re-render per frame) in tabular numerals so the width never shifts.
 */
export function CountUp({
  target,
  suffix = "",
  className = "",
}: {
  target: number;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || !("IntersectionObserver" in window)) return;
    // Already on screen at load: leave the final number alone.
    if (el.getBoundingClientRect().top < window.innerHeight) return;
    // Below the fold: start from zero so the count never jumps backwards in view.
    el.textContent = formatCount(0, suffix);

    let frame = 0;
    const run = () => {
      const start = performance.now();
      const step = (now: number) => {
        const progress = Math.min(Math.max((now - start) / COUNT_MS, 0), 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = formatCount(target * eased, suffix);
        if (progress < 1) frame = requestAnimationFrame(step);
      };
      frame = requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          observer.disconnect();
          run();
        }
      },
      { threshold: 0.6 },
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      el.textContent = formatCount(target, suffix);
    };
  }, [target, suffix]);

  return (
    <div ref={ref} className={`tabular-nums ${className}`}>
      {formatCount(target, suffix)}
    </div>
  );
}
