'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { animate, motion, useInView } from 'framer-motion'
import { Globe, Share2, Tv, Code, type LucideIcon } from 'lucide-react'
import Scene, { type Variant } from './Scene'
import { NAV } from './Navbar'

export type Theme = {
  variant: Variant
  bg: string // page background
  grad: string // gradient text, e.g. 'from-emerald-400 to-purple-500'
  accent: string // accent text color
  chip: string // badge / tag classes
  btn: string // primary button classes
  hover: string // card hover border + shadow
  glow: string // drop-shadow for footer signature
}

export type Stat = { icon: LucideIcon; label: string; value: number; suffix?: string }
export type Card = { icon: LucideIcon; title: string; desc: string; badge: string; tags: string[] }
export type Content = {
  badge: string
  badgeIcon: LucideIcon
  title: string[] // last line is gradient
  sub: string
  primary: { label: string; icon: LucideIcon }
  secondary: string
  stats: Stat[]
  showcaseTitle: string
  showcaseSub: string
  cards: Card[]
  techTitle: string
  tech: string[]
  footerNote: string
}

function Counter({ to, suffix = '' }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  const [v, setV] = useState(0)

  useEffect(() => {
    if (!inView) return
    const c = animate(0, to, { duration: 2, ease: 'easeOut', onUpdate: (l) => setV(Math.round(l)) })
    return () => c.stop()
  }, [inView, to])

  return (
    <span ref={ref}>
      {v.toLocaleString()}
      {suffix}
    </span>
  )
}

const glass = 'border border-white/10 bg-white/5 backdrop-blur-xl'

export default function PageShell({ theme: t, content: c }: { theme: Theme; content: Content }) {
  const BadgeIcon = c.badgeIcon
  const PrimaryIcon = c.primary.icon

  return (
    <main className={`relative min-h-screen overflow-x-clip ${t.bg} text-white`}>
      <Scene variant={t.variant} />
      <div className="pointer-events-none fixed inset-0 z-[1] bg-gradient-to-b from-black/50 via-transparent to-black/80" />

      <div className="relative z-10">
        {/* HERO */}
        <section className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-7xl flex-col justify-center px-4 py-24 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            className={`${glass} ${t.chip} mb-6 inline-flex w-fit items-center gap-2 rounded-full px-4 py-1.5 text-sm`}
          >
            <BadgeIcon className="h-4 w-4" /> {c.badge}
          </motion.div>

          <h1 className="max-w-3xl text-5xl font-black leading-[0.95] tracking-tighter sm:text-7xl lg:text-8xl">
            {c.title.map((line, li) => (
              <span key={li} className="block overflow-hidden pb-2">
                <motion.span
                  className={`block ${
                    li === c.title.length - 1 ? `bg-gradient-to-r ${t.grad} bg-clip-text text-transparent` : ''
                  }`}
                  initial={{ y: '110%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.8, delay: 0.1 + li * 0.15, ease: [0.22, 1, 0.36, 1] }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-6 max-w-xl text-lg text-white/70"
          >
            {c.sub}
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <a
              href="#showcase"
              className={`${t.btn} inline-flex items-center gap-2 rounded-full px-6 py-3 font-semibold shadow-lg transition hover:scale-105`}
            >
              <PrimaryIcon className="h-5 w-5" /> {c.primary.label}
            </a>
            <a href="#stats" className={`${glass} rounded-full px-6 py-3 font-semibold transition hover:bg-white/10`}>
              {c.secondary}
            </a>
          </motion.div>
        </section>

        {/* STATS */}
        <section id="stats" className="mx-auto max-w-7xl scroll-mt-20 px-4 py-16 sm:px-6">
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {c.stats.map(({ icon: Icon, label, value, suffix }) => (
              <motion.div
                key={label}
                whileHover={{ y: -6 }}
                className={`${glass} ${t.hover} rounded-2xl p-5 transition-colors sm:p-6`}
              >
                <div className="mb-4 flex items-center justify-between">
                  <Icon className={`h-6 w-6 ${t.accent}`} />
                  <span className="relative flex h-2 w-2">
                    <span className={`absolute inline-flex h-full w-full animate-ping rounded-full bg-current opacity-60 ${t.accent}`} />
                    <span className={`relative inline-flex h-2 w-2 rounded-full bg-current ${t.accent}`} />
                  </span>
                </div>
                <div className="text-3xl font-black tabular-nums sm:text-4xl">
                  <Counter to={value} suffix={suffix} />
                </div>
                <div className="mt-1 text-sm text-white/60">{label}</div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* SHOWCASE */}
        <section id="showcase" className="mx-auto max-w-7xl scroll-mt-20 px-4 py-20 sm:px-6">
          <h2 className="text-4xl font-black tracking-tight sm:text-5xl">{c.showcaseTitle}</h2>
          <p className="mt-3 max-w-xl text-white/60">{c.showcaseSub}</p>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {c.cards.map(({ icon: Icon, title, desc, badge, tags }) => (
              <motion.article
                key={title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                whileHover={{ y: -8 }}
                className={`${glass} ${t.hover} group flex flex-col rounded-3xl p-6 transition-all hover:shadow-2xl`}
              >
                <div className="mb-5 flex items-start justify-between">
                  <div className={`rounded-2xl bg-gradient-to-br ${t.grad} p-3 text-black transition group-hover:rotate-6 group-hover:scale-110`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className={`${t.chip} rounded-full border px-3 py-1 text-xs font-medium`}>{badge}</span>
                </div>
                <h3 className="text-xl font-bold">{title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-white/65">{desc}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <span key={tag} className="rounded-md bg-white/10 px-2 py-1 text-xs text-white/75">
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        {/* TECH / HIGHLIGHTS */}
        <section className="mx-auto max-w-5xl px-4 py-20 text-center sm:px-6">
          <h2 className="text-3xl font-black tracking-tight sm:text-4xl">{c.techTitle}</h2>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {c.tech.map((x, i) => (
              <motion.span
                key={x}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                whileHover={{ scale: 1.1, rotate: -2 }}
                className={`${glass} ${t.chip} cursor-default rounded-full px-5 py-2 text-sm font-medium`}
              >
                {x}
              </motion.span>
            ))}
          </div>
        </section>

        {/* FOOTER */}
        <footer className="border-t border-white/10 bg-black/60 backdrop-blur-xl">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3">
            <div>
              <div className={`bg-gradient-to-r ${t.grad} bg-clip-text text-2xl font-black text-transparent`}>B.B.</div>
              <p className="mt-3 max-w-xs text-sm text-white/60">{c.footerNote}</p>
            </div>
            <div>
              <h4 className="mb-3 font-semibold">Quick navigation</h4>
              <ul className="space-y-2 text-sm text-white/65">
                {NAV.map((n) => (
                  <li key={n.href}>
                    <Link href={n.href} className="transition hover:text-white">
                      {n.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="mb-3 font-semibold">Social</h4>
              <div className="flex gap-3">
                {[
                  { Icon: Code, href: 'https://github.com/', label: 'GitHub' },
                  { Icon: Globe, href: 'https://linkedin.com/', label: 'LinkedIn' },
                  { Icon: Share2, href: 'https://instagram.com/', label: 'Instagram' },
                  { Icon: Tv, href: 'https://youtube.com/', label: 'YouTube' },
                ].map(({ Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    className={`${glass} rounded-full p-3 transition hover:-translate-y-1 hover:bg-white/15`}
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 py-6 text-center text-xs text-white/45">
            © 2026 B.Bektemirov. All rights reserved.
          </div>
          <div className={`bg-gradient-to-r ${t.grad} bg-clip-text pb-8 text-center text-xl font-black text-transparent ${t.glow}`}>Created by B.Bektemirov</div>
        </footer>
      </div>
    </main>
  )
}
