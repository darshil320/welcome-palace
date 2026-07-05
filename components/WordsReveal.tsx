"use client";

import { Fragment, useEffect, useState } from "react";
import { useInView } from "@/hooks/useInView";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export type WordSegment = { text: string; italic?: boolean };

export function WordsReveal({
  segments,
  trigger = "scroll",
  initialDelayMs = 200,
  staggerSeconds = 0.05,
}: {
  segments: WordSegment[];
  trigger?: "mount" | "scroll";
  initialDelayMs?: number;
  staggerSeconds?: number;
}) {
  const { ref, isInView } = useInView<HTMLSpanElement>(0.3);
  const [timedOut, setTimedOut] = useState(false);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced || trigger !== "mount") return;
    const timeout = setTimeout(() => setTimedOut(true), initialDelayMs);
    return () => clearTimeout(timeout);
  }, [reduced, trigger, initialDelayMs]);

  const play = reduced || (trigger === "mount" ? timedOut : isInView);

  const words = segments.flatMap((segment, segmentIdx) =>
    segment.text.split(" ").map((word, i) => ({ word, italic: segment.italic, key: `${segmentIdx}-${i}` })),
  );

  return (
    <span ref={ref}>
      {words.map(({ word, italic, key }, index) => (
        <Fragment key={key}>
          {index > 0 && " "}
          <span className={`mask-word ${play ? "play" : ""}`}>
            <span style={{ animationDelay: `${index * staggerSeconds}s` }}>
              {italic ? <em className="font-normal italic">{word}</em> : word}
            </span>
          </span>
        </Fragment>
      ))}
    </span>
  );
}
