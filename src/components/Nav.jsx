import BrandLogo from './BrandLogo.jsx'
import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { COMPANY, NAV } from '../data/site.js'

function LogoMark() {
  const { pathname } = useLocation()
  return (
    <Link to="/" className="group flex shrink-0 items-center gap-2.5">
      <BrandLogo
        loading="eager"
        fetchPriority={['/contact', '/downloads'].includes(pathname) ? 'high' : 'auto'}
        className="h-[52px] md:h-14 w-auto object-contain transition-transform duration-300 group-hover:scale-105 drop-shadow-xs"
      />
      <span aria-hidden="true" className="flex flex-col text-brand-800">
        <span className="text-lg font-bold leading-tight tracking-wide">ENWEIGH</span>
        <span className="text-[10px] font-semibold leading-tight tracking-[0.08em]">INDIA PVT. LTD.</span>
      </span>
    </Link>
  )
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setOpen(false), [location.pathname])
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => (document.body.style.overflow = '')
  }, [open])

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'border-b border-brand-100 bg-white/80 backdrop-blur-xl shadow-[0_8px_30px_-18px_rgba(62,45,99,0.35)]'
            : 'border-b border-transparent bg-transparent'
        }`}
      >
        <nav className="container-x flex h-[72px] items-center justify-between">
          <LogoMark />

          <div className="hidden items-center gap-1 lg:flex">
            {NAV.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `relative rounded-full px-4 py-2 text-[13.5px] font-medium transition-colors duration-300 ${
                    isActive ? 'text-brand-700' : 'text-ink-500 hover:text-brand-700'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {item.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 -z-10 rounded-full bg-brand-100"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </div>

          <div className="hidden items-center gap-3 lg:flex">
            <a
              href={`tel:${COMPANY.phonePrimaryRaw}`}
              className="font-mono text-[13px] text-ink-500 transition-colors hover:text-brand-700"
            >
              {COMPANY.phonePrimary}
            </a>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-700 to-brand-500 px-5 py-2.5 text-[13px] font-semibold text-white shadow-[0_10px_26px_-12px_rgba(94,59,163,0.8)] transition-all duration-500 hover:shadow-[0_16px_36px_-12px_rgba(94,59,163,1)] hover:-translate-y-0.5"
            >
              Get a Quote
              <svg className="h-3 w-3" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 8h10M9 4l4 4-4 4" />
              </svg>
            </Link>
          </div>

          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
            className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-[5px] rounded-full border border-brand-100 bg-white/70 lg:hidden"
          >
            <span className={`h-px w-5 bg-brand-800 transition-all duration-300 ${open ? 'translate-y-[3px] rotate-45' : ''}`} />
            <span className={`h-px w-5 bg-brand-800 transition-all duration-300 ${open ? '-translate-y-[3px] -rotate-45' : ''}`} />
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-40 flex flex-col justify-between bg-white px-6 pb-10 pt-28 lg:hidden"
          >
            <div className="flex flex-col gap-1">
              {NAV.map((item, i) => (
                <motion.div
                  key={item.to}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 + i * 0.05, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <NavLink
                    to={item.to}
                    end={item.to === '/'}
                    className={({ isActive }) =>
                      `block border-b border-brand-100 py-5 font-display text-3xl font-semibold ${
                        isActive ? 'text-brand-600' : 'text-ink-800'
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                </motion.div>
              ))}
            </div>
            <div className="space-y-2">
              <a href={`tel:${COMPANY.phonePrimaryRaw}`} className="block font-mono text-sm text-brand-600">
                {COMPANY.phonePrimary}
              </a>
              <a href={`tel:${COMPANY.phoneSecondaryRaw}`} className="block font-mono text-sm text-brand-600">
                {COMPANY.phoneSecondary}
              </a>
              <a href={`mailto:${COMPANY.email}`} className="block font-mono text-sm text-ink-500">
                {COMPANY.email}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
