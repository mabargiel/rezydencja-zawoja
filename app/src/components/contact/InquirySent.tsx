'use client'

import { ArrowRight, Check } from 'lucide-react'

import { Eyebrow } from '@/components/Eyebrow'
import { phoneHref, site } from '@/config/site'
import type { Messages } from '@/i18n/types'

type InquirySentProps = {
  copy: Messages['pages']['contact']['sent']
  contactHref: string
}

export function InquirySent({ copy, contactHref }: InquirySentProps) {
  return (
    <div
      ref={node => node?.focus()}
      tabIndex={-1}
      role="status"
      className="flex flex-col gap-4 border border-line bg-surface p-7 outline-none lg:gap-5 lg:p-12"
    >
      <span className="flex size-11 items-center justify-center bg-bg-dark text-accent-warm lg:size-[52px]">
        <Check aria-hidden size={22} strokeWidth={1.75} />
      </span>
      <Eyebrow>{copy.eyebrow}</Eyebrow>
      <h2 className="font-display text-[28px] leading-[1.1] text-text-primary lg:text-[38px]">
        {copy.title}
      </h2>
      <p className="font-body text-[14.5px] leading-[1.6] text-text-secondary lg:text-base lg:leading-[1.65]">
        {copy.body}{' '}
        <a
          href={phoneHref}
          className="whitespace-nowrap underline underline-offset-2 hover:text-accent"
        >
          {site.phone}
        </a>
      </p>
      <a
        href={contactHref}
        className="group inline-flex items-center gap-2.5 self-start pt-1.5 font-body text-[12.5px] font-medium tracking-[2px] text-accent uppercase lg:pt-2 lg:text-[13px]"
      >
        {copy.again}
        <ArrowRight
          aria-hidden
          size={16}
          strokeWidth={1.75}
          className="transition-transform group-hover:translate-x-1"
        />
      </a>
    </div>
  )
}
