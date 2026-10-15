import { useEffect } from 'react'
import Lenis from 'lenis'

let lenisInstance = null

export function setLenis(l) {
  lenisInstance = l
}

export function scrollToTop() {
  if (lenisInstance) {
    lenisInstance.scrollTo(0, { immediate: true, duration: 0 })
  } else {
    window.scrollTo(0, 0)
  }
}

export function scrollToHash(hash) {
  const el = document.querySelector(hash)
  if (!el) return
  if (lenisInstance) lenisInstance.scrollTo(el, { offset: -84, duration: 1.3 })
  else el.scrollIntoView({ behavior: 'smooth' })
}

export function stopLenis() {
  if (lenisInstance) {
    try {
      lenisInstance.stop()
    } catch {
      /* ignore */
    }
  }
}

export function startLenis() {
  if (lenisInstance) {
    try {
      lenisInstance.start()
    } catch {
      /* ignore */
    }
  }
}

/**
 * Inertial smooth scrolling + anchor-link interception.
 * Honours prefers-reduced-motion by doing nothing at all.
 */
export default function useSmoothScroll() {
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.6,
    })
    setLenis(lenis)

    let rafId
    const raf = (time) => {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    const onClick = (e) => {
      const a = e.target.closest?.('a[href^="#"]')
      if (!a) return
      const id = a.getAttribute('href')
      if (!id || id === '#') return
      const el = document.querySelector(id)
      if (!el) return
      e.preventDefault()
      lenis.scrollTo(el, { offset: -84, duration: 1.3 })
    }
    document.addEventListener('click', onClick)

    return () => {
      document.removeEventListener('click', onClick)
      cancelAnimationFrame(rafId)
      lenis.destroy()
      setLenis(null)
    }
  }, [])
}
