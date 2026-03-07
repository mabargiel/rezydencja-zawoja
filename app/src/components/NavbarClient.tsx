'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

import Navbar from './Navbar'

export default function NavbarClient() {
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const containerClass = `transition-all duration-300 ${
    scrolled ? 'bg-black/10 backdrop-blur-md shadow-sm' : 'bg-transparent text-white'
  }`

  const logoWidth = scrolled ? 50 : 200

  return <Navbar containerClass={containerClass} logoWidth={logoWidth} pathname={pathname} />
}
