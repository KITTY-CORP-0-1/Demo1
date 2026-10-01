import React, { useEffect, Suspense, lazy } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import useStore from './stores/useStore'
import Loader from './components/Loader'
import Cursor from './components/Cursor'
import HUD from './components/HUD'
import ChapterNav from './components/ChapterNav'
import { CHAPTERS } from './utils/constants'

gsap.registerPlugin(ScrollTrigger)

/* ── Lazy-load Scene and all Chapter overlays ─────── */
const Scene = lazy(() => import('./components/Scene'))
const Chapter1Boot = lazy(() => import('./components/chapters/Chapter1Boot'))
const Chapter2Problem = lazy(() => import('./components/chapters/Chapter2Problem'))
const Chapter3Perception = lazy(() => import('./components/chapters/Chapter3Perception'))
const Chapter4Sensors = lazy(() => import('./components/chapters/Chapter4Sensors'))
const Chapter5Decision = lazy(() => import('./components/chapters/Chapter5Decision'))
const Chapter6Simulation = lazy(() => import('./components/chapters/Chapter6Simulation'))
const Chapter7Sentinel = lazy(() => import('./components/chapters/Chapter7Sentinel'))
const Chapter8UseCases = lazy(() => import('./components/chapters/Chapter8UseCases'))
const Chapter9TechStack = lazy(() => import('./components/chapters/Chapter9TechStack'))
const Chapter10Performance = lazy(() => import('./components/chapters/Chapter10Performance'))
const Chapter11Team = lazy(() => import('./components/chapters/Chapter11Team'))
const Chapter12Finale = lazy(() => import('./components/chapters/Chapter12Finale'))

const CHAPTER_COMPONENTS = [
  Chapter1Boot, Chapter2Problem, Chapter3Perception, Chapter4Sensors,
  Chapter5Decision, Chapter6Simulation, Chapter7Sentinel, Chapter8UseCases,
  Chapter9TechStack, Chapter10Performance, Chapter11Team, Chapter12Finale,
]

export default function App() {
  const setLoaded = useStore((s) => s.setLoaded)
  const setLoadProgress = useStore((s) => s.setLoadProgress)
  const setCursorPos = useStore((s) => s.setCursorPos)
  const setMouseNorm = useStore((s) => s.setMouseNorm)

  /* ── Loading simulation ───────────────────────── */
  useEffect(() => {
    let progress = 0
    const interval = setInterval(() => {
      progress += Math.random() * 5
      if (progress >= 100) {
        progress = 100
        setLoadProgress(progress)
        clearInterval(interval)
        setTimeout(() => setLoaded(), 600)
      } else {
        setLoadProgress(progress)
      }
    }, 80)
    return () => clearInterval(interval)
  }, [setLoadProgress, setLoaded])

  /* ── Lenis smooth scroll + GSAP ScrollTrigger ── */
  useEffect(() => {
    const lenis = new Lenis({ autoRaf: true, lerp: 0.1 })

    lenis.on('scroll', (e) => {
      useStore.setState({ scrollProgress: e.progress })
      ScrollTrigger.update()
    })

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
    }
  }, [])

  /* ── Mouse tracking ────────────────────────────── */
  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY })
      setMouseNorm({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [setCursorPos, setMouseNorm])

  /* ── Mobile & reduced-motion detection ─────────── */
  useEffect(() => {
    const checkMobile = () => {
      useStore.setState({ isMobile: window.innerWidth < 768 })
    }
    const checkMotion = () => {
      useStore.setState({
        reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
      })
    }
    checkMobile()
    checkMotion()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <div className="bg-[#05070d] text-white min-h-screen font-body selection:bg-cyan-500/30">
      <Loader />
      <Cursor />

      {/* Fixed 3D Canvas */}
      <div className="canvas-container">
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </div>

      <HUD />
      <ChapterNav />

      {/* Scrollable chapter stack */}
      <main className="relative z-10">
        {CHAPTERS.map((chapter, index) => {
          const ChapterComponent = CHAPTER_COMPONENTS[index]
          const isExtended = ['simulation'].includes(chapter.id)

          return (
            <section
              key={chapter.id}
              id={chapter.id}
              className="relative w-full"
              style={{ minHeight: isExtended ? '200vh' : '100vh' }}
            >
              <Suspense fallback={<div className="w-full h-full" />}>
                {ChapterComponent && <ChapterComponent />}
              </Suspense>
            </section>
          )
        })}
      </main>
    </div>
  )
}
