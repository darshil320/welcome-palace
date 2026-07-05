import { cldImage } from "@/lib/cloudinary";

export const accommodationRows = [
  { label: "7 Deluxe Rooms", detail: "Double Occ.", price: "₹24,500" },
  { label: "3 Suite Rooms", detail: "Jacuzzi Attached", price: "₹13,500" },
  { label: "3 Family Rooms", detail: "4 Pax Each", price: "₹16,500" },
  { label: "2 Honeymoon Suites", detail: "Jacuzzi", price: "₹11,000" },
  { label: "1 Pariwar Niwas", detail: "Up to 12 Pax", price: "₹11,000" },
] as const;

export const buyoutRow = {
  label: "All Rooms Buyout",
  detail: "60 Pax Total Capacity",
  price: "₹61,000",
} as const;

export const eliteFeatures = [
  "5 Luxury Jacuzzi Tubs",
  "15–20 Extra Mattresses",
  "100% Property Privacy",
] as const;

export const occupancyStats = [
  { value: "40", label: "On-Bed Pax" },
  { value: "12", label: "Niwas Pax" },
  { value: "61", label: "Total Guests" },
] as const;

export const banquetTariffRows = [
  { label: "Morning", time: "8 AM – 2 PM", price: "₹18,000" },
  { label: "Evening", time: "5 PM – 11 PM", price: "₹18,000" },
] as const;

export const banquetTariffExtras = [
  "Kitchen Usage (Per Event) ₹3,000",
  "Cleaning (Banquet & Kitchen) ₹2,500",
  "Gas & Electricity Charges: As Per Actual",
] as const;

export const cateringOptions = [
  "Our In-house Catering (Chandni Chowk)",
  "Own Caterer / Outside Catering",
] as const;

export const banquetRequiredOptions = [
  "No, Only Rooms",
  "Yes, Need Banquet Hall",
] as const;

export const banquetSlotOptions = [
  "Morning (8 AM – 2 PM) - ₹18,000",
  "Evening (5 PM – 11 PM) - ₹18,000",
] as const;

export const gallery = [
  { src: cldImage("banquet-mehandi.jpg"), alt: "Mehandi ceremony set up across the entire floor" },
  { src: cldImage("banquet-haldi.jpg"), alt: "Haldi ceremony celebration at Welcome Palace" },
  { src: cldImage("banquet-haldi-detail.jpeg"), alt: "Haldi ceremony decor detail" },
  { src: cldImage("room-110.jpg"), alt: "Pariwar Niwas family residence interior" },
  { src: cldImage("room-114.jpg"), alt: "Honeymoon suite with jacuzzi" },
];
