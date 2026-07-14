import Image from "next/image";

type BrandLogoProps = {
  className?: string;
  priority?: boolean;
};

export function BrandLogo({ className, priority = false }: BrandLogoProps) {
  return (
    <Image
      src="/images/welcome-palace-logo.svg"
      alt="Welcome Palace Rooms & Banquet"
      width={1080}
      height={348}
      priority={priority}
      unoptimized
      className={className}
    />
  );
}
