import { MapPin } from 'lucide-react'

import { Eyebrow } from '@/components/Eyebrow'
import { SanityImage } from '@/components/SanityImage'
import { mapsHref, site } from '@/config/site'
import { getT } from '@/i18n/server'
import type { ResolvedPhoto } from '@/sanity/photo'

type DirectionsProps = {
  map?: ResolvedPhoto | null
}

const coordinates = `${site.coordinates.lat.toFixed(4)}, ${site.coordinates.lng.toFixed(4)}`

export async function Directions({ map }: DirectionsProps) {
  const t = await getT()
  const openLabel = t('pages.contact.directions.open')

  return (
    <section aria-labelledby="directions-title">
      <div className="flex flex-col gap-2.5 border-t border-line px-5 py-9 lg:flex-row lg:items-center lg:justify-between lg:px-[120px] lg:py-11">
        <div className="reveal flex flex-col gap-2.5 lg:gap-3">
          <Eyebrow>{t('pages.contact.directions.eyebrow')}</Eyebrow>
          <h2
            id="directions-title"
            className="font-display text-2xl leading-[1.15] text-text-primary lg:text-[34px]"
          >
            {t('pages.contact.directions.title')}
          </h2>
        </div>
        <a
          href={mapsHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${openLabel}: ${coordinates}`}
          className="flex items-center gap-2 font-body text-[13.5px] font-medium tracking-[0.5px] text-accent transition-colors hover:text-bg-dark lg:gap-[9px] lg:text-sm"
        >
          <MapPin aria-hidden size={15} strokeWidth={1.75} />
          {coordinates}
        </a>
      </div>

      <a
        href={mapsHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={openLabel}
        className="relative block h-[320px] overflow-hidden bg-line lg:h-[560px]"
      >
        {map && <SanityImage photo={map} sizes="100vw" className="reveal-media" />}
        <span
          aria-hidden
          className="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-full flex-col items-center gap-1.5"
        >
          <span className="bg-bg-dark px-4 py-2 font-body text-[11px] font-medium tracking-[2px] whitespace-nowrap text-text-inverse uppercase shadow-lg lg:px-[18px] lg:py-2.5 lg:text-xs">
            {t('pages.contact.directions.marker')}
          </span>
          <span className="flex flex-col items-center">
            <span className="flex size-[22px] items-center justify-center rounded-full border-2 border-text-inverse bg-bg-dark shadow-md lg:size-[26px]">
              <span className="size-2 rounded-full bg-accent-warm lg:size-[9px]" />
            </span>
            <span className="h-2.5 w-0.5 bg-bg-dark lg:h-3" />
          </span>
        </span>
        <span className="absolute right-0 bottom-0 bg-surface/85 px-1.5 py-0.5 font-body text-[10px] text-text-secondary">
          {site.mapAttribution}
        </span>
      </a>
    </section>
  )
}
