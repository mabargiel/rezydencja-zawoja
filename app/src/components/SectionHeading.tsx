import { Eyebrow } from './Eyebrow'

type SectionHeadingProps = {
  eyebrow: string
  title: string
  tone?: 'light' | 'dark'
}

export function SectionHeading({ eyebrow, title, tone = 'light' }: SectionHeadingProps) {
  const onDark = tone === 'dark'

  return (
    <div className="reveal flex max-w-[560px] flex-col gap-5 lg:gap-6">
      <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
      <h2
        className={`font-display text-[34px] leading-[1.08] whitespace-pre-line lg:text-[54px] lg:leading-[1.05] ${onDark ? 'text-text-inverse' : 'text-text-primary'}`}
      >
        {title}
      </h2>
      <span aria-hidden className="h-0.5 w-12 bg-accent-warm lg:w-14" />
    </div>
  )
}
