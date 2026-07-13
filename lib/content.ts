import type { FeatureIconName } from "@/components/FeatureIcon";
import { cldImage } from "@/lib/cloudinary";

export const contact = {
  phoneDisplay: "+91 80000 14410",
  phoneHref: "tel:+918000014410",
  whatsappNumber: "918000014410",
  altPhones: ["+91 63563 20206", "+91 96878 41000"],
  aboutPagePhones: ["+91 80000 14410", "+91 76230 99099", "+91 63563 20206"],
  email: "welcomepalacesurat@gmail.com",
  address:
    "1st Floor, Chandni Chowk Complex, Near Surat–Dumas Rd, Piplod, Surat – 395007, Gujarat, India",
  fullAddress:
    "1st Floor, Chandni Chowk Complex, Near Surat–Dumas Rd, behind Shardayatan School, Nandi Park Society, Piplod, Surat – 395007, Gujarat, India",
};

export function waLink(message: string) {
  return `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/rooms", label: "Rooms" },
  { href: "/banquet", label: "Banquet" },
  { href: "/shadi-wala-ghar", label: "Shadi Wala Ghar" },
  { href: "/catering", label: "Catering" },
  { href: "/about-us", label: "About Us" },
] as const;

export const heroStats = [
  { value: 15, suffix: "", label: "Luxury Rooms" },
  { value: 65, suffix: "+", label: "Stay Capacity" },
  { value: 150, suffix: "", label: "Event Guests" },
  { value: 200, suffix: "+", label: "Events Hosted" },
];

export const mosaicImages = [
  { src: cldImage("new-rooms/room-101-a.jpg"), alt: "Guest room 101 interior" },
  { src: cldImage("new-rooms/room-103-a.jpg"), alt: "Guest room 103 interior" },
  { src: cldImage("new-rooms/room-105-a.jpg"), alt: "Guest room 105 interior" },
  { src: cldImage("new-rooms/room-109-a.jpg"), alt: "Guest room 109 interior" },
  { src: cldImage("new-rooms/room-111-a.jpg"), alt: "Guest room 111 interior" },
  { src: cldImage("new-rooms/room-112-a.jpg"), alt: "Guest room 112 interior" },
];

export const spaces = [
  {
    image: cldImage("new-rooms/room-104-a.jpg"),
    alt: "Deluxe Room 104",
    tag: "Stay · 7 rooms",
    name: "Deluxe Rooms",
    price: "from ₹3,500",
    message: "Hi Welcome Palace! I'd like to book a Deluxe Room.",
  },
  {
    image: cldImage("new-rooms/room-108-a.jpg"),
    alt: "Suite Room 108",
    tag: "Stay · 6 rooms",
    name: "Suite Rooms",
    price: "from ₹4,500",
    message: "Hi Welcome Palace! I'd like to book a Suite Room.",
  },
  {
    image: "/images/honeymoon-new-1.png",
    alt: "Honeymoon Suite",
    tag: "Jacuzzi · 3 suites",
    name: "Honeymoon Suites",
    price: "from ₹5,500",
    message: "Hi Welcome Palace! I'd like to book a Honeymoon Suite with jacuzzi.",
  },
  {
    image: cldImage("new-rooms/room-110-a.jpg"),
    alt: "Pariwar Niwas family residence",
    tag: "Group · up to 12",
    name: "Pariwar Niwas",
    price: "₹11,000/nt",
    message: "Hi Welcome Palace! I'm interested in Pariwar Niwas.",
  },
  {
    image: cldImage("banquet-haldi.jpg"),
    alt: "Banquet Hall set up for a Haldi ceremony",
    tag: "Events · 125–175",
    name: "Banquet Hall",
    price: "from ₹18,000",
    message: "Hi Welcome Palace! I'd like to enquire about the Banquet Hall.",
  },
  {
    image: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=900&q=80",
    alt: "Chandni Chowk Live Kitchen",
    tag: "Dining · Pure Veg",
    name: "Live Kitchen",
    price: "from ₹650/pax",
    message: "Hi Welcome Palace! I'd like to enquire about Chandni Chowk catering.",
  },
];

export const pariwarFeatures: { icon: FeatureIconName; label: string }[] = [
  { icon: "bed", label: "2 Private Bedrooms" },
  { icon: "couch", label: "Hall for Extra Bedding" },
  { icon: "utensils", label: "Private Kitchen" },
  { icon: "users", label: "Up to 12 Guests" },
  { icon: "bedPillow", label: "Extra Bedding Included" },
  { icon: "key", label: "Private Entry / Floor" },
];

export const romanticFeatures: { icon: FeatureIconName; label: string }[] = [
  { icon: "gift", label: "Premium Room Décor" },
  { icon: "champagne", label: "Welcome Sparkling Drinks" },
  { icon: "hotTub", label: "Private Jacuzzi Experience" },
  { icon: "utensils", label: "Candle Light Dinner" },
  { icon: "fire", label: "Scented Candle Décor" },
  { icon: "music", label: "Romantic Playlist" },
];

export const banquetTags = [
  "Weddings",
  "Satsang & Kirtan",
  "Sangeet & Haldi",
  "Mehandi",
  "Corporate Meets",
  "Kitty Parties",
];

export const tariffRows = {
  banquet: [
    { label: "Morning", time: "8 AM–2 PM", price: "₹18,000" },
    { label: "Evening", time: "5–11 PM", price: "₹18,000" },
  ],
  home: [
    { label: "Morning", time: "7–10 AM", price: "₹10,000" },
    { label: "Lunch", time: "12–4 PM", price: "₹12,000" },
    { label: "Dinner", time: "6–11 PM", price: "₹14,000" },
  ],
};

export const homeFullDayOffer = {
  original: "₹36,000",
  discounted: "₹28,000",
};

export const tariffExtras = [
  "Kitchen usage ₹3,000",
  "Extra time ₹2,500/hr",
  "Cleaning ₹2,500",
  "Gas & electricity as actual",
];

export const faqItems = [
  {
    question: "What time is check-in and check-out?",
    answer:
      "We offer flexible stays — 3, 6, 12 and 24-hour slots. Standard 24-hour bookings run check-in to check-out across the day; short slots are timed from your chosen start. A flat 5% GST applies to every booking.",
  },
  {
    question: "How many guests can the banquet hall hold?",
    answer:
      "The hall is comfortable for 125–150 guests and accommodates up to 175 at maximum. It suits weddings, Satsang, Haldi, Sangeet, corporate meets, kitty and birthday parties.",
  },
  {
    question: "Is outside catering allowed?",
    answer:
      "Yes — outside catering is allowed. You can also choose our in-house brand, Chandni Chowk Live Kitchen, with live counters and pure-veg heritage flavours from ₹650 per person. Kitchen usage is ₹3,000 per event.",
  },
  {
    question: "What is your cancellation policy?",
    answer:
      "Rooms: free cancellation up to 48 hrs before check-in, 50% within 48 hrs, 100% within 24 hrs / no-show. Banquet & catering: free up to 7 days before, 50% within 7 days, 100% within 48 hrs. Refunds process in 7–10 business days.",
  },
  {
    question: "Do you offer honeymoon or romantic packages?",
    answer:
      "Yes. Our Honeymoon Suites include a private jacuzzi, and any room can be turned into a romantic couple stay with décor (+₹2,000) and an optional candlelight dinner (+₹1,200 per couple).",
  },
];

export const footerExploreLinks = [
  { href: "/#explore", label: "Rooms & Suites" },
  { href: "/shadi-wala-ghar", label: "Shadi Wala Ghar" },
  { href: "/banquet", label: "Banquet Hall" },
  { href: "/catering", label: "Catering" },
  { href: "/about-us", label: "About Us" },
];

export const socialLinks = [
  { href: "https://www.facebook.com/wp.surat?mibextid=9R9pXO", label: "Facebook", icon: "facebook" },
  {
    href: "https://www.instagram.com/rooms_banquet_catering?igsh=MXA3ZmlzMTFnMjRlYQ==",
    label: "Instagram",
    icon: "instagram",
  },
  { href: "https://youtu.be/1SqSrVRk1RA?si=YoFJ9t_IOecPvcE_", label: "YouTube", icon: "youtube" },
  { href: "https://twitter.com/welcomepalace", label: "Twitter", icon: "twitter" },
  { href: "https://wa.me/918000014410", label: "WhatsApp", icon: "whatsapp" },
] as const;
