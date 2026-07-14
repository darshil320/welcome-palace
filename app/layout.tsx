import type { Metadata, Viewport } from "next";
import { Schibsted_Grotesk, Hanken_Grotesk } from "next/font/google";
import { GoogleTagManager } from "@next/third-parties/google";
import { Analytics } from "@/components/Analytics";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { GrainOverlay } from "@/components/GrainOverlay";
import { ScrollProgress } from "@/components/ScrollProgress";
import { LoadingScreen } from "@/components/LoadingScreen";
import { OfferPopup } from "@/components/OfferPopup";
import { JsonLd } from "@/components/JsonLd";
import { GTM_ID } from "@/lib/analytics";
import { SITE_URL, SITE } from "@/lib/seo";
import { siteGraph } from "@/lib/schema";
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
  metadataBase: new URL(SITE_URL),
  title: {
    template: "%s | Welcome Palace",
    default: "Welcome Palace | Luxury Hotel, Banquet & Catering in Piplod, Surat",
  },
  description:
    "Welcome Palace is your Shadi Wala Ghar in Piplod, Surat — 15 luxury rooms, the Pariwar Niwas family residence, a private banquet hall for 125–175 guests and in-house Chandni Chowk Chaat & Catering. Book entire-floor family wedding stays.",
  keywords: [
    "hotel in Piplod Surat",
    "banquet hall Surat",
    "Shadi Wala Ghar",
    "wedding venue Surat",
    "family wedding stay Surat",
    "catering Surat",
    "Pariwar Niwas",
    "luxury rooms Surat",
    "Welcome Palace Surat",
  ],
  applicationName: "Welcome Palace",
  authors: [{ name: SITE.legalName }],
  creator: SITE.legalName,
  publisher: SITE.legalName,
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: SITE.locale,
    siteName: "Welcome Palace",
    url: SITE_URL,
    title: "Welcome Palace | Luxury Hotel, Banquet & Catering in Piplod, Surat",
    description:
      "Your Shadi Wala Ghar in Surat — 15 luxury rooms, a private banquet hall for 125–175 guests and in-house Chandni Chowk Chaat & Catering.",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: SITE.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Welcome Palace | Luxury Hotel & Banquet in Piplod, Surat",
    description:
      "Your Shadi Wala Ghar in Surat — luxury rooms, banquet hall for 125–175 guests and in-house catering.",
    images: ["/opengraph-image"],
  },
  category: "travel",
};

export const viewport: Viewport = {
  themeColor: "#14100a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-IN" className={`${schibstedGrotesk.variable} ${hankenGrotesk.variable}`}>
      <head>
        <link rel="preconnect" href="https://res.cloudinary.com" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
      </head>
      {GTM_ID && <GoogleTagManager gtmId={GTM_ID} />}
      <JsonLd data={siteGraph()} />
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
        <LoadingScreen />
        <Header />
        <main className="overflow-x-hidden">{children}</main>
        <Footer />
        <ScrollProgress />
        <GrainOverlay />
        <Analytics />
        <OfferPopup />
      </body>
    </html>
  );
}
