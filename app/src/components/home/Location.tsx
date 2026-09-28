import { SanityImage } from '@/components/SanityImage'
import { SectionHeading } from '@/components/SectionHeading'
import type { ResolvedPhoto } from '@/sanity/photo'

type Fact = { title: string; detail: string; desktopOnly?: boolean }

type LocationProps = {
  eyebrow: string
  title: string
  body: string
  facts: Fact[]
  photo?: ResolvedPhoto | null
}

export function Location({ eyebrow, title, body, facts, photo }: LocationProps) {
  return (
    <section className="relative isolate flex min-h-[520px] flex-col justify-end gap-5 bg-bg-dark px-5 pt-10 pb-9 lg:h-[640px] lg:gap-0 lg:px-[120px] lg:pt-20 lg:pb-[70px]">
      {photo && <SanityImage photo={photo} sizes="100vw" className="-z-20" />}
      <div aria-hidden className="absolute inset-0 -z-10 bg-panorama-scrim" />

      <div className="flex flex-col gap-5 lg:max-w-[640px]">
        <SectionHeading eyebrow={eyebrow} title={title} tone="dark" />
        <p className="font-body text-[15px] leading-[1.7] text-text-inverse-dim lg:max-w-[520px] lg:text-base">
          {body}
        </p>
      </div>

      <ul className="grid grid-cols-3 gap-4 border-t border-line-inverse pt-5 lg:mt-10 lg:grid-cols-5 lg:gap-0 lg:pt-[26px]">
        {facts.map(fact => (
          <li
            key={fact.title}
            className={`flex-col gap-1 ${fact.desktopOnly ? 'hidden lg:flex' : 'flex'}`}
          >
            <span className="font-display text-lg leading-tight text-text-inverse lg:text-[21px]">
              {fact.title}
            </span>
            <span className="font-body text-[11.5px] font-light tracking-[1px] text-text-inverse-dim lg:text-[12.5px]">
              {fact.detail}
            </span>
          </li>
        ))}
      </ul>
    </section>
  )
}
