// ─── Motion values JS needs ──────────────────────────────────────────────────
// Mirrors the CSS tokens in app/globals.css (:root --dur-*). Change both together.

export const MOTION = {
  /** --dur-modal-out: lets one dialog finish leaving before the next opens. */
  modalOutMs: 160,
  /** --dur-shake */
  shakeMs: 360,
  /** Undo window for reversible removals. */
  undoMs: 5000,
} as const;

const SHAKE_KEYFRAMES: Keyframe[] = [0, -10, 10, -6, 6, -3, 0].map((x) => ({ translate: `${x}px 0` }));

function prefersReducedMotion(): boolean {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Exaggeration for a failed submit: shake the wrong field and focus it.
 * Called from event handlers only (never during render).
 */
export function shakeAndFocus(el: HTMLElement | null): void {
  if (!el) return;
  el.focus({ preventScroll: false });
  if (prefersReducedMotion() || typeof el.animate !== "function") return;
  el.animate(SHAKE_KEYFRAMES, { duration: MOTION.shakeMs, easing: "ease-out" });
}

/** Wait for a dialog's exit before the next step (staging: one motion at a time). */
export function afterModalExit(callback: () => void): void {
  window.setTimeout(callback, prefersReducedMotion() ? 0 : MOTION.modalOutMs);
}
