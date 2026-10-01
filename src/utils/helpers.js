import * as THREE from 'three'

/** Lerp a value toward a target */
export const lerp = (a, b, t) => a + (b - a) * t

/** Clamp a value between min and max */
export const clamp = (v, min, max) => Math.min(Math.max(v, min), max)

/** Map a value from one range to another */
export const mapRange = (v, inMin, inMax, outMin, outMax) => {
  return outMin + ((v - inMin) / (inMax - inMin)) * (outMax - outMin)
}

/** Convert screen coords to normalized device coords */
export const screenToNDC = (x, y, width, height) => ({
  x: (x / width) * 2 - 1,
  y: -(y / height) * 2 + 1,
})

/** Format number with commas */
export const formatNumber = (n) => {
  if (typeof n !== 'number') return '0'
  return n.toLocaleString('en-US', { maximumFractionDigits: 1 })
}

/** Create a basic emissive material */
export const createGlowMaterial = (color, intensity = 0.5) => {
  return new THREE.MeshStandardMaterial({
    color,
    emissive: color,
    emissiveIntensity: intensity,
    metalness: 0.8,
    roughness: 0.2,
  })
}

/** Create the dark body material */
export const createBodyMaterial = (color = '#1a1e2e') => {
  return new THREE.MeshStandardMaterial({
    color,
    metalness: 0.9,
    roughness: 0.3,
  })
}

/** Ease functions */
export const easeInOut = (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
export const easeOut = (t) => t * (2 - t)

/** Debounce */
export const debounce = (fn, ms) => {
  let timer
  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => fn(...args), ms)
  }
}

/** Detect if device is mobile */
export const isMobileDevice = () => {
  return window.innerWidth < 768 || /Mobi|Android|iPhone/i.test(navigator.userAgent)
}

/** Detect prefers-reduced-motion */
export const prefersReducedMotion = () => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/** Generate a random float in range */
export const randFloat = (min, max) => Math.random() * (max - min) + min

/** Generate a random integer in range */
export const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min
