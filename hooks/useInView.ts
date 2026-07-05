"use client";

import { useCallback, useEffect, useRef, useState, type Ref } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

function setRefValue<T>(ref: Ref<T> | undefined, node: T | null) {
  if (!ref) return;
  if (typeof ref === "function") {
    ref(node);
  } else {
    (ref as React.RefObject<T | null>).current = node;
  }
}

export function useInView<T extends HTMLElement = HTMLElement>(
  threshold = 0.12,
  externalRef?: Ref<T>,
) {
  const nodeRef = useRef<T | null>(null);
  const [observedInView, setObservedInView] = useState(false);
  const reduced = usePrefersReducedMotion();

  const setRef = useCallback(
    (node: T | null) => {
      nodeRef.current = node;
      setRefValue(externalRef, node);
    },
    [externalRef],
  );

  useEffect(() => {
    if (reduced) return;
    const el = nodeRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setObservedInView(true);
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold, rootMargin: "0px 0px -6% 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, reduced]);

  return { ref: setRef, isInView: reduced || observedInView };
}
