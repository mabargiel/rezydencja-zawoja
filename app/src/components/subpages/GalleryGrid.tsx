'use client'

import { useState } from 'react'

import { chipStateClass } from '@/components/chip'
import { Lightbox, type LightboxLabels } from '@/components/Lightbox'
import { fillTemplate } from '@/lib/template'
import type { GalleryPageQueryResult } from '@/sanity/types'

import { PhotoTile } from './PhotoTile'

type GalleryPhoto = NonNullable<NonNullable<GalleryPageQueryResult>['photos']>[number]
type Category = NonNullable<GalleryPhoto['category']>
type Filter = 'all' | Category

type GalleryGridProps = {
  photos: GalleryPhoto[]
  labels: {
    filters: string
    options: Record<Filter, string>
  }
  lightbox: LightboxLabels
}

const filters: Filter[] = ['all', 'interiors', 'spa', 'terraceGarden', 'surroundings']

const tileHeights = [
  'h-[216px] lg:h-[360px]',
  'h-[180px] lg:h-[300px]',
  'h-[216px] lg:h-[360px]',
  'h-[180px] lg:h-[300px]',
  'h-[264px] lg:h-[440px]',
  'h-[168px] lg:h-[280px]',
  'h-[240px] lg:h-[400px]',
  'h-[192px] lg:h-[320px]',
  'h-[252px] lg:h-[420px]',
  'h-[180px] lg:h-[300px]',
  'h-[204px] lg:h-[340px]',
  'h-[228px] lg:h-[380px]',
  'h-[264px] lg:h-[440px]',
  'h-[180px] lg:h-[300px]',
  'h-[240px] lg:h-[400px]',
  'h-[180px] lg:h-[300px]',
]

export function GalleryGrid({ photos, labels, lightbox }: GalleryGridProps) {
  const [filter, setFilter] = useState<Filter>('all')
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const visible = filter === 'all' ? photos : photos.filter(photo => photo.category === filter)
  const available = filters.filter(
    option => option === 'all' || photos.some(photo => photo.category === option)
  )

  return (
    <section className="flex flex-col gap-7 bg-bg px-5 pt-10 pb-14 lg:gap-11 lg:px-[120px] lg:pt-20 lg:pb-[110px]">
      <div
        role="group"
        aria-label={labels.filters}
        className="-mx-5 flex gap-3 overflow-x-auto scrollbar-none px-5 lg:mx-0 lg:px-0"
      >
        {available.map(option => {
          const isActive = option === filter
          return (
            <button
              key={option}
              type="button"
              aria-pressed={isActive}
              onClick={() => setFilter(option)}
              className={`shrink-0 px-[22px] py-2.5 font-body text-[13px] tracking-[1px] transition-colors ${chipStateClass(isActive)}`}
            >
              {labels.options[option]}
            </button>
          )
        })}
      </div>

      <ul className="columns-2 gap-3 lg:columns-4 lg:gap-5">
        {visible.map((photo, index) => (
          <li key={photo._key} className="mb-3 break-inside-avoid lg:mb-5">
            <PhotoTile
              photo={photo}
              label={fillTemplate(lightbox.openPhoto, { alt: photo.alt ?? '' })}
              sizes="(min-width: 1024px) 25vw, 50vw"
              className={`w-full ${tileHeights[index % tileHeights.length]}`}
              onOpen={() => setOpenIndex(index)}
            />
          </li>
        ))}
      </ul>

      <Lightbox
        photos={visible}
        index={openIndex}
        labels={lightbox}
        onIndexChange={setOpenIndex}
        onClose={() => setOpenIndex(null)}
      />
    </section>
  )
}
