'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState, useSyncExternalStore } from 'react'

import type { Messages } from '@/i18n/types'
import {
  isTrackingActive,
  onConsentSettingsOpen,
  readDecision,
  saveDecision,
  subscribeToDecision,
  type TrackingSettings,
} from '@/lib/consent'
import { isPixelLoaded, loadPixel, trackPageView, trackPixel } from '@/lib/metaPixel'

type CookieConsentProps = {
  settings: TrackingSettings
  labels: Messages['cookies']
  privacyHref: string
}

const contactLinks = 'a[href^="tel:"], a[href^="mailto:"]'

const buttonClass =
  'rounded-button px-6 py-3 font-body text-[12.5px] font-medium tracking-[2px] uppercase transition-colors'

const noSubscription = () => () => {}

export function CookieConsent({ settings, labels, privacyHref }: CookieConsentProps) {
  const pathname = usePathname()
  const [isReopened, setIsReopened] = useState(false)

  const isActive = useSyncExternalStore(
    noSubscription,
    () => isTrackingActive(settings),
    () => false
  )
  const decision = useSyncExternalStore(
    subscribeToDecision,
    () => readDecision(settings),
    () => 'pending' as const
  )

  const isAccepted = isActive && decision === 'accepted'

  useEffect(() => {
    if (!isAccepted) return
    loadPixel(settings.pixelId)
    trackPageView(pathname)
  }, [isAccepted, settings.pixelId, pathname])

  useEffect(() => onConsentSettingsOpen(() => setIsReopened(true)), [])

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.target instanceof Element && event.target.closest(contactLinks)) {
        trackPixel('Contact')
      }
    }
    document.addEventListener('click', onClick, { capture: true })
    return () => document.removeEventListener('click', onClick, { capture: true })
  }, [])

  const isVisible = isActive && (decision === null || isReopened)
  if (!isVisible) return null

  const decide = (choice: 'accepted' | 'rejected') => {
    const wasPixelLoaded = isPixelLoaded()
    saveDecision(choice, settings.pixelId)
    setIsReopened(false)
    // a loaded fbevents.js can't be unloaded; a reload starts the page without it
    if (choice === 'rejected' && wasPixelLoaded) window.location.reload()
  }

  return (
    <section
      aria-label={labels.label}
      className="fixed inset-x-3 bottom-3 z-40 flex flex-col gap-4 rounded-button bg-bg-dark p-5 font-body text-text-inverse shadow-2xl lg:inset-x-auto lg:bottom-6 lg:left-6 lg:max-w-[440px] lg:p-6"
    >
      <h2 className="font-display text-2xl leading-tight">{labels.title}</h2>
      <p className="text-[13.5px] leading-relaxed text-text-inverse-dim">
        {labels.body}{' '}
        <Link href={privacyHref} className="underline underline-offset-2 hover:text-text-inverse">
          {labels.privacy}
        </Link>
      </p>
      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => decide('accepted')}
          className={`${buttonClass} flex-1 bg-accent-warm-light text-bg-dark hover:bg-text-inverse`}
        >
          {labels.accept}
        </button>
        <button
          type="button"
          onClick={() => decide('rejected')}
          className={`${buttonClass} flex-1 border border-text-inverse text-text-inverse hover:bg-text-inverse hover:text-bg-dark`}
        >
          {labels.reject}
        </button>
      </div>
    </section>
  )
}
