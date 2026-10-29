import SiteImage from '../components/SiteImage.jsx'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useSearchParams } from 'react-router-dom'
import { PageHeader, Reveal, SpotlightCard, Button } from '../components/ui.jsx'
import { PRODUCTS, CATEGORIES, COMPANY } from '../data/site.js'
import { stopLenis, startLenis } from '../hooks/useSmoothScroll.js'

export default function Products() {
  const [searchParams] = useSearchParams()
  const [active, setActive] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [selectedImage, setSelectedImage] = useState(0)

  useEffect(() => setSelectedImage(0), [selectedProduct])

  // Check if URL has a specific product requested (e.g. /products?item=weigh-feeder)
  useEffect(() => {
    const itemSlug = searchParams.get('item')
    if (itemSlug) {
      const match = PRODUCTS.find((p) => p.slug === itemSlug)
      if (match) setSelectedProduct(match)
    }
  }, [searchParams])

  // Lock body scroll and pause smooth scroll when modal is open
  useEffect(() => {
    if (selectedProduct) {
      document.body.style.overflow = 'hidden'
      stopLenis()
    } else {
      document.body.style.overflow = ''
      startLenis()
    }
    return () => {
      document.body.style.overflow = ''
      startLenis()
    }
  }, [selectedProduct])

  // Close on Escape key
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setSelectedProduct(null)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const filtered = PRODUCTS.filter((p) => {
    const matchesCat = active === 'All' || p.category === active
    if (!matchesCat) return false
    if (!searchQuery.trim()) return true
    const q = searchQuery.toLowerCase()
    const inName = p.name.toLowerCase().includes(q)
    const inBlurb = p.blurb.toLowerCase().includes(q)
    const inTags = p.tags.some((t) => t.toLowerCase().includes(q))
    const inApps = p.applications?.some((a) => a.toLowerCase().includes(q))
    const inSpecs = p.specs && Object.values(p.specs).some((v) => String(v).toLowerCase().includes(q))
    return inName || inBlurb || inTags || inApps || inSpecs
  })

  return (
    <>
      <PageHeader
        eyebrow="Products & Systems"
        title="Engineered precision for material in motion."
        lead="Seven industrial weighing, feeding, and batching systems. Every machine is custom-built to your material properties, feed rate, and automation architecture."
      />

      <section className="relative py-10 md:py-14">
        <div className="container-x">
          {/* Controls Bar */}
          <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            {/* Category Pills */}
            <div className="flex flex-wrap items-center gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActive(cat)}
                  className={`relative rounded-full px-4 py-2 text-xs font-semibold tracking-wide transition-all duration-300 md:text-sm ${
                    active === cat
                      ? 'text-white'
                      : 'border border-brand-100 bg-white text-ink-600 hover:border-brand-300 hover:text-brand-700'
                  }`}
                >
                  {active === cat && (
                    <motion.span
                      layoutId="cat-pill"
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-brand-700 to-brand-500 shadow-md"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{cat}</span>
                </button>
              ))}
            </div>

            {/* Keyword Search */}
            <div className="relative min-w-[260px] max-w-sm">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search specs, materials, sensors…"
                className="w-full rounded-full border border-brand-100 bg-white px-4 py-2.5 pl-10 text-xs text-ink-800 placeholder:text-ink-400 outline-none transition-all duration-300 focus:border-brand-400 focus:ring-4 focus:ring-brand-100/60 md:text-sm"
              />
              <svg
                className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400"
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="9" cy="9" r="6" />
                <path d="m13.5 13.5 4 4" />
              </svg>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-ink-400 hover:text-ink-700"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Results Count */}
          <div className="mb-8 flex items-center justify-between text-xs font-mono uppercase tracking-widest text-ink-400">
            <span>Showing {filtered.length} of {PRODUCTS.length} machines</span>
            {searchQuery && <span>Filter: "{searchQuery}"</span>}
          </div>

          {/* Product Grid */}
          <motion.div layout className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {filtered.map((p, idx) => (
                <motion.div
                  key={p.slug}
                  layout
                  initial={{ opacity: 0, y: 24, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                >
                  <SpotlightCard className="flex h-full flex-col justify-between">
                    <div>
                      {/* Image Header */}
                      <div
                        onClick={() => setSelectedProduct(p)}
                        className="group/img relative aspect-[4/3] cursor-pointer overflow-hidden rounded-t-2xl"
                      >
                        <SiteImage
                          src={p.gallery?.[0]?.thumb || p.img}
                          variant="card"
                          sizes="(min-width: 1312px) 395px, (min-width: 1024px) 30vw, (min-width: 640px) 45vw, calc(100vw - 40px)"
                          fetchPriority={idx === 0 ? 'high' : 'auto'}
                          alt={p.alt || p.name}
                          loading={idx === 0 ? 'eager' : 'lazy'}
                          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover/img:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-brand-950/60 via-transparent to-transparent" />
                        <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-brand-700 shadow-sm backdrop-blur">
                          {p.category}
                        </span>

                        <span className="absolute bottom-3 right-3 rounded-full bg-black/60 px-2.5 py-1 text-[11px] font-medium text-white opacity-0 backdrop-blur transition-opacity group-hover/img:opacity-100">
                          Inspect Specs ↗
                        </span>
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        <div className="flex items-baseline justify-between gap-2">
                          <h3
                            onClick={() => setSelectedProduct(p)}
                            className="cursor-pointer font-display text-xl font-bold tracking-tight text-ink-900 transition-colors hover:text-brand-700"
                          >
                            {p.name}
                          </h3>
                        </div>
                        <p className="mt-1 text-xs font-semibold text-brand-600">{p.tagline}</p>
                        <p className="mt-3.5 text-sm leading-relaxed text-ink-500 line-clamp-3">{p.blurb}</p>

                        {/* Quick Spec highlights */}
                        {p.specs && (
                          <div className="mt-4 rounded-xl border border-brand-50 bg-brand-50/40 p-3 text-xs">
                            <div className="grid grid-cols-2 gap-2 text-ink-600">
                              {Object.entries(p.specs).slice(0, 2).map(([k, v]) => (
                                <div key={k}>
                                  <span className="block font-mono text-[9px] uppercase tracking-wider text-brand-500">{k}</span>
                                  <span className="font-semibold text-ink-800 line-clamp-1">{v}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Tags */}
                        <div className="mt-4 flex flex-wrap gap-1.5">
                          {p.tags.map((t) => (
                            <span
                              key={t}
                              className="rounded-md border border-brand-100 bg-white px-2 py-0.5 font-mono text-[9.5px] uppercase tracking-wider text-brand-700"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Card Actions */}
                    <div className="flex items-center justify-between border-t border-brand-50 p-6 pt-4">
                      <button
                        onClick={() => setSelectedProduct(p)}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-700 hover:text-brand-900"
                      >
                        Technical Specs
                        <svg className="h-3 w-3" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M6 3h7v7M13 3 3 13" />
                        </svg>
                      </button>

                      <Link
                        to={`/contact?product=${encodeURIComponent(p.name)}`}
                        className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3.5 py-1.5 text-xs font-semibold text-brand-700 transition-colors hover:bg-brand-600 hover:text-white"
                      >
                        Enquire
                        <svg className="h-3 w-3" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M3 8h10M9 4l4 4-4 4" />
                        </svg>
                      </Link>
                    </div>
                  </SpotlightCard>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filtered.length === 0 && (
            <div className="py-20 text-center">
              <p className="font-display text-lg text-ink-700">No systems matching "{searchQuery}"</p>
              <button
                onClick={() => { setActive('All'); setSearchQuery('') }}
                className="mt-3 text-sm font-semibold text-brand-600 underline"
              >
                Reset filters
              </button>
            </div>
          )}

          {/* Custom System Callout */}
          <Reveal className="mt-16 flex flex-col items-center gap-4 rounded-3xl border border-brand-100 bg-mist p-10 text-center">
            <h3 className="font-display text-2xl font-semibold text-ink-900">Custom Engineering Available</h3>
            <p className="max-w-xl text-sm leading-relaxed text-ink-500">
              Need non-standard belt lengths, custom load-cell assemblies, or application-specific extraction and dosing? We engineer from first principles.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Button to="/contact?product=Custom%20Engineered%20System">Request Custom Solution</Button>
              <a
                href={`https://wa.me/${COMPANY.whatsappRaw}?text=${encodeURIComponent('Hello Enweigh team, I have a custom weighing and feeding requirement.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white px-6 py-3.5 text-sm font-semibold text-brand-700 transition-all hover:border-brand-400 hover:bg-brand-50"
              >
                Chat on WhatsApp
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Technical Specification Modal / Drawer */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setSelectedProduct(null)}
            data-lenis-prevent="true"
            className="fixed inset-0 z-[70] flex items-center justify-center bg-brand-950/80 p-3 sm:p-5 backdrop-blur-md overscroll-contain"
          >
            <motion.div
              initial={{ scale: 0.96, y: 16, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.96, y: 16, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              data-lenis-prevent="true"
              className="relative flex max-h-[88vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl sm:rounded-3xl bg-white shadow-2xl border border-brand-100"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between border-b border-brand-100 bg-brand-50/60 px-5 py-3.5 sm:px-6">
                <div className="flex items-center gap-2.5">
                  <span className="rounded-full bg-brand-200/80 px-2.5 py-0.5 font-mono text-[10px] uppercase font-bold tracking-wider text-brand-800">
                    {selectedProduct.category}
                  </span>
                  <span className="hidden font-mono text-xs text-ink-400 sm:inline">•</span>
                  <span className="font-mono text-xs text-ink-500 font-medium">Technical Specification Sheet</span>
                </div>
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="grid h-8 w-8 place-items-center rounded-full border border-brand-200/80 text-ink-500 transition-colors hover:bg-white hover:text-ink-900"
                  aria-label="Close"
                >
                  ✕
                </button>
              </div>

              {/* Modal Content Scrollable Area */}
              <div
                data-lenis-prevent="true"
                onWheel={(e) => e.stopPropagation()}
                onTouchMove={(e) => e.stopPropagation()}
                className="flex-1 overflow-y-auto overscroll-contain p-5 sm:p-6"
              >
                {/* Product Summary Header Card */}
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 items-start">
                  {/* Product Image */}
                  <div className="relative w-full sm:w-52 md:w-60 h-44 sm:h-40 md:h-44 shrink-0 overflow-hidden rounded-2xl border border-brand-100 bg-brand-50/50 shadow-xs">
                    <SiteImage
                      src={selectedProduct.gallery?.[selectedImage]?.img || selectedProduct.img}
                      sizes="(min-width: 640px) 240px, calc(100vw - 64px)"
                      loading="eager"
                      alt={selectedProduct.gallery?.[selectedImage]?.alt || selectedProduct.alt || selectedProduct.name}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-950/40 via-transparent to-transparent pointer-events-none" />
                    <span className="absolute bottom-2.5 left-2.5 rounded-md bg-black/60 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-white backdrop-blur">
                      ENW Industrial
                    </span>
                  </div>

                  {/* Title, Tagline, Description & Tags */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-full bg-brand-100 px-2.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-brand-800">
                          {selectedProduct.category}
                        </span>
                        <span className="font-mono text-[10px] text-ink-400">
                          REF: ENW-{selectedProduct.slug.toUpperCase()}
                        </span>
                      </div>

                      <h2 className="mt-1 font-display text-xl sm:text-2xl font-bold tracking-tight text-ink-900">
                        {selectedProduct.name}
                      </h2>
                      <p className="mt-0.5 text-xs font-semibold text-brand-600">
                        {selectedProduct.tagline}
                      </p>

                      <p className="mt-2 text-xs sm:text-sm leading-relaxed text-ink-600">
                        {selectedProduct.blurb}
                      </p>
                    </div>

                    {/* Standard Tags */}
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {selectedProduct.tags.map((t) => (
                        <span
                          key={t}
                          className="rounded-md border border-brand-100 bg-brand-50/80 px-2 py-0.5 font-mono text-[10px] text-brand-700"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {selectedProduct.gallery?.length > 0 && (
                  <div className="mt-4 flex gap-2 overflow-x-auto pb-2" aria-label={`${selectedProduct.name} photos`}>
                    {selectedProduct.gallery.map((photo, index) => (
                      <button
                        key={photo.img}
                        type="button"
                        onClick={() => setSelectedImage(index)}
                        aria-label={`View ${photo.alt}`}
                        aria-pressed={selectedImage === index}
                        className={`h-20 w-24 shrink-0 overflow-hidden rounded-xl border-2 ${selectedImage === index ? 'border-brand-600' : 'border-brand-100'}`}
                      >
                        <SiteImage variant="thumb" sizes="96px" src={photo.thumb} alt={photo.alt} loading="lazy" width={photo.width} height={photo.height} className="h-full w-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}

                {/* Official Engineering Brochure Banner (if applicable) */}
                {selectedProduct.slug === 'weigh-feeder' && (
                  <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 rounded-2xl border border-brand-200 bg-gradient-to-r from-brand-50/90 via-white to-brand-50/60 p-3.5 shadow-xs">
                    <div className="flex items-center gap-3">
                      <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-brand-600 text-white shadow-xs">
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-xs font-bold text-brand-900">Official Belt Weigh Feeder Brochure</p>
                        <p className="text-[11px] text-ink-500">4-page engineering PDF · 20 Nov 2024 · 5.1 MB</p>
                      </div>
                    </div>
                    <a
                      href="/downloads/enweigh-weigh-feeder-2024-11-20.pdf"
                      download
                      className="inline-flex items-center gap-1.5 rounded-lg bg-brand-700 px-3.5 py-1.5 text-xs font-semibold text-white shadow-xs hover:bg-brand-800 transition-colors shrink-0"
                    >
                      <span>Download PDF</span>
                      <svg className="h-3 w-3" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M8 2v8m-3-3 3 3 3-3M2 13h12" />
                      </svg>
                    </a>
                  </div>
                )}
                {selectedProduct.slug === 'batch-weighing-system' && (
                  <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 rounded-2xl border border-brand-200 bg-gradient-to-r from-brand-50/90 via-white to-brand-50/60 p-3.5 shadow-xs">
                    <div className="flex items-center gap-3">
                      <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-brand-600 text-white shadow-xs">
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-xs font-bold text-brand-900">Turnkey Batching Systems Brochure</p>
                        <p className="text-[11px] text-ink-500">4-page plant batching &amp; mixing PDF</p>
                      </div>
                    </div>
                    <a
                      href="/downloads/enweigh-batching-plants-brochure.pdf"
                      download
                      className="inline-flex items-center gap-1.5 rounded-lg bg-brand-700 px-3.5 py-1.5 text-xs font-semibold text-white shadow-xs hover:bg-brand-800 transition-colors shrink-0"
                    >
                      <span>Download PDF</span>
                      <svg className="h-3 w-3" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M8 2v8m-3-3 3 3 3-3M2 13h12" />
                      </svg>
                    </a>
                  </div>
                )}

                {/* Technical Specifications Table */}
                {selectedProduct.specs && (
                  <div className="mt-5">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-display text-sm font-bold uppercase tracking-wider text-ink-900 flex items-center gap-2">
                        <span className="inline-block h-2 w-2 rounded-full bg-brand-500" />
                        Technical Specifications
                      </h3>
                      <span className="font-mono text-[10px] text-ink-400">ENW Factory Standard</span>
                    </div>
                    <div className="overflow-hidden rounded-xl border border-brand-100 bg-white shadow-xs">
                      <table className="w-full text-left text-xs border-collapse">
                        <tbody className="divide-y divide-brand-100/70">
                          {Object.entries(selectedProduct.specs).map(([param, value], idx) => (
                            <tr
                              key={param}
                              className={`transition-colors hover:bg-brand-50/50 ${
                                idx % 2 === 0 ? 'bg-mist/40' : 'bg-white'
                              }`}
                            >
                              <td className="w-5/12 px-3.5 py-2 font-mono text-[11px] font-semibold text-brand-800 border-r border-brand-100/60">
                                {param}
                              </td>
                              <td className="w-7/12 px-3.5 py-2 text-xs font-medium text-ink-700">
                                {value}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* Key Engineering Highlights */}
                {selectedProduct.highlights && (
                  <div className="mt-5">
                    <h3 className="font-display text-sm font-bold uppercase tracking-wider text-ink-900 flex items-center gap-2 mb-2">
                      <span className="inline-block h-2 w-2 rounded-full bg-brand-500" />
                      Key Engineering Highlights
                    </h3>
                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                      {selectedProduct.highlights.map((h, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-2.5 rounded-xl border border-brand-100/80 bg-brand-50/20 px-3 py-2 text-xs text-ink-700 leading-snug"
                        >
                          <svg className="h-4 w-4 shrink-0 text-brand-600 mt-0.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M13 4 6 11l-3-3" />
                          </svg>
                          <span className="font-medium">{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Primary Applications & Bulk Materials */}
                {selectedProduct.applications && (
                  <div className="mt-5">
                    <h3 className="font-display text-sm font-bold uppercase tracking-wider text-ink-900 flex items-center gap-2 mb-2">
                      <span className="inline-block h-2 w-2 rounded-full bg-brand-500" />
                      Primary Applications &amp; Bulk Materials
                    </h3>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {selectedProduct.applications.map((app, i) => (
                        <span
                          key={i}
                          className="inline-flex items-center gap-1.5 rounded-lg border border-brand-200/70 bg-brand-50/60 px-3 py-1.5 text-xs font-medium text-brand-800"
                        >
                          <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
                          {app}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Modal Footer CTA */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-brand-100 bg-brand-50/50 px-5 py-3 sm:px-6">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono text-ink-400">
                    Ref: ENW-{selectedProduct.slug.toUpperCase()}
                  </span>
                  <span className="hidden sm:inline text-[11px] font-mono text-brand-600 font-semibold">• Customized To Duty</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <a
                    href={`https://wa.me/${COMPANY.whatsappRaw}?text=${encodeURIComponent(`Hi Enweigh team, please share quotation and datasheet for ${selectedProduct.name}.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full border border-brand-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-brand-700 hover:bg-brand-50 transition-colors"
                  >
                    Quick WhatsApp
                  </a>
                  <Link
                    to={`/contact?product=${encodeURIComponent(selectedProduct.name)}`}
                    onClick={() => setSelectedProduct(null)}
                    className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-brand-700 to-brand-500 px-4 py-1.5 text-xs font-semibold text-white shadow-sm hover:shadow transition-all"
                  >
                    <span>Request Proposal</span>
                    <svg className="h-3 w-3" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 8h10M9 4l4 4-4 4" />
                    </svg>
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
