'use client'

import { User } from 'lucide-react'
import { useState } from 'react'

import { Lightbox, type LightboxLabels } from '@/components/Lightbox'
import { revealDelay } from '@/components/reveal'
import { fillTemplate } from '@/lib/template'
import type { KeyedPhoto } from '@/sanity/photo'
import type { InteriorsPageQueryResult } from '@/sanity/types'

import { PhotoTile } from './PhotoTile'

type Bedroom = NonNullable<NonNullable<InteriorsPageQueryResult>['bedrooms']>[number]

type BedroomCardsProps = {
  bedrooms: Bedroom[]
  guestsLabel: string
  lightbox: LightboxLabels
}

type OpenState = { photos: KeyedPhoto[]; index: number } | null

export function BedroomCards({ bedrooms, guestsLabel, lightbox }: BedroomCardsProps) {
  const [open, setOpen] = useState<OpenState>(null)

  return (
    <>
      <ul className="-mx-5 flex gap-3.5 overflow-x-auto scrollbar-none px-5 pt-2.5 lg:mx-0 lg:gap-5 lg:overflow-visible lg:px-0 lg:pt-0">
        {bedrooms.map((bedroom, index) => {
          const photos = bedroom.photos ?? []
          const [cover] = photos
          return (
            <li
              key={bedroom._key}
              className={`reveal-right ${revealDelay(index)} flex w-[200px] shrink-0 flex-col gap-2.5 lg:w-auto lg:flex-1 lg:gap-3.5`}
            >
              {cover ? (
                <PhotoTile
                  photo={cover}
                  label={fillTemplate(lightbox.openPhoto, { alt: cover.alt ?? bedroom.name ?? '' })}
                  sizes="(min-width: 1024px) 20vw, 200px"
                  className="h-[150px] w-full lg:h-[200px]"
                  onOpen={() => setOpen({ index: 0, photos })}
                />
              ) : (
                <div className="h-[150px] bg-line lg:h-[200px]" />
              )}
              <div className="flex flex-col gap-1 lg:gap-1.5">
                <h3 className="font-display text-xl text-text-primary lg:text-[22px]">
                  {bedroom.name}
                </h3>
                <p className="font-body text-[13px] text-text-secondary lg:text-[13.5px]">
                  {bedroom.beds}
                </p>
                {bedroom.guests !== null && (
                  <p className="flex items-center gap-1.5 font-body text-[13px] font-medium text-text-primary lg:text-[13.5px]">
                    <User
                      aria-hidden
                      size={14}
                      strokeWidth={1.75}
                      className="shrink-0 text-accent-warm-deep"
                    />
                    <span className="sr-only">{guestsLabel}:</span>
                    {bedroom.guests}
                  </p>
                )}
              </div>
            </li>
          )
        })}
      </ul>
      <Lightbox
        photos={open?.photos ?? []}
        index={open?.index ?? null}
        labels={lightbox}
        onIndexChange={index => setOpen(current => current && { ...current, index })}
        onClose={() => setOpen(null)}
      />
    </>
  )
}
