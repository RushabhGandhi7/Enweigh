import { useState } from 'react'

const sources = [
  '/images/logo/enweigh-logo.svg',
  '/images/logo/enweigh-logo-512.png',
  '/images/logo/enweigh-logo-256.png',
]

export default function BrandLogo({ className = '', loading = 'lazy', fetchPriority = 'auto' }) {
  const [source, setSource] = useState(0)
  return (
    <img
      src={sources[source]}
      alt="Enweigh India Pvt. Ltd."
      width={512}
      height={524}
      loading={loading}
      decoding="async"
      fetchPriority={fetchPriority}
      onError={source < sources.length - 1 ? () => setSource((current) => current + 1) : undefined}
      className={className}
    />
  )
}
