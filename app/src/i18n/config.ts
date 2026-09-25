export const languages = ['pl', 'en', 'de'] as const

export type Language = (typeof languages)[number]

export const languageNames: Record<Language, string> = {
  de: 'Deutsch',
  en: 'English',
  pl: 'Polski',
}

export const defaultLanguage: Language = 'en'

export const languageCookie = 'lng'

export function isLanguage(value: string | undefined): value is Language {
  return languages.includes(value as Language)
}
