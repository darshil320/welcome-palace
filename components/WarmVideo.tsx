import { type ReactNode } from "react";

export function WarmVideo({
  src,
  className = "",
  videoClassName = "",
  children,
}: {
  src: string;
  className?: string;
  videoClassName?: string;
  children?: ReactNode;
}) {
  return (
    <div className={`group relative overflow-hidden ${className}`}>
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className={`absolute inset-0 h-full w-full object-cover transition-transform duration-[1.6s] ease-[cubic-bezier(0.2,0.7,0.2,1)] group-hover:scale-105 ${videoClassName}`}
      >
        <source src={src} type="video/mp4" />
      </video>
      <div className="img-warm" />
      {children}
    </div>
  );
}
