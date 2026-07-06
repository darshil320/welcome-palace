import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";

// Static routes. Build-time lastModified is fine for a mostly-static brochure
// site; regenerate on deploy. Home + Shadi Wala Ghar are the priority landing
// pages for wedding-stay queries.
const routes: { path: string; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]; priority: number }[] = [
  { path: "/", changeFrequency: "weekly", priority: 1.0 },
  { path: "/shadi-wala-ghar", changeFrequency: "monthly", priority: 0.9 },
  { path: "/rooms", changeFrequency: "weekly", priority: 0.9 },
  { path: "/banquet", changeFrequency: "monthly", priority: 0.8 },
  { path: "/catering", changeFrequency: "monthly", priority: 0.8 },
  { path: "/about-us", changeFrequency: "monthly", priority: 0.6 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return routes.map((route) => ({
    url: absoluteUrl(route.path),
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
