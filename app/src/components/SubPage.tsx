import { PageHeader } from '@/components/PageHeader'
import type { PageKey } from '@/config/site'
import { getLanguage, getT } from '@/i18n/server'
import { sanityFetch } from '@/sanity/live'
import { pageHeaderQuery } from '@/sanity/queries'

export async function SubPage({ page }: { page: Exclude<PageKey, 'home'> }) {
  const [language, t] = await Promise.all([getLanguage(), getT()])
  const { data } = await sanityFetch({
    params: { lng: language, page: `${page}Page` },
    query: pageHeaderQuery,
  })

  return (
    <main>
      <PageHeader
        eyebrow={t(`pages.${page}.eyebrow`)}
        title={t(`pages.${page}.title`)}
        intro={t(`pages.${page}.intro`)}
        image={data?.photo}
      />
    </main>
  )
}
