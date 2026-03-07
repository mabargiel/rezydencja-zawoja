import './globals.css'

import type { Metadata } from 'next'
import { Lato, Playfair_Display } from 'next/font/google'
import React from 'react'

import NavbarClient from '@/components/NavbarClient'

const lato = Lato({
  subsets: ['latin'],
  variable: '--font-lato',
  weight: ['300', '400', '700'],
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  weight: ['400', '700'],
})

export const metadata: Metadata = {
  description: 'Rezydencja Zawoja',
  title: 'Rezydencja Zawoja',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${lato.variable} antialiased`}>
        <div className="relative">
          <NavbarClient />
          <main>{children}</main>
        </div>
      </body>
    </html>
  )
}
