import type { ResolvedPhoto } from '@/sanity/photo'

import { BookingBar } from './BookingBar'
import { HeroMedia } from './HeroMedia'

type HeroProps = {
  eyebrow: string
  title: string
  intro: string
  poster?: ResolvedPhoto | null
  videoUrl?: string | null
  booking: Parameters<typeof BookingBar>[0]
}

export function Hero({ eyebrow, title, intro, poster, videoUrl, booking }: HeroProps) {
  return (
    <header className="relative isolate flex h-[640px] flex-col bg-bg-dark lg:h-[900px]">
      <HeroMedia poster={poster} videoUrl={videoUrl} />
      <div aria-hidden className="absolute inset-0 -z-10 bg-hero-scrim" />

      <div className="flex flex-1 flex-col justify-center gap-[18px] px-6 pt-20 lg:items-center lg:gap-7 lg:pt-24 lg:text-center">
        <span
          aria-hidden
          className="hidden h-14 w-px bg-accent-warm motion-safe:animate-fade lg:block"
        />
        <p className="motion-safe:animate-rise motion-safe:[animation-delay:100ms] font-body text-[10.5px] tracking-[3px] text-accent-warm uppercase lg:text-[13px] lg:tracking-[6px]">
          {eyebrow}
        </p>
        <h1 className="motion-safe:animate-rise motion-safe:[animation-delay:200ms] font-display text-[38px] leading-[1.08] whitespace-pre-line text-text-inverse lg:max-w-[980px] lg:text-[84px] lg:leading-[1.05]">
          {title}
        </h1>
        <p className="motion-safe:animate-rise motion-safe:[animation-delay:300ms] font-body text-[14.5px] leading-normal text-text-inverse-dim lg:max-w-[560px] lg:text-[17px] lg:leading-[1.6] lg:font-light lg:tracking-[0.5px]">
          {intro}
        </p>
      </div>

      <div className="flex justify-center px-5 pb-7 motion-safe:animate-rise motion-safe:[animation-delay:450ms] lg:px-16 lg:pb-11">
        <BookingBar {...booking} />
      </div>
    </header>
  )
}
