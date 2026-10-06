import { Languages } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { pagePaths } from '@/config/site'
import { getLanguage, getT } from '@/i18n/server'
import { sanityFetch } from '@/sanity/live'
import { legalPageQuery } from '@/sanity/queries'

import { LegalText } from './LegalText'

type LegalPageProps = {
  page: 'privacyPolicy' | 'rentalTerms'
}

export async function LegalPage({ page }: LegalPageProps) {
  const [language, t] = await Promise.all([getLanguage(), getT()])
  const { data } = await sanityFetch({
    params: { id: page, lng: language },
    query: legalPageQuery,
    stega: false,
  })
  if (!data?.body) notFound()

  const updatedAt =
    data.updatedAt &&
    new Intl.DateTimeFormat(language, { dateStyle: 'long', timeZone: 'UTC' }).format(
      new Date(data.updatedAt)
    )

  return (
    <main>
      <header className="flex flex-col gap-3 bg-bg-dark px-5 pt-[124px] pb-9 lg:gap-4 lg:px-16 lg:pt-[178px] lg:pb-16">
        <p className="flex items-center gap-2.5 font-body text-[10.5px] tracking-[3px] text-accent-warm uppercase lg:gap-3 lg:text-[13px] lg:tracking-[6px]">
          <span aria-hidden className="h-0.5 w-[22px] bg-accent-warm lg:w-[26px]" />
          {t('legal.eyebrow')}
        </p>
        <h1 className="font-display text-4xl leading-[1.05] text-text-inverse lg:text-[56px]">
          {data.title ?? t(`meta.${page}.title`)}
        </h1>
        {updatedAt && (
          <p className="font-body text-[13.5px] text-text-inverse-dim lg:text-[15px]">
            {t('legal.updated', { date: updatedAt })}
          </p>
        )}
      </header>

      <div className="flex justify-center bg-bg px-5 pt-9 pb-14 lg:px-[120px] lg:pt-20 lg:pb-[100px]">
        <article
          lang={data.isPolishFallback ? 'pl' : undefined}
          className="flex w-full max-w-[760px] flex-col gap-5"
        >
          {language !== 'pl' && (
            <aside className="flex gap-2.5 border border-line bg-surface px-4 py-3.5 font-body text-[13px] leading-[1.55] text-text-secondary lg:gap-3 lg:px-5 lg:py-4 lg:text-sm">
              <Languages
                aria-hidden
                size={16}
                strokeWidth={1.75}
                className="mt-0.5 shrink-0 text-accent-warm-deep"
              />
              <p className="flex flex-col gap-1">
                <span lang={language}>
                  {data.isPolishFallback ? t('legal.fallbackNote') : t('legal.translationNote')}
                </span>
                {!data.isPolishFallback && (
                  <Link
                    href={`/pl${pagePaths[page]}`}
                    hrefLang="pl"
                    className="self-start font-medium text-accent underline underline-offset-2 hover:text-bg-dark"
                  >
                    {t('legal.translationLink')}
                  </Link>
                )}
              </p>
            </aside>
          )}
          <LegalText value={data.body} />
        </article>
      </div>
    </main>
  )
}
