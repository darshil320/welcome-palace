/**
 * Peak-end: every enquiry flow ends on a line that says what happened and
 * what comes next, instead of a bare jump to WhatsApp.
 */
export function SentNotice({ show }: { show: boolean }) {
  return (
    <p role="status" aria-live="polite" className="min-h-0 text-center text-[13.5px] font-semibold text-[#2e7d32]">
      {show ? (
        <span className="inline-block transition-[opacity,translate] duration-(--dur-modal-in) ease-(--ease-enter) starting:translate-y-2 starting:opacity-0">
          WhatsApp opened with your enquiry. Tap Send there, and our team will reply within 2 hours.
        </span>
      ) : null}
    </p>
  );
}
