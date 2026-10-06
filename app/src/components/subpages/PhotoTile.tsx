import { SanityImage } from '@/components/SanityImage'
import type { KeyedPhoto } from '@/sanity/photo'

type PhotoTileProps = {
  photo: KeyedPhoto
  label: string
  sizes: string
  className: string
  hiddenCount?: number
  onOpen: () => void
}

export function PhotoTile({ photo, label, sizes, className, hiddenCount, onOpen }: PhotoTileProps) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onOpen}
      className={`group relative block overflow-hidden bg-line ${className}`}
    >
      <SanityImage
        photo={photo}
        sizes={sizes}
        className="transition-transform duration-500 group-hover:scale-[1.03]"
      />
      {hiddenCount !== undefined && hiddenCount > 0 && (
        <span
          aria-hidden
          className="absolute inset-0 flex items-center justify-center bg-bg-dark/50 font-display text-[28px] text-text-inverse lg:text-4xl"
        >
          +{hiddenCount}
        </span>
      )}
    </button>
  )
}
