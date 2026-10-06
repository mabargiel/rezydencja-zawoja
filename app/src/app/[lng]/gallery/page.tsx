import { PageHeader } from '@/components/PageHeader'
import { GalleryGrid } from '@/components/subpages/GalleryGrid'
import { getLightboxLabels } from '@/i18n/lightbox'
import { getLanguage, getT } from '@/i18n/server'
import { pageMetadata } from '@/lib/metadata'
import { sanityFetch } from '@/sanity/live'
import { galleryPageQuery } from '@/sanity/queries'

export const generateMetadata = () => pageMetadata('gallery')

export default async function GalleryPage() {
  const [language, t, lightbox] = await Promise.all([getLanguage(), getT(), getLightboxLabels()])
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
      <GalleryGrid
        photos={data?.photos ?? []}
        lightbox={lightbox}
        labels={{
          filters: t('pages.gallery.filters.label'),
          options: {
            all: t('pages.gallery.filters.all'),
            interiors: t('pages.gallery.filters.interiors'),
            spa: t('pages.gallery.filters.spa'),
            surroundings: t('pages.gallery.filters.surroundings'),
            terraceGarden: t('pages.gallery.filters.terraceGarden'),
          },
        }}
      />
    </main>
  )
}
