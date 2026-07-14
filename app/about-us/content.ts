import type { FeatureIconName } from "@/components/FeatureIcon";
import { cldImage } from "@/lib/cloudinary";

export const journeyMilestones = [
  {
    year: "2013",
    title: "Welcome Palace is Born",
    body: "TW Hospitality Services Private Limited, based in Surat, operates in hotel rooms, banquets, catering, and commercial canteen contracts. Our flagship brand Welcome Palace was established in 2013 in Piplod, offering premium stays with luxurious amenities.",
  },
  {
    year: "2017–2019",
    title: "Resto, Chaat & Canteen Contracts",
    body: "In 2017, we launched The Welcome Resto followed by Chandni Chowk Chaat & Catering, specializing in authentic Delhi chaat and Punjabi cuisine. In 2019, we entered the canteen business with Filatex India Ltd. as one of our key clients.",
  },
  {
    year: "1998",
    title: "Our Roots — Topaz Furniture",
    body: "Our roots trace back to our family-run furniture brand Topaz Furniture, established in 1998 in Surat, known for customized solid wood designs and timeless quality.",
  },
] as const;

export const missionVisionValues = {
  mission:
    "To serve with heart, deliver with excellence. From luxury stays to authentic Indian flavours, we create unforgettable hospitality experiences with quality, hygiene, and warmth.",
  vision:
    "To be a trusted name in hospitality known for luxurious comfort, authentic cuisine, and dependable food services — while continuously growing with innovation and satisfaction.",
  values: ["Customer First", "Quality & Hygiene", "Authenticity", "Integrity", "Innovation", "Teamwork"],
} as const;

export const highlightCards: {
  icon: FeatureIconName;
  image: string;
  alt: string;
  title: string;
  description: string;
  statLabel: string;
  stat:
    | { kind: "count"; target: number; suffix: string; caption: string }
    | { kind: "text"; value: string };
}[] = [
  {
    icon: "bed",
    image: cldImage("room-108.jpg"),
    alt: "Premium luxury suite at Welcome Palace",
    title: "15 Premium Luxury Rooms",
    description: "Deluxe, Suite, Family Rooms & Honeymoon Suites with Jacuzzi",
    stat: { kind: "count", target: 65, suffix: "+", caption: "Guests" },
    statLabel: "Total Stay Capacity",
  },
  {
    icon: "couch",
    image: cldImage("room-110.jpg"),
    alt: "Pariwar Niwas private family residence",
    title: "Pariwar Niwas",
    description: "Private 2-bedroom residence with kitchen & hall",
    stat: { kind: "count", target: 12, suffix: "", caption: "Guests Max" },
    statLabel: "Family Residence",
  },
  {
    icon: "users",
    image: cldImage("banquet-haldi.jpg"),
    alt: "Banquet hall set up for a celebration",
    title: "Banquet Hall",
    description: "Up to 175 guests — weddings, corporate & spiritual events",
    stat: { kind: "text", value: "₹28,000 Full Day" },
    statLabel: "175 Guests Max",
  },
  {
    icon: "utensils",
    image: cldImage("banquet-mehandi.jpg"),
    alt: "Chandni Chowk live kitchen catering setup",
    title: "Chandni Chowk Chaat & Catering",
    description: "Pure-veg catering with live counters",
    stat: { kind: "text", value: "From ₹650/person" },
    statLabel: "Live Counters",
  },
];

export const cancellationPolicies = [
  {
    title: "Room Bookings",
    points: [
      "Free cancellation up to 48 hours before check-in.",
      "Cancellations within 48 hours of check-in incur a 50% charge of the booking amount.",
      "No-shows or cancellations within 24 hours of check-in incur a 100% charge.",
    ],
  },
  {
    title: "Banquet Bookings",
    points: [
      "Free cancellation up to 7 days before the event.",
      "Cancellations within 7 days of the event incur a 50% charge of the booking deposit.",
      "Cancellations within 48 hours or no-shows incur a 100% charge.",
    ],
  },
  {
    title: "Catering Services",
    points: [
      "Free cancellation up to 7 days before the event.",
      "Cancellations within 7 days of the event incur a 50% charge of the agreed amount.",
      "Cancellations within 48 hours incur a 100% charge.",
    ],
  },
] as const;

export const generalTerms = [
  "Refunds, if applicable, will be processed within 7-10 business days.",
  "Contact welcomepalacesurat@gmail.com or +91 80000 14410 for cancellation requests.",
  "Policy may vary during peak seasons or for special events — confirm at time of booking.",
] as const;

export const testimonials = [
  {
    name: "Meena Patel",
    occasion: "Family Wedding",
    date: "March 2026",
    quote:
      "The Shadi Wala Ghar concept is a blessing! Entire family stayed together with full privacy and amazing food.",
  },
  {
    name: "Ramesh Sharma",
    occasion: "Family Function",
    date: "Feb 2026",
    quote: "Luxury rooms, perfect location, and the live kitchen was a highlight. Felt like home but better.",
  },
  {
    name: "Priya & Arjun Desai",
    occasion: "Wedding",
    date: "Jan 2026",
    quote: "Banquet hall was elegant and the team took care of everything. Best value in Surat.",
  },
] as const;
