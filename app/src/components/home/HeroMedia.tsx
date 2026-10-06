'use client'

import { useState, useSyncExternalStore } from 'react'

import { SanityImage } from '@/components/SanityImage'
import type { ResolvedPhoto } from '@/sanity/photo'

type HeroMediaProps = {
  poster?: ResolvedPhoto | null
  videoUrl?: string | null
}

const reducedMotion = '(prefers-reduced-motion: reduce)'

function subscribe(onChange: () => void) {
  const query = window.matchMedia(reducedMotion)
  query.addEventListener('change', onChange)
  return () => query.removeEventListener('change', onChange)
}

export function HeroMedia({ poster, videoUrl }: HeroMediaProps) {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const prefersReducedMotion = useSyncExternalStore(
    subscribe,
    () => window.matchMedia(reducedMotion).matches,
    () => true
  )

  return (
    <div className="absolute inset-0 -z-20 overflow-hidden">
      {poster && <SanityImage photo={poster} sizes="100vw" priority />}
      {videoUrl && !prefersReducedMotion && (
        <video
          src={videoUrl}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden
          onPlaying={() => setIsVideoPlaying(true)}
          className={`absolute inset-0 size-full object-cover transition-opacity duration-(--duration-cinematic) ease-out-soft ${isVideoPlaying ? 'opacity-100' : 'opacity-0'}`}
        />
      )}
    </div>
  )
}
