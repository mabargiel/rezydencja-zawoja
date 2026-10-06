import { site } from '@/config/site'
import type { Language } from '@/i18n/config'
import { getTranslator } from '@/i18n/server'

import type { Inquiry } from './inquirySchema'

type EmailContent = { subject: string; text: string }

const siteVersion: Record<Language, string> = {
  de: 'niemiecka (odpowiedz po niemiecku)',
  en: 'angielska (odpowiedz po angielsku)',
  pl: 'polska',
}

const polishDate = (iso: string) => iso.split('-').reverse().join('.')

export function ownerEmail(inquiry: Inquiry, language: Language): EmailContent {
  const guests = inquiry.adults + inquiry.children
  const dates =
    inquiry.arrival && inquiry.departure
      ? `${polishDate(inquiry.arrival)}–${polishDate(inquiry.departure)}`
      : 'termin do ustalenia'

  const lines = [
    `Nowe zapytanie ze strony, wersja ${siteVersion[language]}.`,
    'Gość dostał automatyczne potwierdzenie.',
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

  return {
    subject: `Zapytanie: ${dates}, ${guests} os. — ${inquiry.name}`,
    text: lines.join('\n'),
  }
}

// Only fixed copy, dates and counts: the recipient address is whatever the visitor typed, so
// echoing their name or message would let the form deliver arbitrary text to strangers.
export function guestConfirmation(inquiry: Inquiry, language: Language): EmailContent {
  const t = getTranslator(language)
  const longDate = new Intl.DateTimeFormat(language, { dateStyle: 'long', timeZone: 'UTC' })
  const date = (iso: string) => longDate.format(new Date(iso))

  const dates: string[] = []
  if (inquiry.arrival) dates.push(t('inquiryEmail.arrival', { date: date(inquiry.arrival) }))
  if (inquiry.departure) dates.push(t('inquiryEmail.departure', { date: date(inquiry.departure) }))

  const lines = [
    t('inquiryEmail.greeting'),
    '',
    t('inquiryEmail.body'),
    '',
    t('inquiryEmail.summary'),
    ...(dates.length > 0 ? dates : [t('inquiryEmail.datesOpen')]),
    t('inquiryEmail.adults', { count: inquiry.adults }),
    t('inquiryEmail.children', { count: inquiry.children }),
    '',
    t('inquiryEmail.closing', { phone: site.phone }),
    '',
    t('inquiryEmail.signature', { email: site.email }),
  ]

  return { subject: t('inquiryEmail.subject'), text: lines.join('\n') }
}
