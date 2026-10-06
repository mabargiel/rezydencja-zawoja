import { PortableText, type PortableTextComponents } from 'next-sanity'

import type { LegalPageQueryResult } from '@/sanity/types'

type LegalBody = NonNullable<NonNullable<LegalPageQueryResult>['body']>

const components: PortableTextComponents = {
  block: {
    h2: ({ children }) => (
      <h2 className="pt-3 font-display text-2xl leading-[1.15] text-text-primary first:pt-0 lg:pt-3.5 lg:text-[30px]">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="pt-2 font-body text-[15px] font-medium tracking-[0.3px] text-text-primary lg:text-base">
        {children}
      </h3>
    ),
    normal: ({ children }) => <p>{children}</p>,
  },
  list: {
    bullet: ({ children }) => <ul className="flex flex-col gap-2 lg:gap-2.5">{children}</ul>,
    number: ({ children }) => (
      <ol className="flex list-decimal flex-col gap-2 pl-6 marker:text-accent-warm-deep lg:gap-2.5">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="relative pl-[18px] before:absolute before:top-[0.68em] before:left-0.5 before:size-[5px] before:rounded-full before:bg-accent-warm lg:pl-5 lg:before:size-1.5">
        {children}
      </li>
    ),
    number: ({ children }) => <li className="pl-1.5 [&>ul]:pt-2">{children}</li>,
  },
  marks: {
    link: ({ children, value }) => {
      const href = typeof value?.href === 'string' ? value.href : undefined
      const isExternal = href?.startsWith('https://')
      return (
        <a
          href={href}
          {...(isExternal ? { rel: 'noopener noreferrer', target: '_blank' } : {})}
          className={`text-accent underline underline-offset-2 hover:text-bg-dark ${href?.startsWith('tel:') ? 'whitespace-nowrap' : ''}`}
        >
          {children}
        </a>
      )
    },
    strong: ({ children }) => <strong className="font-medium text-text-primary">{children}</strong>,
  },
}

export function LegalText({ value }: { value: LegalBody }) {
  return (
    <div className="flex flex-col gap-4 font-body text-[14.5px] leading-[1.65] text-text-secondary lg:gap-[18px] lg:text-base lg:leading-[1.7]">
      <PortableText components={components} value={value} />
    </div>
  )
}
