import { create } from 'zustand'

const useStore = create((set, get) => ({
  /* ── Loading ────────────────────────────────────── */
  isLoaded: false,
  loadProgress: 0,
  setLoaded: () => set({ isLoaded: true }),
  setLoadProgress: (p) => set({ loadProgress: p }),

  /* ── Scroll & chapters ─────────────────────────── */
  scrollProgress: 0,
  currentChapter: 0,
  setScrollProgress: (p) => set({ scrollProgress: p }),
  setCurrentChapter: (c) => set({ currentChapter: c }),

  /* ── Robot state ────────────────────────────────── */
  robotState: 'idle', // idle | scanning | tracking | alert | reached
  setRobotState: (s) => set({ robotState: s }),
  robotAwake: false,
  wakeRobot: () => set({ robotAwake: true }),

  /* ── Cursor ─────────────────────────────────────── */
  cursorPos: { x: 0, y: 0 },
  cursorOnTarget: false,
  setCursorPos: (pos) => set({ cursorPos: pos }),
  setCursorOnTarget: (v) => set({ cursorOnTarget: v }),

  /* ── Normalized mouse for 3D ────────────────────── */
  mouseNorm: { x: 0, y: 0 },
  setMouseNorm: (m) => set({ mouseNorm: m }),

  /* ── Audio ──────────────────────────────────────── */
  isMuted: true,
  toggleMute: () => set((s) => ({ isMuted: !s.isMuted })),

  /* ── Sensor fusion exploded view ────────────────── */
  hoveredPart: null,
  setHoveredPart: (p) => set({ hoveredPart: p }),

  /* ── Simulation ─────────────────────────────────── */
  simGoal: null,
  simObstacles: [],
  simShowVision: true,
  simShowPath: true,
  simShowSensors: true,
  simChaosMode: false,
  setSimGoal: (g) => set({ simGoal: g }),
  addSimObstacle: (o) => set((s) => ({ simObstacles: [...s.simObstacles, o] })),
  clearSimObstacles: () => set({ simObstacles: [] }),
  toggleSimVision: () => set((s) => ({ simShowVision: !s.simShowVision })),
  toggleSimPath: () => set((s) => ({ simShowPath: !s.simShowPath })),
  toggleSimSensors: () => set((s) => ({ simShowSensors: !s.simShowSensors })),
  toggleChaosMode: () => set((s) => ({ simChaosMode: !s.simChaosMode })),

  /* ── Mobile detection ───────────────────────────── */
  isMobile: false,
  setIsMobile: (v) => set({ isMobile: v }),

  /* ── Reduced motion ─────────────────────────────── */
  reducedMotion: false,
  setReducedMotion: (v) => set({ reducedMotion: v }),
}))

export default useStore
