'use server'

import { checkRateLimit } from '@vercel/firewall'
import { headers } from 'next/headers'
import { Resend } from 'resend'

import { site } from '@/config/site'
import { isLanguage } from '@/i18n/config'
import type { InquiryState } from '@/lib/inquiry'
import { guestConfirmation, ownerEmail } from '@/lib/inquiryEmails'
import { readValues, validateInquiry } from '@/lib/inquirySchema'

// Fails open: a missing rule, a timeout or running outside Vercel must never stop a real guest
// from sending an inquiry, so only a definite answer from the firewall blocks the submission.
async function isRateLimited() {
  if (!process.env.VERCEL) return false
  try {
    const { rateLimited, error } = await checkRateLimit('contact-inquiry', {
      headers: await headers(),
      timeout: 2000,
    })
    if (error === 'not-found') console.error('Rate limit rule contact-inquiry is not configured')
    return rateLimited || error === 'blocked'
  } catch (error) {
    console.error('Rate limit check failed:', error)
    return false
  }
}

export async function sendInquiry(
  _previous: InquiryState,
  formData: FormData
): Promise<InquiryState> {
  const values = readValues(formData)
  if (await isRateLimited()) return { status: 'limited', values }
  if (formData.get('website')) return { status: 'sent' }

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
