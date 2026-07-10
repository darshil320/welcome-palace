// ─── Room Data ───────────────────────────────────────────────────────────────

import { cldImage, cldVideo } from "@/lib/cloudinary";

export interface RoomData {
  no: string;
  type: string;
  base24: number;
  base3: number;
  base6: number;
  base12: number;
  max: number;
  isFamily: boolean;
  image: string;
}

export const roomData: RoomData[] = [
  { no: "102", type: "Deluxe Room",       base24: 3500, base3: 1000, base6: 1500, base12: 2000, max: 3, isFamily: false, image: cldImage("new-rooms/room-102-a.jpg") },
  { no: "104", type: "Deluxe Room",       base24: 3500, base3: 1000, base6: 1500, base12: 2000, max: 3, isFamily: false, image: cldImage("new-rooms/room-104-a.jpg") },
  { no: "105", type: "Deluxe Room",       base24: 3500, base3: 1000, base6: 1500, base12: 2000, max: 3, isFamily: false, image: cldImage("new-rooms/room-105-a.jpg") },
  { no: "106", type: "Deluxe Room",       base24: 3500, base3: 1000, base6: 1500, base12: 2000, max: 3, isFamily: false, image: cldImage("new-rooms/room-106-a.jpg") },
  { no: "109", type: "Premium Deluxe",    base24: 4000, base3: 1200, base6: 1700, base12: 2200, max: 4, isFamily: false, image: cldImage("new-rooms/room-109-a.jpg") },
  { no: "112", type: "Premium Deluxe",    base24: 4000, base3: 1200, base6: 1700, base12: 2200, max: 4, isFamily: false, image: cldImage("new-rooms/room-112-a.jpg") },
  { no: "201", type: "Deluxe Room",       base24: 3500, base3: 1000, base6: 1500, base12: 2000, max: 3, isFamily: false, image: cldImage("new-rooms/room-201-a.jpg") },
  { no: "101", type: "Suite Room",        base24: 4500, base3: 1500, base6: 2000, base12: 2500, max: 3, isFamily: false, image: cldImage("new-rooms/room-101-a.jpg") },
  { no: "107", type: "Suite Room",        base24: 4500, base3: 1500, base6: 2000, base12: 2500, max: 3, isFamily: false, image: cldImage("new-rooms/room-107-a.jpg") },
  { no: "202", type: "Suite Room",        base24: 4500, base3: 1500, base6: 2000, base12: 2500, max: 3, isFamily: false, image: cldImage("new-rooms/room-202-a.jpg") },
  { no: "111", type: "Honeymoon Suite · Jacuzzi", base24: 5500, base3: 2000, base6: 2500, base12: 3500, max: 4, isFamily: false, image: cldImage("new-rooms/room-111-a.jpg") },
  { no: "103", type: "Honeymoon Suite · Pre-Décor", base24: 5500, base3: 2000, base6: 2500, base12: 3500, max: 4, isFamily: false, image: cldImage("new-rooms/room-103-a.jpg") },
  { no: "108", type: "Honeymoon Suite · Jacuzzi", base24: 5500, base3: 2000, base6: 2500, base12: 3500, max: 4, isFamily: false, image: cldImage("new-rooms/room-108-a.jpg") },
  { no: "110", type: "Family Room",       base24: 5500, base3: 2000, base6: 2500, base12: 3500, max: 5, isFamily: true,  image: cldImage("new-rooms/room-110-a.jpg") },
  { no: "114", type: "Family Room",       base24: 5500, base3: 2000, base6: 2500, base12: 3500, max: 5, isFamily: true,  image: cldImage("new-rooms/room-114-a.jpg") },
];

// ─── Room Categories ──────────────────────────────────────────────────────────

export type RoomCategory = "Deluxe" | "Suite" | "Honeymoon" | "Family";

export const roomCategories: {
  id: RoomCategory;
  title: string;
  subtitle: string;
  image: string;
  priceFrom: string;
  count: string;
  rooms: string[];
}[] = [
  {
    id: "Deluxe",
    title: "Deluxe Rooms",
    subtitle: "Spacious & Elegant",
    image: cldImage("new-rooms/room-104-a.jpg"),
    priceFrom: "from ₹3,500/night",
    count: "7 rooms available",
    rooms: ["102", "104", "105", "106", "109", "112", "201"],
  },
  {
    id: "Suite",
    title: "Suite Rooms",
    subtitle: "Premium Luxury",
    image: cldImage("new-rooms/room-107-a.jpg"),
    priceFrom: "from ₹4,500/night",
    count: "3 rooms available",
    rooms: ["101", "107", "202"],
  },
  {
    id: "Honeymoon",
    title: "Honeymoon Suites",
    subtitle: "Private Jacuzzi · Pre-Décor",
    image: cldImage("new-rooms/room-111-a.jpg"),
    priceFrom: "from ₹5,500/night",
    count: "3 suites available",
    rooms: ["111", "103", "108"],
  },
  {
    id: "Family",
    title: "Family Rooms",
    subtitle: "Up to 5 Guests",
    image: cldImage("new-rooms/room-110-a.jpg"),
    priceFrom: "from ₹5,500/night",
    count: "2 rooms available",
    rooms: ["110", "114"],
  },
];

// ─── Room Pricing Helpers ─────────────────────────────────────────────────────

export type StaySlot = "3" | "6" | "12" | "24";

export const slotLabels: Record<StaySlot, string> = {
  "3": "3 Hours",
  "6": "6 Hours",
  "12": "12 Hours",
  "24": "24 Hours (per night)",
};

export function getBasePrice(room: RoomData, slot: StaySlot): number {
  if (slot === "3") return room.base3;
  if (slot === "6") return room.base6;
  if (slot === "12") return room.base12;
  return room.base24;
}

export function getNumberOfNights(checkIn: string, checkOut: string): number {
  if (!checkIn || !checkOut) return 1;
  const start = new Date(checkIn);
  const end = new Date(checkOut);
  return Math.max(Math.ceil((end.getTime() - start.getTime()) / 86400000), 1);
}

export function calculateRoomPrice(
  room: RoomData,
  slot: StaySlot,
  guests: number,
  checkIn: string,
  checkOut: string
): { base: number; gst: number; total: number } {
  let base = getBasePrice(room, slot);

  if (slot === "24") {
    const nights = getNumberOfNights(checkIn, checkOut);
    base = base * nights;
    if (guests === 1) base = Math.round(base * 0.65);
    else if (guests === 2) base = Math.round(base * 0.85);
  } else {
    if (guests >= 3) base = Math.round(base * 1.5);
  }

  const gst = Math.round(base * 0.05);
  return { base, gst, total: base + gst };
}

// ─── Themed Decoration Gallery ────────────────────────────────────────────────

export const themedDecorations = [
  { src: cldVideo("new/room-decor.mp4"), label: "Romantic Decoration" },
  { src: cldVideo("new/birthday-celebration.mp4"), label: "Birthday Decoration" },
  { src: cldVideo("new/celebration-room-decor.mp4"), label: "Anniversary Decoration" },
  { src: cldVideo("new/jacuzzi-hero.mp4"), label: "Jacuzzi Experience" },
  { src: cldVideo("new/room-decor.mp4"), label: "Sorry Decoration" },
  { src: cldVideo("new/celebration-room-decor.mp4"), label: "Candle Light Dinner" },
  { src: cldVideo("new/birthday-celebration.mp4"), label: "Cricket Theme" },
  { src: cldVideo("new/room-decor.mp4"), label: "Special Occasion" },
];

// ─── Long Stay Offer ──────────────────────────────────────────────────────────

export const longStayOffer = {
  minNights: 10,
  pricePerNight: 1650,
  roomType: "Deluxe Room",
  regularPricePerNight: 3500,
};

// ─── Pariwar Niwas Pricing ────────────────────────────────────────────────────

export const pariwarPricing = {
  fullShort: 11000,   // full 2-room package, short stay /night
  fullLong: 5500,     // full 2-room package, long stay (≥10 nights) /night
  roomShort: 2500,    // single room, short stay /night
  roomLong: 1500,     // single room, long stay /night
  extraGuestShort: 500, // per extra guest beyond 2 per room, /night
  extraGuestLong: 250,
  longStayMinNights: 10,
};

// ─── Room Highlights (tariff display) ────────────────────────────────────────

export const roomTariffRows = [
  { label: "Deluxe Room", time: "per night", price: "₹3,500" },
  { label: "Premium Deluxe", time: "per night", price: "₹4,000" },
  { label: "Suite Room", time: "per night", price: "₹4,500" },
  { label: "Honeymoon Suite", time: "per night", price: "₹5,500" },
];

export const roomAmenities = [
  "AC Room with Premium Bedding",
  "LCD TV & Wi-Fi",
  "24/7 Room Service",
  "Hot & Cold Shower",
  "Welcome Toiletries",
  "Private Balcony (select rooms)",
  "Daily Housekeeping",
  "Secure Parking",
];
