import Image, { type ImageProps } from "next/image";
import { type ReactNode } from "react";

export function WarmImage({
  className = "",
  imgClassName = "",
  children,
  ...props
}: ImageProps & { className?: string; imgClassName?: string; children?: ReactNode }) {
  return (
    <div className={`group relative overflow-hidden ${className}`}>
      {/* eslint-disable-next-line jsx-a11y/alt-text -- alt is required by ImageProps and forwarded via {...props} */}
      <Image
        {...props}
        className={`object-cover transition-transform duration-[1.6s] ease-[cubic-bezier(0.2,0.7,0.2,1)] group-hover:scale-105 ${imgClassName}`}
      />
      <div className="img-warm" />
      {children}
    </div>
  );
}
