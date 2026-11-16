import { Phone } from 'lucide-react'

import { ButtonOutline, ButtonPrimary } from '@/components/Actions'
import { phoneHref, site } from '@/config/site'
import type { ResolvedPhoto } from '@/sanity/photo'

import { HeroMedia } from './HeroMedia'

type HeroProps = {
  eyebrow: string
  title: string
  facts: string
  callLabel: string
  writeLabel: string
  desktopPhoto?: ResolvedPhoto | null
  mobilePhoto?: ResolvedPhoto | null
  contactHref: string
}

export function Hero({
  eyebrow,
  title,
  facts,
  callLabel,
  writeLabel,
  desktopPhoto,
  mobilePhoto,
  contactHref,
}: HeroProps) {
  return (
    <header className="relative isolate flex h-svh min-h-[640px] flex-col bg-bg-dark lg:min-h-[720px]">
      <HeroMedia desktopPhoto={desktopPhoto} mobilePhoto={mobilePhoto} />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-hero-scrim lg:bg-hero-scrim-side lg:mask-hero-scrim-side"
      />

      <div className="flex flex-1 flex-col items-start gap-4 px-6 pt-28 lg:justify-center lg:gap-6 lg:px-16 lg:pt-24 lg:pb-16">
        <p className="motion-safe:animate-rise motion-safe:[animation-delay:100ms] font-body text-[10.5px] tracking-[3px] text-accent-warm-light uppercase lg:text-[13px] lg:tracking-[5px]">
          {eyebrow}
        </p>
        <h1 className="motion-safe:animate-rise motion-safe:[animation-delay:200ms] font-display text-[38px] leading-[1.04] whitespace-pre-line text-text-inverse lg:text-[68px] lg:leading-[1.02]">
          {title}
        </h1>
        <p className="motion-safe:animate-rise motion-safe:[animation-delay:300ms] font-body text-[15px] tracking-[1px] text-text-inverse lg:text-lg lg:font-light lg:tracking-[1.5px]">
          {facts}
        </p>
        <div className="motion-safe:animate-rise motion-safe:[animation-delay:400ms] mt-2 flex w-full flex-wrap gap-3 lg:mt-4 lg:w-auto lg:gap-4">
          <ButtonPrimary
            href={contactHref}
            tone="warm"
            className="max-lg:w-full lg:px-10 lg:py-5 lg:text-sm"
          >
            {writeLabel}
          </ButtonPrimary>
          <ButtonOutline href={phoneHref} className="max-lg:w-full lg:py-[19px]">
            <Phone aria-hidden size={15} strokeWidth={1.75} />
            {callLabel}
            <span className="hidden lg:inline">{site.phone}</span>
          </ButtonOutline>
        </div>
      </div>
    </header>
  )
}
