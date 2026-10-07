'use client'

import { Footprints, Gem, Layers, Scissors, Shirt, ShoppingBag, Sparkles, Star, Tag, TrendingUp } from 'lucide-react'
import PageShell, { type Content, type Theme } from '@/components/PageShell'

const theme: Theme = {
  variant: 'clothing',
  bg: 'bg-[#0a0412]',
  grad: 'from-pink-500 via-fuchsia-500 to-violet-500',
  accent: 'text-pink-400',
  chip: 'bg-pink-500/10 text-pink-200 border-pink-400/30',
  btn: 'bg-pink-500 text-white shadow-pink-500/50 hover:bg-pink-400',
  hover: 'hover:border-pink-400/60 hover:shadow-fuchsia-500/25',
  glow: 'drop-shadow-[0_0_16px_rgba(236,72,153,0.9)]',
}

const content: Content = {
  badge: 'Drop 04, limited run',
  badgeIcon: Sparkles,
  title: ['Oversized.', 'Unapologetic.', 'Neon after dark.'],
  sub: 'Heavyweight hoodies, boxy tees and technical outerwear cut loose and styled for the street, with a glass-and-neon edge.',
  primary: { label: 'Shop the collection', icon: ShoppingBag },
  secondary: 'See the numbers',
  stats: [
    { icon: Shirt, label: 'Pieces designed', value: 86 },
    { icon: Tag, label: 'Drops released', value: 4 },
    { icon: TrendingUp, label: 'Sold out in hours', value: 92, suffix: '%' },
    { icon: Star, label: 'Community members', value: 12400 },
  ],
  showcaseTitle: 'The collection',
  showcaseSub: 'Six pieces from the current drop, built oversized and made to layer.',
  cards: [
    { icon: Shirt, title: 'Heavyweight Boxy Tee', desc: '400gsm cotton, dropped shoulders and a wide boxy cut that holds its shape wash after wash.', badge: 'Core', tags: ['400gsm', 'Boxy fit', 'Garment dyed'] },
    { icon: Layers, title: 'Oversized Hoodie', desc: 'Double-layered hood, extended sleeves and puff-print graphics in neon pink.', badge: 'Bestseller', tags: ['Fleece', 'Puff print', 'Unisex'] },
    { icon: Scissors, title: 'Cargo Utility Pants', desc: 'Wide-leg cargos with articulated knees, adjustable hems and six deep pockets.', badge: 'New', tags: ['Ripstop', 'Wide leg', 'Utility'] },
    { icon: Gem, title: 'Reflective Shell Jacket', desc: 'Water-resistant shell with reflective panels that light up under flash and headlights.', badge: 'Limited', tags: ['Reflective', 'Waterproof', 'Shell'] },
    { icon: Footprints, title: 'Chunky Platform Sneaker', desc: 'Sculpted midsole, translucent outsole and neon accents for a statement step.', badge: 'Collab', tags: ['Platform', 'Translucent', 'Unisex'] },
    { icon: ShoppingBag, title: 'Carry-All Crossbody', desc: 'Compact technical bag with waterproof zips and a glow-in-the-dark strap.', badge: 'Accessory', tags: ['Nylon', 'Glow strap', 'Compact'] },
  ],
  techTitle: 'Materials and craft',
  tech: ['Heavyweight cotton', 'Puff print', 'Ripstop nylon', 'Reflective tape', 'Garment dye', 'Screen print', 'Embroidery', 'Oversized fit', 'Streetwear', 'Limited drops', 'Upcycled', 'Unisex'],
  footerNote: 'Cut loose, styled loud. Every drop is small, numbered and gone fast.',
}

export default function ClothingPage() {
  return <PageShell theme={theme} content={content} />
}