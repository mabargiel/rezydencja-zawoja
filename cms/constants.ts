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
  promoBar: 'Pasek promocyjny',
  siteSettings: 'Sezon',
  surroundingsPage: 'Okolica',
  tracking: 'Pliki cookies i Piksel Meta',
} as const

export type SingletonType = keyof typeof singletons

export const singletonTypes = new Set<string>([...Object.keys(singletons), 'legalPage'])
