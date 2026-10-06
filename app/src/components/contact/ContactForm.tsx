'use client'

import { CircleAlert } from 'lucide-react'
import { useActionState } from 'react'

import { sendInquiry } from '@/app/[lng]/contact/actions'
import { phoneHref, site } from '@/config/site'
import type { Language } from '@/i18n/config'
import type { Messages } from '@/i18n/types'
import {
  type InquiryField,
  type InquiryState,
  type InquiryValues,
  maxGuests,
  maxMessageLength,
  today,
} from '@/lib/inquiry'

import { Field, FieldError, Row, SubmitButton } from './FormParts'
import { InquirySent } from './InquirySent'

type ContactCopy = Messages['pages']['contact']

export type ContactFormProps = {
  copy: Pick<ContactCopy, 'form' | 'errors' | 'sent'>
  language: Language
  contactHref: string
  defaults?: InquiryValues
}

const initialState: InquiryState = { status: 'idle' }

const inputClass =
  'w-full border bg-surface px-3.5 py-3 font-body text-[14.5px] text-text-primary outline-none transition-colors placeholder:text-text-placeholder focus:border-accent lg:px-4 lg:py-3.5 lg:text-[15px]'

export function ContactForm({ copy, language, contactHref, defaults = {} }: ContactFormProps) {
  const [state, formAction] = useActionState(sendInquiry, initialState)
  const { form, errors, sent } = copy

  if (state.status === 'sent') {
    return <InquirySent copy={sent} contactHref={contactHref} />
  }

  const values = state.values ?? defaults
  const errorFor = (field: InquiryField) => {
    const code = state.errors?.[field]
    return code ? errors[code] : undefined
  }
  const fieldProps = (field: InquiryField) => {
    const error = errorFor(field)
    return {
      'aria-describedby': error ? `${field}-error` : undefined,
      'aria-invalid': error ? true : undefined,
      className: `${inputClass} ${error ? 'border-error' : 'border-line'}`,
      defaultValue: values[field],
      id: field,
      name: field,
    }
  }

  return (
    <form action={formAction} className="flex flex-col gap-[18px] lg:gap-5">
      <p className="flex items-center gap-2.5 font-body text-[10.5px] tracking-[3px] text-accent-warm-deep uppercase lg:gap-3 lg:text-xs lg:tracking-[5px]">
        <span aria-hidden className="h-0.5 w-[22px] bg-accent-warm lg:w-[26px]" />
        {form.eyebrow}
      </p>
      <h2 className="font-display text-[28px] leading-[1.1] text-text-primary lg:text-[38px]">
        {form.title}
      </h2>

      <input type="hidden" name="language" value={language} />
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="website">{form.honeypot}</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <Field label={form.name} field="name" error={errorFor('name')}>
        <input
          {...fieldProps('name')}
          type="text"
          autoComplete="name"
          required
          maxLength={100}
          placeholder={form.namePlaceholder}
        />
      </Field>
      <Row>
        <Field label={form.phone} field="phone" error={errorFor('phone')}>
          <input
            {...fieldProps('phone')}
            type="tel"
            autoComplete="tel"
            placeholder={form.phonePlaceholder}
          />
        </Field>
        <Field label={form.email} field="email" error={errorFor('email')}>
          <input
            {...fieldProps('email')}
            type="email"
            autoComplete="email"
            required
            placeholder={form.emailPlaceholder}
          />
        </Field>
      </Row>
      <Row isPaired>
        <Field label={form.arrival} field="arrival" error={errorFor('arrival')}>
          <input {...fieldProps('arrival')} type="date" min={today()} />
        </Field>
        <Field label={form.departure} field="departure" error={errorFor('departure')}>
          <input {...fieldProps('departure')} type="date" min={today()} />
        </Field>
      </Row>
      <Row isPaired>
        <Field label={form.adults} field="adults" error={errorFor('adults')}>
          <input
            {...fieldProps('adults')}
            defaultValue={values.adults || '2'}
            type="number"
            inputMode="numeric"
            min={1}
            max={maxGuests}
            required
          />
        </Field>
        <Field label={form.children} field="children" error={errorFor('children')}>
          <input
            {...fieldProps('children')}
            defaultValue={values.children || '0'}
            type="number"
            inputMode="numeric"
            min={0}
            max={maxGuests}
          />
        </Field>
      </Row>
      <Field label={form.message} field="message" error={errorFor('message')}>
        <textarea
          {...fieldProps('message')}
          rows={4}
          maxLength={maxMessageLength}
          placeholder={form.messagePlaceholder}
          className={`${fieldProps('message').className} min-h-[110px] resize-y lg:min-h-[120px]`}
        />
      </Field>

      <div className="flex flex-col gap-2 pt-1 lg:pt-1.5">
        <label className="flex items-start gap-3 font-body text-[12.5px] leading-[1.5] text-text-secondary lg:items-center lg:text-[13px]">
          <input
            type="checkbox"
            name="consent"
            required
            defaultChecked={values.consent === 'on'}
            aria-invalid={errorFor('consent') ? true : undefined}
            aria-describedby={errorFor('consent') ? 'consent-error' : undefined}
            className={`mt-0.5 size-[18px] shrink-0 accent-accent lg:mt-0 ${errorFor('consent') ? 'outline outline-1 outline-error' : ''}`}
          />
          {form.consent}
        </label>
        <FieldError field="consent" message={errorFor('consent')} />
      </div>

      {state.status === 'failed' && (
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
            <p className="font-body text-sm font-medium text-text-primary lg:text-[14.5px]">
              {errors.failedTitle}
            </p>
            <p className="font-body text-[13px] leading-[1.5] text-text-secondary lg:text-[13.5px]">
              {errors.failedBody}{' '}
              <a href={phoneHref} className="underline underline-offset-2 hover:text-accent">
                {site.phone}
              </a>
              {' · '}
              <a
                href={`mailto:${site.email}`}
                className="underline underline-offset-2 hover:text-accent"
              >
                {site.email}
              </a>
            </p>
          </div>
        </div>
      )}

      <SubmitButton label={form.submit} pendingLabel={form.sending} />
    </form>
  )
}
