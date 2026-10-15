import { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import {
  WordReveal,
  SectionLabel,
  Button,
  Reveal,
  Marquee,
  SpotlightCard,
  Tilt,
  StatsBand,
} from '../components/ui.jsx'
import { COMPANY, FEATURED, PILLARS, INDUSTRIES, PROCESS, MATERIALS } from '../data/site.js'

function HeroMaterialsShowcase() {
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
      className="relative flex flex-col gap-2.5"
    >
      <Tilt className="relative" max={3}>
        <div className="relative overflow-hidden rounded-[2rem] border-2 border-brand-200/80 bg-brand-950 shadow-[0_40px_90px_-35px_rgba(62,45,99,0.65)]">
          {/* Animated Slide Frame */}
          <div className="relative h-[380px] w-full overflow-hidden sm:h-[430px] md:h-[460px] lg:h-[495px] xl:h-[505px]">
            <AnimatePresence mode="wait">
              <motion.img
                key={current.id}
                src={current.img}
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

            {/* Bottom Info Overlay: Normal machine name, clean layout, no Engineered in Mumbai */}
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

      {/* Interactive Thumbnail Strip matching user reference image */}
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
              <img
                src={mat.thumb || mat.img}
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

function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [0, 120])
  const imgY = useTransform(scrollYProgress, [0, 1], [0, -60])
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  return (
    <section ref={ref} className="relative flex min-h-[100svh] items-center overflow-hidden bg-gradient-to-b from-brand-50 via-white to-white">
      <div className="pointer-events-none absolute inset-0 tech-grid opacity-70 [mask-image:radial-gradient(ellipse_at_top_left,black,transparent_65%)]" />
      <div className="pointer-events-none absolute -right-32 top-0 h-[34rem] w-[34rem] rounded-full bg-brand-200/50 blur-[120px] animate-pulse-slow" />
      <div className="pointer-events-none absolute -left-24 top-1/3 h-72 w-72 rounded-full bg-brand-300/30 blur-[110px]" />

      <motion.div style={{ y, opacity }} className="container-x relative grid w-full grid-cols-1 items-start gap-8 pt-[88px] pb-[88px] lg:grid-cols-2 lg:gap-10">
        {/* Left */}
        <div className="max-w-xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white/70 px-4 py-1.5 shadow-sm"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-500 opacity-70" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand-600" />
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-brand-700">
              {COMPANY.tagline}
            </span>
          </motion.div>

          <h1 className="font-display text-[clamp(2.3rem,5.5vw,4.3rem)] font-bold leading-[1.02] tracking-tight text-ink-900">
            <WordReveal text="Precision we feed." animateOnMount delay={0.2} />
            <br />
            <WordReveal text="Every gram, on target." animateOnMount delay={0.45} wordClassName="text-gradient-brand" />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-5 max-w-lg text-base leading-relaxed text-ink-500 md:text-lg"
          >
            Enweigh designs and builds industrial weigh feeders, belt weighers, apron feeders
            and batch systems — closed-loop machines that keep cement, steel, chemical, glass
            and foundry plants feeding at setpoint, shift after shift.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="mt-7 flex flex-wrap items-center gap-4"
          >
            <Button to="/products">Explore Products</Button>
            <Button to="/contact" variant="secondary">Talk to an Engineer</Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.15 }}
            className="mt-7 grid grid-cols-1 gap-2.5 sm:grid-cols-2"
          >
            {[
              'Continuous Gravimetric Weigh Feeders',
              '±0.5% High-Precision Setpoint Control',
              '500 kg/hr to 1,000+ TPH Capacity',
              'Custom Belt Widths (650mm – 2,000mm)',
            ].map((t) => (
              <div
                key={t}
                className="group flex items-center gap-2.5 rounded-xl border border-brand-200/80 bg-white/85 px-3.5 py-2 shadow-[0_2px_8px_-4px_rgba(62,45,99,0.1)] backdrop-blur-md transition-all duration-300 hover:border-brand-400 hover:bg-white hover:shadow-xs"
              >
                <span className="grid h-4.5 w-4.5 shrink-0 place-items-center rounded-full bg-brand-50 text-brand-600 ring-1 ring-brand-200/70 transition-colors group-hover:bg-brand-600 group-hover:text-white">
                  <svg className="h-2.5 w-2.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M13.5 4.5 6.5 11.5 3 8" />
                  </svg>
                </span>
                <span className="truncate text-xs font-semibold text-ink-800 transition-colors group-hover:text-brand-900">
                  {t}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right visual: Dynamic Material & Feeder Showcase */}
        <motion.div style={{ y: imgY }} className="relative">
          <HeroMaterialsShowcase />
        </motion.div>
      </motion.div>
    </section>
  )
}

function TrustStrip() {
  const stripRef = useRef(null)

  useEffect(() => {
    let ticking = false

    const updatePosition = () => {
      if (!stripRef.current) return
      const footer = document.querySelector('footer')
      if (!footer) return

      const rect = footer.getBoundingClientRect()
      // When footer scrolls into view, stop cleanly 20px above its top edge
      const overlapWithFooter = window.innerHeight - rect.top + 20
      const bottomPx = Math.max(16, overlapWithFooter)

      stripRef.current.style.bottom = `${bottomPx}px`
      ticking = false
    }

    const onScrollOrResize = () => {
      if (!ticking) {
        window.requestAnimationFrame(updatePosition)
        ticking = true
      }
    }

    updatePosition()
    window.addEventListener('scroll', onScrollOrResize, { passive: true })
    window.addEventListener('resize', onScrollOrResize, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScrollOrResize)
      window.removeEventListener('resize', onScrollOrResize)
    }
  }, [])

  return (
    <section
      ref={stripRef}
      style={{ bottom: '16px' }}
      className="fixed inset-x-0 z-40 pointer-events-none"
    >
      <div className="container-x">
        <div className="pointer-events-auto mx-auto flex max-w-5xl items-stretch overflow-hidden rounded-full border border-brand-100 bg-white/95 shadow-[0_16px_44px_-30px_rgba(62,45,99,0.6)] backdrop-blur-md">
          {/* Fixed label */}
          <div className="hidden shrink-0 items-center gap-2.5 border-r border-brand-100 bg-brand-50/70 px-5 md:flex">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-500 opacity-70" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand-600" />
            </span>
            <span className="whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.24em] text-brand-700">
              Trusted across industries
            </span>
          </div>

          {/* Running ticker */}
          <Marquee
            items={INDUSTRIES}
            className="flex-1 [mask-image:linear-gradient(90deg,transparent,black_6%,black_94%,transparent)]"
            render={(item) => (
              <span className="group flex items-center gap-9 px-9 py-3.5">
                <span className="whitespace-nowrap font-display text-base font-medium text-brand-500 transition-colors duration-300 group-hover:text-brand-800 md:text-lg">
                  {item}
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-brand-300" />
              </span>
            )}
          />
        </div>
      </div>
    </section>
  )
}

function MaterialsShowcaseSection() {
  return (
    <section className="relative border-b border-brand-100 bg-gradient-to-b from-white via-brand-50/30 to-white py-20 md:py-28">
      <div className="container-x">
        <div className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <SectionLabel>Materials We Weigh &amp; Feed</SectionLabel>
            <h2 className="mt-4 font-display text-[clamp(1.9rem,4.5vw,3rem)] font-bold tracking-tight text-ink-900">
              Built for your material's <span className="text-gradient-brand">exact flow dynamics.</span>
            </h2>
            <p className="mt-3 max-w-xl text-base text-ink-500">
              From abrasive clinker and high-temperature sinter to delicate glass shards and coal chunks, our systems are engineered around real plant bulk solids.
            </p>
          </div>
          <Button to="/products" variant="secondary">View All 14 Systems</Button>
        </div>

        {/* 5 Material Cards Grid matching user's reference layout */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {MATERIALS.map((mat, i) => (
            <Reveal key={mat.id} delay={i * 0.08} y={24}>
              <Link
                to={`/products?item=${mat.systemSlug}`}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-brand-100 bg-white shadow-sm transition-all duration-500 hover:border-brand-300 hover:shadow-[0_20px_45px_-20px_rgba(94,59,163,0.35)] hover:-translate-y-1"
              >
                <div className="relative aspect-square overflow-hidden bg-brand-950">
                  <img
                    src={mat.img}
                    alt={mat.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-950/75 via-transparent to-transparent" />
                  <span className="absolute bottom-2.5 left-2.5 right-2.5 rounded-lg bg-black/55 px-2.5 py-1 text-center font-display text-xs font-bold text-white shadow-sm backdrop-blur">
                    {mat.shortName}
                  </span>
                </div>
                <div className="flex flex-1 flex-col justify-between p-4">
                  <div>
                    <span className="block font-mono text-[9px] uppercase tracking-wider text-brand-600">
                      {mat.industry}
                    </span>
                    <p className="mt-1 text-xs leading-relaxed text-ink-600 line-clamp-2">
                      {mat.desc}
                    </p>
                  </div>
                  <div className="mt-4 border-t border-brand-50 pt-3">
                    <span className="flex items-center justify-between text-xs font-semibold text-brand-700 group-hover:text-brand-900">
                      <span>{mat.system}</span>
                      <svg className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 8h10M9 4l4 4-4 4" />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function FeaturedProducts() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="container-x">
        <div className="mb-14 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <SectionLabel>Featured Systems</SectionLabel>
            <h2 className="mt-5 max-w-2xl font-display text-[clamp(1.9rem,4.5vw,3.2rem)] font-bold leading-[1.06] tracking-tight text-ink-900">
              The machines that keep{' '}
              <span className="text-gradient-brand">plants feeding.</span>
            </h2>
          </div>
          <Button to="/products" variant="secondary">View all products</Button>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURED.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 3) * 0.08} y={32}>
              <SpotlightCard className="h-full">
                <Link to={`/products?item=${p.slug}`} className="flex h-full flex-col">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-t-2xl">
                    <img src={p.img} alt={p.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover/card:scale-[1.06]" />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-950/40 via-transparent to-transparent" />
                    <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-brand-700 shadow-sm backdrop-blur">
                      {p.category}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="font-display text-xl font-semibold tracking-tight text-ink-900">{p.name}</h3>
                    <p className="mt-1.5 text-sm font-medium text-brand-600">{p.tagline}</p>
                    <p className="mt-4 flex-1 text-sm leading-relaxed text-ink-500">{p.blurb}</p>
                    <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-700 transition-colors group-hover/card:text-brand-600">
                      View Technical Specs
                      <svg className="h-3.5 w-3.5 transition-transform duration-300 group-hover/card:translate-x-1" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 8h10M9 4l4 4-4 4" />
                      </svg>
                    </span>
                  </div>
                </Link>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function WhyUs() {
  return (
    <section className="relative border-y border-brand-100 bg-mist py-24 md:py-32">
      <div className="container-x">
        <div className="mb-14 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <SectionLabel>Why Enweigh</SectionLabel>
            <h2 className="mt-5 max-w-2xl font-display text-[clamp(1.9rem,4.5vw,3.2rem)] font-bold leading-[1.06] tracking-tight text-ink-900">
              Three promises, <span className="text-gradient-brand">held to the gram.</span>
            </h2>
          </div>
          <Button to="/about" variant="secondary">More about us</Button>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {PILLARS.map((pillar, i) => (
            <Reveal key={pillar.index} delay={i * 0.1} y={36}>
              <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-brand-100 bg-white p-8 transition-all duration-500 hover:border-brand-200 hover:shadow-[0_28px_60px_-30px_rgba(94,59,163,0.4)]">
                <span className="pointer-events-none absolute -right-4 -top-8 font-display text-[6.5rem] font-extrabold leading-none text-brand-50 transition-colors duration-500 group-hover:text-brand-100">
                  {pillar.index}
                </span>
                <span className="relative font-mono text-xs uppercase tracking-[0.28em] text-brand-500">{pillar.index}</span>
                <h3 className="relative mt-4 font-display text-2xl font-semibold tracking-tight text-ink-900">{pillar.title}</h3>
                <p className="relative mt-2 text-sm font-medium text-brand-600">{pillar.line}</p>
                <p className="relative mt-4 flex-1 text-sm leading-relaxed text-ink-500">{pillar.body}</p>
                <div className="relative mt-6 h-px w-full bg-gradient-to-r from-brand-300 to-transparent" />
              </div>
            </Reveal>
          ))}
        </div>

        <StatsBand align="left" className="mt-20 border-t border-brand-100 pt-14" />
      </div>
    </section>
  )
}

function ProcessPreview() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="container-x">
        <div className="mb-14 text-center">
          <div className="flex justify-center"><SectionLabel>How we work</SectionLabel></div>
          <h2 className="mx-auto mt-5 max-w-2xl font-display text-[clamp(1.9rem,4.5vw,3.2rem)] font-bold leading-[1.06] tracking-tight text-ink-900">
            From first sample to <span className="text-gradient-brand">full-speed production.</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {PROCESS.map((s, i) => (
            <Reveal key={s.step} delay={i * 0.08} y={28}>
              <div className="relative h-full rounded-2xl border border-brand-100 bg-white p-6 transition-all duration-500 hover:border-brand-200 hover:shadow-[0_20px_44px_-24px_rgba(94,59,163,0.4)]">
                <span className="font-display text-3xl font-bold text-brand-200">{s.step}</span>
                <h3 className="mt-3 font-display text-lg font-semibold text-ink-900">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-500">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function CTA() {
  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-brand-700 via-brand-600 to-brand-800" />
      <div className="pointer-events-none absolute inset-0 tech-grid opacity-20 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
      <div className="container-x relative">
        <div className="mx-auto max-w-3xl text-center text-white">
          <Reveal>
            <span className="font-mono text-[11px] uppercase tracking-[0.32em] text-brand-200">Start the conversation</span>
          </Reveal>
          <h2 className="mt-5 font-display text-[clamp(2.2rem,5.5vw,4rem)] font-bold leading-[1.04] tracking-tight">
            <WordReveal text="Let's put your process on the scale." />
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-brand-100/90 md:text-lg">
            Tell us the material, the tonnage and the accuracy target. An engineer — not a sales
            script — will respond with a straight answer and a proposal.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href={`tel:${COMPANY.phonePrimaryRaw}`}
              className="group inline-flex items-center gap-2.5 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-brand-700 shadow-[0_16px_40px_-16px_rgba(0,0,0,0.5)] transition-all duration-500 hover:-translate-y-0.5"
            >
              Call {COMPANY.phonePrimary}
            </a>
            <Button to="/contact" variant="secondary" className="!border-white/30 !bg-white/10 !text-white hover:!bg-white/20">
              {COMPANY.email}
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <>
      <Hero />
      <MaterialsShowcaseSection />
      <TrustStrip />
      <FeaturedProducts />
      <WhyUs />
      <ProcessPreview />
      <CTA />
    </>
  )
}
