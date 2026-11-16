export type TrackingSettings = {
  pixelId: string
  activeFrom: string | null
  activeUntil: string | null
  consentMonths: number
}

type Decision = 'accepted' | 'rejected'

type StoredConsent = { decision: Decision; decidedAt: number; pixelId: string }

const storageKey = 'rz-consent'
const openEvent = 'rz:consent-open'
const changeEvent = 'rz:consent-change'
const monthInMs = 30 * 24 * 60 * 60 * 1000

export function isTrackingActive(settings: TrackingSettings, now = Date.now()) {
  if (settings.activeFrom && now < Date.parse(settings.activeFrom)) return false
  if (settings.activeUntil && now >= Date.parse(settings.activeUntil)) return false
  return true
}

function parseStored(raw: string | null): StoredConsent | null {
  if (!raw) return null
  try {
    const value: unknown = JSON.parse(raw)
    if (typeof value !== 'object' || value === null) return null
    const { decision, decidedAt, pixelId } = value as Record<string, unknown>
    if (decision !== 'accepted' && decision !== 'rejected') return null
    if (typeof decidedAt !== 'number' || typeof pixelId !== 'string') return null
    return { decidedAt, decision, pixelId }
  } catch {
    return null
  }
}

// localStorage throws in some private modes; treat that as "no decision yet"
function readRaw() {
  try {
    return window.localStorage.getItem(storageKey)
  } catch {
    return null
  }
}

export function readDecision(settings: TrackingSettings, now = Date.now()): Decision | null {
  const stored = parseStored(readRaw())
  if (!stored || stored.pixelId !== settings.pixelId) return null
  if (now - stored.decidedAt > settings.consentMonths * monthInMs) return null
  return stored.decision
}

export function saveDecision(decision: Decision, pixelId: string) {
  const stored: StoredConsent = { decidedAt: Date.now(), decision, pixelId }
  try {
    window.localStorage.setItem(storageKey, JSON.stringify(stored))
  } catch {
    // the choice still applies for this page view
  }
  window.dispatchEvent(new Event(changeEvent))
}

export function subscribeToDecision(onChange: () => void) {
  window.addEventListener(changeEvent, onChange)
  window.addEventListener('storage', onChange)
  return () => {
    window.removeEventListener(changeEvent, onChange)
    window.removeEventListener('storage', onChange)
  }
}

export function openConsentSettings() {
  window.dispatchEvent(new Event(openEvent))
}

export function onConsentSettingsOpen(onOpen: () => void) {
  window.addEventListener(openEvent, onOpen)
  return () => window.removeEventListener(openEvent, onOpen)
}
