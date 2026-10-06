import { DashList } from '@/components/DashList'
import { Eyebrow } from '@/components/Eyebrow'
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
      <div
        className={`relative h-[240px] overflow-hidden bg-line lg:h-[460px] lg:w-[600px] lg:shrink-0 ${reverse ? 'reveal-right' : 'reveal-left'}`}
      >
        {photo && <SanityImage photo={photo} sizes="(min-width: 1024px) 600px, 100vw" />}
      </div>
      <div
        className={`reveal-delay-1 flex flex-col gap-3 pt-[18px] lg:gap-5 lg:pt-0 ${reverse ? 'reveal-left' : 'reveal-right'}`}
      >
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 className="font-display text-[26px] leading-[1.05] text-text-primary lg:text-[40px]">
          {title}
        </h2>
        <p className="font-body text-[14.5px] leading-[1.6] text-text-secondary lg:text-base lg:leading-[1.65]">
          {body}
        </p>
        {bullets && bullets.length > 0 && (
          <DashList items={bullets} className="gap-2 pt-1 lg:gap-3 lg:pt-1.5" />
        )}
      </div>
    </article>
  )
}
