import Image from "next/image";

// Chandni Chowk Chaat & Catering brand roundel (in-house catering brand).
// Transparent PNG served from /public — works on light backgrounds.
export function CateringLogo({ className }: { className?: string }) {
  return (
    <Image
      src="/images/chandni-chowk-logo.png"
      alt="Chandni Chowk Chaat & Catering logo"
      width={372}
      height={400}
      unoptimized
      className={className}
    />
  );
}
