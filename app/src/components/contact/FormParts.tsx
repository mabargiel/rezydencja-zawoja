'use client'

import { ArrowRight, CircleAlert, LoaderCircle } from 'lucide-react'
import type { ReactNode } from 'react'
import { useFormStatus } from 'react-dom'

import type { InquiryField } from '@/lib/inquiry'

export function Row({ children, isPaired }: { children: ReactNode; isPaired?: boolean }) {
  return (
    <div
      className={`grid lg:grid-cols-2 lg:gap-5 ${isPaired ? 'grid-cols-2 gap-3.5' : 'gap-[18px]'}`}
    >
      {children}
    </div>
  )
}

type FieldProps = {
  label: string
  field: InquiryField
  error?: string
  children: ReactNode
}

export function Field({ label, field, error, children }: FieldProps) {
  return (
    <div className="flex min-w-0 flex-col gap-[7px] lg:gap-2">
      <label
        htmlFor={field}
        className="font-body text-[11px] tracking-[1px] text-text-secondary uppercase lg:text-xs"
      >
        {label}
      </label>
      {children}
      <FieldError field={field} message={error} />
    </div>
  )
}

export function FieldError({ field, message }: { field: InquiryField; message?: string }) {
  if (!message) return null
  return (
    <p
      id={`${field}-error`}
      className="flex items-center gap-2 font-body text-[12.5px] text-error lg:text-[13px]"
    >
      <CircleAlert aria-hidden size={14} strokeWidth={1.75} className="shrink-0" />
      {message}
    </p>
  )
}

export function SubmitButton({ label, pendingLabel }: { label: string; pendingLabel: string }) {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      className="flex items-center justify-center gap-2.5 bg-accent px-10 py-4 font-body text-[13px] font-medium tracking-[2px] text-surface uppercase transition-colors hover:bg-bg-dark disabled:opacity-75 lg:py-[17px]"
    >
      {pending ? (
        <>
          <LoaderCircle aria-hidden size={16} strokeWidth={1.75} className="animate-spin" />
          {pendingLabel}
        </>
      ) : (
        <>
          {label}
          <ArrowRight aria-hidden size={16} strokeWidth={1.75} />
        </>
      )}
    </button>
  )
}
