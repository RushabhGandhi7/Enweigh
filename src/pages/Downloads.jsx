import { PageHeader, Reveal, SectionLabel, Button } from '../components/ui.jsx'
import { DOWNLOADS, COMPANY } from '../data/site.js'

export default function Downloads() {
  const officialBrochures = DOWNLOADS.filter((d) => d.isOfficial)
  const technicalDocs = DOWNLOADS.filter((d) => !d.isOfficial)

  return (
    <>
      <PageHeader
        eyebrow="Downloads"
        title="Official brochures, datasheets & guides."
        lead="Direct access to verified technical documentation — download complete machine brochures, control architecture schematics, and installation checklists."
      />

      {/* Featured Official Brochures */}
      <section className="relative py-10 md:py-14">
        <div className="container-x">
          <div className="mb-10">
            <SectionLabel>Verified Literature</SectionLabel>
            <h2 className="mt-4 font-display text-[clamp(1.8rem,4vw,2.6rem)] font-bold tracking-tight text-ink-900">
              Official Company <span className="text-gradient-brand">Brochures</span>
            </h2>
            <p className="mt-3 max-w-2xl text-base text-ink-500">
              Complete engineering brochures directly from Enweigh India Pvt. Ltd., including dimensional diagrams, mechanical drive specs, and controller electronics.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-7 lg:grid-cols-2">
            {officialBrochures.map((b, i) => (
              <Reveal key={b.title} delay={i * 0.1} y={30}>
                <div className="group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border-2 border-brand-200/80 bg-gradient-to-br from-white via-brand-50/30 to-brand-100/40 p-8 shadow-[0_20px_50px_-25px_rgba(62,45,99,0.25)] transition-all duration-500 hover:border-brand-400 hover:shadow-[0_30px_70px_-25px_rgba(62,45,99,0.4)]">
                  <div className="absolute right-0 top-0 h-44 w-44 rounded-full bg-brand-300/20 blur-3xl transition-transform duration-700 group-hover:scale-125" />

                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-300 bg-brand-100/80 px-3.5 py-1 font-mono text-[11px] font-semibold uppercase tracking-wider text-brand-800">
                        <span className="h-2 w-2 rounded-full bg-brand-600 animate-pulse" />
                        {b.badge}
                      </span>
                      <span className="font-mono text-xs font-semibold text-brand-600">{b.size} · {b.type}</span>
                    </div>

                    <h3 className="mt-5 font-display text-2xl font-bold text-ink-900 transition-colors group-hover:text-brand-800">
                      {b.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-ink-600">
                      {b.desc}
                    </p>
                    {b.date && <p className="mt-2 text-xs text-ink-500">Published: {b.date}</p>}

                    <div className="mt-6 flex flex-wrap gap-2 text-xs font-medium text-brand-700">
                      {b.tags.map((tag) => <span key={tag} className="rounded-lg bg-white/80 px-3 py-1.5 shadow-sm">{tag}</span>)}
                    </div>
                  </div>

                  <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-brand-200/60 pt-6">
                    <a
                      href={b.file}
                      download
                      className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-700 to-brand-500 px-6 py-3 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
                    >
                      <span>Download PDF</span>
                      <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M8 3v8M5 8l3 3 3-3M3 13h10" />
                      </svg>
                    </a>
                    <a
                      href={b.file}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white px-5 py-3 text-sm font-semibold text-brand-700 transition-all duration-300 hover:border-brand-400 hover:bg-brand-50"
                    >
                      <span>Open in Browser</span>
                      <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M6 3h7v7M13 3 3 13" />
                      </svg>
                    </a>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Datasheets & Guidelines */}
      <section className="relative border-t border-brand-100 bg-mist py-12 md:py-16">
        <div className="container-x">
          <div className="mb-10">
            <SectionLabel>Technical Library</SectionLabel>
            <h2 className="mt-4 font-display text-[clamp(1.8rem,4vw,2.4rem)] font-bold tracking-tight text-ink-900">
              Datasheets &amp; Field Engineering Guides
            </h2>
            <p className="mt-2 text-sm text-ink-500">
              Quick reference guides for system engineers, instrumentation teams, and plant maintenance.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {technicalDocs.map((d, i) => (
              <Reveal key={d.title} delay={(i % 3) * 0.08} y={24}>
                <div className="group flex h-full flex-col justify-between rounded-2xl border border-brand-100 bg-white p-6 shadow-sm transition-all duration-500 hover:border-brand-300 hover:shadow-[0_20px_45px_-20px_rgba(94,59,163,0.3)]">
                  <div>
                    <div className="flex items-center justify-between gap-3">
                      <span className="rounded-md bg-brand-50 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-brand-700">
                        {d.badge || d.type}
                      </span>
                      <span className="text-xs font-mono text-ink-400">{d.size}</span>
                    </div>

                    <h3 className="mt-4 font-display text-lg font-semibold text-ink-900 transition-colors group-hover:text-brand-700">
                      {d.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-500">
                      {d.desc}
                    </p>
                    {d.date && <p className="mt-2 text-xs text-ink-500">Published: {d.date}</p>}
                  </div>

                  <div className="mt-6 flex items-center justify-between border-t border-brand-50 pt-4">
                    <a
                      href={d.file}
                      download
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 transition-colors hover:text-brand-500"
                    >
                      Download
                      <svg className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-y-0.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M8 3v8M5 8l3 3 3-3M3 13h10" />
                      </svg>
                    </a>
                    <a
                      href={d.file}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-medium text-ink-400 transition-colors hover:text-brand-700"
                    >
                      View
                    </a>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Need specific drawings / specs */}
          <Reveal className="mt-14 rounded-3xl border border-brand-200 bg-white p-8 text-center shadow-sm md:p-12">
            <h3 className="font-display text-2xl font-bold text-ink-900">Need GA drawings or a custom quotation?</h3>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-ink-500">
              If your engineering team requires specific general arrangement (GA) drawings, foundation layout plans, or electrical single-line diagrams, reach out directly.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
              <Button to="/contact">Request Engineering Drawings</Button>
              <a
                href={`mailto:${COMPANY.email}?subject=Drawing%20and%20Datasheet%20Request`}
                className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white px-6 py-3.5 text-sm font-semibold text-brand-700 transition-all hover:bg-brand-50"
              >
                Email {COMPANY.email}
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
