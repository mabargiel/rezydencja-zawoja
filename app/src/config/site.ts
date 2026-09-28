export const site = {
  email: 'biuro@rezydencjazawoja.pl',
  phone: '+48 500 290 390',
} as const

export const phoneHref = `tel:${site.phone.replaceAll(' ', '')}`

export type PageKey = 'home' | 'interiors' | 'surroundings' | 'gallery' | 'contact'

export const pagePaths: Record<PageKey, string> = {
  contact: '/contact',
  gallery: '/gallery',
  home: '',
  interiors: '/interiors',
  surroundings: '/surroundings',
}

type NavItem = {
  key: PageKey | 'pricing'
  path: string
  segment?: string | null
  section?: string
  yieldTo?: string
}

export const navItems: readonly NavItem[] = [
  { key: 'home', path: pagePaths.home, segment: null, yieldTo: 'pricing' },
  { key: 'interiors', path: pagePaths.interiors, segment: 'interiors' },
  { key: 'surroundings', path: pagePaths.surroundings, segment: 'surroundings' },
  { key: 'gallery', path: pagePaths.gallery, segment: 'gallery' },
  { key: 'pricing', path: '#pricing', section: 'pricing' },
  { key: 'contact', path: pagePaths.contact, segment: 'contact' },
]
