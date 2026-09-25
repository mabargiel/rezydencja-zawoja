import type { Metadata } from 'next'

import { type PageKey, pagePaths } from '@/config/site'
import { defaultLanguage, languages } from '@/i18n/config'
import { getLanguage, getT } from '@/i18n/server'

const productionHost = process.env.VERCEL_PROJECT_PRODUCTION_URL

export const metadataBase = new URL(
  productionHost ? `https://${productionHost}` : 'http://localhost:3000'
)

export async function pageMetadata(page: PageKey): Promise<Metadata> {
  const [language, t] = await Promise.all([getLanguage(), getT()])
  const path = pagePaths[page]
  const title = t(`meta.${page}.title`)

  return {
    alternates: {
      canonical: `/${language}${path}`,
      languages: {
        ...Object.fromEntries(languages.map(code => [code, `/${code}${path}`])),
        'x-default': `/${defaultLanguage}${path}`,
      },
    },
    description: t(`meta.${page}.description`),
    title: page === 'home' ? { absolute: title } : title,
  }
}
