import type { LucideIcon } from 'lucide-react'

type Amenity = { icon: LucideIcon; label: string }

type AmenityListProps = {
  items: Amenity[]
  tone?: 'light' | 'dark'
}

export function AmenityList({ items, tone = 'dark' }: AmenityListProps) {
  const onDark = tone === 'dark'

  return (
    <ul
      className={`grid grid-cols-1 lg:grid-cols-2 lg:gap-x-[110px] ${onDark ? 'text-text-inverse' : 'text-text-primary'}`}
    >
      {items.map(({ icon: Icon, label }) => (
        <li
          key={label}
          className={`flex items-center gap-3.5 border-t py-4 font-body text-sm tracking-[0.5px] lg:py-[18px] lg:text-[15px] ${onDark ? 'border-line-inverse' : 'border-line'}`}
        >
          <Icon aria-hidden size={15} strokeWidth={1.75} className="shrink-0 text-accent-warm" />
          {label}
        </li>
      ))}
    </ul>
  )
}
