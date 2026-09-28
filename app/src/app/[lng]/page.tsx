import { BookingCta } from '@/components/home/BookingCta'
import { GalleryPreview } from '@/components/home/GalleryPreview'
import { Hero } from '@/components/home/Hero'
import { InteriorsTeaser } from '@/components/home/InteriorsTeaser'
import { Intro } from '@/components/home/Intro'
import { Location } from '@/components/home/Location'
import { Pricing } from '@/components/home/Pricing'
import { Spa } from '@/components/home/Spa'
import { getLanguage, getT } from '@/i18n/server'
import { pageMetadata } from '@/lib/metadata'
import { sanityFetch } from '@/sanity/live'
import { homePageQuery } from '@/sanity/queries'

export const generateMetadata = () => pageMetadata('home')

export default async function HomePage() {
  const [language, t] = await Promise.all([getLanguage(), getT()])
  const { data } = await sanityFetch({
    params: { lng: language },
    query: homePageQuery,
    stega: false,
  })
  const { home, pricing } = data
  const href = (path: string) => `/${language}${path}`

  return (
    <main>
      <Hero
        eyebrow={t('home.hero.eyebrow')}
        title={t('home.hero.title')}
        intro={t('home.hero.intro')}
        poster={home?.hero?.poster?.photo}
        videoUrl={home?.hero?.videoUrl}
        booking={{
          action: href('/contact'),
          labels: {
            arrival: t('home.booking.arrival'),
            departure: t('home.booking.departure'),
            form: t('home.booking.label'),
            guests: t('home.booking.guests'),
            guestsAny: t('home.booking.guestsAny'),
            submit: t('home.booking.submit'),
          },
        }}
      />
      <Intro
        eyebrow={t('home.intro.eyebrow')}
        title={t('home.intro.title')}
        lead={t('home.intro.lead')}
        body={t('home.intro.body')}
        link={{ href: href('/interiors'), label: t('home.intro.link') }}
        house={home?.intro?.house?.photo}
        detail={home?.intro?.detail?.photo}
      />
      <Spa
        eyebrow={t('home.spa.eyebrow')}
        title={t('home.spa.title')}
        body={t('home.spa.body')}
        saltGrotto={{
          description: t('home.spa.saltGrotto.description'),
          photo: home?.spa?.saltGrotto?.photo,
          title: t('home.spa.saltGrotto.title'),
        }}
        hotTub={{
          description: t('home.spa.hotTub.description'),
          photo: home?.spa?.hotTub?.photo,
          title: t('home.spa.hotTub.title'),
        }}
        sauna={{
          description: t('home.spa.sauna.description'),
          photo: home?.spa?.sauna?.photo,
          title: t('home.spa.sauna.title'),
        }}
        amenities={{
          billiards: t('home.spa.amenities.billiards'),
          fireplace: t('home.spa.amenities.fireplace'),
          fitness: t('home.spa.amenities.fitness'),
          grill: t('home.spa.amenities.grill'),
          jacuzzi: t('home.spa.amenities.jacuzzi'),
          terrace: t('home.spa.amenities.terrace'),
        }}
      />
      <InteriorsTeaser
        eyebrow={t('home.interiors.eyebrow')}
        title={t('home.interiors.title')}
        body={t('home.interiors.body')}
        features={[
          {
            description: t('home.interiors.antiques.description'),
            title: t('home.interiors.antiques.title'),
          },
          {
            description: t('home.interiors.bedrooms.description'),
            title: t('home.interiors.bedrooms.title'),
          },
        ]}
        link={{ href: href('/interiors'), label: t('home.interiors.link') }}
        photo={home?.interiors?.photo}
      />
      <Location
        eyebrow={t('home.location.eyebrow')}
        title={t('home.location.title')}
        body={t('home.location.body')}
        facts={[
          {
            detail: t('home.location.facts.trails.detail'),
            title: t('home.location.facts.trails.title'),
          },
          {
            desktopOnly: true,
            detail: t('home.location.facts.waterfalls.detail'),
            title: t('home.location.facts.waterfalls.title'),
          },
          {
            detail: t('home.location.facts.lifts.detail'),
            title: t('home.location.facts.lifts.title'),
          },
          {
            desktopOnly: true,
            detail: t('home.location.facts.cycling.detail'),
            title: t('home.location.facts.cycling.title'),
          },
          {
            detail: t('home.location.facts.krakow.detail'),
            title: t('home.location.facts.krakow.title'),
          },
        ]}
        photo={home?.location?.photo}
      />
      <GalleryPreview
        eyebrow={t('home.gallery.eyebrow')}
        title={t('home.gallery.title')}
        link={{ href: href('/gallery'), label: t('home.gallery.link') }}
        photos={home?.galleryPreview ?? []}
      />
      {pricing && (
        <Pricing
          language={language}
          pricing={pricing}
          labels={{
            bookingBody: t('home.pricing.bookingBody'),
            bookingTitle: t('home.pricing.bookingTitle'),
            extraPerson: t('home.pricing.extraPerson'),
            eyebrow: t('home.pricing.eyebrow', { year: pricing.year ?? '' }),
            minimumStay: t('home.pricing.minimumStay'),
            note: t('home.pricing.note'),
            period: t('home.pricing.period'),
            price: t('home.pricing.price'),
            title: t('home.pricing.title'),
            units: {
              night: t('pricing.unit.night'),
              stay: t('pricing.unit.stay'),
              week: t('pricing.unit.week'),
              weekend: t('pricing.unit.weekend'),
            },
          }}
        />
      )}
      <BookingCta
        eyebrow={t('home.cta.eyebrow')}
        title={t('home.cta.title')}
        body={t('home.cta.body')}
        primary={{ href: href('/contact'), label: t('home.cta.primary') }}
        secondary={{ href: href('/contact'), label: t('home.cta.secondary') }}
      />
    </main>
  )
}
