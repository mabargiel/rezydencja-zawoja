import '../globals.css'

import type { Metadata } from 'next'
import { Cormorant_Garamond, Jost } from 'next/font/google'
import type { ReactNode } from 'react'

import { Footer } from '@/components/Footer'
import { Navbar } from '@/components/Navbar'
import { languages } from '@/i18n/config'
import { getLanguage, getT } from '@/i18n/server'
import { metadataBase } from '@/lib/metadata'
import { SanityLive } from '@/sanity/live'

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

export default async function RootLayout({ children }: { children: ReactNode }) {
  const language = await getLanguage()

  return (
    <html lang={language} className={`${cormorant.variable} ${jost.variable}`}>
      <body className="relative">
        <Navbar />
        {children}
        <Footer />
        <SanityLive />
      </body>
    </html>
  )
}
