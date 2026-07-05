import type { FeatureIconName } from "@/components/FeatureIcon";
import { cldVideo } from "@/lib/cloudinary";

export const banquetEventTypes: { icon: FeatureIconName; label: string }[] = [
  { icon: "music", label: "Satsang & Kirtan" },
  { icon: "gift", label: "Sangeet & Haldi" },
  { icon: "champagne", label: "Birthday Parties" },
  { icon: "users", label: "Kitty Parties" },
];

export const banquetVideoGallery = [
  { src: cldVideo("banquet/cultural-event.mp4"), label: "Cultural Event" },
  { src: cldVideo("banquet/wedding-function.mp4"), label: "Wedding Function" },
  { src: cldVideo("banquet/spiritual-event.mp4"), label: "Spiritual Event" },
  { src: cldVideo("banquet/haldi-vibes.mp4"), label: "Haldi Special" },
  { src: cldVideo("banquet/haldi-celebration.mp4"), label: "Haldi Celebration" },
  { src: cldVideo("banquet/mehandi-highlights.mp4"), label: "Mehandi Highlights" },
];

export const banquetTariffRows = [
  { label: "Morning", time: "8 AM – 2 PM", price: "₹18,000" },
  { label: "Evening", time: "5 PM – 11 PM", price: "₹18,000" },
];

export const banquetTariffExtras = [
  "Kitchen Usage ₹3,000 extra per event",
  "Extra Time ₹2,500/hr",
  "Electricity / Gas: As Actual",
  "Hall Cleaning ₹1,500",
  "Kitchen Cleaning ₹1,000",
];

export const haldiMehandiHighlights = [
  { src: cldVideo("banquet/haldi-ceremony.mp4"), label: "Haldi Ceremony" },
  { src: cldVideo("banquet/mehandi-function.mp4"), label: "Mehandi Function" },
  { src: cldVideo("banquet/haldi-vibes.mp4"), label: "Haldi Vibes" },
  { src: cldVideo("banquet/mehandi-night.mp4"), label: "Mehandi Night" },
];

export const banquetSlotOptions = [
  "Morning (8 AM – 2 PM) - ₹18,000",
  "Evening (5 PM – 11 PM) - ₹18,000",
] as const;
