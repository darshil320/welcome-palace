"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const SEEN_KEY = "wp-loader-seen";
/* ANIMATION STORYBOARD (ms after mount)
 *     0ms  progress fill + counter run (CSS, 1800ms)
 *  2120ms  curtain splits open (--ease-move, 500ms), content fades (200ms)
 *  2670ms  loader unmounts
 * Plays once per session; skipped entirely without JS or under reduced motion (globals.css). */
const TIMING = { open: 2120, unmount: 550 };
const CURTAIN = "translate 500ms var(--ease-move)";

/**
 * LoadingScreen — full-viewport intro that plays once per page load.
 * Matches the Welcome Palace design language:
 *   - Dark (#14110c) background with gold accent (#c9a84c)
 *   - Animated gold progress bar + counter
 *   - Logo image with subtle glow & scale animation
 *   - Exit: two-panel curtain wipe (top & bottom) that splits open
 * Shown once per browser session (flag read before first paint in layout.tsx).
 */
export function LoadingScreen() {
  const [done, setDone] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const skip =
      root.hasAttribute("data-loader-seen") || matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (skip) {
      const t = setTimeout(() => setHidden(true), 0);
      return () => clearTimeout(t);
    }
    try {
      sessionStorage.setItem(SEEN_KEY, "1");
    } catch {
      // Storage unavailable (private mode): the loader simply plays again next load.
    }
    const t = setTimeout(() => setDone(true), TIMING.open);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!done) return;
    const t = setTimeout(() => setHidden(true), TIMING.unmount);
    return () => clearTimeout(t);
  }, [done]);

  if (hidden) return null;

  return (
    <div
      aria-hidden="true"
      className="loader-root"
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
          transition: done ? CURTAIN : "none",
          translate: done ? "0 -100%" : "0 0",
        }}
      />

      {/* Bottom curtain panel */}
      <div
        style={{
          position: "absolute",
          inset: "50% 0 0 0",
          background: "#14110c",
          transition: done ? CURTAIN : "none",
          translate: done ? "0 100%" : "0 0",
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
          transition: done ? "opacity 200ms var(--ease-exit)" : "none",
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
              className="loader-fill motion-keep"
              style={{
                height: "100%",
                width: "100%",
                background: "linear-gradient(90deg,#9a7b2b,#c9a84c,#f4ecd6)",
                borderRadius: "1px",
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
              className="loader-count motion-keep"
              style={{
                fontFamily: "var(--font-display, sans-serif)",
                fontWeight: 500,
                fontSize: "clamp(11px,1.2vw,13px)",
                letterSpacing: "0.04em",
                color: "rgba(201,168,76,0.65)",
                fontVariantNumeric: "tabular-nums",
              }}
            >
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
