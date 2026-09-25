import type { LucideIcon } from 'lucide-react'

import { SanityImage } from '@/components/SanityImage'
import type { ResolvedPhoto } from '@/sanity/photo'

type FeatureCardProps = {
  icon: LucideIcon
  title: string
  description: string
  photo?: ResolvedPhoto | null
}

export function FeatureCard({ icon: Icon, title, description, photo }: FeatureCardProps) {
  return (
    <article className="flex flex-col">
      <div className="relative h-[220px] overflow-hidden bg-bg lg:h-[400px]">
        {photo && <SanityImage photo={photo} sizes="(min-width: 1024px) 33vw, 100vw" />}
      </div>
      <div className="flex flex-col gap-2.5 pt-5 lg:pt-6">
        <h3 className="flex items-center gap-3.5 font-display text-[24px] text-text-inverse lg:text-[26px]">
          <Icon aria-hidden size={20} strokeWidth={1.5} className="text-accent-warm" />
          {title}
        </h3>
        <p className="font-body text-sm leading-[1.6] text-text-inverse-dim lg:text-[14.5px]">
          {description}
        </p>
      </div>
    </article>
  )
}
