import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'

export const metadata: Metadata = {
  title: 'B.Bektemirov. | Worlds',
  description: 'Minecraft & 3D, Gym & Power, Streetwear: a multi-world portfolio.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // NOTE: no `overflow-hidden` or `h-screen` here, otherwise the page cannot scroll.
  return (
    <html lang="en">
      <body className="min-h-screen bg-black antialiased">
        <Navbar />
        {children}
      </body>
    </html>
  )
}