import SiteImage from './SiteImage.jsx'
import { Link } from 'react-router-dom'
import { COMPANY, NAV, INDUSTRIES } from '../data/site.js'

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-brand-100 bg-brand-900 pt-16 text-white">
      <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-brand-600/20 blur-[110px]" />
      <div className="container-x relative">
        <div className="grid grid-cols-1 gap-12 pb-14 md:grid-cols-12">
          {/* Brand */}
          <div className="md:col-span-4">
            <Link to="/" className="group inline-flex items-center">
              <SiteImage
                src="images/enweigh-logo-left-aligned-white.webp"
                alt="Enweigh India Pvt. Ltd."
                className="h-10 sm:h-11 md:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105 brightness-100"
              />
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-brand-200/80">
              Precision weighing &amp; feeding systems for cement, steel, chemical, glass,
              foundry and fertilizer industries. Designed, built and supported in Mumbai.
            </p>
          </div>

          {/* Nav */}
          <div className="md:col-span-2">
            <h4 className="font-mono text-[10px] uppercase tracking-[0.28em] text-brand-300/70">Explore</h4>
            <ul className="mt-4 space-y-3">
              {NAV.map((n) => (
                <li key={n.to}>
                  <Link to={n.to} className="text-sm text-brand-100/75 transition-colors hover:text-white">
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Industries */}
          <div className="md:col-span-3">
            <h4 className="font-mono text-[10px] uppercase tracking-[0.28em] text-brand-300/70">Industries</h4>
            <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2">
              {INDUSTRIES.slice(0, 8).map((ind) => (
                <li key={ind} className="text-sm text-brand-100/60">{ind}</li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-3">
            <h4 className="font-mono text-[10px] uppercase tracking-[0.28em] text-brand-300/70">Contact</h4>
            <ul className="mt-4 space-y-3 text-sm text-brand-100/80">
              <li>
                <a href={`tel:${COMPANY.phonePrimaryRaw}`} className="transition-colors hover:text-white">{COMPANY.phonePrimary}</a>
              </li>
              <li>
                <a href={`tel:${COMPANY.phoneSecondaryRaw}`} className="transition-colors hover:text-white">{COMPANY.phoneSecondary}</a>
              </li>
              <li>
                <a href={`mailto:${COMPANY.email}`} className="transition-colors hover:text-white">{COMPANY.email}</a>
              </li>
              <li className="text-brand-100/50">{COMPANY.address}</li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 py-7 text-xs text-brand-200/50 md:flex-row">
          <span>© {new Date().getFullYear()} {COMPANY.name}. All rights reserved.</span>
          <span className="font-mono uppercase tracking-[0.2em]">Precision · Reliability · Service</span>
        </div>
      </div>
    </footer>
  )
}
