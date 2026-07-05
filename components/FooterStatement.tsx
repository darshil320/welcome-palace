"use client";

import { useEffect, useMemo, useRef } from "react";

type WordToken = { token: string; wordIndex: number | null };

function tokenizeWords(text: string): WordToken[] {
  return text.split(/(\s+)/).reduce<WordToken[]>((acc, token) => {
    if (/^\s+$/.test(token)) return [...acc, { token, wordIndex: null }];
    const priorWordCount = acc.filter((entry) => entry.wordIndex !== null).length;
    return [...acc, { token, wordIndex: priorWordCount }];
  }, []);
}

export function FooterStatement({ text, className = "" }: { text: string; className?: string }) {
  const containerRef = useRef<HTMLParagraphElement | null>(null);
  const wordRefs = useRef<HTMLSpanElement[]>([]);
  const wordTokens = useMemo(() => tokenizeWords(text), [text]);

  useEffect(() => {
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    let frame = 0;
    const update = () => {
      const container = containerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const progress = Math.min(
        Math.max((window.innerHeight * 0.9 - rect.top) / (window.innerHeight * 0.55), 0),
        1,
      );
      const lit = progress * wordRefs.current.length;
      wordRefs.current.forEach((el, i) => {
        el.style.opacity = String(Math.min(Math.max(lit - i, 0), 1) * 0.7 + 0.3);
      });
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
  }, []);

  return (
    <p ref={containerRef} className={className}>
      {wordTokens.map(({ token, wordIndex }, i) => {
        if (wordIndex === null) return token;
        return (
          <span
            key={i}
            ref={(el) => {
              if (el) wordRefs.current[wordIndex] = el;
            }}
            className="foot-word"
          >
            {token}
          </span>
        );
      })}
    </p>
  );
}
