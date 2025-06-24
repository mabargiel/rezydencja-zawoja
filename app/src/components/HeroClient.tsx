'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

type Props = {
  videos: { asset: { url: string } }[]
}

// Define it as a function, then assign Overlay
function HeroClient({ videos }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const videoRef = useRef<HTMLVideoElement | null>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleEnded = () => {
      setCurrentIndex(prev => (prev + 1) % videos.length)
    }

    video.addEventListener('ended', handleEnded)
    return () => video.removeEventListener('ended', handleEnded)
  }, [currentIndex, videos.length])

  return (
    <video
      ref={videoRef}
      src={videos[currentIndex].asset.url}
      autoPlay
      muted
      playsInline
      className="w-full h-full object-cover"
    />
  )
}

// ⬇️ Attach static Overlay property
HeroClient.Overlay = function Overlay() {
  const [showFirst, setShowFirst] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setShowFirst(false), 3000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="relative z-20 flex flex-col items-center justify-center h-full text-center text-white px-4">
      <h1 className="text-5xl md:text-7xl font-bold tracking-tight drop-shadow-xl font-serif">
        Rezydencja Zawoja
      </h1>

      <AnimatePresence mode="wait">
        {showFirst ? (
          <motion.p
            key="first"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.8 }}
            className="mt-4 text-xl md:text-2xl font-light max-w-xl drop-shadow-md"
          >
            relaks z pięknym widokiem
          </motion.p>
        ) : (
          <motion.p
            key="second"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.8 }}
            className="mt-4 text-xl md:text-2xl font-light max-w-xl drop-shadow-md"
          >
            na wyłączność
          </motion.p>
        )}
      </AnimatePresence>

      <a
        href="#main"
        className="mt-8 inline-block bg-white/90 text-black font-medium text-lg px-6 py-3 rounded-lg hover:bg-white transition"
      >
        Zobacz więcej
      </a>
    </div>
  )
}

// ✅ Correct default export
export default HeroClient
