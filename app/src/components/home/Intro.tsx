import { TextLink } from '@/components/Actions'
import { SanityImage } from '@/components/SanityImage'
import { SectionHeading } from '@/components/SectionHeading'
import type { ResolvedPhoto } from '@/sanity/photo'

type IntroProps = {
  eyebrow: string
  title: string
  lead: string
  body: string
  link: { href: string; label: string }
  house?: ResolvedPhoto | null
  detail?: ResolvedPhoto | null
}

export function Intro({ eyebrow, title, lead, body, link, house, detail }: IntroProps) {
  return (
    <section className="flex flex-col gap-10 bg-bg px-5 py-16 lg:gap-20 lg:px-[120px] lg:pt-[130px] lg:pb-[110px]">
      <div className="flex flex-col gap-7 lg:flex-row lg:gap-[110px]">
        <div className="lg:w-[520px] lg:shrink-0">
          <SectionHeading eyebrow={eyebrow} title={title} />
        </div>
        <div className="flex flex-col gap-5 lg:gap-[22px] lg:pt-2.5">
          <p className="font-body text-[17px] leading-normal text-text-primary lg:text-[19px]">
            {lead}
          </p>
          <p className="font-body text-[15px] leading-[1.7] text-text-secondary lg:text-base">
            {body}
          </p>
          <TextLink href={link.href} className="pt-2 max-lg:hidden">
            {link.label}
          </TextLink>
        </div>
      </div>

      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:gap-6">
        <div className="relative h-[280px] overflow-hidden bg-line lg:h-[560px] lg:flex-1">
          {house && <SanityImage photo={house} sizes="(min-width: 1024px) 60vw, 100vw" />}
        </div>
        <div className="relative h-[280px] overflow-hidden bg-line lg:h-[450px] lg:w-[380px]">
          {detail && <SanityImage photo={detail} sizes="(min-width: 1024px) 380px, 100vw" />}
        </div>
      </div>

      <TextLink href={link.href} className="lg:hidden">
        {link.label}
      </TextLink>
    </section>
  )
}
