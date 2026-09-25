import Image from 'next/image'

type PageHeaderProps = {
  eyebrow: string
  title: string
  intro: string
  image?: { src: string; alt: string }
}

export function PageHeader({ eyebrow, title, intro, image }: PageHeaderProps) {
  return (
    <header className="relative isolate flex h-[400px] flex-col justify-end overflow-hidden bg-bg-dark lg:h-[460px]">
      {image && (
        <Image
          src={image.src}
          alt={image.alt}
          fill
          priority
          sizes="100vw"
          className="-z-20 object-cover"
        />
      )}
      <div aria-hidden className="absolute inset-0 -z-10 bg-header-scrim" />
      <div className="flex flex-col gap-3.5 px-5 pb-8 lg:max-w-[820px] lg:gap-[18px] lg:px-16 lg:pb-14">
        <p className="flex items-center gap-2.5 font-body text-[10.5px] tracking-[3px] text-accent-warm uppercase lg:gap-3 lg:text-[13px] lg:tracking-[6px]">
          <span aria-hidden className="h-0.5 w-[22px] bg-accent-warm lg:w-[26px]" />
          {eyebrow}
        </p>
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
