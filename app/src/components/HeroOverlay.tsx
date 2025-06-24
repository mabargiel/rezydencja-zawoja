'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function HeroOverlay() {
  const [showFirst, setShowFirst] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setShowFirst(prev => !prev)
    }, 8000) // change every 4 seconds
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative z-20 h-full w-full flex flex-col justify-center text-white text-left">
      <div className="w-full px-6 sm:px-[24px] lg:px-[48px] max-w-7xl mx-auto">
        <div className="max-w-2xl">
          <h1 className="text-5xl md:text-7xl font-bold tracking-wider drop-shadow-xl font-serif text-[#E5BD6D]">
            <span className="block text-white/90">Rezydencja</span>
            <span className="block text-[#E5BD6D]">Zawoja</span>
          </h1>

          <AnimatePresence mode="wait">
            <div className="min-h-[3.5rem] md:min-h-[3rem]">
              {showFirst ? (
                <motion.p
                  key="first"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.8 }}
                  className="mt-4 text-lg md:text-xl font-light max-w-xl text-white/60 drop-shadow-[0_1px_4px_rgba(255,255,255,0.25)]"
                >
                  Miejsce, w którym natura spotyka się z luksusem i spokojem
                </motion.p>
              ) : (
                <motion.p
                  key="second"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.8 }}
                  className="mt-4 text-lg md:text-xl font-light max-w-xl text-white/60 drop-shadow-[0_1px_4px_rgba(255,255,255,0.25)]"
                >
                  Dom na wyłączność z widokiem na Babią Górę
                </motion.p>
              )}
            </div>
          </AnimatePresence>

          <a
            href="#main"
            className="mt-8 inline-block border border-[#E5BD6D] text-[#E5BD6D] font-medium text-lg px-6 py-3 rounded-lg hover:bg-[#E5BD6D] hover:text-black transition"
          >
            Zobacz więcej
          </a>
        </div>
      </div>
    </div>
  )
}
