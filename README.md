# B.B. Worlds: A Multi-World 3D Portfolio

An interactive portfolio built with **Next.js 15**, **Three.js**, **Tailwind CSS** and **Framer Motion**. It has three themed "worlds", each with its own live 3D scene, color palette and content. A sticky navbar switches between them.

> Live demo: _add your deployed link here_
> Repository: _add your GitHub link here_

![Preview](./docs/preview.png)
<!-- Add a screenshot or GIF at docs/preview.png -->

---

## Overview

Most portfolios are static pages. This project explores what happens when the background is a real-time 3D scene and the content scrolls over it. Each page has a distinct visual identity, but all three share one reusable component system, so adding a fourth world takes minutes.

| Route | World | Theme | 3D scene |
|---|---|---|---|
| `/` | Minecraft & 3D | Emerald green + purple | Floating voxel terrain with a spinning crystal |
| `/gym` | Gym & Power | Dark red + orange | Spinning metallic dumbbell |
| `/clothing` | Streetwear | Deep purple + neon pink | Spinning glass torus knot |

## Features

- **Fixed 3D canvas with scrolling content:** the WebGL scene stays at `z-0` while long, rich pages scroll above it at `z-10`.
- **Scroll and mouse reactions:** the camera follows the cursor, and the 3D object drifts as you scroll.
- **Six sections per page:** animated hero, live stat counters, a six-card showcase, a tech-badge section and a full footer.
- **Glassmorphism UI:** translucent, blurred cards and badges that let the 3D scene show through.
- **Animated navigation:** a shared navbar with a sliding active-tab indicator (Framer Motion `layoutId`).
- **Data-driven pages:** every page is a theme object plus a content object passed to one `PageShell` component.
- **Responsive:** the 3D object moves behind the text on small screens, and grids collapse from four columns to one.
- **Accessible motion:** respects `prefers-reduced-motion`.
- **Clean resource handling:** geometries, materials and the renderer are disposed when you leave a page, so navigating between worlds does not leak GPU memory.

## Tech Stack

| Area | Tools |
|---|---|
| Framework | Next.js 15 (App Router), React, TypeScript |
| 3D graphics | Three.js (WebGL): instanced meshes, physical materials, point lights, particles |
| Styling | Tailwind CSS |
| Animation | Framer Motion |
| Icons | Lucide React |

## Project Structure

```
.
├── app/
│   ├── layout.tsx          # Root layout + shared navbar
│   ├── page.tsx            # "/"         Minecraft & 3D world
│   ├── gym/page.tsx        # "/gym"      Gym & Power world
│   └── clothing/page.tsx   # "/clothing" Streetwear world
└── components/
    ├── Scene.tsx           # Three.js canvas, one variant per world
    ├── PageShell.tsx       # Hero, stats, cards, tech badges, footer
    └── Navbar.tsx          # Sticky navigation with animated pill
```

## Getting Started

**Requirements:** Node.js 18.18 or newer.

```bash
# 1. Clone the repository
git clone <your-repo-url>
cd <project-folder>

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

If you are starting from a fresh Next.js project, install the extra packages first:

```bash
npm i three framer-motion lucide-react
npm i -D @types/three
```

Make sure `tailwind.config` includes `./components/**/*.{ts,tsx}` in its `content` paths, so the theme classes are generated.

### Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm run start` | Run the production build |
| `npm run lint` | Lint the code |

## Customizing

**Change the content:** open a page file (for example `app/gym/page.tsx`) and edit the `content` object: title, stats, cards, tags and footer text.

**Change the colors:** edit the `theme` object in the same file, and the matching hex colors in `PALETTE` inside `components/Scene.tsx`.

**Add a new world:**
1. Add a new variant to `Variant` and `PALETTE` in `Scene.tsx`, and build its 3D object.
2. Create `app/<name>/page.tsx` with a `theme` and `content` object.
3. Add the route to the `NAV` array in `Navbar.tsx`.

## What I Learned

- Running a Three.js render loop inside React, including cleanup in `useEffect`.
- Layering scrolling HTML over a fixed WebGL canvas without blocking scrolling.
- Using `InstancedMesh` to draw hundreds of voxel blocks in a single draw call.
- Designing one reusable, data-driven component system for several visual themes.
- Respecting accessibility preferences such as reduced motion.

## Roadmap

- [ ] Smooth cross-fade transition of the 3D scene between routes
- [ ] Real project links and images in the showcase cards
- [ ] Contact form
- [ ] Performance mode for low-power devices

## Author

**Bektemur Bektemirov** (B.B.): Full-Stack Developer working with HTML, CSS, JavaScript, React/Next.js and Django.

- GitHub: _add your link_
- LinkedIn: _add your link_
- Email: _add your email_

## License

Released under the MIT License. See `LICENSE` for details.
