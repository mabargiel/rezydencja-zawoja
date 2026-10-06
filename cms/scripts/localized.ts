export type Localized = { pl: string; en: string; de: string }

export type Category = 'interiors' | 'spa' | 'terraceGarden' | 'surroundings'

const languages = ['pl', 'en', 'de'] as const

export const localizedArray = (text: Localized) =>
  languages.map(language => ({
    _key: language,
    _type: 'internationalizedArrayStringValue',
    language,
    value: text[language],
  }))

export const photoId = (file: string) =>
  `photo-${file
    .replace(/\.[^.]+$/, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')}`
