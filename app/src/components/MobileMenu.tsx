'use client'

import { Menu, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRef } from 'react'

import { ButtonOutline } from '@/components/Actions'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import { NavLink } from '@/components/NavLink'
import { phoneHref, site } from '@/config/site'
import type { Language } from '@/i18n/config'

type MenuLink = { href: string; label: string; segment?: string | null }

type MobileMenuProps = {
  language: Language
  links: MenuLink[]
  labels: {
    open: string
    close: string
    navigation: string
    language: string
    book: string
    homeLink: string
  }
}

export function MobileMenu({ language, links, labels }: MobileMenuProps) {
  const dialog = useRef<HTMLDialogElement>(null)
  const close = () => dialog.current?.close()

  return (
    <>
      <button
        type="button"
        aria-label={labels.open}
        aria-haspopup="dialog"
        onClick={() => dialog.current?.showModal()}
        className="text-text-inverse lg:hidden"
      >
        <Menu aria-hidden size={24} strokeWidth={1.5} />
      </button>

      <dialog
        ref={dialog}
        aria-label={labels.navigation}
        className="m-0 h-dvh max-h-none w-full max-w-none bg-bg-dark text-text-inverse backdrop:bg-bg-dark lg:hidden"
      >
        <div className="flex min-h-full flex-col px-5 pt-[22px] pb-10">
          <div className="flex items-center justify-between">
            <Link href={`/${language}`} aria-label={labels.homeLink} onClick={close}>
              <Image src="/brand/logo-light.svg" unoptimized alt="" width={63} height={40} />
            </Link>
            <button type="button" aria-label={labels.close} onClick={close}>
              <X aria-hidden size={24} strokeWidth={1.5} />
            </button>
          </div>

          <nav aria-label={labels.navigation} className="pt-14">
            <ul className="flex flex-col gap-[18px]">
              {links.map(link => (
                <li key={link.href}>
                  <NavLink
                    href={link.href}
                    segment={link.segment}
                    onNavigate={close}
                    className="font-display text-[34px] leading-[1.1]"
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-auto flex flex-col gap-7 border-t border-line-inverse pt-7">
            <LanguageSwitcher
              current={language}
              label={labels.language}
              size="menu"
              onNavigate={close}
            />
            <ButtonOutline href={`/${language}/contact`} className="w-full">
              {labels.book}
            </ButtonOutline>
            <address className="flex flex-col gap-1.5 font-body text-[13.5px] tracking-[1px] text-text-inverse-dim not-italic">
              <a href={phoneHref}>{site.phone}</a>
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </address>
          </div>
        </div>
      </dialog>
    </>
  )
}
