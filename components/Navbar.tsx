'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { Box, Dumbbell, Shirt } from 'lucide-react'

export const NAV = [
  { href: '/', label: 'Minecraft & 3D', icon: Box },
  { href: '/gym', label: 'Gym & Power', icon: Dumbbell },
  { href: '/clothing', label: 'Streetwear', icon: Shirt },
]

export default function Navbar() {
  const path = usePathname()
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/40 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        <span className="bg-gradient-to-r from-white to-white/50 bg-clip-text text-lg font-black tracking-tight text-transparent">
          B.Bektemirov.
        </span>
        <ul className="flex gap-1 rounded-full border border-white/10 bg-white/5 p-1">
          {NAV.map(({ href, label, icon: Icon }) => {
            const active = path === href
            return (
              <li key={href}>
                <Link
                  href={href}
                  className="relative flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium text-white/70 transition hover:text-white sm:px-4"
                >
                  {active && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-white/15"
                      transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                    />
                  )}
                  <Icon className="relative h-4 w-4" />
                  <span className="relative hidden sm:inline">{label}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </header>
  )
}