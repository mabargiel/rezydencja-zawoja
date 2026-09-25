import { PageHeader } from '@/components/PageHeader'
import { getT } from '@/i18n/server'
import { pageMetadata } from '@/lib/metadata'

export const generateMetadata = () => pageMetadata('home')

export default async function HomePage() {
  const t = await getT()

  return (
    <main>
      <PageHeader
        eyebrow={t('pages.home.eyebrow')}
        title={t('pages.home.title')}
        intro={t('pages.home.intro')}
      />
    </main>
  )
}
