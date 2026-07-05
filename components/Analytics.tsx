"use client";

import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";
import { CLARITY_ID, GTM_ID, clarityEvent, trackEvent, trackPageView } from "@/lib/analytics";

/** Pushes a page_view into GTM's dataLayer on client-side navigations. */
function RouteTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const query = searchParams.toString();
    trackPageView(query ? `${pathname}?${query}` : pathname);
  }, [pathname, searchParams]);

  return null;
}

/**
 * One delegated listener converts every WhatsApp, phone and email CTA into
 * a tracked conversion — current and future buttons alike, no per-CTA wiring.
 * Events land in the dataLayer; wire GA4 tags to these in GTM.
 */
function ConversionTracker() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target as Element | null;
      const anchor = target?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!anchor) return;

      const href = anchor.href;
      const shared = {
        link_text: (anchor.textContent ?? "").trim().slice(0, 60),
        section: anchor.closest("section")?.id || "page",
        page_path: window.location.pathname,
      };

      if (href.includes("wa.me/")) {
        trackEvent("whatsapp_click", shared);
        trackEvent("generate_lead", { lead_source: "whatsapp", ...shared });
        clarityEvent("whatsapp_click", true);
      } else if (href.startsWith("tel:")) {
        trackEvent("phone_call_click", shared);
        trackEvent("generate_lead", { lead_source: "phone", ...shared });
        clarityEvent("phone_call_click", true);
      } else if (href.startsWith("mailto:")) {
        trackEvent("email_click", shared);
        clarityEvent("email_click");
      }
    };

    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return null;
}

export function Analytics() {
  return (
    <>
      {GTM_ID && (
        <Suspense fallback={null}>
          <RouteTracker />
        </Suspense>
      )}
      {CLARITY_ID && (
        <Script id="clarity-init" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "${CLARITY_ID}");
          `}
        </Script>
      )}
      <ConversionTracker />
    </>
  );
}
