import type { MetadataRoute } from "next";

// PWA / install manifest — improves mobile "add to home screen", Android
// theming and is a minor trust/completeness signal for search.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Welcome Palace — Hotel, Banquet & Catering in Surat",
    short_name: "Welcome Palace",
    description:
      "Your Shadi Wala Ghar in Piplod, Surat — 15 luxury rooms, a private banquet hall for 125–175 guests and in-house Chandni Chowk Live Kitchen catering.",
    start_url: "/",
    display: "standalone",
    background_color: "#14100a",
    theme_color: "#14100a",
    lang: "en-IN",
    categories: ["travel", "hospitality", "food"],
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
