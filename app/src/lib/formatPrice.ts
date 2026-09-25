import type { Language } from '@/i18n/config'

const formatters = new Map<Language, Intl.NumberFormat>()

export function formatPrice(amount: number, language: Language): string {
  let formatter = formatters.get(language)
  if (!formatter) {
    formatter = new Intl.NumberFormat(language, {
      currency: 'PLN',
      maximumFractionDigits: 0,
      style: 'currency',
    })
    formatters.set(language, formatter)
  }
  return formatter.format(amount)
}
