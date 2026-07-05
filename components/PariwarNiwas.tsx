import { GuideLines } from "@/components/GuideLines";
import { Parallax } from "@/components/Parallax";
import { Reveal } from "@/components/Reveal";
import { WarmVideo } from "@/components/WarmVideo";
import { FeatureIcon } from "@/components/FeatureIcon";
import { pariwarFeatures, waLink } from "@/lib/content";

export function PariwarNiwas() {
  return (
    <section id="pariwar" className="relative overflow-hidden bg-white py-[clamp(56px,8vh,104px)] [scroll-margin-top:84px]">
      <GuideLines />
      <div className="relative z-10 mx-auto max-w-[1180px] px-[clamp(18px,4vw,54px)]">
        <div className="grid items-center gap-[clamp(32px,5vw,72px)] md:grid-cols-[1.05fr_1fr]">
          <div>
            <Reveal className="inline-flex rounded-full border border-line-soft px-3.5 py-[7px] text-[11px] font-semibold tracking-[0.14em] text-muted uppercase">
              Exclusive Group Stay
            </Reveal>
            <Reveal delay={0.08} as="h2" className="mt-4 font-display text-[clamp(30px,4.4vw,54px)] leading-[1.02] font-semibold tracking-tight">
              Pariwar Niwas
            </Reveal>
            <Reveal delay={0.16} as="p" className="mt-5 max-w-[52ch] text-[16px] leading-[1.75] font-medium text-muted">
              The ultimate &ldquo;Home Away From Home&rdquo; in Surat — perfectly designed for wedding groups
              and long-stay guests who want to be together.
            </Reveal>
            <Reveal delay={0.24} className="mt-7 grid grid-cols-2 gap-x-[26px] gap-y-3.5">
              {pariwarFeatures.map((feature) => (
                <div key={feature.label} className="flex items-center gap-3">
                  <FeatureIcon name={feature.icon} className="w-5 text-center text-[15px] text-gold-deep" />
                  <span className="text-[15px] font-medium text-ink-soft">{feature.label}</span>
                </div>
              ))}
            </Reveal>
            <Reveal delay={0.32} className="mt-[30px] flex flex-wrap items-center gap-5">
              <div className="flex items-baseline gap-2">
                <span className="font-display text-[clamp(28px,3.4vw,40px)] font-semibold text-gold-deep">
                  ₹11,000
                </span>
                <span className="text-[14px] font-medium text-muted-2">/ night + 5% GST</span>
              </div>
              <a
                href={waLink("Hi Welcome Palace! I'm interested in Pariwar Niwas (private family residence, up to 12 guests).")}
                target="_blank"
                rel="noopener"
                className="inline-flex items-center gap-2.5 rounded-full bg-ink px-[26px] py-3.5 text-[15px] font-semibold text-white no-underline transition-transform duration-[220ms] hover:scale-[1.03]"
              >
                Book Now
              </a>
            </Reveal>
          </div>

          <Parallax speed={0.06}>
            <Reveal className="aspect-[4/5] rounded-[22px] shadow-[0_30px_60px_-34px_rgba(20,16,10,0.35)]">
              <WarmVideo src="/videos/pariwar-niwas.mp4" className="h-full w-full rounded-[22px]" />
            </Reveal>
          </Parallax>
        </div>
      </div>
    </section>
  );
}
