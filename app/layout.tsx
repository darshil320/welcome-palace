import type { Metadata } from "next";
import { Schibsted_Grotesk, Hanken_Grotesk } from "next/font/google";
import { GoogleTagManager } from "@next/third-parties/google";
import { Analytics } from "@/components/Analytics";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { GrainOverlay } from "@/components/GrainOverlay";
import { ScrollProgress } from "@/components/ScrollProgress";
import { GTM_ID } from "@/lib/analytics";
import "./globals.css";

const schibstedGrotesk = Schibsted_Grotesk({
  variable: "--font-schibsted",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const hankenGrotesk = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | Welcome Palace",
    default: "Welcome Palace | Your Peaceful Retreat in Surat",
  },
  description:
    "15 luxury rooms, the Pariwar Niwas family residence and a private banquet hall for 125–175 guests — Welcome Palace is your Shadi Wala Ghar in Piplod, Surat.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${schibstedGrotesk.variable} ${hankenGrotesk.variable}`}>
      {GTM_ID && <GoogleTagManager gtmId={GTM_ID} />}
      <body className="bg-cream text-ink font-sans antialiased overflow-x-hidden">
        {GTM_ID && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        )}
        {/* Measure scrollbar width once and store as CSS variable to prevent layout shift when dialog opens */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(){
                var w=window.innerWidth-document.documentElement.clientWidth;
                document.documentElement.style.setProperty('--scrollbar-width',w+'px');
              })();
            `,
          }}
        />
        <Header />
        <main className="overflow-x-hidden">{children}</main>
        <Footer />
        <ScrollProgress />
        <GrainOverlay />
        <Analytics />
      </body>
    </html>
  );
}
