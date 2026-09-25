import {
  Binoculars,
  CircleDot,
  CookingPot,
  Droplets,
  Dumbbell,
  Flame,
  Gem,
  Waves,
} from 'lucide-react'

import { AmenityList } from '@/components/AmenityList'
import { FeatureCard } from '@/components/FeatureCard'
import { SectionHeading } from '@/components/SectionHeading'
import type { ResolvedPhoto } from '@/sanity/photo'

type Feature = { title: string; description: string; photo?: ResolvedPhoto | null }

type SpaProps = {
  eyebrow: string
  title: string
  body: string
  saltGrotto: Feature
  hotTub: Feature
  sauna: Feature
  amenities: {
    jacuzzi: string
    billiards: string
    fitness: string
    fireplace: string
    terrace: string
    grill: string
  }
}

export function Spa({ eyebrow, title, body, saltGrotto, hotTub, sauna, amenities }: SpaProps) {
  return (
    <section className="flex flex-col gap-10 bg-bg-dark px-5 py-16 lg:gap-[72px] lg:p-[120px]">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:gap-[110px]">
        <div className="lg:w-[560px] lg:shrink-0">
          <SectionHeading eyebrow={eyebrow} title={title} tone="dark" />
        </div>
        <p className="font-body text-[15px] leading-[1.7] text-text-inverse-dim lg:text-base">
          {body}
        </p>
      </div>

      <div className="grid gap-10 lg:grid-cols-3 lg:gap-6">
        <FeatureCard icon={Gem} {...saltGrotto} />
        <FeatureCard icon={Waves} {...hotTub} />
        <FeatureCard icon={Flame} {...sauna} />
      </div>

      <div className="lg:pt-5">
        <AmenityList
          items={[
            { icon: Droplets, label: amenities.jacuzzi },
            { icon: CircleDot, label: amenities.billiards },
            { icon: Dumbbell, label: amenities.fitness },
            { icon: Flame, label: amenities.fireplace },
            { icon: Binoculars, label: amenities.terrace },
            { icon: CookingPot, label: amenities.grill },
          ]}
        />
      </div>
    </section>
  )
}
