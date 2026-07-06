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
      "Welcome Palace is a luxury hotel, banquet hall and catering venue in Piplod, Surat, Gujarat. Known as the 'Shadi Wala Ghar', it offers entire-floor family wedding stays across 15 rooms, a private banquet hall for 125–175 guests, and in-house pure-veg Chandni Chowk Live Kitchen catering.",
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
    hasMap: "https://www.google.com/maps?q=Piplod,Surat,Gujarat",
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
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: SITE.name,
    url: SITE_URL,
    publisher: { "@id": ORG_ID },
    inLanguage: "en-IN",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
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
