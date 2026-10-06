'use server'

import { Resend } from 'resend'

import { site } from '@/config/site'
import { isLanguage, type Language } from '@/i18n/config'
import type { InquiryState } from '@/lib/inquiry'
import { type Inquiry, readValues, validateInquiry } from '@/lib/inquirySchema'

const siteVersion: Record<Language, string> = {
  de: 'niemiecka (odpowiedz po niemiecku)',
  en: 'angielska (odpowiedz po angielsku)',
  pl: 'polska',
}

const polishDate = (iso: string) => iso.split('-').reverse().join('.')

function subject(inquiry: Inquiry) {
  const guests = inquiry.adults + inquiry.children
  const dates =
    inquiry.arrival && inquiry.departure
      ? `${polishDate(inquiry.arrival)}–${polishDate(inquiry.departure)}`
      : 'termin do ustalenia'
  return `Zapytanie: ${dates}, ${guests} os. — ${inquiry.name}`
}

function body(inquiry: Inquiry, language: Language) {
  const lines = [
    `Nowe zapytanie ze strony, wersja ${siteVersion[language]}.`,
    '',
    `Imię i nazwisko: ${inquiry.name}`,
    `E-mail: ${inquiry.email}`,
    `Telefon: ${inquiry.phone || '—'}`,
    `Przyjazd: ${inquiry.arrival ? polishDate(inquiry.arrival) : '—'}`,
    `Wyjazd: ${inquiry.departure ? polishDate(inquiry.departure) : '—'}`,
    `Dorośli: ${inquiry.adults}`,
    `Dzieci: ${inquiry.children}`,
  ]
  if (inquiry.message) lines.push('', 'Wiadomość:', inquiry.message)
  return lines.join('\n')
}

export async function sendInquiry(
  _previous: InquiryState,
  formData: FormData
): Promise<InquiryState> {
  if (formData.get('website')) return { status: 'sent' }

  const values = readValues(formData)
  const result = validateInquiry(values)
  if (!result.success) return { errors: result.errors, status: 'invalid', values }
  const { inquiry } = result

  const apiKey = process.env.RESEND_API_KEY
  const from = process.env.CONTACT_FROM_EMAIL
  if (!apiKey || !from) {
    console.error('Inquiry not sent: RESEND_API_KEY or CONTACT_FROM_EMAIL is missing')
    return { status: 'failed', values }
  }

  const language = formData.get('language')?.toString()
  const { error } = await new Resend(apiKey).emails.send({
    from,
    replyTo: inquiry.email,
    subject: subject(inquiry),
    text: body(inquiry, isLanguage(language) ? language : 'pl'),
    to: process.env.CONTACT_TO_EMAIL || site.email,
  })
  if (error) {
    console.error('Inquiry not sent:', error)
    return { status: 'failed', values }
  }

  return { status: 'sent' }
}
