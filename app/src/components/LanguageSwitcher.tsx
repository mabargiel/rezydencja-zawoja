'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Fragment } from 'react'

import { type Language, languageNames, languages } from '@/i18n/config'

type LanguageSwitcherProps = {
  current: Language
  label: string
  size: 'nav' | 'menu'
  onNavigate?: () => void
}

export function LanguageSwitcher({ current, label, size, onNavigate }: LanguageSwitcherProps) {
  const pathname = usePathname()
  const rest = pathname.split('/').slice(2).join('/')
  const isMenu = size === 'menu'

  return (
    <nav aria-label={label}>
      <ul
        className={`flex items-center font-body tracking-[2px] uppercase ${isMenu ? 'gap-3.5 text-sm' : 'gap-2.5 text-xs'}`}
      >
        {languages.map((language, index) => (
          <Fragment key={language}>
            {index > 0 && (
              <li aria-hidden className="text-text-inverse-dim">
                ·
              </li>
            )}
            <li>
              <Link
                href={`/${language}${rest ? `/${rest}` : ''}`}
                hrefLang={language}
                lang={language}
                aria-label={languageNames[language]}
                aria-current={language === current ? 'true' : undefined}
                onClick={onNavigate}
                className={
                  language === current
                    ? 'font-medium text-accent-warm'
                    : 'text-text-inverse transition-colors hover:text-accent-warm'
                }
              >
                {language}
              </Link>
            </li>
          </Fragment>
        ))}
      </ul>
    </nav>
  )
}
