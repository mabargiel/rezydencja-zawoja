import { Eyebrow } from '@/components/Eyebrow'
import { SanityImage } from '@/components/SanityImage'
import type { ResolvedPhoto } from '@/sanity/photo'

type PageHeaderProps = {
  eyebrow: string
  title: string
  intro: string
  image?: ResolvedPhoto | null
}

export function PageHeader({ eyebrow, title, intro, image }: PageHeaderProps) {
  return (
    <header className="relative isolate flex h-[400px] flex-col justify-end overflow-hidden bg-bg-dark lg:h-[460px]">
      {image && <SanityImage photo={image} sizes="100vw" priority className="-z-20" />}
      <div aria-hidden className="absolute inset-0 -z-10 bg-header-scrim" />
      <div className="flex flex-col gap-3.5 px-5 pb-8 lg:max-w-[820px] lg:gap-[18px] lg:px-16 lg:pb-14">
        <Eyebrow tone="dark" size="header">
          {eyebrow}
        </Eyebrow>
        <h1 className="font-display text-[38px] leading-[1.05] whitespace-pre-line text-text-inverse lg:text-[64px] lg:leading-[1.04]">
          {title}
        </h1>
        <p className="font-body text-sm leading-[1.55] text-text-inverse-dim lg:max-w-[640px] lg:text-[16.5px] lg:leading-[1.6]">
          {intro}
        </p>
      </div>
    </header>
  )
}
