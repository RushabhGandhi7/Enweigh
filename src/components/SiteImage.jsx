import { motion } from 'framer-motion'
import { IMAGE_ASSETS } from '../data/image-assets.js'

export default function SiteImage({ src, variant = 'main', sizes, animated = false, loading = 'lazy', decoding = 'async', width, height, ...props }) {
  const key = src?.startsWith('/') ? src : `/${src}`
  const asset = IMAGE_ASSETS[key]
  const candidates = variant === 'card' || variant === 'thumb' ? asset?.cardVariants : asset?.variants
  const fallback = candidates?.length ? candidates[Math.min(1, candidates.length - 1)].src : asset?.src || src
  const Element = animated ? motion.img : 'img'

  return (
    <Element
      {...props}
      src={fallback}
      srcSet={candidates?.length ? candidates.map((image) => `${image.src} ${image.width}w`).join(', ') : undefined}
      sizes={candidates?.length ? sizes || '100vw' : undefined}
      width={asset?.width || width}
      height={asset?.height || height}
      loading={loading}
      decoding={decoding}
    />
  )
}
