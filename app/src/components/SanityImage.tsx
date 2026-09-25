import Image from 'next/image'

import { urlFor } from '@/sanity/image'
import type { ResolvedPhoto } from '@/sanity/photo'

type SanityImageProps = {
  photo: ResolvedPhoto
  sizes: string
  priority?: boolean
  className?: string
}

export function SanityImage({ photo, sizes, priority, className = '' }: SanityImageProps) {
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
      placeholder={image.asset.metadata?.lqip ? 'blur' : 'empty'}
      blurDataURL={image.asset.metadata?.lqip ?? undefined}
      style={{ objectPosition }}
      className={`object-cover ${className}`}
    />
  )
}
