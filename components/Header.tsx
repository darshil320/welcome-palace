"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import { BrandLogo } from "@/components/BrandLogo";
import { contact, navLinks } from "@/lib/content";

export function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  // Swap the navbar brand to the Chandni Chowk catering roundel on the food
  // pages; every other route keeps the Welcome Palace crown wordmark.
  const brandVariant =
    pathname.startsWith("/banquet") || pathname.startsWith("/catering") ? "chandni" : "welcome";
  const [scrolled, setScrolled] = useState(false);
  const [roomsInView, setRoomsInView] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [lastPathname, setLastPathname] = useState(pathname);

  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setMenuOpen(false);
  }

  useEffect(() => {
    if (!menuOpen) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

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
    <>
    <header
      className={`fixed inset-x-0 top-0 z-[70] flex items-center justify-between gap-6 px-[clamp(18px,4vw,54px)] py-5 transition-[background,box-shadow] duration-[400ms] ${
        scrolled ? "bg-cream/90 shadow-[0_1px_0_rgba(20,19,14,0.07)] backdrop-saturate-150 backdrop-blur-lg" : ""
      }`}
    >
      <Link
        href="/"
        aria-label="Welcome Palace home"
        className="relative z-10 flex shrink-0 items-center no-underline"
      >
        {brandVariant === "chandni" ? (
          <BrandLogo variant="chandni" priority className="h-[52px] w-auto sm:h-[58px] xl:h-[64px]" />
        ) : (
          <BrandLogo variant="welcome" priority className="h-auto w-[148px] sm:w-[178px] xl:w-[210px]" />
        )}
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

      <div className="relative z-10 flex items-center gap-3">
        <a
          href={contact.phoneHref}
          className={`inline-flex items-center gap-2 rounded-full border border-line-strong px-5 py-[11px] text-[14px] font-semibold whitespace-nowrap text-ink no-underline transition-colors duration-[250ms] hover:border-ink hover:bg-ink hover:text-white ${
            scrolled ? "border-ink bg-ink text-white" : ""
          }`}
        >
          <Phone className="w-4 h-4" />
          <span className="hidden sm:inline">{contact.phoneDisplay}</span>
        </a>

        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          className={`inline-flex h-[46px] w-[46px] flex-none items-center justify-center rounded-full border border-line-strong text-ink transition-colors duration-[250ms] lg:hidden ${
            scrolled ? "border-ink" : ""
          }`}
        >
          {menuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </button>
      </div>
    </header>

    {/* Mobile menu overlay — rendered OUTSIDE <header> so the header's
        backdrop-blur (a backdrop-filter) can't become its containing block and
        clip this fixed panel to the header box. Full-viewport, opaque, top z. */}
    <div
      aria-hidden={!menuOpen}
      className={`fixed inset-0 z-[100] bg-cream transition-opacity duration-300 lg:hidden ${
        menuOpen ? "pointer-events-auto visible opacity-100" : "pointer-events-none invisible opacity-0"
      }`}
    >
      <button
        type="button"
        onClick={() => setMenuOpen(false)}
        aria-label="Close menu"
        className="absolute top-5 right-[clamp(18px,4vw,54px)] inline-flex h-[46px] w-[46px] flex-none items-center justify-center rounded-full border border-line-strong text-ink"
      >
        <X className="w-4 h-4" />
      </button>

      <nav className="flex h-full flex-col items-start justify-center gap-2 px-[clamp(24px,8vw,54px)]">
        {navLinks.map((link, i) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={() => setMenuOpen(false)}
            className={`font-display text-[clamp(30px,8vw,44px)] font-semibold tracking-tight no-underline transition-[opacity,transform] duration-300 ${
              isActive(link.href) ? "text-gold-deep" : "text-ink"
            } ${menuOpen ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"}`}
            style={{ transitionDelay: menuOpen ? `${i * 45}ms` : "0ms" }}
          >
            {link.label}
          </Link>
        ))}
        <a
          href={contact.phoneHref}
          className={`mt-8 inline-flex items-center gap-2.5 rounded-full bg-ink px-6 py-3.5 text-[15px] font-semibold whitespace-nowrap text-white no-underline transition-[opacity,transform] duration-300 ${
            menuOpen ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
          }`}
          style={{ transitionDelay: menuOpen ? `${navLinks.length * 45}ms` : "0ms" }}
        >
          <Phone className="w-4 h-4" />
          {contact.phoneDisplay}
        </a>
      </nav>
    </div>
    </>
  );
}
