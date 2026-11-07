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

function pictureSource(photo: ResolvedPhoto) {
  if (!photo.image?.asset) return null

  const { src, objectPosition, lqip } = sanityImageSource(photo.image)
  const { props } = getImageProps({ alt: photo.alt ?? '', fill: true, sizes: '100vw', src })
  return { lqip, objectPosition, props }
}

export function HeroMedia({ desktopPhoto, mobilePhoto }: HeroMediaProps) {
  const desktop = desktopPhoto && pictureSource(desktopPhoto)
  const mobile = mobilePhoto && pictureSource(mobilePhoto)

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
    <div className="absolute inset-0 -z-20 overflow-hidden">
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
  )
}
