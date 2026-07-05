'use client';

import { useEffect, useRef, useState, ReactNode } from 'react';

interface LazyVideoProps {
  src: string;
  className?: string;
  poster?: string;
  children?: ReactNode;
}

export function LazyVideo({
  src,
  className = '',
  poster,
  children,
}: LazyVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isLoaded) {
            // Start loading the video when it enters the viewport
            if (videoElement.src !== src) {
              videoElement.src = src;
            }
            setIsLoaded(true);
            // Destroy the observer after loading starts
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: '200px',
      }
    );

    observer.observe(videoElement);

    return () => {
      observer.disconnect();
    };
  }, [src, isLoaded]);

  return (
    <video
      ref={videoRef}
      className={className}
      poster={poster}
      controls
      preload="none"
    >
      {children}
    </video>
  );
}
