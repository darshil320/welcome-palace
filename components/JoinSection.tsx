import { FaWhatsapp } from "react-icons/fa6";
import { Magnetic } from "@/components/Magnetic";
import { Reveal } from "@/components/Reveal";
import { waLink } from "@/lib/content";

export function JoinSection() {
  return (
    <section id="join" className="relative py-[clamp(30px,5vh,50px)] pb-[clamp(56px,8vh,90px)]">
      <div className="mx-auto max-w-[1180px] px-[clamp(18px,4vw,54px)]">
        <Reveal className="mb-[26px] flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <div className="inline-flex rounded-full border border-line-soft px-3.5 py-[7px] text-[11px] font-semibold tracking-[0.14em] text-muted uppercase">
              Plan Your Stay
            </div>
            <h2 className="mt-4 font-display text-[clamp(28px,4vw,50px)] leading-[1.03] font-semibold tracking-tight">
              Bring your whole family together
            </h2>
          </div>
          <p className="max-w-[36ch] text-[15px] leading-[1.7] font-medium text-muted-2">
            Message us on WhatsApp and our team will share availability and the best package within 2
            hours.
          </p>
        </Reveal>

        <Reveal className="group relative min-h-[min(52vh,440px)] overflow-hidden rounded-3xl">
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.6s] ease-[cubic-bezier(0.2,0.7,0.2,1)] group-hover:scale-[1.04]"
          >
            <source src="/videos/ambient-jacuzzi.mp4" type="video/mp4" />
          </video>
          <div className="img-warm" />
          <div className="absolute inset-0 bg-[rgba(20,16,10,0.28)] transition-colors duration-700 group-hover:bg-[rgba(20,16,10,0.38)]" />
          <div className="absolute inset-0 flex items-center justify-center">
            <Magnetic strength={0.28}>
              <a
                href={waLink("Hi Welcome Palace! I'd like to plan a family stay — please share availability & best package.")}
                target="_blank"
                rel="noopener"
                className="inline-flex items-center gap-[11px] rounded-full bg-white px-7.5 py-[17px] text-[16px] font-semibold text-ink no-underline"
              >
                <FaWhatsapp className="text-[18px] text-ink" />
                Chat on WhatsApp
              </a>
            </Magnetic>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
