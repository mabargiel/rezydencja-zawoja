import type { ReactNode } from 'react'

import { DashList } from '@/components/DashList'
import { Eyebrow } from '@/components/Eyebrow'
import type { LightboxLabels } from '@/components/Lightbox'
import type { KeyedPhoto } from '@/sanity/photo'

import { RoomMosaic } from './RoomMosaic'

type RoomSectionProps = {
  id: string
  eyebrow: string
  title: string
  body: string
  facts: readonly string[]
  photos: KeyedPhoto[]
  lightbox: LightboxLabels
  children?: ReactNode
}

export function RoomSection({
  id,
  eyebrow,
  title,
  body,
  facts,
  photos,
  lightbox,
  children,
}: RoomSectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="flex scroll-mt-32 flex-col gap-3.5 px-5 py-9 lg:scroll-mt-20 lg:gap-10 lg:px-[120px] lg:py-16"
    >
      <div className="flex flex-col gap-3.5 lg:flex-row lg:gap-20">
        <div className="reveal flex flex-col gap-3.5 lg:w-[420px] lg:shrink-0 lg:gap-[18px]">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2
            id={`${id}-title`}
            className="font-display text-[28px] leading-[1.05] text-text-primary lg:text-[40px]"
          >
            {title}
          </h2>
          <p className="font-body text-[14.5px] leading-[1.6] text-text-secondary lg:text-base lg:leading-[1.65]">
            {body}
          </p>
          <DashList items={facts} className="gap-2 lg:gap-2.5 lg:pt-1.5" />
        </div>
        <div className="reveal reveal-delay-1 lg:min-w-0 lg:flex-1">
          <RoomMosaic photos={photos} lightbox={lightbox} />
        </div>
      </div>
      {children}
    </section>
  )
}
