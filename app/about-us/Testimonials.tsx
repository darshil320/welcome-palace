import { FaQuoteLeft, FaStar } from "react-icons/fa6";
import { Reveal } from "@/components/Reveal";
import { testimonials } from "@/app/about-us/content";

export function Testimonials() {
  return (
    <div className="mt-[38px] grid gap-6 md:grid-cols-3">
      {testimonials.map((testimonial, i) => (
        <Reveal
          key={testimonial.name}
          delay={i * 0.08}
          className="flex flex-col rounded-[22px] border border-line bg-white p-[26px] shadow-[0_30px_60px_-42px_rgba(20,16,10,0.25)]"
        >
          <FaQuoteLeft className="text-[22px] text-gold" />
          <div className="mt-4 flex gap-1 text-[13px] text-gold">
            {Array.from({ length: 5 }).map((_, starIndex) => (
              <FaStar key={starIndex} />
            ))}
          </div>
          <p className="mt-4 flex-1 text-[15px] leading-[1.75] font-medium text-ink-soft">
            &ldquo;{testimonial.quote}&rdquo;
          </p>
          <div className="mt-6 border-t border-line-soft pt-4">
            <div className="font-display text-[16px] font-semibold text-ink">{testimonial.name}</div>
            <div className="mt-1 text-[13px] font-medium text-muted-2">
              {testimonial.occasion} · {testimonial.date}
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
