import Image from 'next/image'
import Link from 'next/link'

import { navItems, phoneHref, site } from '@/config/site'
import { getLanguage, getT } from '@/i18n/server'

export async function Footer() {
  const [language, t] = await Promise.all([getLanguage(), getT()])

  return (
    <footer
      aria-label={t('footer.label')}
      className="flex flex-col gap-8 bg-bg-dark px-5 pt-12 pb-8 font-body text-text-inverse-dim lg:gap-[50px] lg:px-[120px] lg:pt-[70px] lg:pb-10"
    >
      <div className="flex flex-col gap-8 lg:flex-row lg:justify-between">
        <div className="flex flex-col gap-8 lg:gap-6">
          <Image
            src="/brand/logo-light.svg"
            unoptimized
            alt={t('meta.siteName')}
            width={91}
            height={58}
            className="h-[50px] w-auto self-start lg:h-[58px]"
          />
          <address className="flex flex-col gap-1.5 text-[13px] not-italic lg:text-[13.5px] lg:tracking-[1px]">
            <span>{t('footer.address')}</span>
            <a href={phoneHref} className="transition-colors hover:text-text-inverse">
              {site.phone}
            </a>
            <a href={`mailto:${site.email}`} className="transition-colors hover:text-text-inverse">
              {site.email}
            </a>
          </address>
        </div>

        <nav aria-label={t('footer.navigation')}>
          <ul className="flex flex-col gap-3.5 text-sm lg:flex-row lg:gap-9 lg:font-light lg:tracking-[1px]">
            {navItems.map(item => (
              <li key={item.key}>
                <Link
                  href={`/${language}${item.path}`}
                  className="transition-colors hover:text-text-inverse"
                >
                  {t(`nav.${item.key}`)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <p className="border-t border-line-inverse pt-6 text-[11.5px] lg:text-[12.5px] lg:font-light">
        {t('footer.copyright', { year: new Date().getFullYear() })}
      </p>
    </footer>
  )
}
