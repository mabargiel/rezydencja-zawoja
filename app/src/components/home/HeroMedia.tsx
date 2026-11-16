import { getImageProps } from 'next/image'
import type { CSSProperties } from 'react'
import { preload } from 'react-dom'

import { SanityImage, sanityImageSource } from '@/components/SanityImage'
import type { ResolvedPhoto } from '@/sanity/photo'

type HeroMediaProps = {
  desktopPhoto?: ResolvedPhoto | null
  mobilePhoto?: ResolvedPhoto | null
}

const desktopQuery = '(min-width: 1024px)'
const mobileQuery = '(max-width: 1023.98px)'
const desktopSizes = 'min(82vw, 133svh)'

function pictureSource(photo: ResolvedPhoto, sizes: string) {
  if (!photo.image?.asset) return null

  const { src, objectPosition, lqip } = sanityImageSource(photo.image)
  const { props } = getImageProps({ alt: photo.alt ?? '', fill: true, sizes, src })
  return { lqip, objectPosition, props }
}

export function HeroMedia({ desktopPhoto, mobilePhoto }: HeroMediaProps) {
  const desktop = desktopPhoto && pictureSource(desktopPhoto, desktopSizes)
  const mobile = mobilePhoto && pictureSource(mobilePhoto, '100vw')

  if (!desktop || !mobile) {
    const photo = desktop ? desktopPhoto : mobilePhoto
    return photo ? <SanityImage photo={photo} sizes="100vw" priority className="-z-20" /> : null
  }

  // <picture> gets no automatic preload from next/image; media keeps each browser to one download
  for (const [source, media] of [
    [desktop, desktopQuery],
    [mobile, mobileQuery],
  ] as const) {
    preload(source.props.src, {
      as: 'image',
      fetchPriority: 'high',
      imageSizes: source.props.sizes,
      imageSrcSet: source.props.srcSet,
      media,
    })
  }

  const positions = {
    '--hero-position': mobile.objectPosition,
    '--hero-position-desktop': desktop.objectPosition,
  } as CSSProperties

  return (
    <div className="absolute inset-0 -z-20 overflow-hidden bg-hero-sky">
      {/* the house fades into sky-coloured space that holds the text: below it on phones, beside it on desktop.
          On desktop the photo keeps its 4:3 shape, so wide windows add sky instead of zooming in */}
      <div className="absolute inset-x-0 top-[38%] bottom-0 mask-hero-fade-up lg:top-0 lg:left-auto lg:aspect-[4/3] lg:max-w-[82%] lg:mask-hero-fade">
        <div
          aria-hidden
          className="absolute inset-0 scale-110 bg-cover bg-center blur-2xl lg:hidden"
          style={{ backgroundImage: `url(${mobile.lqip})` }}
        />
        <div
          aria-hidden
          className="absolute inset-0 hidden scale-110 bg-cover bg-center blur-2xl lg:block"
          style={{ backgroundImage: `url(${desktop.lqip})` }}
        />
        <picture>
          <source media={desktopQuery} srcSet={desktop.props.srcSet} sizes={desktop.props.sizes} />
          <source srcSet={mobile.props.srcSet} sizes={mobile.props.sizes} />
          <img
            {...mobile.props}
            alt={desktop.props.alt}
            fetchPriority="high"
            loading="eager"
            data-blur-up=""
            style={{ ...mobile.props.style, ...positions }}
            className="object-cover object-(--hero-position) lg:object-(--hero-position-desktop)"
          />
        </picture>
      </div>
    </div>
  )
}
