import Image from 'next/image'
import Link from 'next/link'

import logo from '../../public/images/logo.svg'

export default function Navbar({ className = '' }) {
  return (
    <nav className={`w-full z-50 ${className}`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4 text-white">
        <Link href="/" className="flex items-center">
          <Image src={logo} alt="Rezydencja Zawoja Logo" width={200} priority />
        </Link>
        <ul className="flex gap-6 font-medium">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/rooms">Pokoje</Link>
          </li>
          <li>
            <Link href="/gallery">Galeria</Link>
          </li>
          <li>
            <Link href="/zawoja">W okolicy</Link>
          </li>
          <li>
            <Link href="/pricing">Cennik</Link>
          </li>
          <li>
            <Link href="/blog">Blog</Link>
          </li>
          <li>
            <Link href="/contact">Kontakt</Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}
