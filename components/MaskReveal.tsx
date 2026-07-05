"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export function MaskReveal({
  lines,
  trigger = "scroll",
  initialDelayMs = 200,
}: {
  lines: { content: ReactNode; delaySeconds?: number }[];
  trigger?: "mount" | "scroll";
  initialDelayMs?: number;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [timedOut, setTimedOut] = useState(false);
  const [inView, setInView] = useState(false);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced || trigger !== "mount") return;
    const timeout = setTimeout(() => setTimedOut(true), initialDelayMs);
    return () => clearTimeout(timeout);
  }, [reduced, trigger, initialDelayMs]);

  useEffect(() => {
    if (reduced || trigger !== "scroll") return;
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setInView(true);
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [reduced, trigger]);

  const play = reduced || (trigger === "mount" ? timedOut : inView);

  return (
    <span ref={ref} className="block">
      {lines.map((line, i) => (
        <span key={i} className={`mask-line ${play ? "play" : ""}`}>
          <span style={{ animationDelay: `${line.delaySeconds ?? 0}s` }}>{line.content}</span>
        </span>
      ))}
    </span>
  );
}
