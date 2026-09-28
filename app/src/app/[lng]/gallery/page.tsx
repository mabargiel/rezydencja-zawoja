import { PageHeader } from '@/components/PageHeader'
import { getLanguage, getT } from '@/i18n/server'
import { pageMetadata } from '@/lib/metadata'
import { sanityFetch } from '@/sanity/live'
import { galleryPageQuery } from '@/sanity/queries'

export const generateMetadata = () => pageMetadata('gallery')

export default async function GalleryPage() {
  const [language, t] = await Promise.all([getLanguage(), getT()])
  const { data } = await sanityFetch({
    params: { lng: language },
    query: galleryPageQuery,
    stega: false,
  })

  return (
    <main>
      <PageHeader
        eyebrow={t('pages.gallery.eyebrow')}
        title={t('pages.gallery.title')}
        intro={t('pages.gallery.intro')}
        image={data?.header?.photo}
      />
    </main>
  )
}
