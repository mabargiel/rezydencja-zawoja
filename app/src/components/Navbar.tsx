import Image from 'next/image'
import Link from 'next/link'

import logo from '../../public/images/logo.svg'

export default function Navbar({
  containerClass = '',
  logoWidth = 200,
  pathname = '/',
}: {
  containerClass?: string
  logoWidth?: number
  pathname?: string
}) {
  const navLinkClass = `
  relative inline-block pb-1 transition-colors duration-300
  aria-[current=page]:text-[#E5BD6D]
  before:content-[''] before:absolute before:bottom-0 before:left-0 before:h-[2px] before:bg-[#E5BD6D]
  before:w-0 hover:before:w-full before:transition-all before:duration-300
  aria-[current=page]:before:w-full
`

  const links = [
    { href: '/', label: 'Home' },
    { href: '/rooms', label: 'Pokoje' },
    { href: '/gallery', label: 'Galeria' },
    { href: '/zawoja', label: 'W okolicy' },
    { href: '/pricing', label: 'Cennik' },
    { href: '/blog', label: 'Blog' },
    { href: '/contact', label: 'Kontakt' },
  ]

  return (
    <nav className={`fixed top-0 left-0 w-full z-30 px-6 ${containerClass}`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center">
          <Image src={logo} alt="Rezydencja Zawoja Logo" width={logoWidth} priority />
        </Link>
        <ul className="flex gap-6 font-medium">
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                aria-current={pathname === href ? 'page' : undefined}
                className={navLinkClass}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
