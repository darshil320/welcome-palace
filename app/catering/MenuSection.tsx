import { GuideLines } from "@/components/GuideLines";
import { Reveal } from "@/components/Reveal";
import type { MenuGroup, MenuSection as MenuSectionData } from "@/app/catering/menu";

function MenuGroupCard({ group, index }: { group: MenuGroup; index: number }) {
  return (
    <Reveal
      delay={0.05 * (index % 2)}
      className="mb-6 break-inside-avoid overflow-hidden rounded-[22px] border border-line bg-white"
    >
      <h3 className="bg-[#4a0f1c] px-[22px] py-3.5 text-[12.5px] font-bold tracking-[0.12em] text-[#f3d9a4] uppercase">
        {group.title}
      </h3>
      <ul className="grid gap-2 px-[22px] py-[18px]">
        {group.items.map((item) => (
          <li key={item} className="flex gap-2.5 text-[14px] leading-[1.5] font-medium text-ink-soft">
            <span aria-hidden className="mt-[8px] h-[5px] w-[5px] shrink-0 rounded-full bg-gold" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </Reveal>
  );
}

export function MenuSection({ menu, tinted = false }: { menu: MenuSectionData; tinted?: boolean }) {
  return (
    <section
      id={menu.id}
      aria-labelledby={`${menu.id}-heading`}
      className={`relative overflow-hidden py-[clamp(56px,8vh,104px)] ${
        tinted ? "bg-[linear-gradient(180deg,#faf8f4_0%,#efece6_100%)]" : "bg-white"
      }`}
    >
      <GuideLines />
      <div className="relative z-10 mx-auto max-w-[1180px] px-[clamp(18px,4vw,54px)]">
        <div className="max-w-[680px]">
          <Reveal className="inline-flex rounded-full border border-line-soft px-3.5 py-[7px] text-[11px] font-semibold tracking-[0.14em] text-muted uppercase">
            {menu.eyebrow}
          </Reveal>
          <Reveal
            delay={0.08}
            as="h2"
            id={`${menu.id}-heading`}
            className="mt-4 font-display text-[clamp(28px,3.8vw,44px)] leading-[1.1] font-semibold tracking-tight"
          >
            {menu.title}
          </Reveal>
          <Reveal delay={0.12} as="p" className="mt-3 text-[15px] leading-[1.6] font-medium text-muted-2 italic">
            {menu.subtitle}
          </Reveal>
        </div>

        <div className="mt-10 columns-1 gap-6 md:columns-2 lg:columns-3">
          {menu.groups.map((group, i) => (
            <MenuGroupCard key={group.title} group={group} index={i} />
          ))}
        </div>

        <Reveal className="mt-4 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 rounded-[18px] bg-[#4a0f1c] px-6 py-4 text-center text-[12px] font-bold tracking-[0.12em] text-[#f3d9a4] uppercase">
          {menu.signatures.map((sig, i) => (
            <span key={sig} className="inline-flex items-center gap-3">
              {i > 0 ? <span aria-hidden className="text-gold">•</span> : null}
              {sig}
            </span>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
