import { Mail, Phone } from 'lucide-react'

import { ButtonOutline, ButtonPrimary } from '@/components/Actions'
import { SectionHeading } from '@/components/SectionHeading'
import { phoneHref, site } from '@/config/site'

type BookingCtaProps = {
  eyebrow: string
  title: string
  body: string
  primary: { href: string; label: string }
  secondary: { href: string; label: string }
}

export function BookingCta({ eyebrow, title, body, primary, secondary }: BookingCtaProps) {
  return (
    <section className="flex flex-col gap-8 border-t border-line bg-bg px-5 py-16 lg:flex-row lg:items-center lg:justify-between lg:gap-[60px] lg:px-[120px] lg:py-[110px]">
      <div className="flex flex-col gap-5 lg:w-[560px] lg:gap-[22px]">
        <SectionHeading eyebrow={eyebrow} title={title} />
        <p className="font-body text-[15px] leading-[1.7] text-text-secondary lg:text-base">
          {body}
        </p>
      </div>
      <div className="flex flex-col gap-5 lg:items-end lg:gap-[22px]">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:gap-[18px]">
          <ButtonPrimary href={primary.href} className="lg:px-10 lg:py-[18px]">
            {primary.label}
          </ButtonPrimary>
          <ButtonOutline href={secondary.href} tone="accent" className="py-4 lg:px-10 lg:py-[18px]">
            {secondary.label}
          </ButtonOutline>
        </div>
        <div className="flex flex-col gap-2.5 font-body text-[15px] text-text-primary lg:flex-row lg:items-center lg:gap-9">
          <a href={phoneHref} className="flex items-center gap-2 hover:text-accent">
            <Phone aria-hidden size={15} strokeWidth={1.75} className="text-accent-warm-deep" />
            {site.phone}
          </a>
          <a href={`mailto:${site.email}`} className="flex items-center gap-2 hover:text-accent">
            <Mail aria-hidden size={15} strokeWidth={1.75} className="text-accent-warm-deep" />
            {site.email}
          </a>
        </div>
      </div>
    </section>
  )
}
