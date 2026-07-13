"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * WarmVideo — lazy-loaded video with the warm-tint overlay.
 * The video only starts loading when the component scrolls within 300px of
 * the viewport. When scrolled far away it pauses to save bandwidth & CPU.
 */
export function WarmVideo({
  src,
  poster,
  className = "",
  videoClassName = "",
  children,
}: {
  src: string;
  poster?: string;
  className?: string;
  videoClassName?: string;
  children?: ReactNode;
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
          // Once loaded, we only need to manage play/pause
        }
        // Pause when scrolled away, play when in view
        const video = videoRef.current;
        if (video) {
          if (entry.isIntersecting) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        }
      },
      { rootMargin: "300px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className={`group relative overflow-hidden ${className}`}>
      {isVisible && (
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={poster}
          className={`absolute inset-0 h-full w-full object-cover transition-transform duration-[1.6s] ease-[cubic-bezier(0.2,0.7,0.2,1)] group-hover:scale-105 ${videoClassName}`}
        >
          <source src={src} type="video/mp4" />
        </video>
      )}
      <div className="img-warm" />
      {children}
    </div>
  );
}
