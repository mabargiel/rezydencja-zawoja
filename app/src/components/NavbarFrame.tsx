'use client'

import { type ReactNode, useSyncExternalStore } from 'react'

const scrolledOffset = 8

function subscribe(onChange: () => void) {
  window.addEventListener('scroll', onChange, { passive: true })
  return () => window.removeEventListener('scroll', onChange)
}

type NavbarFrameProps = {
  skipLink: ReactNode
  promo?: ReactNode
  children: ReactNode
}

export function NavbarFrame({ skipLink, promo, children }: NavbarFrameProps) {
  const isScrolled = useSyncExternalStore(
    subscribe,
    () => window.scrollY > scrolledOffset,
    () => false
  )

  return (
    <header className="fixed inset-x-0 top-0 z-30">
      {skipLink}
      {promo}
      <div
        data-scrolled={isScrolled}
        className={`relative isolate flex items-center justify-between px-5 transition-[background-color,padding,backdrop-filter] duration-300 lg:px-16 ${
          isScrolled
            ? 'bg-bg-dark/85 py-3.5 backdrop-blur-lg lg:py-4'
            : 'bg-transparent py-[22px] lg:py-7'
        }`}
      >
        <div
          aria-hidden
          className={`pointer-events-none absolute inset-x-0 top-0 -z-10 h-[170%] bg-nav-scrim transition-opacity duration-300 ${isScrolled ? 'opacity-0' : 'opacity-100'}`}
        />
        {children}
      </div>
    </header>
  )
}
