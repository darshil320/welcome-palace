export function GuideLines() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 flex justify-between px-[clamp(18px,4vw,54px)]">
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className="block w-px bg-[repeating-linear-gradient(180deg,var(--color-line-soft)_0_5px,transparent_5px_11px)]"
        />
      ))}
    </div>
  );
}
