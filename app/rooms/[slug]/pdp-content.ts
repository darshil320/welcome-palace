// ─── Room-category PDP content ────────────────────────────────────────────────
// One "product page" per room category (like an e-commerce PDP). Gallery /
// video assets come from Cloudinary; swap entries here as new media is added.

import { cldImage, cldVideo } from "@/lib/cloudinary";
import { type RoomCategory } from "@/app/rooms/content";

export interface PdpMedia {
  type: "image" | "video";
  src: string;
  alt: string;
}

export interface RoomCategoryPdp {
  slug: string;
  id: RoomCategory;
  title: string;
  tagline: string;
  description: string;
  highlights: string[];
  gallery: PdpMedia[];
  /** Occupancy shown in schema + summary strip. */
  maxGuests: number;
  seoDescription: string;
}

export const roomPdps: RoomCategoryPdp[] = [
  {
    slug: "deluxe-room",
    id: "Deluxe",
    title: "Deluxe Rooms",
    tagline: "Spacious & Elegant · from ₹3,500/night",
    description:
      "Our seven Deluxe Rooms are the heart of Welcome Palace — generously sized, quietly elegant and dressed in warm woods with premium bedding. Each room includes AC, a large LCD TV, high-speed Wi-Fi and a spotless en-suite with hot & cold shower. Perfect for business trips, couple getaways and short family halts, with flexible 3, 6, 12 and 24-hour stay slots.",
    highlights: [
      "7 rooms · up to 3 guests each",
      "Premium double bed with plush bedding",
      "AC · LCD TV · High-speed Wi-Fi",
      "En-suite with hot & cold shower",
      "24/7 room service & daily housekeeping",
      "Flexible 3h / 6h / 12h / 24h slots",
    ],
    gallery: [
      { type: "image", src: cldImage("new-rooms/room-104-a.jpg"), alt: "Deluxe Room 104" },
      { type: "image", src: cldImage("new-rooms/room-104-b.jpg"), alt: "Deluxe Room 104, alternate view" },
      { type: "image", src: cldImage("new-rooms/room-105-a.jpg"), alt: "Deluxe Room 105" },
      { type: "image", src: cldImage("new-rooms/room-105-b.jpg"), alt: "Deluxe Room 105, alternate view" },
      { type: "image", src: cldImage("new-rooms/room-106-a.jpg"), alt: "Deluxe Room 106" },
      { type: "image", src: cldImage("new-rooms/room-106-b.jpg"), alt: "Deluxe Room 106, alternate view" },
      { type: "image", src: cldImage("new-rooms/room-109-a.jpg"), alt: "Premium Deluxe Room 109" },
      { type: "image", src: cldImage("new-rooms/room-109-b.jpg"), alt: "Premium Deluxe Room 109, alternate view" },
      { type: "image", src: cldImage("new-rooms/room-112-a.jpg"), alt: "Premium Deluxe Room 112" },
      { type: "image", src: cldImage("new-rooms/room-112-b.jpg"), alt: "Premium Deluxe Room 112, alternate view" },
      { type: "video", src: cldVideo("new/room-decor.mp4"), alt: "Deluxe room décor" },
    ],
    maxGuests: 4,
    seoDescription:
      "Book a Deluxe Room at Welcome Palace, Piplod, Surat from ₹3,500/night. Spacious AC rooms with LCD TV, Wi-Fi, 24/7 room service and flexible 3/6/12/24-hour stay slots.",
  },
  {
    slug: "suite-room",
    id: "Suite",
    title: "Suite Rooms",
    tagline: "Premium Luxury · from ₹4,500/night",
    description:
      "Step up to our Suite Rooms — larger layouts, refined furnishings and a lounge corner to unwind in. Suites pair the comfort of a premium hotel room with the warmth Welcome Palace is known for, and remain a favourite for wedding-party VIPs, anniversary stays and guests who simply want more room to breathe.",
    highlights: [
      "3 suites · up to 3 guests each",
      "Separate lounge / sitting corner",
      "King-size bed with premium linen",
      "AC · LCD TV · High-speed Wi-Fi",
      "24/7 room service & daily housekeeping",
      "Flexible 3h / 6h / 12h / 24h slots",
    ],
    gallery: [
      { type: "image", src: cldImage("new-rooms/room-101-a.jpg"), alt: "Suite Room 101" },
      { type: "image", src: cldImage("new-rooms/room-101-b.jpg"), alt: "Suite Room 101, alternate view" },
      { type: "image", src: cldImage("new-rooms/room-107-a.jpg"), alt: "Suite Room 107" },
      { type: "image", src: cldImage("new-rooms/room-107-b.jpg"), alt: "Suite Room 107, alternate view" },
      { type: "image", src: cldImage("new-rooms/room-202-a.jpg"), alt: "Suite Room 202" },
      { type: "image", src: cldImage("new-rooms/room-202-b.jpg"), alt: "Suite Room 202, alternate view" },
      { type: "video", src: cldVideo("new/room-101-tour.mp4"), alt: "Suite Room 101 tour" },
    ],
    maxGuests: 3,
    seoDescription:
      "Book a Suite Room at Welcome Palace, Piplod, Surat from ₹4,500/night. Premium suites with lounge corner, king-size bed, AC, Wi-Fi and flexible stay slots.",
  },
  {
    slug: "honeymoon-suite",
    id: "Honeymoon",
    title: "Honeymoon Suites",
    tagline: "Private Jacuzzi · Pre-Décor · from ₹5,500/night",
    description:
      "Made for two. Our Honeymoon Suites come with a private jacuzzi, romantic pre-decorated interiors and soft mood lighting — the most requested rooms in the house. Add a candlelight dinner or themed décor (birthday, anniversary, proposal) and let our team turn the evening into an occasion.",
    highlights: [
      "3 suites · private jacuzzi",
      "Romantic pre-décor & mood lighting",
      "Themed décor add-ons (+₹2,000)",
      "Candlelight dinner add-on (+₹1,200/couple)",
      "AC · LCD TV · High-speed Wi-Fi",
      "24/7 room service & daily housekeeping",
    ],
    gallery: [
      { type: "video", src: cldVideo("new/jacuzzi-hero.mp4"), alt: "Private jacuzzi experience" },
      { type: "image", src: cldImage("new-rooms/room-111-a.jpg"), alt: "Honeymoon Suite 111 with jacuzzi" },
      { type: "image", src: cldImage("new-rooms/room-111-b.jpg"), alt: "Honeymoon Suite 111, alternate view" },
      { type: "video", src: cldVideo("new/jacuzzi-1.mp4"), alt: "Jacuzzi suite tour" },
      { type: "image", src: cldImage("new-rooms/room-103-a.jpg"), alt: "Honeymoon Suite 103 with pre-décor" },
      { type: "image", src: cldImage("new-rooms/room-103-b.jpg"), alt: "Honeymoon Suite 103, alternate view" },
      { type: "image", src: cldImage("new-rooms/room-108-a.jpg"), alt: "Honeymoon Suite 108" },
      { type: "image", src: cldImage("new-rooms/room-108-b.jpg"), alt: "Honeymoon Suite 108, alternate view" },
      { type: "video", src: cldVideo("new/jacuzzi-2.mp4"), alt: "Jacuzzi suite ambience" },
      { type: "image", src: cldImage("new-rooms/jacuzzi-suite-1.jpg"), alt: "Jacuzzi suite detail" },
      { type: "image", src: cldImage("new-rooms/jacuzzi-suite-2.jpg"), alt: "Jacuzzi suite detail" },
      { type: "image", src: cldImage("new-rooms/jacuzzi-suite-3.jpg"), alt: "Jacuzzi suite detail" },
      { type: "video", src: cldVideo("new/room-decor.mp4"), alt: "Romantic room décor" },
      { type: "video", src: cldVideo("new/celebration-room-decor.mp4"), alt: "Celebration room décor" },
    ],
    maxGuests: 4,
    seoDescription:
      "Book a Honeymoon Suite with private jacuzzi at Welcome Palace, Piplod, Surat from ₹5,500/night. Romantic pre-décor, candlelight dinner add-ons and flexible stay slots.",
  },
  {
    slug: "family-room",
    id: "Family",
    title: "Family Rooms",
    tagline: "Up to 5 Guests · from ₹5,500/night",
    description:
      "Room for the whole gang. Our Family Rooms sleep up to five with extra bedding included, making them ideal for parents with kids or small groups travelling together. For entire-floor family stays of up to 12 guests, ask about Pariwar Niwas — our two-bedroom private residence with kitchen.",
    highlights: [
      "2 rooms · up to 5 guests each",
      "Extra bedding included",
      "AC · LCD TV · High-speed Wi-Fi",
      "En-suite with hot & cold shower",
      "24/7 room service & daily housekeeping",
      "Pariwar Niwas available for groups up to 12",
    ],
    gallery: [
      { type: "image", src: cldImage("new-rooms/room-110-a.jpg"), alt: "Family Room 110" },
      { type: "image", src: cldImage("new-rooms/room-110-b.jpg"), alt: "Family Room 110, alternate view" },
      { type: "image", src: cldImage("new-rooms/room-114-a.jpg"), alt: "Family Room 114" },
      { type: "image", src: cldImage("new-rooms/room-114-b.jpg"), alt: "Family Room 114, alternate view" },
      { type: "video", src: cldVideo("new/pariwar-niwas-hero.mp4"), alt: "Family stay experience" },
    ],
    maxGuests: 5,
    seoDescription:
      "Book a Family Room for up to 5 guests at Welcome Palace, Piplod, Surat from ₹5,500/night. Extra bedding included, AC, Wi-Fi and flexible 3/6/12/24-hour slots.",
  },
];

export function getPdpBySlug(slug: string): RoomCategoryPdp | undefined {
  return roomPdps.find((p) => p.slug === slug);
}

export function getPdpByCategory(id: RoomCategory): RoomCategoryPdp | undefined {
  return roomPdps.find((p) => p.id === id);
}
