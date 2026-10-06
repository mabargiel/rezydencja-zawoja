import { Minus } from 'lucide-react'
import type { ReactNode } from 'react'

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
  openPhoto: string
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
  openPhoto,
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
        <div className="flex flex-col gap-3.5 lg:w-[420px] lg:shrink-0 lg:gap-[18px]">
          <p className="flex items-center gap-2.5 font-body text-[10.5px] tracking-[3px] text-accent-warm-deep uppercase lg:gap-3 lg:text-xs lg:tracking-[5px]">
            <span aria-hidden className="h-0.5 w-[22px] bg-accent-warm lg:w-[26px]" />
            {eyebrow}
          </p>
          <h2
            id={`${id}-title`}
            className="font-display text-[28px] leading-[1.05] text-text-primary lg:text-[40px]"
          >
            {title}
          </h2>
          <p className="font-body text-[14.5px] leading-[1.6] text-text-secondary lg:text-base lg:leading-[1.65]">
            {body}
          </p>
          <ul className="flex flex-col gap-2 lg:gap-2.5 lg:pt-1.5">
            {facts.map(fact => (
              <li
                key={fact}
                className="flex items-center gap-2.5 font-body text-[13.5px] text-text-secondary lg:gap-3 lg:text-[14.5px]"
              >
                <Minus
                  aria-hidden
                  size={14}
                  strokeWidth={1.75}
                  className="shrink-0 text-accent-warm-deep"
                />
                {fact}
              </li>
            ))}
          </ul>
        </div>
        <div className="lg:min-w-0 lg:flex-1">
          <RoomMosaic photos={photos} openPhoto={openPhoto} lightbox={lightbox} />
        </div>
      </div>
      {children}
    </section>
  )
}
