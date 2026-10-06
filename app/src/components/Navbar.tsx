import Image from 'next/image'
import Link from 'next/link'

import { ButtonOutline } from '@/components/Actions'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import { MobileMenu } from '@/components/MobileMenu'
import { NavbarFrame } from '@/components/NavbarFrame'
import { NavLink } from '@/components/NavLink'
import { navItems } from '@/config/site'
import { getLanguage, getT } from '@/i18n/server'

export async function Navbar() {
  const [language, t] = await Promise.all([getLanguage(), getT()])
  const links = navItems.map(item => ({
    href: `/${language}${item.path}`,
    label: t(`nav.${item.key}`),
    section: item.section,
    segment: item.segment,
    yieldTo: item.yieldTo,
  }))

  return (
    <NavbarFrame>
      <Link href={`/${language}`} aria-label={t('nav.homeLink')}>
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
        <ButtonOutline href={`/${language}/contact`}>{t('nav.book')}</ButtonOutline>
      </div>

      <MobileMenu
        language={language}
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
