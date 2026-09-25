'use client'

import Link from 'next/link'
import { useSelectedLayoutSegment } from 'next/navigation'
import type { ReactNode } from 'react'

type NavLinkProps = {
  href: string
  segment?: string | null
  className: string
  children: ReactNode
  onNavigate?: () => void
}

export function NavLink({ href, segment, className, children, onNavigate }: NavLinkProps) {
  const current = useSelectedLayoutSegment()
  const isActive = segment !== undefined && segment === current

  return (
    <Link
      href={href}
      aria-current={isActive ? 'page' : undefined}
      onClick={onNavigate}
      className={`${className} transition-colors hover:text-accent-warm ${isActive ? 'text-accent-warm' : 'text-text-inverse'}`}
    >
      {children}
    </Link>
  )
}
