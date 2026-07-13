"use client";

import { useEffect, useRef, useState } from "react";

/**
 * VideoTile — lazy-loaded video tile used in gallery grids.
 * Only starts loading video when it scrolls within 200px of the viewport.
 * Pauses when scrolled away to save bandwidth/CPU.
 */
export function VideoTile({
  src,
  label,
  className = "aspect-square",
}: {
  src: string;
  label: string;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
        const video = videoRef.current;
        if (video) {
          if (entry.isIntersecting) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        }
      },
      { rootMargin: "200px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="text-center">
      <div
        ref={containerRef}
        className={`group relative overflow-hidden rounded-2xl border border-line-strong ${className}`}
      >
        {isVisible && (
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="absolute inset-0 h-full w-full object-cover"
          >
            <source src={src} type="video/mp4" />
          </video>
        )}
        <div className="img-warm" />
      </div>
      <div className="mt-2.5 text-[11px] font-semibold tracking-[0.08em] text-gold-deep uppercase">
        {label}
      </div>
    </div>
  );
}
