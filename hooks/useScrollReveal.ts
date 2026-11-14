"use client";

import { useCallback, useLayoutEffect, useRef, type Ref } from "react";

const PENDING = "is-pending";

function setRefValue<T>(ref: Ref<T> | undefined, node: T | null) {
  if (!ref) return;
  if (typeof ref === "function") {
    ref(node);
  } else {
    (ref as React.RefObject<T | null>).current = node;
  }
}

/**
 * Below-the-fold scroll reveal without hiding anything in the static HTML.
 *
 * Before the first client paint, an element that starts below the fold gets
 * `.is-pending` (the hidden pose, defined in globals.css). An
 * IntersectionObserver removes it once, on first entry, and the CSS
 * transition plays. Elements already on screen are left alone, so nothing at
 * rest on first paint plays an entrance and nothing depends on JS to show.
 *
 * Works on the DOM class list directly: no React state, no re-render per reveal.
 */
export function useScrollReveal<T extends HTMLElement = HTMLElement>(threshold = 0.12, externalRef?: Ref<T>) {
  const nodeRef = useRef<T | null>(null);

  const setRef = useCallback(
    (node: T | null) => {
      nodeRef.current = node;
      setRefValue(externalRef, node);
    },
    [externalRef],
  );

  useLayoutEffect(() => {
    const el = nodeRef.current;
    if (!el || !("IntersectionObserver" in window)) return;
    if (el.getBoundingClientRect().top < window.innerHeight) return;

    el.classList.add(PENDING);
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          el.classList.remove(PENDING);
          observer.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -6% 0px" },
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      el.classList.remove(PENDING);
    };
  }, [threshold]);

  return setRef;
}
