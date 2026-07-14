// ─── schema.org JSON-LD builders ──────────────────────────────────────────────
// Emits a single @graph of cross-referenced nodes (Hotel, Organization,
// WebSite) plus per-page helpers (BreadcrumbList, FAQPage). Injected via
// <JsonLd>. Validate at search.google.com/test/rich-results before shipping.

import {
  SITE,
  SITE_URL,
  POSTAL_ADDRESS,
  SAME_AS,
  TELEPHONE,
  AMENITIES,
  absoluteUrl,
  contact,
} from "@/lib/seo";
import { roomCategories } from "@/app/rooms/content";

const HOTEL_ID = `${SITE_URL}/#hotel`;
const ORG_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;

const postalAddress = {
  "@type": "PostalAddress",
  streetAddress: POSTAL_ADDRESS.streetAddress,
  addressLocality: POSTAL_ADDRESS.addressLocality,
  addressRegion: POSTAL_ADDRESS.addressRegion,
  postalCode: POSTAL_ADDRESS.postalCode,
  addressCountry: POSTAL_ADDRESS.addressCountry,
};

function hotelNode() {
  const node: Record<string, unknown> = {
    "@type": "Hotel",
    "@id": HOTEL_ID,
    name: SITE.name,
    legalName: SITE.legalName,
    description:
      "Welcome Palace is a luxury hotel, banquet hall and catering venue in Piplod, Surat, Gujarat. Known as the 'Shadi Wala Ghar', it offers entire-floor family wedding stays across 15 rooms, a private banquet hall for 125–175 guests, and in-house pure-veg Chandni Chowk Chaat & Catering.",
    url: SITE_URL,
    telephone: TELEPHONE,
    email: "welcomepalacesurat@gmail.com",
    logo: SITE.logo,
    image: [SITE.logo],
    priceRange: SITE.priceRange,
    currenciesAccepted: "INR",
    address: postalAddress,
    geo: {
      "@type": "GeoCoordinates",
      latitude: SITE.geo.latitude,
      longitude: SITE.geo.longitude,
    },
    hasMap: contact.mapUrl,
    numberOfRooms: {
      "@type": "QuantitativeValue",
      value: SITE.numberOfRooms,
    },
    checkinTime: `${SITE.checkinTime}:00`,
    checkoutTime: `${SITE.checkoutTime}:00`,
    petsAllowed: false,
    amenityFeature: AMENITIES.map((name) => ({
      "@type": "LocationFeatureSpecification",
      name,
      value: true,
    })),
    containsPlace: roomCategories.map((cat) => ({
      "@type": "HotelRoom",
      name: cat.title,
      description: cat.subtitle,
      image: cat.image,
      occupancy: {
        "@type": "QuantitativeValue",
        maxValue: cat.id === "Family" ? 5 : cat.id === "Honeymoon" ? 4 : 3,
        unitText: "person",
      },
    })),
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "00:00",
        closes: "23:59",
      },
    ],
    sameAs: [...SAME_AS],
    parentOrganization: { "@id": ORG_ID },
  };

  // Only emit ratings when real, verified numbers are configured.
  if (SITE.aggregateRating) {
    node.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: SITE.aggregateRating.ratingValue,
      reviewCount: SITE.aggregateRating.reviewCount,
    };
  }

  return node;
}

function organizationNode() {
  return {
    "@type": "Organization",
    "@id": ORG_ID,
    name: SITE.name,
    legalName: SITE.legalName,
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: SITE.logo,
    },
    sameAs: [...SAME_AS],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: TELEPHONE,
      contactType: "reservations",
      areaServed: "IN",
      availableLanguage: ["en", "hi", "gu"],
    },
    address: postalAddress,
  };
}

function websiteNode() {
  // No SearchAction — the site has no on-site search endpoint, and declaring a
  // non-existent /search would be invalid sitelinks-searchbox markup.
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: SITE.name,
    url: SITE_URL,
    publisher: { "@id": ORG_ID },
    inLanguage: "en-IN",
  };
}

/** The site-wide @graph. Inject once, in the root layout. */
export function siteGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [hotelNode(), organizationNode(), websiteNode()],
  };
}

/** BreadcrumbList for a non-home route. `trail` is ordered from Home to current. */
export function breadcrumbSchema(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

/** FAQPage — deprecated as a Google rich result (May 2026) but still parsed by
 *  AI answer engines (ChatGPT/Perplexity/Gemini). Kept for GEO citations. */
export function faqSchema(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

/** ItemList of room-category PDPs for the /rooms index — helps Google surface
 *  the individual room pages and gives AI engines a clean list to cite. */
export function roomListSchema(
  categories: { title: string; slug: string; description: string; priceFrom?: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Rooms at Welcome Palace, Surat",
    itemListElement: categories.map((cat, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: cat.title,
      url: absoluteUrl(`/rooms/${cat.slug}`),
    })),
  };
}

/** FoodEstablishment for the in-house Chandni Chowk Chaat & Catering brand,
 *  with a machine-readable Menu of the real per-person plans. */
export function cateringSchema(plans: { name: string; price: number; tagline: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FoodEstablishment",
    "@id": `${SITE_URL}/catering#foodestablishment`,
    name: "Chandni Chowk Chaat & Catering",
    description:
      "In-house pure-vegetarian catering brand of Welcome Palace, Surat — live counters and heritage Delhi-style flavours for weddings and events. Plans from ₹650 to ₹1,850 per person.",
    url: absoluteUrl("/catering"),
    telephone: TELEPHONE,
    servesCuisine: ["Indian", "North Indian", "Chaat", "Vegetarian"],
    priceRange: "₹₹₹",
    currenciesAccepted: "INR",
    acceptsReservations: true,
    address: postalAddress,
    parentOrganization: { "@id": ORG_ID },
    areaServed: { "@type": "City", name: "Surat" },
    hasMenu: {
      "@type": "Menu",
      name: "Catering Plans (per person)",
      hasMenuSection: {
        "@type": "MenuSection",
        name: "Pure-Veg Catering Plans",
        hasMenuItem: plans.map((plan) => ({
          "@type": "MenuItem",
          name: plan.name,
          description: plan.tagline,
          offers: {
            "@type": "Offer",
            price: plan.price,
            priceCurrency: "INR",
            priceSpecification: {
              "@type": "UnitPriceSpecification",
              price: plan.price,
              priceCurrency: "INR",
              unitText: "per person",
            },
          },
        })),
      },
    },
  };
}

/** EventVenue for the banquet hall — capacity + booking offers. */
export function banquetVenueSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "EventVenue",
    "@id": `${SITE_URL}/banquet#venue`,
    name: "Welcome Palace Banquet Hall",
    description:
      "Private banquet hall in Piplod, Surat for 125–175 guests — weddings, Satsang, Haldi, Mehandi, Sangeet, corporate meets and parties. Outside catering allowed.",
    url: absoluteUrl("/banquet"),
    telephone: TELEPHONE,
    address: postalAddress,
    geo: {
      "@type": "GeoCoordinates",
      latitude: SITE.geo.latitude,
      longitude: SITE.geo.longitude,
    },
    maximumAttendeeCapacity: 175,
    isAccessibleForFree: false,
    currenciesAccepted: "INR",
    parentOrganization: { "@id": ORG_ID },
    amenityFeature: [
      "Professional AV Setup",
      "Projector",
      "Microphones",
      "Free WiFi",
      "Air Conditioning",
      "Elegant Seating",
      "Complete Privacy",
      "Outside Catering Allowed",
    ].map((name) => ({ "@type": "LocationFeatureSpecification", name, value: true })),
    makesOffer: [
      { slot: "Morning (8 AM–2 PM)", price: 18000 },
      { slot: "Evening (5–11 PM)", price: 18000 },
    ].map((o) => ({
      "@type": "Offer",
      name: `Banquet Hall — ${o.slot}`,
      price: o.price,
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
      url: absoluteUrl("/banquet"),
    })),
  };
}

/** Service node for the Shadi Wala Ghar entire-floor family-wedding package. */
export function shadiServiceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE_URL}/shadi-wala-ghar#service`,
    serviceType: "Entire-Floor Family Wedding Stay",
    name: "Shadi Wala Ghar — Family Wedding Stay at Welcome Palace, Surat",
    description:
      "Book the entire floor for a family wedding in Surat: all rooms plus a private banquet hall under one roof, with complete privacy and in-house or outside catering. Full 60-guest buyout from ₹61,000.",
    url: absoluteUrl("/shadi-wala-ghar"),
    provider: { "@id": HOTEL_ID },
    areaServed: { "@type": "City", name: "Surat" },
    offers: {
      "@type": "Offer",
      price: 61000,
      priceCurrency: "INR",
      priceSpecification: {
        "@type": "PriceSpecification",
        price: 61000,
        priceCurrency: "INR",
        description: "60-guest entire-floor buyout, starting price",
      },
      availability: "https://schema.org/InStock",
      url: absoluteUrl("/shadi-wala-ghar"),
    },
  };
}
