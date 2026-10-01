import React, { useRef, useMemo, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import useStore from '../stores/useStore'

/* ── Eye color map by robot state ───────────────── */
const EYE_COLORS = {
  idle:     '#ffb347',
  scanning: '#00e5ff',
  tracking: '#ffb347',
  alert:    '#ff2d7b',
  reached:  '#00ff88',
}

/* ── Procedural low-poly robotic cat ────────────── */
const ProceduralRobot = React.memo(function ProceduralRobot() {
  const group = useRef()
  const head = useRef()
  const eyeL = useRef()
  const eyeR = useRef()
  const eyeGroup = useRef()
  const tailSegs = useRef([])
  const earL = useRef()
  const earR = useRef()
  const torso = useRef()
  const legRefs = useRef([])

  const robotState = useStore((s) => s.robotState)
  const wakeRobot = useStore((s) => s.wakeRobot)
  const setCursorOnTarget = useStore((s) => s.setCursorOnTarget)
  const mouseNorm = useStore((s) => s.mouseNorm)
  const robotAwake = useStore((s) => s.robotAwake)

  const [blinkTimer, setBlinkTimer] = useState(0)

  /* ── Shared materials ─────────────────────────── */
  const materials = useMemo(() => ({
    body:    new THREE.MeshStandardMaterial({ color: '#1a1e2e', metalness: 0.9, roughness: 0.3 }),
    accent:  new THREE.MeshStandardMaterial({ color: '#2a2e3e', metalness: 0.8, roughness: 0.4 }),
    trim:    new THREE.MeshStandardMaterial({ color: '#00e5ff', emissive: '#00e5ff', emissiveIntensity: 0.6, metalness: 0.5, roughness: 0.2 }),
    eyeMat:  new THREE.MeshStandardMaterial({ color: '#ffb347', emissive: '#ffb347', emissiveIntensity: 2.5, toneMapped: false }),
    visor:   new THREE.MeshStandardMaterial({ color: '#0a0e1a', metalness: 0.95, roughness: 0.1, transparent: true, opacity: 0.85 }),
  }), [])

  /* ── Shared geometries ────────────────────────── */
  const geos = useMemo(() => ({
    torso:     new THREE.BoxGeometry(0.9, 0.55, 1.5),
    head:      new THREE.BoxGeometry(0.55, 0.45, 0.55),
    eye:       new THREE.SphereGeometry(0.07, 16, 16),
    ear:       new THREE.ConeGeometry(0.12, 0.28, 4),
    sensorPod: new THREE.SphereGeometry(0.035, 8, 8),
    visor:     new THREE.PlaneGeometry(0.48, 0.22),
    legUpper:  new THREE.CylinderGeometry(0.07, 0.055, 0.28),
    legLower:  new THREE.BoxGeometry(0.09, 0.28, 0.09),
    foot:      new THREE.BoxGeometry(0.12, 0.06, 0.14),
    tailSeg:   new THREE.CylinderGeometry(0.04, 0.03, 0.16),
    trimStrip: new THREE.BoxGeometry(0.92, 0.02, 0.02),
  }), [])

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime()

    /* ── Breathing ───────────────────────────────── */
    if (torso.current) {
      torso.current.scale.y = 1 + Math.sin(t * 1.8) * 0.03
      torso.current.position.y = Math.sin(t * 1.8) * 0.008
    }

    /* ── Tail sway (spring-like wave propagation) ─ */
    tailSegs.current.forEach((seg, i) => {
      if (seg) {
        const phase = t * 3 - i * 0.4
        seg.rotation.z = Math.sin(phase) * (0.15 + i * 0.08)
        seg.rotation.x = Math.cos(phase * 0.5) * 0.05
      }
    })

    /* ── Eye blinking ────────────────────────────── */
    if (eyeGroup.current) {
      const shouldBlink = Math.sin(t * 0.7) > 0.97 || Math.sin(t * 1.3 + 2) > 0.98
      const targetScaleY = shouldBlink ? 0.05 : 1
      eyeGroup.current.scale.y = THREE.MathUtils.lerp(eyeGroup.current.scale.y, targetScaleY, shouldBlink ? 0.5 : 0.15)
    }

    /* ── Eye color update ────────────────────────── */
    const targetColor = EYE_COLORS[robotState] || '#00e5ff'
    materials.eyeMat.color.lerp(new THREE.Color(targetColor), 0.1)
    materials.eyeMat.emissive.lerp(new THREE.Color(targetColor), 0.1)

    /* ── Head follows cursor ─────────────────────── */
    if (head.current) {
      const mx = mouseNorm?.x || 0
      const my = mouseNorm?.y || 0
      const isTracking = robotState === 'tracking' || robotState === 'alert'
      const followStrength = isTracking ? 0.7 : 0.3
      head.current.rotation.y = THREE.MathUtils.lerp(head.current.rotation.y, mx * followStrength, 0.06)
      head.current.rotation.x = THREE.MathUtils.lerp(head.current.rotation.x, -my * 0.2, 0.06)

      // Idle scanning when not tracking cursor
      if (robotState === 'scanning') {
        head.current.rotation.y += Math.sin(t * 0.8) * 0.3
      }
    }

    /* ── Ear twitches ────────────────────────────── */
    if (earL.current && earR.current) {
      const twitch = Math.random() > 0.995
      if (twitch) {
        earL.current.rotation.z = (Math.random() - 0.5) * 0.4
        earR.current.rotation.z = (Math.random() - 0.5) * 0.4
      } else {
        earL.current.rotation.z = THREE.MathUtils.lerp(earL.current.rotation.z, robotState === 'alert' ? -0.2 : 0, 0.05)
        earR.current.rotation.z = THREE.MathUtils.lerp(earR.current.rotation.z, robotState === 'alert' ? 0.2 : 0, 0.05)
      }
    }

    /* ── Subtle leg idle animation ────────────────── */
    legRefs.current.forEach((leg, i) => {
      if (leg) {
        leg.rotation.x = Math.sin(t * 1.5 + i * Math.PI * 0.5) * 0.03
      }
    })
  })

  const LEG_POSITIONS = [
    [-0.35, -0.28, 0.5],   // front-left
    [0.35, -0.28, 0.5],    // front-right
    [-0.35, -0.28, -0.5],  // back-left
    [0.35, -0.28, -0.5],   // back-right
  ]

  return (
    <group
      ref={group}
      position={[0, 0.65, 0]}
      onClick={(e) => { e.stopPropagation(); wakeRobot() }}
      onPointerOver={(e) => { e.stopPropagation(); setCursorOnTarget(true) }}
      onPointerOut={() => setCursorOnTarget(false)}
    >
      {/* ── Torso ────────────────────────────────── */}
      <mesh ref={torso} castShadow receiveShadow geometry={geos.torso} material={materials.body} />
      
      {/* Trim lines on torso */}
      <mesh position={[0, 0.28, 0]} geometry={geos.trimStrip} material={materials.trim} />
      <mesh position={[0, -0.28, 0]} geometry={geos.trimStrip} material={materials.trim} />

      {/* ── Head ─────────────────────────────────── */}
      <group ref={head} position={[0, 0.35, 0.85]}>
        <mesh castShadow geometry={geos.head} material={materials.body} />
        
        {/* Visor panel */}
        <mesh position={[0, -0.02, 0.281]} geometry={geos.visor} material={materials.visor} />
        
        {/* Eyes */}
        <group ref={eyeGroup} position={[0, 0.02, 0.29]}>
          <mesh ref={eyeL} position={[-0.12, 0, 0]} geometry={geos.eye} material={materials.eyeMat} />
          <mesh ref={eyeR} position={[0.12, 0, 0]}  geometry={geos.eye} material={materials.eyeMat} />
        </group>

        {/* Ears with sensor pods */}
        <group>
          <mesh ref={earL} position={[-0.22, 0.35, 0]} geometry={geos.ear} material={materials.body} />
          <mesh ref={earR} position={[0.22, 0.35, 0]}  geometry={geos.ear} material={materials.body} />
          {/* Sensor pods on ear tips */}
          <mesh position={[-0.22, 0.52, 0]} geometry={geos.sensorPod} material={materials.trim} />
          <mesh position={[0.22, 0.52, 0]}  geometry={geos.sensorPod} material={materials.trim} />
        </group>
      </group>

      {/* ── Legs (4 articulated) ──────────────────── */}
      {LEG_POSITIONS.map((pos, i) => (
        <group key={i} ref={(el) => (legRefs.current[i] = el)} position={pos}>
          {/* Upper leg */}
          <mesh castShadow position={[0, -0.14, 0]} geometry={geos.legUpper} material={materials.accent} />
          {/* Lower leg */}
          <mesh castShadow position={[0, -0.42, 0]} geometry={geos.legLower} material={materials.body} />
          {/* Foot */}
          <mesh castShadow position={[0, -0.59, 0.01]} geometry={geos.foot} material={materials.accent} />
          {/* Knee accent */}
          <mesh position={[0, -0.28, 0.05]}>
            <sphereGeometry args={[0.03, 8, 8]} />
            <meshStandardMaterial color="#00e5ff" emissive="#00e5ff" emissiveIntensity={0.4} />
          </mesh>
        </group>
      ))}

      {/* ── Segmented Tail ────────────────────────── */}
      <group position={[0, 0.15, -0.75]}>
        {[0, 1, 2, 3, 4].map((i) => (
          <group key={i} ref={(el) => (tailSegs.current[i] = el)} position={[0, 0.05 * i, -0.16 * i]}>
            <mesh geometry={geos.tailSeg} material={i === 4 ? materials.trim : materials.body} rotation={[Math.PI / 2, 0, 0]} />
          </group>
        ))}
      </group>

      {/* ── Point light for eye glow ──────────────── */}
      <pointLight position={[0, 0.37, 1.15]} intensity={1} distance={2} color={EYE_COLORS[robotState] || '#ffb347'} />
    </group>
  )
})

export default ProceduralRobot
