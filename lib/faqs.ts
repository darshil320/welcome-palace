// ─── Page-specific FAQ datasets ───────────────────────────────────────────────
// Each set powers BOTH a visible accordion (conversion) AND FAQPage JSON-LD
// (GEO — the single highest-impact structured-data type for AI answer engines).
// Answers front-load the fact in the first sentence so retrieval bots can quote
// them directly. Keep every answer factually grounded in real site content.

export interface Faq {
  question: string;
  answer: string;
}

export const roomsFaqs: Faq[] = [
  {
    question: "What room types does Welcome Palace offer in Surat?",
    answer:
      "Welcome Palace has 15 rooms in Piplod, Surat: Deluxe Rooms from ₹3,500/night, Suite Rooms from ₹4,500, Honeymoon Suites with a private jacuzzi from ₹5,500, and Family Rooms for up to 5 guests. The Pariwar Niwas family residence sleeps up to 12 at ₹11,000/night.",
  },
  {
    question: "Do you offer hourly or short-stay room bookings?",
    answer:
      "Yes. Every room can be booked in flexible 3-hour, 6-hour, 12-hour or 24-hour slots, so you pay only for the time you need. A flat 5% GST applies to all bookings.",
  },
  {
    question: "Are there discounts for single or double occupancy?",
    answer:
      "Yes — on 24-hour stays, single-guest bookings get 35% off and two-guest bookings get 15% off the base room rate.",
  },
  {
    question: "Do the honeymoon suites really have a private jacuzzi?",
    answer:
      "Yes. Our Honeymoon Suites include an in-room private jacuzzi, romantic pre-décor and mood lighting. You can add themed décor (+₹2,000) and a candlelight dinner (+₹1,200 per couple).",
  },
  {
    question: "What amenities are included in every room?",
    answer:
      "Every room includes air conditioning, an LCD TV, high-speed Wi-Fi, an en-suite bathroom with hot & cold water, 24/7 room service, daily housekeeping and free parking with power backup.",
  },
];

export const banquetFaqs: Faq[] = [
  {
    question: "How many guests can the Welcome Palace banquet hall hold?",
    answer:
      "The banquet hall in Piplod, Surat is comfortable for 125–150 guests and accommodates up to 175 at maximum. It suits weddings, Satsang, Haldi, Mehandi, Sangeet, corporate meets, kitty and birthday parties.",
  },
  {
    question: "How much does the banquet hall cost?",
    answer:
      "Banquet slots are ₹18,000 for a morning (8 AM–2 PM) or evening (5–11 PM) session. A discounted full-day package is available. Kitchen usage is ₹3,000, extra time ₹2,500/hour, with gas & electricity charged as actual.",
  },
  {
    question: "Is outside catering allowed in the banquet hall?",
    answer:
      "Yes — outside catering is allowed. You can also choose our in-house brand, Chandni Chowk Chaat & Catering, a pure-veg caterer with live counters from ₹650 per person.",
  },
  {
    question: "What facilities come with the banquet hall?",
    answer:
      "The hall includes a professional AV setup, projector, microphones, Wi-Fi, elegant seating and complete privacy. It is available for morning and evening slots seven days a week.",
  },
];

export const cateringFaqs: Faq[] = [
  {
    question: "What is Chandni Chowk Chaat & Catering?",
    answer:
      "Chandni Chowk Chaat & Catering is Welcome Palace's in-house pure-veg catering brand in Surat, serving heritage Delhi-style flavours with live counters. Plans range from ₹650 to ₹1,850 per person across six menu tiers.",
  },
  {
    question: "How much does catering cost per person?",
    answer:
      "Pure-veg catering starts at ₹650 per person (Karol Bagh Plan) and scales up through Red Fort (₹800), India Gate (₹950), Qutub Minar (₹1,250), Punjabi Bagh (₹1,550) and the ultra-luxury Paharganj Plan (₹1,850) for royal weddings.",
  },
  {
    question: "Is the catering pure vegetarian?",
    answer:
      "Yes. Chandni Chowk Chaat & Catering is 100% pure vegetarian, with live chaat and food counters, welcome drinks, starters, main course, breads, sweets and desserts depending on the plan.",
  },
  {
    question: "Can I book catering without booking the venue?",
    answer:
      "Yes — catering can be booked for events at Welcome Palace or as an outside catering service. Contact us on WhatsApp at +91 80000 14410 to customise a menu for your guest count.",
  },
];

export const shadiFaqs: Faq[] = [
  {
    question: "What is the Shadi Wala Ghar concept at Welcome Palace?",
    answer:
      "Shadi Wala Ghar is Welcome Palace's signature entire-floor family wedding stay in Surat: your whole family sleeps, eats and celebrates under one roof, with all rooms plus a private banquet hall booked together. A 60-guest full buyout starts from ₹61,000.",
  },
  {
    question: "How many people can stay for a family wedding?",
    answer:
      "The property offers 15 rooms with a total stay capacity of about 65 guests, plus the Pariwar Niwas residence for up to 12. Combined with the banquet hall for up to 175 event guests, it fits a complete family wedding.",
  },
  {
    question: "What is included in an entire-floor buyout?",
    answer:
      "An entire-floor Shadi Wala Ghar buyout includes all guest rooms, the private banquet hall, complete privacy and the option of in-house Chandni Chowk Chaat & Catering or outside caterers.",
  },
  {
    question: "Where is Welcome Palace located?",
    answer:
      "Welcome Palace is at 1st Floor, Chandni Chowk Complex, near Surat–Dumas Road, Piplod, Surat – 395007, Gujarat. Call +91 80000 14410 to check dates.",
  },
];
