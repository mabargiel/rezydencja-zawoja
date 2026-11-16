'use client'

import { Phone, X } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useRef, useSyncExternalStore } from 'react'

import { phoneHref, site } from '@/config/site'
import type { Messages } from '@/i18n/types'
import {
  currentMessage,
  dismissalKey,
  type PromoMessage,
  readDismissed,
  saveDismissed,
  subscribeToDismissed,
} from '@/lib/promo'

type PromoBarProps = {
  messages: PromoMessage[]
  version: string
  contactHref: string
  labels: Messages['promo']
}

const noSubscription = () => () => {}

const actionClass =
  'inline-flex shrink-0 items-center gap-1.5 rounded-button bg-bg-dark px-3.5 py-1.5 font-body text-[11px] font-medium tracking-[1.5px] text-accent-warm-light uppercase transition-colors hover:bg-accent'

export function PromoBar({ messages, version, contactHref, labels }: PromoBarProps) {
  const ref = useRef<HTMLElement>(null)

  const messageKey = useSyncExternalStore(
    noSubscription,
    () => currentMessage(messages)?.key ?? null,
    () => null
  )
  const dismissed = useSyncExternalStore(subscribeToDismissed, readDismissed, () => null)

  const message = messages.find(candidate => candidate.key === messageKey)
  const key = message && dismissalKey(message, version)
  const isVisible = Boolean(key) && dismissed !== key

  // fixed-header offsets elsewhere add this height, so nothing hides under the bar
  useEffect(() => {
    const root = document.documentElement
    const element = ref.current
    if (!isVisible || !element) {
      root.style.removeProperty('--promo-height')
      return
    }
    const observer = new ResizeObserver(([entry]) => {
      root.style.setProperty('--promo-height', `${entry.borderBoxSize[0].blockSize}px`)
    })
    observer.observe(element)
    return () => {
      observer.disconnect()
      root.style.removeProperty('--promo-height')
    }
  }, [isVisible])

  if (!message || !key || !isVisible) return null

  return (
    <aside
      ref={ref}
      aria-label={message.label}
      className="relative bg-accent-warm-light px-12 py-2 text-bg-dark lg:py-2.5"
    >
      <div className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-center gap-x-5 gap-y-1.5 text-center">
        <p className="font-body text-[12.5px] leading-snug lg:text-[13.5px]">
          <span className="font-medium lg:mr-3 lg:text-[11px] lg:font-normal lg:tracking-[3px] lg:uppercase lg:opacity-75">
            {message.label}
            <span className="lg:hidden">: </span>
          </span>
          <span className="lg:hidden">{message.shortText ?? message.text}</span>
          <span className="hidden lg:inline">{message.text}</span>
        </p>
        {message.action === 'call' && (
          <a href={phoneHref} className={actionClass}>
            <Phone aria-hidden size={12} strokeWidth={2} />
            {labels.call}
            <span className="hidden lg:inline">{site.phone}</span>
          </a>
        )}
        {message.action === 'contact' && (
          <Link href={contactHref} className={actionClass}>
            {labels.write}
          </Link>
        )}
      </div>
      <button
        type="button"
        aria-label={labels.close}
        onClick={() => saveDismissed(key)}
        className="absolute top-1/2 right-2 -translate-y-1/2 rounded-button p-2 transition-colors hover:bg-bg-dark/10 lg:right-4"
      >
        <X aria-hidden size={16} strokeWidth={1.75} />
      </button>
    </aside>
  )
}
