import Image from 'next/image'

import { urlFor } from '@/sanity/image'
import type { ResolvedPhoto } from '@/sanity/photo'

type SanityImageProps = {
  photo: ResolvedPhoto
  sizes: string
  priority?: boolean
  eager?: boolean
  fit?: 'cover' | 'contain'
  hasBlurPlaceholder?: boolean
  onLoad?: () => void
  className?: string
}

export function SanityImage({
  photo,
  sizes,
  priority,
  eager,
  fit = 'cover',
  hasBlurPlaceholder = true,
  onLoad,
  className = '',
}: SanityImageProps) {
  const { image, alt } = photo
  if (!image?.asset) return null

  const hotspot = image.hotspot
  const objectPosition =
    hotspot?.x !== undefined && hotspot?.y !== undefined
      ? `${hotspot.x * 100}% ${hotspot.y * 100}%`
      : undefined

  return (
    <Image
      src={urlFor(image).url()}
      alt={alt ?? ''}
      fill
      sizes={sizes}
      priority={priority}
      loading={eager && !priority ? 'eager' : undefined}
      placeholder={hasBlurPlaceholder && image.asset.metadata?.lqip ? 'blur' : 'empty'}
      blurDataURL={hasBlurPlaceholder ? (image.asset.metadata?.lqip ?? undefined) : undefined}
      onLoad={onLoad}
      style={fit === 'cover' ? { objectPosition } : undefined}
      className={`${fit === 'cover' ? 'object-cover' : 'object-contain'} ${className}`}
    />
  )
}
