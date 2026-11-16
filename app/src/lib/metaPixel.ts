type Fbq = ((...args: unknown[]) => void) & {
  callMethod?: (...args: unknown[]) => void
  queue: unknown[]
  loaded: boolean
  version: string
  push: Fbq
}

declare global {
  interface Window {
    fbq?: Fbq
    _fbq?: Fbq
  }
}

type PixelEvent = 'PageView' | 'Lead' | 'Contact'

let lastPageViewPath: string | null = null

export function isPixelLoaded() {
  return typeof window !== 'undefined' && typeof window.fbq === 'function'
}

// Meta's standard base code: queues calls until fbevents.js arrives
export function loadPixel(pixelId: string) {
  if (isPixelLoaded()) return

  const fbq = function (...args: unknown[]) {
    if (fbq.callMethod) fbq.callMethod(...args)
    else fbq.queue.push(args)
  } as Fbq
  fbq.push = fbq
  fbq.loaded = true
  fbq.version = '2.0'
  fbq.queue = []
  window.fbq = fbq
  window._fbq = fbq

  const script = document.createElement('script')
  script.async = true
  script.src = 'https://connect.facebook.net/en_US/fbevents.js'
  document.head.append(script)

  fbq('init', pixelId)
}

export function trackPixel(event: PixelEvent) {
  window.fbq?.('track', event)
}

export function trackPageView(path: string) {
  if (!isPixelLoaded() || path === lastPageViewPath) return
  lastPageViewPath = path
  trackPixel('PageView')
}
