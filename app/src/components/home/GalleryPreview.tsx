import { TextLink } from '@/components/Actions'
import { SanityImage } from '@/components/SanityImage'
import { SectionHeading } from '@/components/SectionHeading'
import type { ResolvedPhoto } from '@/sanity/photo'

type GalleryPreviewProps = {
  eyebrow: string
  title: string
  link: { href: string; label: string }
  photos: (ResolvedPhoto & { _key: string })[]
}

const tiles = [
  'h-[240px] lg:mt-0 lg:h-[440px]',
  'h-[300px] lg:mt-[60px] lg:h-[340px]',
  'h-[300px] lg:mt-5 lg:h-[460px]',
  'h-[240px] lg:mt-20 lg:h-[360px]',
]

export function GalleryPreview({ eyebrow, title, link, photos }: GalleryPreviewProps) {
  return (
    <section className="flex flex-col gap-7 bg-bg px-5 py-14 lg:gap-14 lg:px-[120px] lg:pt-[120px] lg:pb-[110px]">
      <div className="flex items-end justify-between">
        <SectionHeading eyebrow={eyebrow} title={title} />
        <TextLink href={link.href} className="max-lg:hidden">
          {link.label}
        </TextLink>
      </div>

      <ul className="columns-2 gap-3 lg:grid lg:grid-cols-4 lg:items-start lg:gap-5">
        {photos.slice(0, 4).map((photo, index) => (
          <li
            key={photo._key}
            className={`relative mb-3 break-inside-avoid overflow-hidden bg-line lg:mb-0 ${tiles[index]}`}
          >
            <SanityImage photo={photo} sizes="(min-width: 1024px) 25vw, 50vw" />
          </li>
        ))}
      </ul>

      <TextLink href={link.href} className="lg:hidden">
        {link.label}
      </TextLink>
    </section>
  )
}
