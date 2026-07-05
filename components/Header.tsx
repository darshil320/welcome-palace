"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FaPhone } from "react-icons/fa6";
import { contact, navLinks } from "@/lib/content";

export function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [roomsInView, setRoomsInView] = useState(false);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      setScrolled(window.scrollY > 60);
      if (isHome) {
        const el = document.getElementById("explore");
        setRoomsInView(Boolean(el && el.getBoundingClientRect().top < window.innerHeight * 0.4));
      }
      frame = 0;
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [isHome]);

  const isActive = (href: string) => {
    if (href === "/") return isHome && !roomsInView;
    return pathname === href || pathname.startsWith(href + "/");
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[70] flex items-center justify-between gap-6 px-[clamp(18px,4vw,54px)] py-5 transition-[background,box-shadow] duration-[400ms] ${
        scrolled ? "bg-cream/90 shadow-[0_1px_0_rgba(20,19,14,0.07)] backdrop-saturate-150 backdrop-blur-lg" : ""
      }`}
    >
      <Link href="/" className="flex flex-col text-ink no-underline">
        <span className="font-display text-[22px] leading-none font-semibold tracking-tight">
          Welcome Palace<span className="text-gold">*</span>
        </span>
        <span className="mt-[3px] text-[11px] font-medium tracking-wide opacity-60">
          your peaceful retreat in Surat
        </span>
      </Link>

      <nav className="hidden items-center gap-6 lg:flex">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="group relative font-medium text-[13.5px] whitespace-nowrap text-ink no-underline"
          >
            {link.label}
            <span
              className={`absolute -bottom-1.5 left-0 h-px bg-gold transition-all duration-[350ms] ${
                isActive(link.href) ? "w-full" : "w-0 group-hover:w-full"
              }`}
            />
          </Link>
        ))}
      </nav>

      <a
        href={contact.phoneHref}
        className={`inline-flex items-center gap-2 rounded-full border border-line-strong px-5 py-[11px] text-[14px] font-semibold whitespace-nowrap text-ink no-underline transition-colors duration-[250ms] hover:border-ink hover:bg-ink hover:text-white ${
          scrolled ? "border-ink bg-ink text-white" : ""
        }`}
      >
        <FaPhone className="text-xs" />
        <span className="hidden sm:inline">{contact.phoneDisplay}</span>
      </a>
    </header>
  );
}
