import { PageHeader } from '@/components/PageHeader'
import { getLanguage, getT } from '@/i18n/server'
import { pageMetadata } from '@/lib/metadata'
import { sanityFetch } from '@/sanity/live'
import { interiorsPageQuery } from '@/sanity/queries'

export const generateMetadata = () => pageMetadata('interiors')

export default async function InteriorsPage() {
  const [language, t] = await Promise.all([getLanguage(), getT()])
  const { data } = await sanityFetch({
    params: { lng: language },
    query: interiorsPageQuery,
    stega: false,
  })

  return (
    <main>
      <PageHeader
        eyebrow={t('pages.interiors.eyebrow')}
        title={t('pages.interiors.title')}
        intro={t('pages.interiors.intro')}
        image={data?.header?.photo}
      />
    </main>
  )
}
