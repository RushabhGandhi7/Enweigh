import SiteImage from './SiteImage.jsx'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Tilt } from './ui.jsx'
import { MATERIALS } from '../data/site.js'

export default function HeroMaterialsShowcase({
  className = '',
  frameHeight = 'h-[380px] w-full overflow-hidden sm:h-[430px] md:h-[460px] lg:h-[495px] xl:h-[505px]',
}) {
  const [index, setIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const current = MATERIALS[index]

  // Auto-advance every 5 seconds unless hovered
  useEffect(() => {
    if (isHovered) return
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % MATERIALS.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [isHovered, index])

  const next = () => setIndex((prev) => (prev + 1) % MATERIALS.length)
  const prev = () => setIndex((prev) => (prev - 1 + MATERIALS.length) % MATERIALS.length)

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative flex flex-col gap-2.5 ${className}`}
    >
      <Tilt className="relative" max={3}>
        <div className="relative overflow-hidden rounded-[2rem] border-2 border-brand-200/80 bg-brand-950 shadow-[0_40px_90px_-35px_rgba(62,45,99,0.65)]">
          {/* Animated Slide Frame */}
          <div className={`relative ${frameHeight}`}>
            <AnimatePresence mode="wait">
              <SiteImage animated
                key={current.id}
                src={current.img}
                sizes="(min-width: 1312px) 616px, (min-width: 1024px) 48vw, calc(100vw - 40px)"
                loading="eager"
                fetchPriority={index === 0 ? 'high' : 'auto'}
                alt={current.name}
                initial={{ opacity: 0, scale: 1.08 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                className="h-full w-full object-cover"
              />
            </AnimatePresence>

            {/* Gradient Scrim */}
            <div className="absolute inset-0 bg-gradient-to-t from-brand-950 via-brand-950/40 to-black/25" />

            {/* Top Badges: clean left-aligned live stream indicator, zero overlap on top right */}
            <div className="absolute left-5 top-5 flex items-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/50 px-3.5 py-1.5 backdrop-blur-md">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-brand-100">
                  {current.industry}
                </span>
              </div>
            </div>

            {/* Navigation Arrows */}
            <div className="pointer-events-none absolute inset-y-0 left-3 right-3 flex items-center justify-between">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  prev()
                }}
                aria-label="Previous material"
                className="pointer-events-auto grid h-10 w-10 place-items-center rounded-full border border-white/25 bg-black/45 text-white backdrop-blur-md transition-all hover:scale-110 hover:bg-black/75"
              >
                <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10 13 5 8l5-5" />
                </svg>
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  next()
                }}
                aria-label="Next material"
                className="pointer-events-auto grid h-10 w-10 place-items-center rounded-full border border-white/25 bg-black/45 text-white backdrop-blur-md transition-all hover:scale-110 hover:bg-black/75"
              >
                <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 3l5 5-5 5" />
                </svg>
              </button>
            </div>

            {/* Bottom Info Overlay: Normal machine name, clean layout */}
            <div className="absolute bottom-5 left-5 right-5 text-white">
              <div className="flex flex-wrap items-end justify-between gap-3">
                <div className="max-w-md">
                  <h3 className="font-display text-2xl font-bold tracking-tight text-white drop-shadow-sm sm:text-3xl">
                    {current.name}
                  </h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-brand-100/90 line-clamp-2">
                    {current.desc}
                  </p>
                </div>

                <div className="flex flex-col items-center gap-1.5 self-start sm:self-end text-center shrink-0">
                  <Link
                    to={`/products?item=${current.systemSlug}`}
                    className="inline-flex min-w-[175px] items-center justify-center gap-2 rounded-full bg-white px-5 py-2.5 text-xs font-bold text-brand-800 shadow-xl transition-all hover:bg-brand-50 hover:scale-105"
                  >
                    <span>{current.system}</span>
                    <svg className="h-3 w-3" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M6 3h7v7M13 3 3 13" />
                    </svg>
                  </Link>
                  <span className="inline-flex items-center justify-center gap-1.5 rounded-full border border-white/20 bg-black/45 px-3 py-0.5 font-mono text-[10.5px] font-medium text-brand-100 shadow-sm backdrop-blur-md">
                    <span className="h-1.5 w-1.5 rounded-full bg-brand-400" />
                    {current.metric}
                  </span>
                </div>
              </div>

              {/* Countdown Progress Bar */}
              <div className="mt-4 h-1 w-full overflow-hidden rounded-full bg-white/20">
                <motion.div
                  key={current.id}
                  initial={{ width: '0%' }}
                  animate={{ width: isHovered ? '100%' : '100%' }}
                  transition={{ duration: isHovered ? 0 : 5, ease: 'linear' }}
                  className="h-full bg-gradient-to-r from-brand-400 via-brand-200 to-white"
                />
              </div>
            </div>
          </div>
        </div>
      </Tilt>

      {/* Interactive Thumbnail Strip */}
      <div className="rounded-2xl border border-brand-100 bg-white/95 p-2.5 shadow-sm backdrop-blur-md">
        <div className="mb-1.5 flex items-center justify-between px-1 text-[11px] font-mono text-ink-500">
          <span className="uppercase tracking-wider">Select Material Stream:</span>
          <span className="font-semibold text-brand-600">{index + 1} of {MATERIALS.length}</span>
        </div>
        <div className="grid grid-cols-5 gap-2">
          {MATERIALS.map((mat, i) => (
            <button
              key={mat.id}
              onClick={() => setIndex(i)}
              className={`group relative aspect-square overflow-hidden rounded-xl border-2 transition-all duration-300 ${
                index === i
                  ? 'scale-[1.03] border-brand-600 shadow-md ring-2 ring-brand-300/60'
                  : 'border-brand-100 opacity-70 hover:border-brand-300 hover:opacity-100'
              }`}
            >
              <SiteImage
                src={mat.thumb || mat.img}
                variant="thumb"
                sizes="(min-width: 1024px) 110px, 18vw"
                loading="eager"
                alt={mat.name}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
              <span className="absolute bottom-1 inset-x-1 truncate text-center font-display text-[9px] font-bold text-white drop-shadow">
                {mat.shortName.split(' ')[0]}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
