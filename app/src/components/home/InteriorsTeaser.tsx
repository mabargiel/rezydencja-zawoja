import { TextLink } from '@/components/Actions'
import { SanityImage } from '@/components/SanityImage'
import { SectionHeading } from '@/components/SectionHeading'
import type { ResolvedPhoto } from '@/sanity/photo'

type Feature = { title: string; description: string }

type InteriorsTeaserProps = {
  eyebrow: string
  title: string
  body: string
  features: Feature[]
  link: { href: string; label: string }
  photo?: ResolvedPhoto | null
}

export function InteriorsTeaser({
  eyebrow,
  title,
  body,
  features,
  link,
  photo,
}: InteriorsTeaserProps) {
  return (
    <section className="flex flex-col gap-7 bg-bg px-5 py-14 lg:flex-row lg:items-center lg:gap-[110px] lg:px-[120px] lg:py-[130px]">
      <div className="relative h-[320px] overflow-hidden bg-line lg:h-[680px] lg:w-[560px] lg:shrink-0">
        {photo && <SanityImage photo={photo} sizes="(min-width: 1024px) 560px, 100vw" />}
      </div>
      <div className="flex flex-col gap-6 lg:gap-[26px]">
        <SectionHeading eyebrow={eyebrow} title={title} />
        <p className="font-body text-[15px] leading-[1.7] text-text-secondary lg:text-base">
          {body}
        </p>
        {features.map(feature => (
          <div
            key={feature.title}
            className="flex flex-col gap-2 border-t border-line pt-5 lg:pt-[22px]"
          >
            <h3 className="font-display text-[22px] text-text-primary lg:text-2xl">
              {feature.title}
            </h3>
            <p className="font-body text-sm leading-[1.6] text-text-secondary lg:text-[14.5px]">
              {feature.description}
            </p>
          </div>
        ))}
        <TextLink href={link.href} className="pt-2.5">
          {link.label}
        </TextLink>
      </div>
    </section>
  )
}
