import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import type { ReactNode } from 'react'

type ActionProps = {
  href: string
  children: ReactNode
  className?: string
}

const label = 'font-body text-[13px] font-medium uppercase'

export function ButtonPrimary({ href, children, className = '' }: ActionProps) {
  return (
    <Link
      href={href}
      className={`${label} inline-flex items-center justify-center gap-2.5 bg-accent px-8 py-4 tracking-[2px] text-surface transition-colors hover:bg-bg-dark ${className}`}
    >
      {children}
      <ArrowRight aria-hidden size={16} strokeWidth={1.75} />
    </Link>
  )
}

const outlineTones = {
  accent: 'border-accent text-accent hover:bg-accent hover:text-surface',
  inverse:
    'border-text-inverse bg-scrim-button text-text-inverse hover:bg-text-inverse hover:text-bg-dark',
}

export function ButtonOutline({
  href,
  children,
  className = '',
  tone = 'inverse',
}: ActionProps & { tone?: keyof typeof outlineTones }) {
  return (
    <Link
      href={href}
      className={`${label} inline-flex items-center justify-center gap-2 border px-7 py-3 tracking-[2px] transition-colors ${outlineTones[tone]} ${className}`}
    >
      {children}
    </Link>
  )
}

export function TextLink({ href, children, className = '' }: ActionProps) {
  return (
    <Link
      href={href}
      className={`${label} group inline-flex items-center gap-2.5 tracking-[2.5px] text-accent ${className}`}
    >
      {children}
      <ArrowRight
        aria-hidden
        size={15}
        strokeWidth={1.75}
        className="transition-transform group-hover:translate-x-1"
      />
    </Link>
  )
}
