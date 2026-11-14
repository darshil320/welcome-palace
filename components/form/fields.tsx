"use client";

import { type InputHTMLAttributes, type ReactNode, type SelectHTMLAttributes, type TextareaHTMLAttributes } from "react";

/** Shared input look. Focus shows a 3px ring (shape, not only colour); errors add a red border + message. */
export const fieldControlClass =
  "w-full rounded-xl border border-line bg-white px-4 py-3 text-[15px] font-medium text-ink placeholder:text-faint transition-[border-color,box-shadow] duration-(--dur-hover) ease-(--ease-enter) focus:border-gold focus:outline-none focus-visible:ring-[3px] focus-visible:ring-gold/35 aria-invalid:border-red-500 aria-invalid:focus-visible:ring-red-500/25";

function FieldWrap({ label, required, children }: { label: string; required?: boolean; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[13px] font-semibold text-ink-soft">
        {label}
        {required ? <span className="text-gold-deep"> *</span> : null}
      </span>
      {children}
    </label>
  );
}

/** Message shown beside the field that failed; linked via aria-describedby. */
export function FieldError({ id, message }: { id: string; message?: string | null }) {
  if (!message) return null;
  return (
    <span id={id} role="alert" className="mt-1.5 block text-[12.5px] font-semibold text-red-600">
      {message}
    </span>
  );
}

export function TextField({
  label,
  required,
  error,
  ...props
}: { label: string; required?: boolean; error?: string | null } & InputHTMLAttributes<HTMLInputElement>) {
  const errorId = props.id ? `${props.id}-error` : undefined;
  return (
    <FieldWrap label={label} required={required}>
      <input
        required={required}
        className={fieldControlClass}
        aria-invalid={error ? true : undefined}
        aria-describedby={error && errorId ? errorId : undefined}
        {...props}
      />
      {errorId ? <FieldError id={errorId} message={error} /> : null}
    </FieldWrap>
  );
}

export function SelectField({
  label,
  required,
  children,
  ...props
}: { label: string; required?: boolean; children: ReactNode } & SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <FieldWrap label={label} required={required}>
      <select required={required} className={`${fieldControlClass} appearance-none`} {...props}>
        {children}
      </select>
    </FieldWrap>
  );
}

export function TextAreaField({
  label,
  required,
  ...props
}: { label: string; required?: boolean } & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <FieldWrap label={label} required={required}>
      <textarea required={required} rows={4} className={`${fieldControlClass} resize-none`} {...props} />
    </FieldWrap>
  );
}

/** Full-width submit: a wide surface, so press/hover change brightness instead of scaling. */
export function SubmitButton({ children }: { children: ReactNode }) {
  return (
    <button
      type="submit"
      className="press-surface mt-2 inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-ink px-8 py-4 text-[15px] font-semibold text-white"
    >
      {children}
    </button>
  );
}
