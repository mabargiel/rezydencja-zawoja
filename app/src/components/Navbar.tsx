import Image from 'next/image'
import Link from 'next/link'

import { ButtonOutline } from '@/components/Actions'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import { MobileMenu } from '@/components/MobileMenu'
import { NavbarFrame } from '@/components/NavbarFrame'
import { NavLink } from '@/components/NavLink'
import { PromoBar } from '@/components/PromoBar'
import { localizedHref, navItems, pagePaths } from '@/config/site'
import { getLanguage, getT } from '@/i18n/server'
import type { PromoMessage } from '@/lib/promo'
import { sanityFetch } from '@/sanity/live'
import { promoBarQuery } from '@/sanity/queries'

async function getPromoBar(language: string) {
  const { data } = await sanityFetch({
    params: { lng: language },
    query: promoBarQuery,
    stega: false,
  })
  if (!data?.messages) return null
  const messages = data.messages.flatMap<PromoMessage>(
    ({ _key, label, text, shortText, showFrom, showUntil, action }) =>
      label && text
        ? [{ action: action ?? 'call', key: _key, label, shortText, showFrom, showUntil, text }]
        : []
  )
  return messages.length > 0 ? { messages, version: data._updatedAt } : null
}

export async function Navbar() {
  const [language, t] = await Promise.all([getLanguage(), getT()])
  const promo = await getPromoBar(language)
  const homeHref = localizedHref(language)
  const bookHref = localizedHref(language, pagePaths.contact)
  const links = navItems.map(item => ({
    href: localizedHref(language, item.path),
    label: t(`nav.${item.key}`),
    section: item.section,
    segment: item.segment,
    yieldTo: item.yieldTo,
  }))

  return (
    <NavbarFrame
      skipLink={
        <a
          href="#content"
          className="sr-only z-50 rounded-button bg-surface px-4 py-3 font-body text-sm text-text-primary focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          {t('nav.skipToContent')}
        </a>
      }
      promo={
        promo && (
          <PromoBar
            messages={promo.messages}
            version={promo.version}
            contactHref={bookHref}
            labels={t('promo', { returnObjects: true })}
          />
        )
      }
    >
      <Link href={homeHref} aria-label={t('nav.homeLink')}>
        <Image
          src="/brand/logo-light.svg"
          unoptimized
          alt=""
          width={79}
          height={50}
          priority
          className="h-10 w-auto lg:h-[50px]"
        />
      </Link>

      <nav aria-label={t('nav.label')} className="hidden lg:block">
        <ul className="flex items-center gap-9">
          {links.map(link => (
            <li key={link.href}>
              <NavLink
                href={link.href}
                section={link.section}
                segment={link.segment}
                yieldTo={link.yieldTo}
                className="font-body text-sm tracking-[1.5px]"
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="hidden items-center gap-8 lg:flex">
        <LanguageSwitcher current={language} label={t('nav.language')} size="nav" />
        <ButtonOutline href={bookHref}>{t('nav.book')}</ButtonOutline>
      </div>

      <MobileMenu
        language={language}
        homeHref={homeHref}
        bookHref={bookHref}
        links={links}
        labels={{
          book: t('nav.book'),
          close: t('nav.closeMenu'),
          homeLink: t('nav.homeLink'),
          language: t('nav.language'),
          navigation: t('nav.label'),
          open: t('nav.openMenu'),
        }}
      />
    </NavbarFrame>
  )
}
