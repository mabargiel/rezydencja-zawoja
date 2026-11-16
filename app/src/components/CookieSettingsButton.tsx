'use client'

import { useSyncExternalStore } from 'react'

import { isTrackingActive, openConsentSettings, type TrackingSettings } from '@/lib/consent'

type CookieSettingsButtonProps = {
  settings: TrackingSettings
  label: string
}

const noSubscription = () => () => {}

export function CookieSettingsButton({ settings, label }: CookieSettingsButtonProps) {
  const isActive = useSyncExternalStore(
    noSubscription,
    () => isTrackingActive(settings),
    () => false
  )
  if (!isActive) return null

  return (
    <button
      type="button"
      onClick={openConsentSettings}
      className="text-left transition-colors hover:text-text-inverse"
    >
      {label}
    </button>
  )
}
