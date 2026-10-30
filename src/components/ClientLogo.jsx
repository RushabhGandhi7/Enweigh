import { useState } from 'react'
import { CLIENT_LOGOS } from '../data/client-logos.js'

export default function ClientLogo({ name, duplicate = false }) {
  const logo = CLIENT_LOGOS[name]
  const [failed, setFailed] = useState(false)
  return (
    <span aria-hidden={duplicate || undefined} className="flex h-8 items-center justify-center">
      {logo && !failed ? (
        <img
          src={logo.src}
          alt={duplicate ? '' : name}
          width={logo.width}
          height={logo.height}
          loading="eager"
          decoding="async"
          onError={() => setFailed(true)}
          className={`h-7 w-auto max-w-[180px] object-contain md:h-8 ${name === 'Dalmia Cement' ? 'rounded bg-[#003c71] px-2 py-0.5' : name === 'Wonder Cement' ? 'rounded bg-neutral-900 px-2 py-0.5' : ''}`}
        />
      ) : (
        <span className="whitespace-nowrap font-display text-base font-semibold text-ink-700 transition-colors duration-300 group-hover:text-brand-700 md:text-[15px]">{name}</span>
      )}
    </span>
  )
}
