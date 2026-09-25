export const languages = [
  { id: 'pl', title: 'Polski' },
  { id: 'en', title: 'English' },
  { id: 'de', title: 'Deutsch' },
]

export const singletons = {
  contactPage: 'Kontakt',
  galleryPage: 'Galeria',
  homePage: 'Strona główna',
  interiorsPage: 'Wnętrza',
  pricing: 'Cennik',
  siteSettings: 'Sezon',
  surroundingsPage: 'Okolica',
} as const

export type SingletonType = keyof typeof singletons

export const singletonTypes = new Set<string>(Object.keys(singletons))
