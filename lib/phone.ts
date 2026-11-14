// ─── Indian mobile number parsing (Postel's law) ─────────────────────────────
// Accept what people actually type or paste — spaces, dashes, brackets, a
// leading +91 / 91 / 0 — and give back one clean 10-digit number.

const MOBILE_DIGITS = 10;

/** Returns the 10-digit mobile number, or null when it can't be parsed. */
export function normalizeIndianMobile(raw: string): string | null {
  const digits = raw.replace(/\D/g, "");
  const local =
    digits.length === MOBILE_DIGITS + 2 && digits.startsWith("91")
      ? digits.slice(2)
      : digits.length === MOBILE_DIGITS + 1 && digits.startsWith("0")
        ? digits.slice(1)
        : digits;
  return local.length === MOBILE_DIGITS ? local : null;
}

export const PHONE_ERROR = "Please enter a valid 10-digit phone number.";
export const NAME_ERROR = "Please enter your name.";
