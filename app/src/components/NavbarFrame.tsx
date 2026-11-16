'use client'

import { type ReactNode, useSyncExternalStore } from 'react'

const scrolledOffset = 8

function subscribe(onChange: () => void) {
  window.addEventListener('scroll', onChange, { passive: true })
  return () => window.removeEventListener('scroll', onChange)
}

type NavbarFrameProps = {
  promo?: ReactNode
  children: ReactNode
}

export function NavbarFrame({ promo, children }: NavbarFrameProps) {
  const isScrolled = useSyncExternalStore(
    subscribe,
    () => window.scrollY > scrolledOffset,
    () => false
  )

  return (
    <div className="fixed inset-x-0 top-0 z-30">
      {promo}
      <div
        data-scrolled={isScrolled}
        className={`flex items-center justify-between px-5 transition-[background-color,padding,backdrop-filter] duration-300 lg:px-16 ${
          isScrolled
            ? 'bg-bg-dark/85 py-3.5 backdrop-blur-lg lg:py-4'
            : 'bg-transparent py-[22px] lg:py-7'
        }`}
      >
        {children}
      </div>
    </div>
  )
}
