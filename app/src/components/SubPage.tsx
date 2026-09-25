import { PageHeader } from '@/components/PageHeader'
import type { PageKey } from '@/config/site'
import { getT } from '@/i18n/server'

export async function SubPage({ page }: { page: Exclude<PageKey, 'home'> }) {
  const t = await getT()

  return (
    <main>
      <PageHeader
        eyebrow={t(`pages.${page}.eyebrow`)}
        title={t(`pages.${page}.title`)}
        intro={t(`pages.${page}.intro`)}
      />
    </main>
  )
}
