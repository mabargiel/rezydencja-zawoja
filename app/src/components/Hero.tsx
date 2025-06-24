import { getHero } from '@/lib/queries'

import HeroClient from './HeroClient'
import HeroOverlay from './HeroOverlay'

export default async function Hero() {
  const data = await getHero()
  if (!data?.videos?.length) return null

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Video background */}
      <div className="absolute inset-0 z-0">
        <HeroClient videos={data.videos} />
      </div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/70 z-10" />

      {/* Text overlay */}
      <div className="absolute inset-0 z-20 flex items-center justify-center">
        <HeroOverlay />
      </div>
    </section>
  )
}
