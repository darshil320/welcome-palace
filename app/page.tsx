import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { WelcomeSection } from "@/components/WelcomeSection";
import { ExploreCarousel } from "@/components/ExploreCarousel";
import { ShadiWalaGharFeature } from "@/components/ShadiWalaGharFeature";
import { PariwarNiwas } from "@/components/PariwarNiwas";
import { RomanticStay } from "@/components/RomanticStay";
import { OffersBanquet } from "@/components/OffersBanquet";
import { CelebrateCta } from "@/components/CelebrateCta";
import { Faq } from "@/components/Faq";
import { JoinSection } from "@/components/JoinSection";
import { JsonLd } from "@/components/JsonLd";
import { faqSchema } from "@/lib/schema";
import { faqItems } from "@/lib/content";

export default function Home() {
  return (
    <>
      <JsonLd data={faqSchema([...faqItems])} />
      <Hero />
      <WelcomeSection />
      <Marquee />
      <ExploreCarousel />
      <ShadiWalaGharFeature />
      <PariwarNiwas />
      <RomanticStay />
      <OffersBanquet />
      <CelebrateCta />
      <Faq />
      <JoinSection />
    </>
  );
}
