"use client";

import { type ReactNode } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

/**
 * Heading lines rising out of a mask as they scroll into view
 * (--dur-mask, --ease-enter). Headings already on screen at first paint
 * render in their final state. Not for heroes or the LCP element.
 */
export function MaskReveal({ lines }: { lines: { content: ReactNode; delaySeconds?: number }[] }) {
  const ref = useScrollReveal<HTMLSpanElement>(0.3);

  return (
    <span ref={ref} className="block">
      {lines.map((line, i) => (
        <span key={i} className="mask-line">
          <span style={line.delaySeconds ? ({ "--md": `${line.delaySeconds}s` } as React.CSSProperties) : undefined}>
            {line.content}
          </span>
        </span>
      ))}
    </span>
  );
}
