"use client";

import { useEffect, useRef } from "react";

/**
 * Muted, looping background video for below-the-fold sections. `autoPlay`
 * makes browsers download the whole file at page load regardless of
 * `preload`, so the source is attached only when the video comes within
 * 300px of the viewport. Until then (and without JS) the poster shows.
 */
export function LazyAutoplayVideo({
  src,
  poster,
  className = "",
}: {
  src: string;
  poster: string;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        observer.disconnect();
        video.src = src;
        video.play().catch(() => {
          // Autoplay blocked (e.g. data saver): the poster stays, which is fine.
        });
      },
      { rootMargin: "300px 0px" },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, [src]);

  return <video ref={ref} muted loop playsInline preload="none" poster={poster} className={className} />;
}
