'use server'

import { Resend } from 'resend'

import { site } from '@/config/site'
import { isLanguage } from '@/i18n/config'
import type { InquiryState } from '@/lib/inquiry'
import { guestConfirmation, ownerEmail } from '@/lib/inquiryEmails'
import { readValues, validateInquiry } from '@/lib/inquirySchema'

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

  const formLanguage = formData.get('language')?.toString()
  const language = isLanguage(formLanguage) ? formLanguage : 'pl'
  const { error } = await new Resend(apiKey).batch.send([
    {
      from,
      replyTo: inquiry.email,
      to: process.env.CONTACT_TO_EMAIL || site.email,
      ...ownerEmail(inquiry, language),
    },
    { from, replyTo: site.email, to: inquiry.email, ...guestConfirmation(inquiry, language) },
  ])
  if (error) {
    console.error('Inquiry not sent:', error)
    return { status: 'failed', values }
  }

  return { status: 'sent' }
}
