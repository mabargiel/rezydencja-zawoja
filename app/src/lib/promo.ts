export type PromoMessage = {
  key: string
  label: string
  text: string
  shortText: string | null
  showFrom: string | null
  showUntil: string | null
  action: 'call' | 'contact' | 'none'
}

const storageKey = 'rz-promo-dismissed'
const changeEvent = 'rz:promo-change'

function localDateString(date: Date) {
  const pad = (value: number) => String(value).padStart(2, '0')
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`
}

export function currentMessage(messages: PromoMessage[], now = new Date()) {
  const today = localDateString(now)
  return messages.find(
    message =>
      (!message.showFrom || message.showFrom <= today) &&
      (!message.showUntil || today <= message.showUntil)
  )
}

export function dismissalKey(message: PromoMessage, version: string) {
  return `${message.key}:${version}`
}

// localStorage throws in some private modes; the bar then simply stays visible
export function readDismissed() {
  try {
    return window.localStorage.getItem(storageKey)
  } catch {
    return null
  }
}

export function saveDismissed(key: string) {
  try {
    window.localStorage.setItem(storageKey, key)
  } catch {
    // dismissal still applies until the page is reloaded
  }
  window.dispatchEvent(new Event(changeEvent))
}

export function subscribeToDismissed(onChange: () => void) {
  window.addEventListener(changeEvent, onChange)
  window.addEventListener('storage', onChange)
  return () => {
    window.removeEventListener(changeEvent, onChange)
    window.removeEventListener('storage', onChange)
  }
}
