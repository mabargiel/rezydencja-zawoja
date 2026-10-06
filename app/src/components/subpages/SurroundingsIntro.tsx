import { SectionHeading } from '@/components/SectionHeading'

type SurroundingsIntroProps = {
  eyebrow: string
  title: string
  lead: string
  body: string
}

export function SurroundingsIntro({ eyebrow, title, lead, body }: SurroundingsIntroProps) {
  return (
    <section className="flex flex-col gap-4 bg-bg px-5 pt-12 pb-2 lg:flex-row lg:gap-[110px] lg:px-[120px] lg:pt-[100px] lg:pb-5">
      <div className="reveal-left max-lg:hidden lg:w-[520px] lg:shrink-0">
        <SectionHeading eyebrow={eyebrow} title={title} />
      </div>
      <div className="reveal-right reveal-delay-1 flex flex-col gap-4 lg:gap-[18px] lg:pt-2">
        <p className="font-body text-[17px] leading-normal text-text-primary lg:text-lg lg:leading-[1.55]">
          {lead}
        </p>
        <p className="font-body text-[14.5px] leading-[1.7] text-text-secondary lg:text-[15.5px]">
          {body}
        </p>
      </div>
    </section>
  )
}
