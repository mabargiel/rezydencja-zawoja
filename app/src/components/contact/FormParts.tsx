'use client'

import { ArrowRight, CircleAlert, LoaderCircle } from 'lucide-react'
import type { ReactNode } from 'react'
import { useFormStatus } from 'react-dom'

import { emailHref, phoneHref, site } from '@/config/site'
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

type SendErrorProps = {
  title: string
  body: string
}

export function SendError({ title, body }: SendErrorProps) {
  return (
    <div
      role="alert"
      className="flex gap-3 border border-error bg-error-tint px-4 py-3.5 lg:gap-3.5 lg:px-[18px] lg:py-4"
    >
      <CircleAlert
        aria-hidden
        size={18}
        strokeWidth={1.75}
        className="mt-0.5 shrink-0 text-error"
      />
      <div className="flex flex-col gap-1">
        <p className="font-body text-sm font-medium text-text-primary lg:text-[14.5px]">{title}</p>
        <p className="font-body text-[13px] leading-[1.5] text-text-secondary lg:text-[13.5px]">
          {body}{' '}
          <a href={phoneHref} className="underline underline-offset-2 hover:text-accent">
            {site.phone}
          </a>
          {' · '}
          <a href={emailHref} className="underline underline-offset-2 hover:text-accent">
            {site.email}
          </a>
        </p>
      </div>
    </div>
  )
}
