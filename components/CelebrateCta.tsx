import { FaArrowRightLong } from "react-icons/fa6";
import { Magnetic } from "@/components/Magnetic";
import { Reveal } from "@/components/Reveal";
import { CountUp } from "@/components/CountUp";
import { waLink } from "@/lib/content";

const sparkles: React.CSSProperties[] = [
  { top: "18%", left: "12%", fontSize: "14px", animationDelay: "0s" },
  { top: "30%", right: "14%", fontSize: "11px", animationDelay: "1.6s" },
  { bottom: "22%", left: "20%", fontSize: "9px", animationDelay: "2.8s" },
  { bottom: "30%", right: "24%", fontSize: "13px", animationDelay: "0.9s" },
];

export function CelebrateCta() {
  return (
    <section className="py-[clamp(20px,4vh,44px)] pb-[clamp(56px,8vh,90px)]">
      <div className="mx-auto max-w-[1180px] px-[clamp(18px,4vw,54px)]">
        <Reveal className="relative overflow-hidden rounded-[28px] bg-dark-2 px-[clamp(24px,5vw,68px)] py-[clamp(42px,6vw,82px)] text-center text-white">
          <div className="glow-drift pointer-events-none absolute -top-[180px] -right-[120px] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,rgba(201,168,76,0.22),rgba(201,168,76,0)_70%)]" />
          <div className="glow-drift-2 pointer-events-none absolute -bottom-[160px] -left-[100px] h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(201,168,76,0.14),rgba(201,168,76,0)_70%)]" />
          {sparkles.map((style, i) => (
            <span key={i} aria-hidden="true" className="sparkle pointer-events-none absolute text-gold" style={style}>
              ✦
            </span>
          ))}

          <div className="relative">
            <div className="inline-flex items-center gap-3 text-[12px] font-semibold tracking-[0.22em] text-gold uppercase">
              <span className="h-px w-[26px] bg-gold" />
              Elegant · Versatile · Memorable
              <span className="h-px w-[26px] bg-gold" />
            </div>
            <h2 className="mt-[18px] font-display text-[clamp(30px,4.6vw,58px)] leading-[1.03] font-semibold tracking-tight text-white">
              Host Your Dream Celebration
            </h2>
            <p className="mx-auto mt-5 max-w-[60ch] text-[16px] leading-[1.75] font-medium text-white/78">
              Our beautifully designed banquet hall is perfect for intimate weddings, corporate events,
              Satsang, Haldi, Sangeet and private parties — with premium lighting and full privacy.
            </p>

            <div className="mt-[38px] flex flex-wrap justify-center gap-11">
              <div>
                <CountUp target={150} className="font-display text-[clamp(28px,3.6vw,42px)] font-semibold text-white" />
                <div className="mt-1.5 text-[12px] font-medium tracking-[0.06em] text-white/60 uppercase">
                  Guest Capacity
                </div>
              </div>
              <div>
                <CountUp
                  target={200}
                  suffix="+"
                  className="font-display text-[clamp(28px,3.6vw,42px)] font-semibold text-white"
                />
                <div className="mt-1.5 text-[12px] font-medium tracking-[0.06em] text-white/60 uppercase">
                  Events Hosted
                </div>
              </div>
              <div>
                <div className="font-display text-[clamp(28px,3.6vw,42px)] font-semibold text-gold">Allowed</div>
                <div className="mt-1.5 text-[12px] font-medium tracking-[0.06em] text-white/60 uppercase">
                  Outside Catering
                </div>
              </div>
            </div>

            <Magnetic className="mt-[38px]">
              <a
                href={waLink("Hi Welcome Palace! I'd like to enquire about the Banquet Hall. Please share available dates & slots.")}
                target="_blank"
                rel="noopener"
                className="btn-shimmer group inline-flex items-center gap-[11px] rounded-full bg-gold px-8 py-4 text-[15px] font-semibold text-[#1c1608] no-underline"
              >
                Book Banquet Now
                <FaArrowRightLong className="text-[13px] transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </Magnetic>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
