'use client'

import { useSearchParams } from 'next/navigation'

import { type InquiryValues, isoDatePattern, maxGuests, today } from '@/lib/inquiry'

import { ContactForm, type ContactFormProps } from './ContactForm'

type SearchParams = ReturnType<typeof useSearchParams>

function upcomingDate(value: string | null) {
  if (!value || !isoDatePattern.test(value) || Number.isNaN(Date.parse(value))) return undefined
  return value >= today() ? value : undefined
}

function bookingBarValues(params: SearchParams): InquiryValues {
  const arrival = upcomingDate(params.get('arrival'))
  const departure = upcomingDate(params.get('departure'))
  const guests = Number(params.get('guests'))
  const hasValidGuests = Number.isInteger(guests) && guests >= 1 && guests <= maxGuests

  return {
    adults: hasValidGuests ? String(guests) : undefined,
    arrival,
    departure: departure && (!arrival || departure > arrival) ? departure : undefined,
  }
}

export function PrefilledContactForm(props: Omit<ContactFormProps, 'defaults'>) {
  const params = useSearchParams()
  return <ContactForm {...props} defaults={bookingBarValues(params)} />
}
