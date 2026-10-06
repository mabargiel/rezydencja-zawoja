'use client'

import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { type PointerEvent, useEffect, useRef } from 'react'

import { SanityImage } from '@/components/SanityImage'
import { fillTemplate } from '@/lib/template'
import type { KeyedPhoto } from '@/sanity/photo'

export type LightboxLabels = {
  label: string
  close: string
  previous: string
  next: string
  counter: string
  openPhoto: string
}

type LightboxProps = {
  photos: KeyedPhoto[]
  index: number | null
  labels: LightboxLabels
  onIndexChange: (index: number) => void
  onClose: () => void
}

const swipeThreshold = 40

export function Lightbox({ photos, index, labels, onIndexChange, onClose }: LightboxProps) {
  const dialog = useRef<HTMLDialogElement>(null)
  const swipeStart = useRef<number | null>(null)
  const isOpen = index !== null

  useEffect(() => {
    const element = dialog.current
    if (!element) return
    if (isOpen && !element.open) element.showModal()
    if (!isOpen && element.open) element.close()
  }, [isOpen])

  useEffect(() => {
    const element = dialog.current
    if (!element) return
    element.addEventListener('close', onClose)
    return () => element.removeEventListener('close', onClose)
  }, [onClose])

  const count = photos.length
  const step = (delta: number) => {
    if (index === null || count === 0) return
    onIndexChange((index + delta + count) % count)
  }

  const onPointerUp = (event: PointerEvent) => {
    if (swipeStart.current === null) return
    const distance = event.clientX - swipeStart.current
    swipeStart.current = null
    if (Math.abs(distance) >= swipeThreshold) step(distance < 0 ? 1 : -1)
  }

  const neighbours = index === null ? [] : [index - 1, index, index + 1]
  const current = index === null ? null : photos[index]

  return (
    <dialog
      ref={dialog}
      aria-label={labels.label}
      onKeyDown={event => {
        if (event.key === 'ArrowRight') step(1)
        if (event.key === 'ArrowLeft') step(-1)
      }}
      className="m-0 h-dvh max-h-none w-full max-w-none bg-scrim-lightbox text-text-inverse backdrop:bg-transparent"
    >
      {current && (
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between px-5 py-5 lg:px-10 lg:py-7">
            <p
              aria-live="polite"
              className="font-body text-[12.5px] tracking-[2px] text-text-inverse-dim lg:text-[13px]"
            >
              {fillTemplate(labels.counter, { current: (index ?? 0) + 1, total: count })}
            </p>
            <button type="button" aria-label={labels.close} onClick={onClose}>
              <X aria-hidden size={26} strokeWidth={1.5} />
            </button>
          </div>

          <div className="flex min-h-0 flex-1 items-center gap-8 lg:px-10">
            <StepButton
              direction="previous"
              label={labels.previous}
              onClick={() => step(-1)}
              className="max-lg:hidden"
            />
            <div
              className="relative h-full flex-1 touch-pan-y"
              onPointerDown={event => {
                swipeStart.current = event.clientX
              }}
              onPointerUp={onPointerUp}
              onPointerCancel={() => {
                swipeStart.current = null
              }}
            >
              {neighbours.map(position => {
                const photo = photos[(position + count) % count]
                const isCurrent = position === index
                return (
                  <SanityImage
                    key={`${photo._key}-${position}`}
                    photo={photo}
                    sizes="100vw"
                    fit="contain"
                    eager
                    className={isCurrent ? '' : 'invisible'}
                  />
                )
              })}
            </div>
            <StepButton
              direction="next"
              label={labels.next}
              onClick={() => step(1)}
              className="max-lg:hidden"
            />
          </div>

          <div className="flex flex-col gap-4 px-5 pt-5 pb-8 lg:items-center lg:px-10 lg:pt-6">
            <p className="font-body text-[13.5px] leading-normal text-text-inverse-dim lg:text-[14.5px]">
              {current.alt}
            </p>
            <div className="flex justify-between lg:hidden">
              <StepButton direction="previous" label={labels.previous} onClick={() => step(-1)} />
              <StepButton direction="next" label={labels.next} onClick={() => step(1)} />
            </div>
          </div>
        </div>
      )}
    </dialog>
  )
}

type StepButtonProps = {
  direction: 'previous' | 'next'
  label: string
  onClick: () => void
  className?: string
}

function StepButton({ direction, label, onClick, className = '' }: StepButtonProps) {
  const Icon = direction === 'previous' ? ChevronLeft : ChevronRight
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={`flex size-12 shrink-0 items-center justify-center border border-line-inverse-strong text-text-inverse transition-colors hover:bg-text-inverse/10 lg:size-[52px] ${className}`}
    >
      <Icon aria-hidden strokeWidth={1.5} className="size-5 lg:size-[22px]" />
    </button>
  )
}
