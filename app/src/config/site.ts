export const site = {
  address: ['Zawoja Mosorne 2853', '34-222 Zawoja'],
  checkIn: '16:00',
  checkOut: '10:00',
  coordinates: { lat: 49.64051614064316, lng: 19.558586753262016 },
  email: 'biuro@rezydencjazawoja.pl',
  mapAttribution: '© Microsoft, © TomTom',
  phone: '+48 500 290 390',
} as const

export const phoneHref = `tel:${site.phone.replaceAll(' ', '')}`

export const mapsHref = `https://www.google.com/maps/search/?api=1&query=${site.coordinates.lat},${site.coordinates.lng}`

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
