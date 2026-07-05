'use client';

import { useEffect, useRef, useState } from 'react';

const items = [
  "Shadi Wala Ghar",
  "Pariwar Niwas",
  "Banquet Hall",
  "Romantic Stays",
  "Family Feasts",
];

export function Marquee() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting);
        });
      },
      {
        threshold: 0,
      }
    );

    observer.observe(container);

    return () => {
      observer.unobserve(container);
      observer.disconnect();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      data-marquee-container
      aria-hidden="true"
      className="overflow-hidden border-y border-line bg-cream py-[clamp(16px,2.4vw,28px)] select-none"
      style={{
        '--animation-play-state': isVisible ? 'running' : 'paused',
      } as React.CSSProperties}
    >
      <div className="marquee-track flex w-max">
        {[0, 1].map((dup) => (
          <div key={dup} className="flex items-center">
            {items.map((item, i) => (
              <span key={item} className="flex items-center">
                <span
                  className={`px-[clamp(20px,3vw,40px)] font-display text-[clamp(32px,4.6vw,64px)] leading-[1.15] font-semibold tracking-tight whitespace-nowrap ${
                    i % 2 ? "text-outline" : "text-ink"
                  }`}
                >
                  {item}
                </span>
                <span className="text-[clamp(14px,1.6vw,22px)] text-gold">✦</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
