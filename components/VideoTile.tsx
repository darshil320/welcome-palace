export function VideoTile({
  src,
  label,
  className = "aspect-square",
}: {
  src: string;
  label: string;
  className?: string;
}) {
  return (
    <div className="text-center">
      <div className={`group relative overflow-hidden rounded-2xl border border-line-strong ${className}`}>
        <video autoPlay muted loop playsInline preload="metadata" className="absolute inset-0 h-full w-full object-cover">
          <source src={src} type="video/mp4" />
        </video>
        <div className="img-warm" />
      </div>
      <div className="mt-2.5 text-[11px] font-semibold tracking-[0.08em] text-gold-deep uppercase">{label}</div>
    </div>
  );
}
