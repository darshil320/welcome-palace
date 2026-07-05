"use client";

import { type InputHTMLAttributes, type ReactNode, type SelectHTMLAttributes, type TextareaHTMLAttributes } from "react";

const controlClass =
  "w-full rounded-xl border border-line bg-white px-4 py-3 text-[15px] font-medium text-ink placeholder:text-faint transition-colors duration-200 focus:border-gold focus:outline-none";

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

export function TextField({
  label,
  required,
  ...props
}: { label: string; required?: boolean } & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <FieldWrap label={label} required={required}>
      <input required={required} className={controlClass} {...props} />
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
      <select required={required} className={`${controlClass} appearance-none`} {...props}>
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
      <textarea required={required} rows={4} className={`${controlClass} resize-none`} {...props} />
    </FieldWrap>
  );
}

export function SubmitButton({ children }: { children: ReactNode }) {
  return (
    <button
      type="submit"
      className="mt-2 inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-ink px-8 py-4 text-[15px] font-semibold text-white transition-transform duration-[220ms] hover:scale-[1.015]"
    >
      {children}
    </button>
  );
}
