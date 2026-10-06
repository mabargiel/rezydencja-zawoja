import { z } from 'zod'

import {
  type ErrorCode,
  errorCodes,
  type InquiryField,
  inquiryFields,
  type InquiryValues,
  isIsoDate,
  maxGuests,
  maxMessageLength,
  maxNameLength,
  today,
} from './inquiry'

const phonePattern = /^[\d\s+()-]{6,30}$/

const optionalDate = (code: ErrorCode) =>
  z.string().refine(value => value === '' || isIsoDate(value), code)

const inquirySchema = z.object({
  adults: z.coerce.number('guests').int('guests').min(1, 'guests').max(maxGuests, 'guests'),
  arrival: optionalDate('datePast'),
  children: z.coerce.number('guests').int('guests').min(0, 'guests').max(maxGuests, 'guests'),
  consent: z.literal('on', 'consent'),
  departure: optionalDate('dateOrder'),
  email: z.email('email'),
  message: z.string().trim().max(maxMessageLength, 'tooLong'),
  name: z.string().trim().min(2, 'name').max(maxNameLength, 'name'),
  phone: z
    .string()
    .trim()
    .refine(value => value === '' || phonePattern.test(value), 'phone'),
})

export type Inquiry = z.infer<typeof inquirySchema>

export function readValues(formData: FormData): InquiryValues {
  return Object.fromEntries(
    inquiryFields.map(field => {
      const value = formData.get(field)
      return [field, typeof value === 'string' ? value : '']
    })
  )
}

type InquiryErrors = Partial<Record<InquiryField, ErrorCode>>

function fieldErrors(error: z.ZodError): InquiryErrors {
  const errors: InquiryErrors = {}
  for (const issue of error.issues) {
    const [field] = issue.path
    const code = errorCodes.find(known => known === issue.message)
    if (typeof field !== 'string' || !code) continue
    const inquiryField = inquiryFields.find(known => known === field)
    if (inquiryField && !errors[inquiryField]) errors[inquiryField] = code
  }
  return errors
}

function crossFieldErrors(values: InquiryValues): InquiryErrors {
  const { adults = '', arrival = '', children = '', departure = '' } = values
  const errors: InquiryErrors = {}
  if (Number(adults) + Number(children) > maxGuests) errors.children = 'guests'
  if (isIsoDate(arrival) && arrival < today()) errors.arrival = 'datePast'
  if (isIsoDate(arrival) && isIsoDate(departure) && departure <= arrival)
    errors.departure = 'dateOrder'
  return errors
}

export function validateInquiry(
  values: InquiryValues
): { success: true; inquiry: Inquiry } | { success: false; errors: InquiryErrors } {
  const result = inquirySchema.safeParse(values)
  const errors = {
    ...crossFieldErrors(values),
    ...(result.success ? {} : fieldErrors(result.error)),
  }
  if (result.success && Object.keys(errors).length === 0)
    return { inquiry: result.data, success: true }
  return { errors, success: false }
}
