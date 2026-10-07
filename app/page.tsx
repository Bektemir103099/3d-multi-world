'use client'

import { Box, Cpu, Gem, Gamepad2, Layers, Mountain, Palette, Play, Server, Sparkles, Zap, Activity } from 'lucide-react'
import PageShell, { type Content, type Theme } from '@/components/PageShell'

const theme: Theme = {
  variant: 'world',
  bg: 'bg-[#040a09]',
  grad: 'from-emerald-400 via-teal-300 to-purple-500',
  accent: 'text-emerald-300',
  chip: 'bg-emerald-500/10 text-emerald-200 border-emerald-400/30',
  btn: 'bg-emerald-400 text-black shadow-emerald-500/40 hover:bg-emerald-300',
  hover: 'hover:border-emerald-400/60 hover:shadow-emerald-500/20',
  glow: 'drop-shadow-[0_0_14px_rgba(52,211,153,0.85)]',
}

const content: Content = {
  badge: 'Voxel engine, Minecraft 1.21',
  badgeIcon: Gamepad2,
  title: ['Build blocks.', 'Ship worlds.', 'Code the crystal.'],
  sub: 'Floating terrain, redstone logic and custom shaders: a 3D playground where every pixel is a cube and every cube is code.',
  primary: { label: 'Explore the worlds', icon: Play },
  secondary: 'See live stats',
  stats: [
    { icon: Box, label: 'Worlds built', value: 128 },
    { icon: Layers, label: 'Chunks rendered', value: 4096 },
    { icon: Activity, label: 'Frames per second', value: 60, suffix: ' fps' },
    { icon: Zap, label: 'Redstone circuits', value: 312 },
  ],
  showcaseTitle: 'Featured builds',
  showcaseSub: 'Six projects from the block world and the WebGL world.',
  cards: [
    { icon: Mountain, title: 'Floating Island Terrain', desc: 'Procedural voxel islands generated with layered noise and instanced meshes for smooth rendering.', badge: 'Three.js', tags: ['InstancedMesh', 'Noise', 'GLSL'] },
    { icon: Cpu, title: 'Redstone Logic Lab', desc: 'Working ALU, clocks and memory cells built from redstone, documented step by step.', badge: 'Survival', tags: ['Logic gates', 'Clocks', 'Schematics'] },
    { icon: Gem, title: 'Crystal Shader Pack', desc: 'Emissive crystals with refraction-style glow, tuned for both vanilla and web previews.', badge: 'Shaders', tags: ['GLSL', 'Bloom', 'Emissive'] },
    { icon: Server, title: 'Community Server', desc: 'Paper server with custom plugins, economy, and automated world backups.', badge: 'Backend', tags: ['Java', 'Paper', 'Docker'] },
    { icon: Palette, title: 'Texture Pack Studio', desc: 'A 16x16 pack with a matching emerald and purple palette, built with a custom export tool.', badge: 'Art', tags: ['Pixel art', 'Tooling', 'Atlas'] },
    { icon: Sparkles, title: 'Procedural Biomes', desc: 'Biome blending, caves and structures generated from seeds, previewed live in the browser.', badge: 'Algorithms', tags: ['Seeds', 'Perlin', 'Chunks'] },
  ],
  techTitle: 'Tools of the trade',
  tech: ['Three.js', 'WebGL', 'GLSL', 'Next.js 15', 'React', 'TypeScript', 'Framer Motion', 'Tailwind CSS', 'Blender', 'Java', 'Paper MC', 'Docker'],
  footerNote: 'A voxel-flavoured corner of the web, built with Next.js and Three.js.',
}

export default function Home() {
  return <PageShell theme={theme} content={content} />
}