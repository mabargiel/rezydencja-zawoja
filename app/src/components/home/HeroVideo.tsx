'use client'

import { useSyncExternalStore } from 'react'

const reducedMotion = '(prefers-reduced-motion: reduce)'

function subscribe(onChange: () => void) {
  const query = window.matchMedia(reducedMotion)
  query.addEventListener('change', onChange)
  return () => query.removeEventListener('change', onChange)
}

export function HeroVideo({ src }: { src: string }) {
  const prefersReducedMotion = useSyncExternalStore(
    subscribe,
    () => window.matchMedia(reducedMotion).matches,
    () => true
  )

  if (prefersReducedMotion) return null

  return (
    <video
      src={src}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      aria-hidden
      className="absolute inset-0 -z-10 size-full object-cover"
    />
  )
}
