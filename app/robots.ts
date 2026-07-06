import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

// Explicitly allow AI *search/retrieval* bots so the site can be CITED by
// answer engines, plus training bots for maximum reach. ChatGPT web search is
// Bing-powered, so Bing Webmaster Tools registration is also required (ops task).
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      // AI search / retrieval bots (citation surface)
      { userAgent: "OAI-SearchBot", allow: "/" },
      { userAgent: "ChatGPT-User", allow: "/" },
      { userAgent: "PerplexityBot", allow: "/" },
      { userAgent: "Perplexity-User", allow: "/" },
      { userAgent: "Claude-SearchBot", allow: "/" },
      { userAgent: "Claude-User", allow: "/" },
      { userAgent: "Google-Extended", allow: "/" },
      { userAgent: "GPTBot", allow: "/" },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
