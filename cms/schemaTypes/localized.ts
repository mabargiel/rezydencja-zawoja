import type { Rule } from 'sanity'

type LocalizedItem = { language?: string; value?: string }

const hasText = (items: LocalizedItem[] | undefined, language: string) =>
  items?.some(item => item.language === language && item.value?.trim()) ?? false

export const localizedValidation = (rule: Rule) => [
  rule.custom<LocalizedItem[]>(items =>
    hasText(items, 'pl') ? true : 'Tekst po polsku jest wymagany'
  ),
  rule
    .custom<LocalizedItem[]>(items => {
      const missing = ['en', 'de'].filter(language => !hasText(items, language))
      return missing.length === 0 ? true : `Brak tłumaczenia: ${missing.join(', ')}`
    })
    .warning(),
]
