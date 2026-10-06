'use client'

import { useState } from 'react'

import { Lightbox, type LightboxLabels } from '@/components/Lightbox'
import { fillTemplate } from '@/lib/template'
import type { KeyedPhoto } from '@/sanity/photo'

import { PhotoTile } from './PhotoTile'

type RoomMosaicProps = {
  photos: KeyedPhoto[]
  lightbox: LightboxLabels
}

const maxTiles = 3

export function RoomMosaic({ photos, lightbox }: RoomMosaicProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [large, ...rest] = photos
  if (!large) return null

  const smalls = rest.slice(0, maxTiles - 1)
  const hiddenCount = photos.length - maxTiles
  const labelFor = (photo: KeyedPhoto) => fillTemplate(lightbox.openPhoto, { alt: photo.alt ?? '' })

  return (
    <div className="flex flex-col gap-2.5 pt-2 lg:flex-row lg:gap-4 lg:pt-0">
      <PhotoTile
        photo={large}
        label={labelFor(large)}
        sizes="(min-width: 1024px) 45vw, 100vw"
        className={`h-[240px] w-full lg:flex-1 ${smalls.length === 0 ? 'lg:h-[420px]' : 'lg:h-[480px]'}`}
        onOpen={() => setOpenIndex(0)}
      />
      {smalls.length > 0 && (
        <div className="flex gap-2.5 lg:w-[250px] lg:shrink-0 lg:flex-col lg:gap-4">
          {smalls.map((photo, index) => (
            <PhotoTile
              key={photo._key}
              photo={photo}
              label={labelFor(photo)}
              sizes="(min-width: 1024px) 250px, 50vw"
              className="h-[150px] flex-1 lg:h-auto"
              hiddenCount={index === smalls.length - 1 ? hiddenCount : undefined}
              onOpen={() => setOpenIndex(index + 1)}
            />
          ))}
        </div>
      )}
      <Lightbox
        photos={photos}
        index={openIndex}
        labels={lightbox}
        onIndexChange={setOpenIndex}
        onClose={() => setOpenIndex(null)}
      />
    </div>
  )
}
