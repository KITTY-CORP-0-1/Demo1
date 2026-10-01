import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import useStore from '../stores/useStore'
import { CAMERA_KEYFRAMES } from '../utils/constants'

const _v3a = new THREE.Vector3()
const _v3b = new THREE.Vector3()

export default function CameraRig() {
  const { camera } = useThree()
  const scrollProgress = useStore((s) => s.scrollProgress)
  const setCurrentChapter = useStore((s) => s.setCurrentChapter)

  const smoothPos = useRef(new THREE.Vector3(0, 1.5, 6))
  const smoothTarget = useRef(new THREE.Vector3(0, 0.5, 0))

  useFrame((state) => {
    const progress = Math.max(0, Math.min(1, scrollProgress))
    const t = state.clock.getElapsedTime()

    /* ── Determine current chapter ─────────────── */
    const chapter = Math.min(11, Math.floor(progress * 12))
    setCurrentChapter(chapter)

    /* ── Interpolate between keyframes ──────────── */
    const totalFrames = CAMERA_KEYFRAMES.length
    const scaledProgress = progress * (totalFrames - 1)
    const idx = Math.min(Math.floor(scaledProgress), totalFrames - 2)
    const frac = scaledProgress - idx

    const kf1 = CAMERA_KEYFRAMES[idx]
    const kf2 = CAMERA_KEYFRAMES[idx + 1] || kf1

    _v3a.set(...kf1.pos).lerp(_v3b.set(...kf2.pos), frac)
    const targetPos = _v3a.clone()

    _v3a.set(...kf1.target).lerp(_v3b.set(...kf2.target), frac)
    const targetLookAt = _v3a.clone()

    /* ── Smooth interpolation (cinematic lag) ───── */
    smoothPos.current.lerp(targetPos, 0.04)
    smoothTarget.current.lerp(targetLookAt, 0.04)

    /* ── Subtle idle micro-orbit ─────────────────── */
    camera.position.copy(smoothPos.current)
    camera.position.x += Math.sin(t * 0.3) * 0.15
    camera.position.y += Math.cos(t * 0.25) * 0.08

    camera.lookAt(smoothTarget.current)
  })

  return null
}
