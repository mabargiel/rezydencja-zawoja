import type { ReactNode } from 'react'

type EyebrowProps = {
  tone?: keyof typeof tones
  size?: 'section' | 'header'
  children: ReactNode
}

const tones = {
  light: 'text-accent-warm-deep',
  dark: 'text-accent-warm-light',
  // gold can't keep small text readable over a bright photo, so the dash carries the accent
  photo: 'text-text-inverse',
}

const sizes = {
  header: 'lg:text-[13px] lg:tracking-[6px]',
  section: 'lg:text-xs lg:tracking-[5px]',
}

export function Eyebrow({ tone = 'light', size = 'section', children }: EyebrowProps) {
  return (
    <p
      className={`flex items-center gap-2.5 font-body text-[10.5px] tracking-[3px] uppercase lg:gap-3 ${sizes[size]} ${tones[tone]}`}
    >
      <span aria-hidden className="h-0.5 w-[22px] bg-accent-warm lg:w-[26px]" />
      {children}
    </p>
  )
}
