import React, { useRef, useEffect, useState } from 'react'
import useStore from '../../stores/useStore'

export default function Chapter6Simulation() {
  const canvasRef = useRef(null)

  // Local state for simulation
  const [robotPos, setRobotPos] = useState({ x: 50, y: 50, angle: 0 })
  const [goal, setGoal] = useState({ x: 500, y: 300 })
  const [obstacles, setObstacles] = useState([])
  const [mode, setMode] = useState('goal') // 'goal' | 'obstacle'

  // Store bindings
  const showVision = useStore((s) => s.simShowVision)
  const showPath = useStore((s) => s.simShowPath)
  const showSensors = useStore((s) => s.simShowSensors)
  const chaosMode = useStore((s) => s.simChaosMode)
  const toggleSimVision = useStore((s) => s.toggleSimVision)
  const toggleSimPath = useStore((s) => s.toggleSimPath)
  const toggleSimSensors = useStore((s) => s.toggleSimSensors)
  const toggleChaosMode = useStore((s) => s.toggleChaosMode)

  const [stats, setStats] = useState({ speed: '0.0', dist: '0.0', state: 'IDLE', obstacles: 0 })

  // Math helpers
  const distFn = (p1, p2) => Math.hypot(p1.x - p2.x, p1.y - p2.y)

  // Simulation loop
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animationId
    let lastTime = performance.now()

    // Mutable state for the animation loop
    let rX = 50, rY = 50, rAngle = 0
    let gX = goal.x, gY = goal.y
    let obs = obstacles.map((o) => ({ ...o }))
    let frameCount = 0

    const maxSpeed = 150
    const turnSpeed = Math.PI

    const loop = (time) => {
      const dt = Math.min((time - lastTime) / 1000, 0.05)
      lastTime = time
      frameCount++

      // -- Update goal/obstacles from React state (read via closure) --
      gX = goal.x
      gY = goal.y
      obs = obstacles.map((o) => ({ ...o }))

      // -- Robot movement --
      const dToGoal = Math.hypot(gX - rX, gY - rY)
      let targetAngle = Math.atan2(gY - rY, gX - rX)
      let moveSpeed = 0
      let currentState = 'IDLE'

      if (dToGoal > 8) {
        currentState = 'NAVIGATING'
        // Obstacle avoidance via repulsion vectors
        let avX = 0, avY = 0
        let avoiding = false

        obs.forEach((o) => {
          const d = Math.hypot(o.x - rX, o.y - rY)
          if (d < 90) {
            avoiding = true
            const strength = (90 - d) / 90
            avX -= (o.x - rX) * strength * 2
            avY -= (o.y - rY) * strength * 2
          }
        })

        if (avoiding) {
          currentState = 'AVOIDING'
          targetAngle = Math.atan2((gY - rY) * 0.4 + avY, (gX - rX) * 0.4 + avX)
        }

        // Steer toward target angle
        let diff = targetAngle - rAngle
        while (diff <= -Math.PI) diff += Math.PI * 2
        while (diff > Math.PI) diff -= Math.PI * 2

        const turnStep = turnSpeed * dt
        if (Math.abs(diff) < turnStep) {
          rAngle = targetAngle
        } else {
          rAngle += Math.sign(diff) * turnStep
        }

        // Move forward when roughly aligned
        if (Math.abs(diff) < Math.PI / 3) {
          moveSpeed = maxSpeed
          rX += Math.cos(rAngle) * moveSpeed * dt
          rY += Math.sin(rAngle) * moveSpeed * dt
        }
      } else {
        currentState = 'REACHED'
      }

      // Chaos mode: drift obstacles
      if (chaosMode) {
        obs = obs.map((o) => ({
          ...o,
          x: o.x + Math.sin(time / 800 + o.id) * 30 * dt,
          y: o.y + Math.cos(time / 800 + o.id) * 30 * dt,
        }))
      }

      // -- Draw --
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Grid
      ctx.strokeStyle = '#1a1e2e'
      ctx.lineWidth = 1
      for (let i = 0; i < canvas.width; i += 40) {
        ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, canvas.height); ctx.stroke()
      }
      for (let i = 0; i < canvas.height; i += 40) {
        ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(canvas.width, i); ctx.stroke()
      }

      // Obstacles
      obs.forEach((o) => {
        ctx.fillStyle = 'rgba(255, 45, 123, 0.3)'
        ctx.fillRect(o.x - 20, o.y - 20, 40, 40)
        ctx.strokeStyle = '#ff2d7b'
        ctx.lineWidth = 1.5
        ctx.strokeRect(o.x - 20, o.y - 20, 40, 40)
      })

      // Goal (pulsing amber circle)
      const goalPulse = 10 + Math.sin(time / 200) * 3
      ctx.beginPath()
      ctx.arc(gX, gY, goalPulse, 0, Math.PI * 2)
      ctx.fillStyle = 'rgba(255, 179, 71, 0.3)'
      ctx.fill()
      ctx.strokeStyle = '#ffb347'
      ctx.lineWidth = 2
      ctx.stroke()
      // Inner dot
      ctx.beginPath()
      ctx.arc(gX, gY, 4, 0, Math.PI * 2)
      ctx.fillStyle = '#ffb347'
      ctx.fill()

      // Path line
      if (showPath && dToGoal > 8) {
        ctx.beginPath()
        ctx.moveTo(rX, rY)
        ctx.lineTo(gX, gY)
        ctx.strokeStyle = 'rgba(0, 229, 255, 0.25)'
        ctx.lineWidth = 1
        ctx.setLineDash([6, 4])
        ctx.stroke()
        ctx.setLineDash([])
      }

      // Vision cone
      if (showVision) {
        ctx.beginPath()
        ctx.moveTo(rX, rY)
        ctx.arc(rX, rY, 150, rAngle - 0.5, rAngle + 0.5)
        ctx.lineTo(rX, rY)
        const vGrad = ctx.createRadialGradient(rX, rY, 0, rX, rY, 150)
        vGrad.addColorStop(0, 'rgba(0, 229, 255, 0.15)')
        vGrad.addColorStop(1, 'rgba(0, 229, 255, 0)')
        ctx.fillStyle = vGrad
        ctx.fill()
        ctx.strokeStyle = 'rgba(0, 229, 255, 0.2)'
        ctx.lineWidth = 1
        ctx.stroke()
      }

      // Sensor radius
      if (showSensors) {
        ctx.beginPath()
        ctx.arc(rX, rY, 90, 0, Math.PI * 2)
        ctx.strokeStyle = 'rgba(0, 255, 136, 0.15)'
        ctx.lineWidth = 1
        ctx.setLineDash([3, 3])
        ctx.stroke()
        ctx.setLineDash([])
      }

      // Robot (triangle arrow)
      ctx.save()
      ctx.translate(rX, rY)
      ctx.rotate(rAngle)
      ctx.beginPath()
      ctx.moveTo(16, 0)
      ctx.lineTo(-10, -9)
      ctx.lineTo(-6, 0)
      ctx.lineTo(-10, 9)
      ctx.closePath()
      ctx.fillStyle = currentState === 'AVOIDING' ? '#ff2d7b' : currentState === 'REACHED' ? '#00ff88' : '#00e5ff'
      ctx.shadowBlur = 12
      ctx.shadowColor = ctx.fillStyle
      ctx.fill()
      ctx.shadowBlur = 0
      ctx.restore()

      // Update stats every ~10 frames
      if (frameCount % 10 === 0) {
        setStats({
          speed: moveSpeed > 0 ? (moveSpeed / 50).toFixed(1) : '0.0',
          dist: (dToGoal / 50).toFixed(1),
          state: currentState,
          obstacles: obs.length,
        })
      }

      animationId = requestAnimationFrame(loop)
    }

    animationId = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(animationId)
  }, [goal, obstacles, showVision, showPath, showSensors, chaosMode])

  const handleCanvasClick = (e) => {
    const rect = canvasRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) * (canvasRef.current.width / rect.width)
    const y = (e.clientY - rect.top) * (canvasRef.current.height / rect.height)

    if (mode === 'goal') {
      setGoal({ x, y })
    } else {
      setObstacles((prev) => [...prev, { id: Date.now(), x, y }])
    }
  }

  const spawnChaosObstacles = () => {
    const newObs = Array.from({ length: 5 }, (_, i) => ({
      id: Date.now() + i,
      x: 100 + Math.random() * 600,
      y: 50 + Math.random() * 300,
    }))
    setObstacles((prev) => [...prev, ...newObs])
    if (!chaosMode) toggleChaosMode()
  }

  return (
    <div className="relative w-full min-h-[100vh] flex flex-col items-center justify-center z-10 pointer-events-none px-4 py-20">
      <div className="w-full max-w-4xl bg-[#05070d]/90 border border-[#1a1e2e] p-4 md:p-6 pointer-events-auto shadow-2xl flex flex-col gap-4 relative">
        {/* HUD Corners */}
        <div className="absolute top-0 left-0 w-5 h-5 border-t border-l border-[#00e5ff] opacity-60" />
        <div className="absolute top-0 right-0 w-5 h-5 border-t border-r border-[#00e5ff] opacity-60" />
        <div className="absolute bottom-0 left-0 w-5 h-5 border-b border-l border-[#00e5ff] opacity-60" />
        <div className="absolute bottom-0 right-0 w-5 h-5 border-b border-r border-[#00e5ff] opacity-60" />

        {/* Header bar */}
        <div className="flex flex-wrap justify-between items-center gap-2 px-1">
          <h2 className="font-display text-[#00e5ff] text-base md:text-lg tracking-wider">
            NAVIGATION DEMO
          </h2>
          <div className="font-mono text-[10px] md:text-xs text-[#7a8ba8] flex gap-3 md:gap-5">
            <span>STATE: <span className={stats.state === 'REACHED' ? 'text-[#00ff88]' : stats.state === 'AVOIDING' ? 'text-[#ff2d7b]' : 'text-[#00e5ff]'}>{stats.state}</span></span>
            <span>SPD: {stats.speed} m/s</span>
            <span>DST: {stats.dist}m</span>
            <span>OBS: {stats.obstacles}</span>
          </div>
        </div>

        {/* Canvas arena */}
        <div className="w-full bg-[#080c14] border border-[#1a1e2e] relative overflow-hidden rounded-sm cursor-crosshair">
          <canvas
            ref={canvasRef}
            width={800}
            height={400}
            className="w-full h-auto block"
            onClick={handleCanvasClick}
          />
          {/* Mode indicator */}
          <div className="absolute top-2 left-2 font-mono text-[10px] text-[#7a8ba8] bg-black/50 px-2 py-0.5 rounded">
            MODE: {mode === 'goal' ? '🎯 SET GOAL' : '🧱 PLACE OBSTACLE'} — click arena
          </div>
        </div>

        {/* Control panel */}
        <div className="flex flex-wrap gap-2 md:gap-3 justify-between">
          {/* Mode controls */}
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setMode('goal')}
              className={`font-mono text-[10px] md:text-xs px-3 py-1.5 border transition-all ${mode === 'goal' ? 'bg-[#ffb347]/15 border-[#ffb347] text-[#ffb347]' : 'border-[#2a2e3e] text-[#7a8ba8] hover:border-[#ffb347]/50'}`}
            >
              🎯 SET GOAL
            </button>
            <button
              onClick={() => setMode('obstacle')}
              className={`font-mono text-[10px] md:text-xs px-3 py-1.5 border transition-all ${mode === 'obstacle' ? 'bg-[#ff2d7b]/15 border-[#ff2d7b] text-[#ff2d7b]' : 'border-[#2a2e3e] text-[#7a8ba8] hover:border-[#ff2d7b]/50'}`}
            >
              🧱 ADD OBSTACLE
            </button>
            <button
              onClick={() => setObstacles([])}
              className="font-mono text-[10px] md:text-xs px-3 py-1.5 border border-[#2a2e3e] text-[#7a8ba8] hover:text-white hover:border-[#7a8ba8] transition-all"
            >
              ✕ CLEAR
            </button>
          </div>

          {/* View toggles */}
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={toggleSimVision}
              className={`font-mono text-[10px] md:text-xs px-3 py-1.5 border transition-all ${showVision ? 'bg-[#00e5ff]/15 border-[#00e5ff] text-[#00e5ff]' : 'border-[#2a2e3e] text-[#7a8ba8]'}`}
            >
              👁 VISION
            </button>
            <button
              onClick={toggleSimPath}
              className={`font-mono text-[10px] md:text-xs px-3 py-1.5 border transition-all ${showPath ? 'bg-[#00e5ff]/15 border-[#00e5ff] text-[#00e5ff]' : 'border-[#2a2e3e] text-[#7a8ba8]'}`}
            >
              📐 PATH
            </button>
            <button
              onClick={toggleSimSensors}
              className={`font-mono text-[10px] md:text-xs px-3 py-1.5 border transition-all ${showSensors ? 'bg-[#00ff88]/15 border-[#00ff88] text-[#00ff88]' : 'border-[#2a2e3e] text-[#7a8ba8]'}`}
            >
              📡 SENSORS
            </button>
            <button
              onClick={spawnChaosObstacles}
              className={`font-mono text-[10px] md:text-xs px-3 py-1.5 border transition-all ${chaosMode ? 'bg-red-500/20 border-red-500 text-red-400 animate-pulse' : 'border-[#2a2e3e] text-[#7a8ba8] hover:border-red-500/50 hover:text-red-400'}`}
            >
              💥 CHAOS MODE
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
