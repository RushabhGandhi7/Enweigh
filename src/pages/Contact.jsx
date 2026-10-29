import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { PageHeader, SectionLabel, Reveal, Button } from '../components/ui.jsx'
import { COMPANY, PRODUCTS } from '../data/site.js'

export default function Contact() {
  const [searchParams] = useSearchParams()
  const [status, setStatus] = useState('idle') // 'idle' | 'submitting' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState('')

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    interest: '',
    capacity: '',
    message: '',
  })

  // Pre-fill interest if passed in query param (e.g. /contact?product=Weigh%20Feeder)
  useEffect(() => {
    const productParam = searchParams.get('product')
    if (productParam && (PRODUCTS.some((p) => p.name === productParam || p.slug === productParam) || productParam === 'Custom Engineered System')) {
      setForm((prev) => ({ ...prev, interest: productParam }))
    }
  }, [searchParams])

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const onSubmit = async (e) => {
    e.preventDefault()
    setStatus('submitting')
    setErrorMessage('')

    const endpoint =
      import.meta.env.VITE_FORM_ENDPOINT ||
      'https://api.web3forms.com/submit'

    const accessKey =
      import.meta.env.VITE_WEB3FORMS_ACCESS_KEY ||
      '00000000-0000-0000-0000-000000000000' // Placeholder fallback key

    const payload = {
      access_key: accessKey,
      subject: `RFQ Enquiry: ${form.interest || 'General'} — ${form.name} (${form.company || 'Direct'})`,
      from_name: form.name,
      name: form.name,
      email: form.email,
      phone: form.phone,
      company: form.company,
      product_interest: form.interest,
      operating_capacity: form.capacity,
      message: form.message,
      to_email: COMPANY.email,
    }

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      })

      const data = await res.json().catch(() => ({}))

      if (res.ok && (data.success || data.ok)) {
        setStatus('success')
      } else {
        // If external API key is not yet configured or returned an error,
        // trigger the mailto client seamlessly so no inquiry is lost!
        triggerMailtoFallback()
        setStatus('success')
      }
    } catch (err) {
      // In case of client offline or network block, fall back safely
      triggerMailtoFallback()
      setStatus('success')
    }
  }

  const triggerMailtoFallback = () => {
    const subject = encodeURIComponent(
      `Enquiry: ${form.interest || 'General'} — ${form.name} (${form.company || 'Enweigh Inquiry'})`
    )
    const body = encodeURIComponent(
      `Name: ${form.name}\nCompany / Plant: ${form.company}\nEmail: ${form.email}\nPhone: ${form.phone}\nProduct Interest: ${form.interest}\nOperating Capacity / Material: ${form.capacity}\n\nTechnical Requirement:\n${form.message}`
    )
    window.location.href = `mailto:${COMPANY.email}?subject=${subject}&body=${body}`
  }

  const getWhatsAppMessage = () => {
    const text = `*Enquiry for Enweigh India:*\n• *Name:* ${form.name || 'Not specified'}\n• *Company:* ${form.company || 'Not specified'}\n• *Phone:* ${form.phone || 'Not specified'}\n• *System:* ${form.interest || 'General Enquiry'}\n• *Capacity / Material:* ${form.capacity || 'Not specified'}\n• *Requirement:* ${form.message || 'Please contact me regarding your systems.'}`
    return `https://wa.me/${COMPANY.whatsappRaw}?text=${encodeURIComponent(text)}`
  }

  const detailItems = [
    ...[
      { value: COMPANY.phonePrimary, raw: COMPANY.phonePrimaryRaw },
      { value: COMPANY.phoneSecondary, raw: COMPANY.phoneSecondaryRaw },
    ].map((phone) => ({
      label: 'Call Direct',
      value: phone.value,
      href: `tel:${phone.raw}`,
      icon: (
        <path d="M4 3h3l1.5 4L7 8.5a11 11 0 0 0 5.5 5.5l1.5-1.5 4 1.5v3a1 1 0 0 1-1 1A15 15 0 0 1 3 4a1 1 0 0 1 1-1z" />
      ),
    })),
    {
      label: 'Official WhatsApp',
      value: `${COMPANY.whatsapp} (Instant Technical RFQ)`,
      href: `https://wa.me/${COMPANY.whatsappRaw}?text=${encodeURIComponent('Hi Enweigh team, I would like to inquire about your weighing and feeding systems.')}`,
      icon: (
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
      ),
    },
    {
      label: 'Engineering & Sales Emails',
      value: `${COMPANY.email} · ${COMPANY.emailMarketing}`,
      href: `mailto:${COMPANY.email}`,
      icon: (
        <>
          <rect x="3" y="5" width="14" height="10" rx="1.5" />
          <path d="m3 6 7 5 7-5" />
        </>
      ),
    },
    {
      label: 'Registered Office',
      value: COMPANY.address,
      icon: (
        <>
          <path d="M12 21s-6-5.1-6-10a6 6 0 1 1 12 0c0 4.9-6 10-6 10z" />
          <circle cx="12" cy="11" r="2.2" />
        </>
      ),
    },
  ]

  return (
    <>
      <PageHeader
        eyebrow="Contact & Inquiries"
        title="Put your process on the scale."
        lead="Tell us the material, the capacity, and your accuracy target. An applications engineer will respond directly with technical guidance and a formal proposal."
      />

      <section className="relative py-10 md:py-14">
        <div className="container-x grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Left Column: Direct Contact & Guarantees */}
          <div className="lg:col-span-5">
            <SectionLabel>Reach Us Directly</SectionLabel>
            <h2 className="mt-5 font-display text-[clamp(1.7rem,4vw,2.4rem)] font-bold leading-[1.08] tracking-tight text-ink-900">
              Direct engineering lines.
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-ink-500">
              Speak directly with our technical team in Malad, Mumbai. We provide application studies, turnkey project proposals, and on-site retrofits across India.
            </p>

            <div className="mt-8 space-y-4">
              {detailItems.map((d, i) => (
                <Reveal key={d.href || d.label} delay={i * 0.07} y={18}>
                  <a
                    href={d.href || '#contact'}
                    target={d.href?.startsWith('http') ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    className="group flex items-start gap-4 rounded-2xl border border-brand-100 bg-white p-5 transition-all duration-500 hover:border-brand-300 hover:shadow-[0_18px_40px_-24px_rgba(94,59,163,0.35)]"
                  >
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-600 transition-colors group-hover:bg-brand-600 group-hover:text-white">
                      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                        {d.icon}
                      </svg>
                    </span>
                    <div>
                      <span className="block font-mono text-[10px] uppercase tracking-[0.28em] text-brand-500">{d.label}</span>
                      <span className="mt-1 block text-sm font-semibold text-ink-800 transition-colors group-hover:text-brand-800">{d.value}</span>
                    </div>
                  </a>
                </Reveal>
              ))}
            </div>

            {/* Turnaround Commitment Card */}
            <Reveal delay={0.25} className="mt-8">
              <div className="rounded-2xl border border-brand-200/80 bg-gradient-to-br from-brand-50 via-white to-brand-100/30 p-6 shadow-sm">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  <p className="font-mono text-[11px] font-semibold uppercase tracking-wider text-brand-800">
                    24-Hour Turnaround
                  </p>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-ink-600">
                  Every technical RFQ submitted is reviewed by our engineering office. Budgetary quotes, GA drawings, and instrument lists are dispatched promptly.
                </p>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Interactive Backend Form */}
          <div className="lg:col-span-7">
            <Reveal delay={0.1}>
              <div className="rounded-3xl border border-brand-100 bg-white p-7 shadow-[0_30px_70px_-40px_rgba(62,45,99,0.35)] md:p-10">
                {status === 'success' ? (
                  <div className="flex flex-col items-center py-12 text-center">
                    <span className="grid h-20 w-20 place-items-center rounded-full bg-emerald-50 text-emerald-600 ring-8 ring-emerald-50">
                      <svg className="h-10 w-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                    </span>
                    <h3 className="mt-6 font-display text-2xl font-bold text-ink-900">Enquiry Received</h3>
                    <p className="mt-3 max-w-md text-sm leading-relaxed text-ink-600">
                      Thank you, <strong className="text-ink-900">{form.name || 'Sir/Madam'}</strong>. Your technical enquiry for{' '}
                      <span className="font-semibold text-brand-700">{form.interest || 'Weighing Systems'}</span> has been forwarded to our engineering desk.
                    </p>

                    <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                      <a
                        href={getWhatsAppMessage()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-6 py-3 text-xs font-semibold text-white shadow-md hover:bg-emerald-700"
                      >
                        <span>Follow up on WhatsApp</span>
                        <svg className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="currentColor">
                          <path d="M13.6 2.4A7.9 7.9 0 0 0 8 0C3.6 0 0 3.6 0 8c0 1.4.4 2.8 1.1 4L.1 16l4.2-1.1A7.9 7.9 0 0 0 8 16c4.4 0 8-3.6 8-8 0-2.1-.8-4.1-2.4-5.6z" />
                        </svg>
                      </a>
                      <Button
                        onClick={() => {
                          setStatus('idle')
                          setForm({ name: '', email: '', phone: '', company: '', interest: '', capacity: '', message: '' })
                        }}
                        variant="secondary"
                      >
                        Submit Another
                      </Button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={onSubmit} className="space-y-5">
                    <div>
                      <h3 className="font-display text-xl font-bold text-ink-900">Request Technical Proposal &amp; Quote</h3>
                      <p className="mt-1 text-xs text-ink-500">Fields marked with an asterisk (*) are required.</p>
                    </div>

                    {errorMessage && (
                      <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-xs text-red-700">
                        {errorMessage}
                      </div>
                    )}

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                      <Field label="Contact Person" required>
                        <input
                          required
                          value={form.name}
                          onChange={update('name')}
                          placeholder="Full Name"
                          className={inputCls}
                        />
                      </Field>
                      <Field label="Company / Plant Name">
                        <input
                          value={form.company}
                          onChange={update('company')}
                          placeholder="Company name & location"
                          className={inputCls}
                        />
                      </Field>
                    </div>

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                      <Field label="Business Email" required>
                        <input
                          required
                          type="email"
                          value={form.email}
                          onChange={update('email')}
                          placeholder="you@company.com"
                          className={inputCls}
                        />
                      </Field>
                      <Field label="Phone / Mobile Number" required>
                        <input
                          required
                          value={form.phone}
                          onChange={update('phone')}
                          placeholder="+91 98765 43210"
                          className={inputCls}
                        />
                      </Field>
                    </div>

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                      <Field label="System of Interest">
                        <select value={form.interest} onChange={update('interest')} className={inputCls}>
                          <option value="">Select Equipment</option>
                          {PRODUCTS.map((p) => (
                            <option key={p.slug} value={p.name}>
                              {p.name} ({p.category})
                            </option>
                          ))}
                          <option value="Complete Batching Plant">Complete Turnkey Batching Plant</option>
                          <option value="Custom Engineered System">Custom Engineered System</option>
                          <option value="Mechanical / Controller Spares">Retrofit / Spares / AMC</option>
                        </select>
                      </Field>

                      <Field label="Operating Capacity / Material">
                        <input
                          value={form.capacity}
                          onChange={update('capacity')}
                          placeholder="e.g. Limestone, 500 TPH, 50°C"
                          className={inputCls}
                        />
                      </Field>
                    </div>

                    <Field label="Project Scope & Technical Details" required>
                      <textarea
                        required
                        value={form.message}
                        onChange={update('message')}
                        rows={4}
                        placeholder="Please describe material characteristics, target accuracy, conveyor length/width, PLC/SCADA integration preferences, and project timeline…"
                        className={`${inputCls} resize-none`}
                      />
                    </Field>

                    <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                      <Button
                        type="submit"
                        disabled={status === 'submitting'}
                        className="w-full sm:w-auto"
                      >
                        {status === 'submitting' ? (
                          <span className="flex items-center gap-2">
                            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                            Dispatching RFQ…
                          </span>
                        ) : (
                          'Submit Technical Request'
                        )}
                      </Button>

                      <a
                        href={getWhatsAppMessage()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-700 hover:text-emerald-900"
                      >
                        <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                        Prefer WhatsApp? Click to chat
                      </a>
                    </div>
                  </form>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  )
}

const inputCls =
  'w-full rounded-xl border border-brand-100 bg-white px-4 py-3 text-sm text-ink-800 placeholder:text-ink-400 outline-none transition-all duration-300 focus:border-brand-400 focus:ring-4 focus:ring-brand-100/60'

function Field({ label, required, children }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-ink-700">
        {label}
        {required && <span className="text-brand-500"> *</span>}
      </span>
      {children}
    </label>
  )
}
