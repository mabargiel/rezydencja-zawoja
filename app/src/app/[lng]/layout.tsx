import '../globals.css'

import type { Metadata } from 'next'
import { Cormorant_Garamond, Jost } from 'next/font/google'
import type { ReactNode } from 'react'

import { CookieConsent } from '@/components/CookieConsent'
import { Footer } from '@/components/Footer'
import { Navbar } from '@/components/Navbar'
import { RevealObserver } from '@/components/RevealObserver'
import { localizedHref, pagePaths } from '@/config/site'
import { languages } from '@/i18n/config'
import { getLanguage, getT } from '@/i18n/server'
import { blurUpScript } from '@/lib/blurUpScript'
import type { TrackingSettings } from '@/lib/consent'
import { metadataBase } from '@/lib/metadata'
import { sanityFetch, SanityLive } from '@/sanity/live'
import { trackingQuery } from '@/sanity/queries'

const cormorant = Cormorant_Garamond({
  display: 'swap',
  style: ['normal', 'italic'],
  subsets: ['latin', 'latin-ext'],
  variable: '--font-cormorant',
  weight: ['400', '500', '600'],
})

const jost = Jost({
  display: 'swap',
  subsets: ['latin', 'latin-ext'],
  variable: '--font-jost',
  weight: ['300', '400', '500'],
})

export function generateStaticParams() {
  return languages.map(lng => ({ lng }))
}

export async function generateMetadata(): Promise<Metadata> {
  const t = await getT()
  const siteName = t('meta.siteName')
  return {
    metadataBase,
    openGraph: { siteName, type: 'website' },
    title: { default: siteName, template: `%s · ${siteName}` },
  }
}

async function getTrackingSettings(): Promise<TrackingSettings | null> {
  const { data } = await sanityFetch({ query: trackingQuery, stega: false })
  if (!data?.enabled || !data.pixelId) return null
  return {
    activeFrom: data.activeFrom,
    activeUntil: data.activeUntil,
    consentMonths: data.consentMonths ?? 12,
    pixelId: data.pixelId,
  }
}

export default async function RootLayout({ children }: { children: ReactNode }) {
  const [language, t, tracking] = await Promise.all([getLanguage(), getT(), getTrackingSettings()])

  return (
    <html
      lang={language}
      data-scroll-behavior="smooth"
      className={`${cormorant.variable} ${jost.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: blurUpScript }} />
      </head>
      <body className="relative">
        <Navbar />
        {children}
        <Footer tracking={tracking} />
        <SanityLive />
        <RevealObserver />
        {tracking && (
          <CookieConsent
            settings={tracking}
            labels={t('cookies', { returnObjects: true })}
            privacyHref={localizedHref(language, pagePaths.privacyPolicy)}
          />
        )}
      </body>
    </html>
  )
}
