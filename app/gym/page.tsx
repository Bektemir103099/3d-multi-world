'use client'

import { Activity, Dumbbell, Flame, HeartPulse, Target, Timer, Trophy, Zap, Weight, Swords } from 'lucide-react'
import PageShell, { type Content, type Theme } from '@/components/PageShell'

const theme: Theme = {
  variant: 'gym',
  bg: 'bg-[#0b0304]',
  grad: 'from-red-500 via-orange-500 to-amber-400',
  accent: 'text-orange-400',
  chip: 'bg-red-500/10 text-orange-200 border-red-500/40',
  btn: 'bg-red-600 text-white shadow-red-600/50 hover:bg-red-500',
  hover: 'hover:border-orange-500/60 hover:shadow-red-600/25',
  glow: 'drop-shadow-[0_0_16px_rgba(249,115,22,0.9)]',
}

const content: Content = {
  badge: 'Heavy iron, no excuses',
  badgeIcon: Flame,
  title: ['Lift heavy.', 'Recover harder.', 'Own the iron.'],
  sub: 'Strength blocks, hypertrophy cycles and conditioning that never lets the intensity drop. Track every rep, own every set.',
  primary: { label: 'Start the program', icon: Dumbbell },
  secondary: 'View my numbers',
  stats: [
    { icon: Weight, label: 'Total lifted (kg)', value: 182400 },
    { icon: Trophy, label: 'Personal records', value: 47 },
    { icon: Timer, label: 'Training streak (days)', value: 213 },
    { icon: HeartPulse, label: 'Resting heart rate', value: 58, suffix: ' bpm' },
  ],
  showcaseTitle: 'Training splits',
  showcaseSub: 'Six training blocks, from raw strength to conditioning.',
  cards: [
    { icon: Dumbbell, title: 'Push / Pull / Legs', desc: 'Six-day split built around progressive overload, with heavy compounds first and volume work after.', badge: 'Hypertrophy', tags: ['6 days', 'RPE 8-9', 'Volume'] },
    { icon: Zap, title: 'Powerlifting Peak', desc: 'Squat, bench and deadlift cycles with low-rep top sets and a deliberate taper before test day.', badge: 'Strength', tags: ['Squat', 'Bench', 'Deadlift'] },
    { icon: Flame, title: 'Metabolic Burn', desc: 'Short, brutal finishers: sled pushes, battle ropes and intervals to build engine without losing muscle.', badge: 'Conditioning', tags: ['HIIT', 'Sleds', 'Intervals'] },
    { icon: Target, title: 'Mobility & Prehab', desc: 'Daily hip, shoulder and ankle work that keeps joints healthy under heavy load.', badge: 'Recovery', tags: ['Stretching', 'Bands', '15 min'] },
    { icon: Activity, title: 'Progress Tracking', desc: 'A log of sets, bar speed and bodyweight trends, charted weekly to guide the next block.', badge: 'Data', tags: ['Logs', 'Charts', 'Trends'] },
    { icon: Swords, title: 'Fuel & Recovery', desc: 'High-protein meal templates, sleep targets and deload weeks to keep the work sustainable.', badge: 'Nutrition', tags: ['Protein', 'Sleep', 'Deloads'] },
  ],
  techTitle: 'Gear and methods',
  tech: ['Barbell', 'Dumbbells', 'Kettlebells', 'Sled', 'Progressive overload', 'RPE', '5x5', 'Deload weeks', 'Creatine', 'Foam rolling', 'Tempo reps', 'Supersets'],
  footerNote: 'Discipline over motivation. Every rep is logged, every block has a purpose.',
}

export default function GymPage() {
  return <PageShell theme={theme} content={content} />
}