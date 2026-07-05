"use client";

import { useCallback, useEffect, useState } from "react";

export function useCarousel(trackId: string) {
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  useEffect(() => {
    const track = document.getElementById(trackId);
    if (!track) return;

    const update = () => {
      const max = track.scrollWidth - track.clientWidth - 2;
      setAtStart(track.scrollLeft <= 2);
      setAtEnd(track.scrollLeft >= max);
    };

    let timeout = 0;
    const onScroll = () => {
      window.clearTimeout(timeout);
      timeout = window.setTimeout(update, 60);
    };

    update();
    track.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      track.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
      window.clearTimeout(timeout);
    };
  }, [trackId]);

  const scrollByStep = useCallback(
    (direction: 1 | -1) => {
      const track = document.getElementById(trackId);
      if (!track) return;
      const step = Math.min(track.clientWidth * 0.8, 640);
      track.scrollBy({ left: direction * step, behavior: "smooth" });
    },
    [trackId],
  );

  return { atStart, atEnd, scrollByStep };
}
