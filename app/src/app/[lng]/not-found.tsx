import { ButtonPrimary } from '@/components/Actions'
import { PageHeader } from '@/components/PageHeader'
import { getLanguage, getT } from '@/i18n/server'

export default async function NotFound() {
  const [language, t] = await Promise.all([getLanguage(), getT()])

  return (
    <main>
      <PageHeader
        eyebrow={t('pages.notFound.eyebrow')}
        title={t('pages.notFound.title')}
        intro={t('pages.notFound.intro')}
      />
      <div className="px-5 py-16 lg:px-16">
        <ButtonPrimary href={`/${language}`}>{t('pages.notFound.back')}</ButtonPrimary>
      </div>
    </main>
  )
}
