import { Minus } from 'lucide-react'

type DashListProps = {
  items: readonly string[]
  className: string
}

export function DashList({ items, className }: DashListProps) {
  return (
    <ul className={`flex flex-col ${className}`}>
      {items.map(item => (
        <li
          key={item}
          className="flex items-center gap-2.5 font-body text-[13.5px] text-text-secondary lg:gap-3 lg:text-[14.5px]"
        >
          <Minus
            aria-hidden
            size={14}
            strokeWidth={1.75}
            className="shrink-0 text-accent-warm-deep"
          />
          {item}
        </li>
      ))}
    </ul>
  )
}
