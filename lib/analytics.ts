import { sendGTMEvent } from "@next/third-parties/google";

// IDs come from env so no tracking code ships until configured.
export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID ?? "";
export const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID ?? "";

type EventParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    clarity?: (...args: unknown[]) => void;
  }
}

/** Push a GA4 page_view into GTM's dataLayer (App Router doesn't auto-fire these). */
export function trackPageView(url: string) {
  if (typeof window === "undefined" || !GTM_ID) return;
  sendGTMEvent({
    event: "page_view",
    page_path: url,
    page_location: window.location.href,
    page_title: document.title,
  });
}

export function trackEvent(name: string, params: EventParams = {}) {
  if (typeof window === "undefined" || !GTM_ID) return;
  sendGTMEvent({ event: name, ...params });
}

/** Tag the current Clarity session; `upgrade` prioritises it for recording. */
export function clarityEvent(name: string, upgrade = false) {
  if (typeof window === "undefined" || !window.clarity) return;
  window.clarity("event", name);
  if (upgrade) window.clarity("upgrade", name);
}
