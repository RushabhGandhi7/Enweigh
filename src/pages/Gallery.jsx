import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PageHeader, Reveal } from '../components/ui.jsx'
import { GALLERY } from '../data/site.js'

export default function Gallery() {
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setSelected(null)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    document.body.style.overflow = selected ? 'hidden' : ''
    return () => (document.body.style.overflow = '')
  }, [selected])

  return (
    <>
      <PageHeader
        eyebrow="Gallery"
        title="Machines, built and in the field."
        lead="A look at the systems we design, manufacture and commission — from a single weigh feeder to complete plant-scale handling lines."
      />

      <section className="relative py-10 md:py-14">
        <div className="container-x">
          <div className="columns-1 gap-6 sm:columns-2 lg:columns-3 [&>*]:mb-6">
            {GALLERY.map((g, i) => (
              <Reveal key={g.name} delay={(i % 3) * 0.06} y={28}>
                <button
                  onClick={() => setSelected(g)}
                  className="group relative block w-full overflow-hidden rounded-2xl border border-brand-100 bg-white text-left shadow-[0_10px_30px_-18px_rgba(62,45,99,0.35)] transition-all duration-500 hover:shadow-[0_28px_60px_-28px_rgba(94,59,163,0.45)]"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={g.img}
                      alt={g.name}
                      loading="lazy"
                      className="w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-950/60 via-transparent to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100" />
                    <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5">
                      <div>
                        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-brand-200">{g.category}</p>
                        <p className="mt-1 font-display text-lg font-semibold text-white">{g.name}</p>
                      </div>
                      <span className="grid h-9 w-9 place-items-center rounded-full bg-white/15 text-white backdrop-blur transition-transform duration-300 group-hover:scale-110">
                        <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M6 3h7v7M13 3 3 13" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setSelected(null)}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-brand-950/80 p-6 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[85vh] max-w-4xl overflow-hidden rounded-2xl bg-white shadow-2xl"
            >
              <img src={selected.img} alt={selected.name} className="max-h-[70vh] w-full object-contain" />
              <div className="flex items-center justify-between gap-4 p-5">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-brand-500">{selected.category}</p>
                  <p className="mt-1 font-display text-lg font-semibold text-ink-900">{selected.name}</p>
                </div>
                <button
                  onClick={() => setSelected(null)}
                  className="grid h-10 w-10 place-items-center rounded-full border border-brand-100 text-ink-600 transition-colors hover:bg-brand-50 hover:text-brand-700"
                  aria-label="Close"
                >
                  <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                    <path d="M4 4l8 8M12 4l-8 8" />
                  </svg>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
