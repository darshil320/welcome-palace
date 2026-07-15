"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

/**
 * LoadingScreen — full-viewport intro that plays once per page load.
 * Matches the Welcome Palace design language:
 *   - Dark (#14110c) background with gold accent (#c9a84c)
 *   - Animated gold progress bar + counter
 *   - Logo image with subtle glow & scale animation
 *   - Exit: two-panel curtain wipe (top & bottom) that splits open
 */
export function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const [hidden, setHidden] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    let current = 0;
    const total = 1800;
    const tick = 16;
    const steps = total / tick;

    intervalRef.current = setInterval(() => {
      current += 1;
      const ratio = current / steps;
      const eased = 1 - Math.pow(1 - ratio, 2.8);
      const p = Math.min(Math.round(eased * 100), 100);
      setProgress(p);

      if (p >= 100) {
        clearInterval(intervalRef.current!);
        setTimeout(() => setDone(true), 320);
      }
    }, tick);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  useEffect(() => {
    if (!done) return;
    const t = setTimeout(() => setHidden(true), 950);
    return () => clearTimeout(t);
  }, [done]);

  if (hidden) return null;

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        pointerEvents: done ? "none" : "all",
        overflow: "hidden",
      }}
    >
      {/* Top curtain panel */}
      <div
        style={{
          position: "absolute",
          inset: "0 0 50% 0",
          background: "#14110c",
          transformOrigin: "top center",
          transition: done ? "transform 0.88s cubic-bezier(0.76,0,0.24,1)" : "none",
          transform: done ? "translateY(-100%)" : "translateY(0)",
        }}
      />

      {/* Bottom curtain panel */}
      <div
        style={{
          position: "absolute",
          inset: "50% 0 0 0",
          background: "#14110c",
          transformOrigin: "bottom center",
          transition: done ? "transform 0.88s cubic-bezier(0.76,0,0.24,1)" : "none",
          transform: done ? "translateY(100%)" : "translateY(0)",
        }}
      />

      {/* Content layer */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "clamp(28px,4vw,44px)",
          transition: done ? "opacity 0.35s ease" : "none",
          opacity: done ? 0 : 1,
        }}
      >
        {/* Logo image */}
        <div
          className="loader-fade-up"
          style={{
            width: "min(80vw, 420px)",
            animationDelay: "0.3s",
          }}
        >
          <Image
            src="/images/welcome-palace-loader-logo.png"
            alt="Welcome Palace — Rooms & Banquet"
            width={1024}
            height={576}
            priority
            unoptimized
            style={{
              width: "100%",
              height: "auto",
              filter: "drop-shadow(0 0 24px rgba(201,168,76,0.25))",
            }}
          />
        </div>

        {/* Progress bar */}
        <div
          className="loader-fade-in"
          style={{ width: "clamp(160px,22vw,240px)", animationDelay: "0.75s" }}
        >
          <div
            style={{
              height: "1px",
              background: "rgba(239,236,230,0.1)",
              borderRadius: "1px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${progress}%`,
                background: "linear-gradient(90deg,#9a7b2b,#c9a84c,#f4ecd6)",
                borderRadius: "1px",
                transition: "width 0.12s linear",
                boxShadow: "0 0 8px rgba(201,168,76,0.45)",
              }}
            />
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: "10px",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-display, sans-serif)",
                fontWeight: 500,
                fontSize: "clamp(11px,1.2vw,13px)",
                letterSpacing: "0.04em",
                color: "rgba(201,168,76,0.65)",
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {String(progress).padStart(2, "0")}
            </span>
          </div>
        </div>

        {/* Bottom rule */}
        <div
          className="loader-fade-in"
          style={{
            position: "absolute",
            bottom: "clamp(24px,3vw,40px)",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            alignItems: "center",
            gap: "16px",
            animationDelay: "1s",
          }}
        >
          <div style={{ width: "clamp(32px,5vw,56px)", height: "1px", background: "rgba(239,236,230,0.12)" }} />
          <span
            style={{
              fontSize: "10px",
              letterSpacing: "0.28em",
              textTransform: "uppercase" as const,
              color: "rgba(239,236,230,0.22)",
              fontFamily: "var(--font-sans, system-ui, sans-serif)",
              whiteSpace: "nowrap",
            }}
          >
            Luxury stays &amp; celebrations
          </span>
          <div style={{ width: "clamp(32px,5vw,56px)", height: "1px", background: "rgba(239,236,230,0.12)" }} />
        </div>
      </div>
    </div>
  );
}
