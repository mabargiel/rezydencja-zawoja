import Image from 'next/image'

import { urlFor } from '@/sanity/image'
import type { ResolvedPhoto } from '@/sanity/photo'

type SanityImageProps = {
  photo: ResolvedPhoto
  sizes: string
  priority?: boolean
  eager?: boolean
  fit?: 'cover' | 'contain'
  className?: string
}

export function SanityImage({
  photo,
  sizes,
  priority,
  eager,
  fit = 'cover',
  className = '',
}: SanityImageProps) {
  const { image, alt } = photo
  if (!image?.asset) return null

  const hotspot = image.hotspot
  const objectPosition =
    hotspot?.x !== undefined && hotspot?.y !== undefined
      ? `${hotspot.x * 100}% ${hotspot.y * 100}%`
      : undefined
  const lqip = image.asset.metadata?.lqip ?? undefined

  return (
    <Image
      src={urlFor(image).url()}
      alt={alt ?? ''}
      fill
      sizes={sizes}
      priority={priority}
      loading={eager && !priority ? 'eager' : undefined}
      placeholder={lqip ? 'blur' : 'empty'}
      blurDataURL={lqip}
      data-blur-up=""
      style={fit === 'cover' ? { objectPosition } : undefined}
      className={`${fit === 'cover' ? 'object-cover' : 'object-contain'} ${className}`}
    />
  )
}
