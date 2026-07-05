"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Gives its child a gentle scroll-linked drift relative to the viewport
 * centre. Positive speed drifts against scroll direction (classic depth).
 */
export function Parallax({
  children,
  speed = 0.06,
  className = "",
}: {
  children: ReactNode;
  speed?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;

    const update = () => {
      const el = ref.current;
      if (el) {
        const rect = el.getBoundingClientRect();
        const fromCenter = rect.top + rect.height / 2 - window.innerHeight / 2;
        el.style.transform = `translate3d(0, ${(fromCenter * -speed).toFixed(1)}px, 0)`;
      }
      frame = 0;
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [speed]);

  return (
    <div ref={ref} className={`will-change-transform ${className}`}>
      {children}
    </div>
  );
}
