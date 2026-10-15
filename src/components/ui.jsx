import { useRef, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
  animate,
} from 'framer-motion'
import { STATS } from '../data/site.js'

const EASE = [0.16, 1, 0.3, 1]

/* ------------------------------------------------------------------ *
 * Reveal — fade + rise as the element enters the viewport
 * ------------------------------------------------------------------ */
export function Reveal({ children, delay = 0, y = 28, className = '', once = true }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: '-8% 0px -10% 0px' }}
      transition={{ duration: 0.8, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  )
}

/* ------------------------------------------------------------------ *
 * WordReveal — headline whose words rise into place one after another
 * ------------------------------------------------------------------ */
export function WordReveal({
  text,
  className = '',
  wordClassName = '',
  delay = 0,
  stagger = 0.06,
  animateOnMount = false,
}) {
  const words = String(text).split(' ')
  const shared = animateOnMount
    ? { initial: { y: '110%', opacity: 0 }, animate: { y: '0%', opacity: 1 } }
    : {
        initial: { y: '110%', opacity: 0 },
        whileInView: { y: '0%', opacity: 1 },
        viewport: { once: true, margin: '-6%' },
      }
  return (
    <span className={className}>
      {words.map((w, i) => (
        <span
          key={`${w}-${i}`}
          className="inline-block overflow-hidden align-bottom"
          style={{ paddingBottom: '0.12em', marginBottom: '-0.12em' }}
        >
          <motion.span
            className={`inline-block ${wordClassName}`}
            {...shared}
            transition={{ duration: 0.9, delay: delay + i * stagger, ease: EASE }}
          >
            {w}
            {i < words.length - 1 ? '\u00A0' : ''}
          </motion.span>
        </span>
      ))}
    </span>
  )
}

/* ------------------------------------------------------------------ *
 * SectionLabel — small mono eyebrow with a dot and rule
 * ------------------------------------------------------------------ */
export function SectionLabel({ children, className = '', light = false }) {
  return (
    <Reveal className={`flex items-center gap-3 ${className}`} y={14}>
      <span className="relative flex h-1.5 w-1.5">
        <span className="absolute inline-flex h-full w-full rounded-full bg-brand-500 opacity-70 animate-ping" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand-600" />
      </span>
      <span
        className={`font-mono text-[11px] uppercase tracking-[0.32em] ${
          light ? 'text-brand-200' : 'text-brand-600'
        }`}
      >
        {children}
      </span>
      <span className="h-px w-10 bg-gradient-to-r from-brand-500/60 to-transparent" />
    </Reveal>
  )
}

/* ------------------------------------------------------------------ *
 * Counter — counts up when scrolled into view
 * ------------------------------------------------------------------ */
export function Counter({ to, suffix = '', prefix = '', duration = 1.9, className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-15%' })
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!inView) return
    const controls = animate(0, to, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setValue(Math.round(v)),
    })
    return () => controls.stop()
  }, [inView, to, duration])

  return (
    <span ref={ref} className={className}>
      {prefix}
      {value.toLocaleString('en-IN')}
      {suffix}
    </span>
  )
}

/* ------------------------------------------------------------------ *
 * Button — primary / secondary action (link or router link)
 * ------------------------------------------------------------------ */
export function Button({
  children,
  to,
  href,
  variant = 'primary',
  className = '',
  icon = true,
  onClick,
  type,
}) {
  const base =
    'group relative inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-full px-7 py-3.5 text-sm font-semibold tracking-wide transition-all duration-500'
  const styles =
    variant === 'primary'
      ? 'bg-gradient-to-r from-brand-700 to-brand-500 text-white shadow-[0_14px_38px_-14px_rgba(94,59,163,0.75)] hover:shadow-[0_20px_55px_-14px_rgba(94,59,163,0.95)] hover:-translate-y-0.5'
      : 'border border-brand-200 bg-white text-brand-700 hover:border-brand-400 hover:bg-brand-50 hover:-translate-y-0.5'
  const inner = (
    <>
      {variant === 'primary' && (
        <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-[900ms] group-hover:translate-x-full" />
      )}
      <span className="relative z-10">{children}</span>
      {icon && (
        <svg
          className="relative z-10 h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-1"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 8h10M9 4l4 4-4 4" />
        </svg>
      )}
    </>
  )

  if (to) {
    return (
      <Link to={to} className={`${base} ${styles} ${className}`}>
        {inner}
      </Link>
    )
  }
  if (href) {
    return (
      <a href={href} className={`${base} ${styles} ${className}`} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">
        {inner}
      </a>
    )
  }
  return (
    <button type={type || 'button'} onClick={onClick} className={`${base} ${styles} ${className}`}>
      {inner}
    </button>
  )
}

/* ------------------------------------------------------------------ *
 * SpotlightCard — soft card whose glow follows the cursor
 * ------------------------------------------------------------------ */
export function SpotlightCard({ children, className = '', glow = '94,59,163' }) {
  const ref = useRef(null)
  const onMove = (e) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    el.style.setProperty('--mx', `${e.clientX - r.left}px`)
    el.style.setProperty('--my', `${e.clientY - r.top}px`)
  }
  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      className={`group/card relative overflow-hidden rounded-2xl border border-brand-100 bg-white transition-all duration-500 hover:border-brand-200 hover:shadow-[0_24px_60px_-30px_rgba(94,59,163,0.45)] ${className}`}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover/card:opacity-100"
        style={{
          background: `radial-gradient(340px circle at var(--mx, 50%) var(--my, 0%), rgba(${glow},0.1), transparent 62%)`,
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  )
}

/* ------------------------------------------------------------------ *
 * Tilt — subtle 3D tilt following the pointer
 * ------------------------------------------------------------------ */
export function Tilt({ children, className = '', max = 6 }) {
  const ref = useRef(null)
  const rx = useMotionValue(0)
  const ry = useMotionValue(0)
  const srx = useSpring(rx, { stiffness: 140, damping: 18 })
  const sry = useSpring(ry, { stiffness: 140, damping: 18 })
  const transform = useTransform(
    [srx, sry],
    ([x, y]) => `perspective(1100px) rotateX(${x}deg) rotateY(${y}deg)`,
  )
  const onMove = (e) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width - 0.5
    const py = (e.clientY - r.top) / r.height - 0.5
    ry.set(px * max * 2)
    rx.set(-py * max * 2)
  }
  const reset = () => {
    rx.set(0)
    ry.set(0)
  }
  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ transform, transformStyle: 'preserve-3d' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* ------------------------------------------------------------------ *
 * Marquee — infinite horizontal ticker
 * ------------------------------------------------------------------ */
export function Marquee({ items, reverse = false, className = '', render }) {
  const list = [...items, ...items, ...items, ...items]
  return (
    <div className={`group relative flex overflow-hidden ${className}`}>
      <div
        className={`flex w-max shrink-0 items-center ${
          reverse ? 'animate-marquee-rev' : 'animate-marquee'
        } group-hover:[animation-play-state:paused]`}
      >
        {list.map((item, i) => (
          <div key={i} className="flex shrink-0 items-center">
            {render ? render(item, i) : <span className="px-8">{item}</span>}
          </div>
        ))}
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ *
 * PageHeader — consistent header for inner pages
 * ------------------------------------------------------------------ */
export function PageHeader({ eyebrow, title, lead, children }) {
  return (
    <section className="relative overflow-hidden border-b border-brand-100 bg-gradient-to-b from-brand-50 to-white pt-[88px] pb-10 md:pt-[88px] md:pb-12">
      <div className="pointer-events-none absolute inset-0 tech-grid opacity-60 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
      <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-brand-200/40 blur-[100px]" />
      <div className="pointer-events-none absolute -left-24 top-10 h-64 w-64 rounded-full bg-brand-300/30 blur-[100px]" />
      <div className="container-x relative">
        <SectionLabel>{eyebrow}</SectionLabel>
        <h1 className="mt-4 max-w-3xl font-display text-[clamp(2.1rem,5vw,3.6rem)] font-bold leading-[1.05] tracking-tight text-ink-900">
          <WordReveal text={title} animateOnMount />
        </h1>
        {lead && (
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease: EASE }}
            className="mt-6 max-w-2xl text-base leading-relaxed text-ink-500 md:text-lg"
          >
            {lead}
          </motion.p>
        )}
        {children}
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ *
 * StatsBand — verified company facts (mixed counter / static values)
 * ------------------------------------------------------------------ */
export function StatsBand({ align = 'center', className = '' }) {
  const alignCls = align === 'center' ? 'text-center' : 'text-center md:text-left'
  return (
    <div className={`grid grid-cols-2 gap-y-12 md:grid-cols-4 ${className}`}>
      {STATS.map((s, i) => (
        <Reveal key={s.label} delay={i * 0.08} y={26} className={`px-4 ${alignCls}`}>
          <div className="font-display text-[clamp(2.2rem,4.5vw,3.6rem)] font-bold leading-none tracking-tight text-ink-900">
            {s.to != null ? (
              <Counter to={s.to} suffix={s.suffix || ''} className="text-gradient-brand" />
            ) : (
              <span className="text-gradient-brand">{s.value}</span>
            )}
          </div>
          <p className="mt-3 text-sm leading-snug text-ink-500">{s.label}</p>
        </Reveal>
      ))}
    </div>
  )
}

export { EASE }
