import { Minus } from 'lucide-react'

import { SanityImage } from '@/components/SanityImage'
import type { ResolvedPhoto } from '@/sanity/photo'

type FeatureRowProps = {
  eyebrow: string
  title: string
  body: string
  bullets?: readonly string[]
  photo?: ResolvedPhoto | null
  reverse?: boolean
}

export function FeatureRow({ eyebrow, title, body, bullets, photo, reverse }: FeatureRowProps) {
  return (
    <article
      className={`flex flex-col lg:items-center lg:gap-20 ${reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'}`}
    >
      <div className="relative h-[240px] overflow-hidden bg-line lg:h-[460px] lg:w-[600px] lg:shrink-0">
        {photo && <SanityImage photo={photo} sizes="(min-width: 1024px) 600px, 100vw" />}
      </div>
      <div className="flex flex-col gap-3 pt-[18px] lg:gap-5 lg:pt-0">
        <p className="flex items-center gap-2.5 font-body text-[10.5px] tracking-[3px] text-accent-warm-deep uppercase lg:gap-3 lg:text-xs lg:tracking-[5px]">
          <span aria-hidden className="h-0.5 w-[22px] bg-accent-warm lg:w-[26px]" />
          {eyebrow}
        </p>
        <h2 className="font-display text-[26px] leading-[1.05] text-text-primary lg:text-[40px]">
          {title}
        </h2>
        <p className="font-body text-[14.5px] leading-[1.6] text-text-secondary lg:text-base lg:leading-[1.65]">
          {body}
        </p>
        {bullets && bullets.length > 0 && (
          <ul className="flex flex-col gap-2 pt-1 lg:gap-3 lg:pt-1.5">
            {bullets.map(bullet => (
              <li
                key={bullet}
                className="flex items-center gap-2.5 font-body text-sm text-text-secondary lg:gap-3 lg:text-[14.5px]"
              >
                <Minus
                  aria-hidden
                  size={14}
                  strokeWidth={1.75}
                  className="shrink-0 text-accent-warm-deep"
                />
                {bullet}
              </li>
            ))}
          </ul>
        )}
      </div>
    </article>
  )
}
