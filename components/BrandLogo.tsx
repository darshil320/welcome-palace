import Image from "next/image";

export type BrandVariant = "welcome" | "chandni";

const LOGOS: Record<BrandVariant, { src: string; width: number; height: number; alt: string }> = {
  // Real Welcome Palace crown wordmark (transparent PNG). Dark ink — pair with
  // a brightness/invert filter on dark backgrounds (see Footer).
  welcome: {
    src: "/images/welcome-palace-logo.png",
    width: 1080,
    height: 332,
    alt: "Welcome Palace Rooms & Banquet",
  },
  // Chandni Chowk Chaat & Catering roundel (in-house catering brand).
  chandni: {
    src: "/images/chandni-chowk-logo.png",
    width: 372,
    height: 400,
    alt: "Chandni Chowk Chaat & Catering",
  },
};

type BrandLogoProps = {
  variant?: BrandVariant;
  className?: string;
  priority?: boolean;
};

export function BrandLogo({ variant = "welcome", className, priority = false }: BrandLogoProps) {
  const logo = LOGOS[variant];
  return (
    <Image
      src={logo.src}
      alt={logo.alt}
      width={logo.width}
      height={logo.height}
      priority={priority}
      unoptimized
      className={className}
    />
  );
}
