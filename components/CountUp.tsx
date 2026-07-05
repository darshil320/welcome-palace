"use client";

import { useEffect, useRef, useState } from "react";

function formatCount(value: number, suffix: string) {
  return `${Math.round(value).toLocaleString("en-IN")}${suffix}`;
}

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
  const [display, setDisplay] = useState(formatCount(target, suffix));

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || !("IntersectionObserver" in window)) return;

    const duration = 1500;
    let frame = 0;

    const run = () => {
      const start = performance.now();
      const step = (now: number) => {
        const progress = Math.min(Math.max((now - start) / duration, 0), 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setDisplay(formatCount(target * eased, suffix));
        if (progress < 1) frame = requestAnimationFrame(step);
      };
      frame = requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            run();
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.6 },
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [target, suffix]);

  return (
    <div ref={ref} className={className}>
      {display}
    </div>
  );
}
