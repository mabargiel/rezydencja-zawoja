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

const fadeIn =
  'transition-opacity duration-(--duration-slow) ease-out-soft motion-reduce:transition-none'

export function HeroMedia({ poster, videoUrl }: HeroMediaProps) {
  const [isPosterLoaded, setIsPosterLoaded] = useState(false)
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const prefersReducedMotion = useSyncExternalStore(
    subscribe,
    () => window.matchMedia(reducedMotion).matches,
    () => true
  )
  const lqip = poster?.image?.asset?.metadata?.lqip

  return (
    <div className="absolute inset-0 -z-20 overflow-hidden">
      {lqip && (
        <div
          aria-hidden
          className="absolute inset-0 scale-110 bg-cover bg-center blur-2xl"
          style={{ backgroundImage: `url(${lqip})` }}
        />
      )}
      {poster && (
        <SanityImage
          photo={poster}
          sizes="100vw"
          priority
          hasBlurPlaceholder={false}
          onLoad={() => setIsPosterLoaded(true)}
          className={`${fadeIn} ${isPosterLoaded ? 'opacity-100' : 'opacity-0'}`}
        />
      )}
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
          className={`absolute inset-0 size-full object-cover ${fadeIn} ${isVideoPlaying ? 'opacity-100' : 'opacity-0'}`}
        />
      )}
    </div>
  )
}
