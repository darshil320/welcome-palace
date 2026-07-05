import Link from "next/link";
import { Share2, Heart, Phone, MessageCircle, Share, Play } from "lucide-react";
import { FooterStatement } from "@/components/FooterStatement";
import { contact, footerExploreLinks, socialLinks } from "@/lib/content";

const socialIcons = {
  facebook: Share2,
  instagram: Heart,
  youtube: Play,
  twitter: Share,
  whatsapp: MessageCircle,
} as const;

export function Footer() {
  return (
    <footer className="bg-dark px-[clamp(18px,4vw,54px)] pt-[clamp(52px,8vh,92px)] pb-8.5 text-[#c9c1b2]">
      <div className="mx-auto max-w-[1180px]">
        <div className="flex flex-wrap items-start justify-between gap-7.5">
          <div className="max-w-[30ch]">
            <div className="font-display text-[26px] font-semibold text-white">
              Welcome Palace<span className="text-gold">*</span>
            </div>
            <div className="mt-4 text-[11px] font-semibold tracking-[0.16em] text-gold uppercase">
              Follow Us &amp; Stay Connected
            </div>
            <div className="mt-3 flex flex-wrap gap-2.5">
              {socialLinks.map((link) => {
                const Icon = socialIcons[link.icon as keyof typeof socialIcons];
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener"
                    className="inline-flex items-center gap-2 rounded-full border border-white/18 px-4 py-2.25 text-[13px] font-medium text-[#cfc7b8] no-underline"
                  >
                    <Icon className="text-[12px]" />
                    {link.label}
                  </a>
                );
              })}
            </div>
          </div>

          <div className="max-w-[44ch]">
            <FooterStatement
              text="At Welcome Palace, every stay should feel like home. From luxury family rooms to authentic Surat flavours, we create warm, unforgettable celebrations under one roof."
              className="m-0 font-display text-[clamp(19px,2vw,26px)] leading-[1.4] font-medium text-white"
            />
            <a
              href={contact.phoneHref}
              className="mt-6 inline-flex items-center gap-[9px] rounded-full bg-gold px-5.5 py-3.25 text-[14px] font-semibold text-[#1c1608] no-underline"
            >
              <Phone className="w-[12px] h-[12px]" />
              {contact.phoneDisplay}
            </a>
          </div>
        </div>

        <div className="mt-13 grid gap-7.5 border-t border-white/10 pt-8.5 sm:grid-cols-3">
          <div>
            <div className="mb-3.5 text-[11px] font-semibold tracking-[0.16em] text-gold uppercase">Contact</div>
            <div className="flex flex-col gap-2.5">
              <a href={contact.phoneHref} className="text-[14px] font-medium text-[#c9c1b2] no-underline">
                {contact.phoneDisplay}
              </a>
              {contact.altPhones.map((phone) => (
                <a
                  key={phone}
                  href={`tel:${phone.replace(/\s+/g, "")}`}
                  className="text-[14px] font-medium text-[#c9c1b2] no-underline"
                >
                  {phone}
                </a>
              ))}
              <a href={`mailto:${contact.email}`} className="text-[14px] font-medium break-words text-[#c9c1b2] no-underline">
                {contact.email}
              </a>
            </div>
          </div>

          <div>
            <div className="mb-3.5 text-[11px] font-semibold tracking-[0.16em] text-gold uppercase">Visit Us</div>
            <p className="m-0 text-[14px] leading-[1.7] font-medium text-[#c9c1b2]">{contact.address}</p>
          </div>

          <div>
            <div className="mb-3.5 text-[11px] font-semibold tracking-[0.16em] text-gold uppercase">Explore</div>
            <div className="flex flex-col gap-2.5">
              {footerExploreLinks.map((link) => (
                <Link key={link.href} href={link.href} className="text-[14px] font-medium text-[#c9c1b2] no-underline">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8.5 flex flex-wrap justify-between gap-3 text-[13px] font-medium text-[#7d7568]">
          <span>www.welcomepalace.in · A Unit of TW Hospitality Services Private Limited</span>
          <span>© 2026 Welcome Palace. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}
