# 🐱 KITTY SENTINEL — AI-Vision Autonomous Robot

> **Eyes that think. Paws that decide.**

A cinematic, scroll-driven, interactive 3D website showcasing **KITTY SENTINEL** — an AI-vision autonomous robot shaped like a sleek robotic cat. Built for **Hack in Hills '26 — Problem 01: Vision-Based Autonomous Robot**.

![KITTY SENTINEL](https://img.shields.io/badge/Hack_in_Hills-'26-00e5ff?style=for-the-badge&logo=robot&logoColor=white)

---

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## 🏗️ Tech Stack

| Layer | Technologies |
|-------|-------------|
| **Framework** | React 19 + Vite |
| **3D Engine** | Three.js via React Three Fiber + drei |
| **Post-processing** | Bloom, Vignette, Chromatic Aberration, Film Grain |
| **Scroll** | GSAP ScrollTrigger + Lenis smooth scroll |
| **State** | Zustand |
| **Animations** | Framer Motion (UI) + useFrame (3D) |
| **Styling** | Tailwind CSS v4 |
| **Typography** | Orbitron · Inter · JetBrains Mono |

---

## 📁 Project Structure

```
kitty-sentinel/
├── public/
│   └── models/
│       └── kitty.glb          ← DROP YOUR GLB MODEL HERE
├── src/
│   ├── main.jsx               — Entry point
│   ├── App.jsx                — Main orchestrator (Lenis, GSAP, lazy loading)
│   ├── index.css              — Global styles, HUD utilities, CSS animations
│   ├── components/
│   │   ├── Scene.jsx          — R3F Canvas + post-processing
│   │   ├── Robot.jsx          — Procedural robotic cat (or GLB)
│   │   ├── Environment.jsx    — Ground, particles, light shafts, fog
│   │   ├── CameraRig.jsx      — Scroll-driven cinematic camera
│   │   ├── HUD.jsx            — Floating mini-HUD overlay
│   │   ├── Cursor.jsx         — Custom cyan reticle cursor
│   │   ├── Loader.jsx         — Boot sequence loading screen
│   │   ├── ChapterNav.jsx     — Side navigation dots
│   │   └── chapters/
│   │       ├── Chapter1Boot.jsx        — System boot sequence
│   │       ├── Chapter2Problem.jsx     — Problem statement
│   │       ├── Chapter3Perception.jsx  — Vision AI demo
│   │       ├── Chapter4Sensors.jsx     — Sensor fusion exploded view
│   │       ├── Chapter5Decision.jsx    — Decision engine pipeline
│   │       ├── Chapter6Simulation.jsx  — Interactive navigation demo
│   │       ├── Chapter7Sentinel.jsx    — Night patrol mode
│   │       ├── Chapter8UseCases.jsx    — Real-world applications
│   │       ├── Chapter9TechStack.jsx   — Architecture layers
│   │       ├── Chapter10Performance.jsx— Metrics & demo video
│   │       ├── Chapter11Team.jsx       — Team & roadmap
│   │       └── Chapter12Finale.jsx     — CTA finale
│   ├── stores/
│   │   └── useStore.js        — Zustand global state
│   └── utils/
│       ├── constants.js       — All data: chapters, colors, sensors, tech, team
│       └── helpers.js         — Math, materials, utilities
├── index.html
├── vite.config.js
└── package.json
```

---

## 🎨 Visual Identity

| Element | Value |
|---------|-------|
| **Background** | `#05070d` (near-black navy) |
| **Primary Accent** | `#00e5ff` (electric cyan — vision/AI) |
| **Eyes / Alert** | `#ffb347` (warm amber) |
| **Danger / Obstacle** | `#ff2d7b` (magenta) |
| **Success / Reached** | `#00ff88` (green) |
| **Display Font** | Orbitron / Space Grotesk |
| **Body Font** | Inter |
| **HUD / Data Font** | JetBrains Mono |

---

## 🐾 Swapping in Your Real GLB Model

1. Export your robot as a `.glb` file
2. Place it at: `public/models/kitty.glb`
3. The robot component currently renders a procedural low-poly cat. To use your GLB:

```jsx
// In src/components/Robot.jsx, replace ProceduralRobot with:
import { useGLTF } from '@react-three/drei'

function GlbRobot() {
  const { scene } = useGLTF('/models/kitty.glb')
  return <primitive object={scene} scale={1.2} />
}
```

---

## 📊 Customizing Content

### Replace Metrics (Real Numbers)
Edit `src/utils/constants.js` → `METRICS` array:
```js
export const METRICS = [
  { label: 'Detection Latency', value: 45,  unit: 'ms',  note: 'YOLOv8 on Jetson Nano' },
  { label: 'Inference FPS',     value: 30,  unit: 'fps', note: 'Real-time @ 640×480' },
  // ...
]
```

### Add Team Members
Edit `TEAM_MEMBERS` in constants:
```js
export const TEAM_MEMBERS = [
  { name: 'Alice', role: 'Vision AI Lead', avatar: '🧠' },
  // ...
]
```

### Embed Demo Video
In `Chapter10Performance.jsx`, replace the video placeholder with:
```jsx
<iframe src="https://youtube.com/embed/YOUR_VIDEO_ID" ... />
```

### Add Detection Screenshots
Place screenshots in `public/` and reference them in `Chapter3Perception.jsx`.

---

## 📱 Scroll-Driven Chapters

| # | Chapter | Camera | Interactive Elements |
|---|---------|--------|---------------------|
| 1 | **Boot Sequence** | Pull back reveal | Typewriter text, eye ignition |
| 2 | **The Problem** | Orbit shot | 3 challenge cards |
| 3 | **Perception** | Close-up face | Cat-cam, bounding boxes, depth map toggle |
| 4 | **Sensor Fusion** | Exploded view | Hover sensor parts for callouts |
| 5 | **Decision Engine** | Above robot | Animated pipeline flow diagram |
| 6 | **Navigation Demo** | Top-down | Click-to-navigate, add obstacles, chaos mode |
| 7 | **Sentinel Mode** | Side angle | Patrol simulation, intruder detection |
| 8 | **Use Cases** | Wide shot | Horizontal scroll cards with 3D tilt |
| 9 | **Tech Stack** | Front view | Layered architecture diagram |
| 10 | **Performance** | Angled | Animated counters, video slot |
| 11 | **Team & Roadmap** | Side angle | Team cards, timeline |
| 12 | **Finale** | Final reveal | CTA buttons, robot eye glow |

---

## 🤖 Robot States

The robot's eyes and body change color based on state:

| State | Eye Color | Trigger |
|-------|-----------|---------|
| `idle` | 🟠 Amber | Default |
| `scanning` | 🔵 Cyan | Vision chapter |
| `tracking` | 🟠 Amber | Cursor following |
| `alert` | 🔴 Magenta | Obstacle/intruder detected |
| `reached` | 🟢 Green | Goal reached |

---

## ⚡ Performance

- **Target**: 60 FPS on mid-range laptops
- **Instanced meshes** for particles (200 instances)
- **Lazy-loaded** chapter components
- **Adaptive DPR** (device pixel ratio)
- **Post-processing disabled** on mobile
- **`prefers-reduced-motion`** respected with static fallback
- **Semantic HTML** and keyboard-accessible controls

---

## ♿ Accessibility

- Semantic `<section>`, `<main>`, `<nav>` elements
- Keyboard arrow navigation via chapter dots
- `aria-label` on interactive controls
- Sufficient color contrast for all text
- Custom cursor hidden on mobile (native cursor shown)
- Reduced motion mode disables all animations

---

## 📦 Build & Deploy

```bash
# Production build
npm run build

# Output in dist/ — deploy to any static host:
# Vercel, Netlify, GitHub Pages, Firebase Hosting, etc.
```

---

## 🛠️ Development

```bash
# Dev server with hot reload
npm run dev

# The 3D canvas is fixed-position behind scroll content
# Each chapter is a 100vh section (simulation is 200vh)
# Camera interpolates between keyframes based on scroll progress
```

---

## 📜 License

Built with ❤️ for **Hack in Hills '26**

---

*KITTY SENTINEL: Eyes that think. Paws that decide.*
