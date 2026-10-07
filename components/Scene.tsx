'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export type Variant = 'world' | 'gym' | 'clothing'

const PALETTE: Record<Variant, [number, number]> = {
  world: [0x10b981, 0xa855f7], // emerald + purple
  gym: [0xdc2626, 0xf97316], // red + orange
  clothing: [0xec4899, 0x7c3aed], // neon pink + deep purple
}

export default function Scene({ variant }: { variant: Variant }) {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = mountRef.current
    if (!el) return
    const [c1, c2] = PALETTE[variant]
    const wide = () => window.innerWidth > 900

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(55, el.clientWidth / el.clientHeight, 0.1, 100)
    camera.position.set(0, 1.5, 9)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(el.clientWidth, el.clientHeight)
    el.appendChild(renderer.domElement)

    // Lights
    scene.add(new THREE.AmbientLight(0xffffff, 0.6))
    const l1 = new THREE.PointLight(c1, 90, 60)
    l1.position.set(6, 5, 6)
    const l2 = new THREE.PointLight(c2, 90, 60)
    l2.position.set(-6, -2, 5)
    scene.add(l1, l2)

    // Background particles
    const count = 700
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count * 3; i++) pos[i] = (Math.random() - 0.5) * 40
    const pGeo = new THREE.BufferGeometry()
    pGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    const points = new THREE.Points(
      pGeo,
      new THREE.PointsMaterial({ color: c2, size: 0.05, transparent: true, opacity: 0.8 })
    )
    scene.add(points)

    // Hero object group (offset to the right on desktop so text stays readable)
    const hero = new THREE.Group()
    scene.add(hero)
    let spin: (t: number) => void = () => {}

    if (variant === 'world') {
      // Floating voxel terrain
      const N = 9
      const mesh = new THREE.InstancedMesh(
        new THREE.BoxGeometry(0.92, 0.92, 0.92),
        new THREE.MeshStandardMaterial({ roughness: 0.7 }),
        N * N * 4
      )
      const d = new THREE.Object3D()
      const col = new THREE.Color()
      let i = 0
      for (let x = 0; x < N; x++) {
        for (let z = 0; z < N; z++) {
          const h = 1 + Math.round(Math.abs(Math.sin(x * 0.7) + Math.cos(z * 0.6)) * 1.3)
          for (let y = 0; y < h; y++) {
            d.position.set(x - N / 2, y - 1.5, z - N / 2)
            d.updateMatrix()
            mesh.setMatrixAt(i, d.matrix)
            const top = y === h - 1
            col.set(top ? c1 : 0x4c1d95).offsetHSL(0, 0, (Math.random() - 0.5) * 0.08)
            mesh.setColorAt(i, col)
            i++
          }
        }
      }
      mesh.count = i
      const terrain = new THREE.Group()
      terrain.add(mesh)
      terrain.scale.setScalar(0.6)
      hero.add(terrain)

      const crystal = new THREE.Mesh(
        new THREE.OctahedronGeometry(0.8),
        new THREE.MeshPhysicalMaterial({
          color: c2,
          emissive: c2,
          emissiveIntensity: 0.6,
          flatShading: true,
          metalness: 0.2,
          roughness: 0.1,
        })
      )
      crystal.scale.y = 1.7
      crystal.position.y = 2.6
      hero.add(crystal)
      spin = (t) => {
        terrain.rotation.y = t * 0.25
        terrain.position.y = Math.sin(t) * 0.2
        crystal.rotation.y = t * 1.2
        crystal.position.y = 2.6 + Math.sin(t * 1.5) * 0.25
      }
    }

    if (variant === 'gym') {
      // Metallic dumbbell
      const steel = new THREE.MeshStandardMaterial({ color: 0xb4b4bc, metalness: 0.9, roughness: 0.25 })
      const plateMat = new THREE.MeshStandardMaterial({ color: 0xb91c1c, metalness: 0.75, roughness: 0.35 })
      const db = new THREE.Group()
      const bar = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.14, 4.2, 24), steel)
      bar.rotation.z = Math.PI / 2
      db.add(bar)
      ;[-1, 1].forEach((side) => {
        ;[0, 1].forEach((k) => {
          const r = 1.25 - k * 0.35
          const plate = new THREE.Mesh(new THREE.CylinderGeometry(r, r, 0.32, 48), k ? steel : plateMat)
          plate.rotation.z = Math.PI / 2
          plate.position.x = side * (1.2 + k * 0.38)
          db.add(plate)
        })
        const collar = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.22, 0.2, 24), steel)
        collar.rotation.z = Math.PI / 2
        collar.position.x = side * 1.95
        db.add(collar)
      })
      db.rotation.x = 0.4
      hero.add(db)
      spin = (t) => {
        db.rotation.y = t * 0.7
        db.rotation.z = Math.sin(t * 0.8) * 0.15
      }
    }

    if (variant === 'clothing') {
      // Glass torus knot
      const knot = new THREE.Mesh(
        new THREE.TorusKnotGeometry(1.3, 0.42, 220, 36),
        new THREE.MeshPhysicalMaterial({
          color: c1,
          transmission: 1,
          thickness: 1.2,
          roughness: 0.05,
          ior: 1.5,
          metalness: 0,
          clearcoat: 1,
          emissive: c2,
          emissiveIntensity: 0.25,
        })
      )
      hero.add(knot)
      spin = (t) => {
        knot.rotation.x = t * 0.4
        knot.rotation.y = t * 0.6
      }
    }

    // Interaction
    const mouse = { x: 0, y: 0 }
    const onMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth - 0.5) * 2
      mouse.y = (e.clientY / window.innerHeight - 0.5) * 2
    }
    const onResize = () => {
      camera.aspect = el.clientWidth / el.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(el.clientWidth, el.clientHeight)
    }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('resize', onResize)

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const clock = new THREE.Clock()
    let raf = 0
    const loop = () => {
      const t = reduce ? 0 : clock.getElapsedTime()
      const scroll = window.scrollY
      hero.position.x += ((wide() ? 3.2 : 0) - hero.position.x) * 0.05
      hero.position.y = -scroll * 0.003
      spin(t)
      points.rotation.y = t * 0.02 + scroll * 0.0004
      camera.position.x += (mouse.x * 0.8 - camera.position.x) * 0.04
      camera.position.y += (1.5 - mouse.y * 0.6 - camera.position.y) * 0.04
      camera.lookAt(0, 0, 0)
      renderer.render(scene, camera)
      raf = requestAnimationFrame(loop)
    }
    loop()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('resize', onResize)
      scene.traverse((o) => {
        const m = o as THREE.Mesh
        m.geometry?.dispose()
        const mat = m.material as THREE.Material | THREE.Material[] | undefined
        if (Array.isArray(mat)) mat.forEach((x) => x.dispose())
        else mat?.dispose()
      })
      renderer.dispose()
      el.removeChild(renderer.domElement)
    }
  }, [variant])

  return <div ref={mountRef} className="pointer-events-none fixed inset-0 z-0" aria-hidden />
}