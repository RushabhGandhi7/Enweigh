import SiteImage from '../components/SiteImage.jsx'
import { PageHeader, SectionLabel, Reveal, Button, StatsBand } from '../components/ui.jsx'
import HeroMaterialsShowcase from '../components/HeroMaterialsShowcase.jsx'
import { PILLARS, CAPABILITIES } from '../data/site.js'

export default function About() {
  return (
    <>
      <PageHeader
        eyebrow="About Us"
        title="The people behind the precision."
        lead="Enweigh India Pvt. Ltd. engineers industrial weighing and feeding systems from our base in Malad (West), Mumbai — serving cement, steel, chemical, glass, foundry and fertilizer industries across India."
      />

      {/* Story */}
      <section className="relative py-10 md:py-14">
        <div className="container-x grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <HeroMaterialsShowcase frameHeight="h-[360px] sm:h-[400px] md:h-[420px] lg:h-[440px]" />
          </Reveal>

          <div>
            <SectionLabel>Who we are</SectionLabel>
            <h2 className="mt-5 font-display text-[clamp(1.9rem,4.5vw,3rem)] font-bold leading-[1.08] tracking-tight text-ink-900">
              Simple, innovative solutions for{' '}
              <span className="text-gradient-brand">material in motion.</span>
            </h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-ink-600">
              <p>
                We go to great lengths to build machines that hold their setpoint in real,
                unforgiving plant conditions — dust, heat, vibration and 24/7 operation. Every
                weigh feeder, belt weigher and batch system is engineered around your material
                and your tonnage, not a catalogue number.
              </p>
              <p>
                The control loop is where we spend our attention: load-cell instrumentation,
                closed-loop flow control and clean integration with the SCADA, HMI or DCS you
                already run — so the number on the screen is a number you can bank on.
              </p>
              <p>
                And because an unplanned stop costs far more than the equipment, we stay with the
                installation long after handover — commissioning support, genuine spares and
                breakdown response.
              </p>
            </div>

            <div className="mt-8 flex items-center gap-3">
              <span className="inline-flex items-center gap-2.5 rounded-full border border-brand-200 bg-brand-50/70 px-4 py-2 text-xs font-semibold text-brand-800 shadow-xs">
                <SiteImage src="images/enweigh-mark.webp" alt="Enweigh" className="h-4 w-auto object-contain" />
                Designed &amp; Built in Malad (West), Mumbai
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="relative border-y border-brand-100 bg-mist py-12 md:py-16">
        <div className="container-x">
          <div className="mb-12 text-center">
            <div className="flex justify-center"><SectionLabel>What we stand for</SectionLabel></div>
            <h2 className="mx-auto mt-5 max-w-2xl font-display text-[clamp(1.9rem,4.5vw,3rem)] font-bold leading-[1.08] tracking-tight text-ink-900">
              Three promises, held to the gram.
            </h2>
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
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="relative py-12 md:py-16">
        <div className="container-x">
          <div className="max-w-2xl">
            <SectionLabel>Capabilities</SectionLabel>
            <h2 className="mt-5 font-display text-[clamp(1.9rem,4.5vw,3rem)] font-bold leading-[1.08] tracking-tight text-ink-900">
              Beyond the machine — the whole control loop.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink-500">
              A weigh feeder is only as good as the loop around it. We engineer the
              instrumentation, the controller and the integration as one coordinated system.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {CAPABILITIES.map((c, i) => (
              <Reveal key={c} delay={i * 0.04} y={20}>
                <div className="group flex h-full items-start gap-3 rounded-2xl border border-brand-100 bg-white p-5 shadow-xs transition-all duration-300 hover:border-brand-300 hover:bg-brand-50/40 hover:shadow-sm">
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-600 transition-colors group-hover:bg-brand-600 group-hover:text-white mt-0.5">
                    <svg className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M13.5 4.5 6.5 11.5 3 8" />
                    </svg>
                  </span>
                  <span className="text-sm font-semibold text-ink-800 leading-snug">{c}</span>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Stats */}
          <StatsBand align="center" className="mt-14 border-t border-brand-100 pt-12" />
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden border-t border-brand-100 bg-gradient-to-br from-brand-700 via-brand-600 to-brand-800 py-14 md:py-16 text-center text-white">
        <div className="container-x">
          <Reveal>
            <h2 className="mx-auto max-w-2xl font-display text-[clamp(1.9rem,4.5vw,3rem)] font-bold leading-[1.08] tracking-tight">
              Want to see how we'd solve your process?
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="mt-8">
            <Button to="/contact" variant="secondary" className="!border-white/30 !bg-white !text-brand-700">
              Talk to an engineer
            </Button>
          </Reveal>
        </div>
      </section>
    </>
  )
}
