type SectionHeadingProps = {
  eyebrow: string
  title: string
  tone?: 'light' | 'dark'
  as?: 'h1' | 'h2'
  id?: string
}

export function SectionHeading({
  eyebrow,
  title,
  tone = 'light',
  as: Heading = 'h2',
  id,
}: SectionHeadingProps) {
  const onDark = tone === 'dark'

  return (
    <div className="flex max-w-[560px] flex-col gap-5 lg:gap-6">
      <p
        className={`flex items-center gap-2.5 font-body text-[10.5px] tracking-[3px] uppercase lg:gap-3 lg:text-xs lg:tracking-[5px] ${onDark ? 'text-accent-warm' : 'text-accent-warm-deep'}`}
      >
        <span aria-hidden className="h-0.5 w-[22px] bg-accent-warm lg:w-[26px]" />
        {eyebrow}
      </p>
      <Heading
        id={id}
        className={`font-display text-[34px] leading-[1.08] whitespace-pre-line lg:text-[54px] lg:leading-[1.05] ${onDark ? 'text-text-inverse' : 'text-text-primary'}`}
      >
        {title}
      </Heading>
      <span aria-hidden className="h-0.5 w-12 bg-accent-warm lg:w-14" />
    </div>
  )
}
