'use client'

import Link from 'next/link'
import { useSelectedLayoutSegment } from 'next/navigation'
import type { ReactNode } from 'react'

import { useSectionInView } from '@/lib/useSectionInView'

type NavLinkProps = {
  href: string
  segment?: string | null
  section?: string
  yieldTo?: string
  className: string
  children: ReactNode
  onNavigate?: () => void
}

export function NavLink({
  href,
  segment,
  section,
  yieldTo,
  className,
  children,
  onNavigate,
}: NavLinkProps) {
  const current = useSelectedLayoutSegment()
  const isOnHome = current === null
  const watchedSection = section ?? yieldTo
  const watchedInView = useSectionInView(watchedSection, isOnHome && watchedSection !== undefined)

  const isSectionActive = section !== undefined && watchedInView
  const isPageActive = segment !== undefined && segment === current && !(yieldTo && watchedInView)
  const isActive = isSectionActive || isPageActive

  return (
    <Link
      href={href}
      aria-current={isSectionActive ? 'location' : isPageActive ? 'page' : undefined}
      onClick={onNavigate}
      className={`${className} transition-colors hover:text-accent-warm ${isActive ? 'text-accent-warm' : 'text-text-inverse'}`}
    >
      {children}
    </Link>
  )
}
