import { FeatureRow } from '@/components/FeatureRow'
import { PageHeader } from '@/components/PageHeader'
import { KeyFacts } from '@/components/subpages/KeyFacts'
import { SurroundingsIntro } from '@/components/subpages/SurroundingsIntro'
import { getLanguage, getT } from '@/i18n/server'
import { pageMetadata } from '@/lib/metadata'
import { sanityFetch } from '@/sanity/live'
import { surroundingsPageQuery } from '@/sanity/queries'

export const generateMetadata = () => pageMetadata('surroundings')

const attractions = ['babiaGora', 'slopes', 'trails', 'waterfalls'] as const

export default async function SurroundingsPage() {
  const [language, t] = await Promise.all([getLanguage(), getT()])
  const { data } = await sanityFetch({
    params: { lng: language },
    query: surroundingsPageQuery,
    stega: false,
  })

  return (
    <main>
      <PageHeader
        eyebrow={t('pages.surroundings.eyebrow')}
        title={t('pages.surroundings.title')}
        intro={t('pages.surroundings.intro')}
        image={data?.header?.photo}
      />
      <SurroundingsIntro
        eyebrow={t('pages.surroundings.overview.eyebrow')}
        title={t('pages.surroundings.overview.title')}
        lead={t('pages.surroundings.overview.lead')}
        body={t('pages.surroundings.overview.body')}
      />
      <div className="flex flex-col gap-11 bg-bg px-5 pt-9 pb-12 lg:gap-24 lg:px-[120px] lg:py-20">
        {attractions.map((key, index) => (
          <FeatureRow
            key={key}
            eyebrow={t(`pages.surroundings.rows.${key}.eyebrow`)}
            title={t(`pages.surroundings.rows.${key}.title`)}
            body={t(`pages.surroundings.rows.${key}.body`)}
            bullets={t(`pages.surroundings.rows.${key}.bullets`, { returnObjects: true })}
            photo={data?.[key]?.photo}
            reverse={index % 2 === 1}
          />
        ))}
      </div>
      <KeyFacts facts={t('pages.surroundings.facts', { returnObjects: true })} />
    </main>
  )
}
