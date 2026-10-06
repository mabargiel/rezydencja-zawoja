export const maxGuests = 10
export const maxNameLength = 100
export const maxMessageLength = 2000

export const errorCodes = [
  'name',
  'email',
  'phone',
  'datePast',
  'dateOrder',
  'guests',
  'tooLong',
  'consent',
] as const

export type ErrorCode = (typeof errorCodes)[number]

export const inquiryFields = [
  'name',
  'phone',
  'email',
  'arrival',
  'departure',
  'adults',
  'children',
  'message',
  'consent',
] as const

export type InquiryField = (typeof inquiryFields)[number]

export type InquiryValues = Partial<Record<InquiryField, string>>

export type InquiryState = {
  status: 'idle' | 'invalid' | 'failed' | 'limited' | 'sent'
  errors?: Partial<Record<InquiryField, ErrorCode>>
  values?: InquiryValues
}

const isoDatePattern = /^\d{4}-\d{2}-\d{2}$/

export const isIsoDate = (value: string) =>
  isoDatePattern.test(value) && !Number.isNaN(Date.parse(value))

// Poland is ahead of UTC, so a guest's local "today" is never earlier than the UTC date.
export const today = () => new Date().toISOString().slice(0, 10)
