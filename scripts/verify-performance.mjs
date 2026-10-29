import assert from 'node:assert/strict'
import fs from 'node:fs'
import crypto from 'node:crypto'
import { PRODUCTS, GALLERY, DOWNLOADS, MATERIALS, CLIENTS, COMPANY } from '../src/data/site.js'
import { IMAGE_ASSETS } from '../src/data/image-assets.js'
import { CLIENT_LOGOS } from '../src/data/client-logos.js'

const expected = JSON.parse(fs.readFileSync(new URL('./performance-baseline.json', import.meta.url)))
const normalize = (value) => Array.isArray(value) ? value.map(normalize) : value && typeof value === 'object'
  ? Object.fromEntries(Object.entries(value).filter(([key]) => !['img', 'thumb', 'width', 'height'].includes(key)).map(([key, child]) => [key, normalize(child)])) : value
const hash = (value) => crypto.createHash('sha256').update(JSON.stringify(value)).digest('hex')
const config = JSON.parse(fs.readFileSync('vercel.json'))
assert.equal(hash(config.redirects), expected.redirects, 'Retired-product redirects changed')
assert.equal(crypto.createHash('sha256').update(fs.readFileSync('src/components/EnweighConveyor.tsx')).digest('hex'), expected.conveyor, 'Conveyor changed')
assert.equal(hash(normalize({ PRODUCTS, GALLERY, DOWNLOADS, MATERIALS })), expected.editorial, 'Editorial content changed')
assert.equal(hash(CLIENTS), expected.clients, 'Client list changed')

function assetExists(src) {
  assert(fs.existsSync(`public${src}`), `Missing image: ${src}`)
}
for (const [key, image] of Object.entries(IMAGE_ASSETS)) {
  assert.equal(key, image.src)
  assetExists(image.src)
  assert(image.width > 0 && image.width <= 1920 && image.height > 0)
  for (const candidate of image.variants) assetExists(candidate.src)
  for (const candidate of image.cardVariants) {
    assetExists(candidate.src)
    assert(candidate.width <= 600)
    assert(fs.statSync(`public${candidate.src}`).size < 80_000, `Oversized thumbnail: ${candidate.src}`)
  }
}
for (const [name, logo] of Object.entries(CLIENT_LOGOS)) {
  assert(CLIENTS.includes(name), `Unknown client: ${name}`)
  assetExists(logo.src)
  assert(logo.width > 0 && logo.height > 0)
  if (logo.src.endsWith('.svg')) {
    const svg = fs.readFileSync(`public${logo.src}`, 'utf8')
    assert(!/<(?:script|metadata|foreignObject)\b|\bon\w+=|javascript:/i.test(svg), `Unsafe logo SVG: ${name}`)
  } else assert(logo.height <= 64)
}
assert.equal(COMPANY.phonePrimary, '+91 98692 64635')
assert.equal(COMPANY.phonePrimaryRaw, '+919869264635')
assert.equal(COMPANY.phoneSecondary, '+91 83560 73597')
assert.equal(COMPANY.phoneSecondaryRaw, '+918356073597')
assert.equal(COMPANY.whatsappRaw, '919869264635')
for (const file of ['src/components/Footer.jsx', 'src/components/Nav.jsx', 'src/pages/Home.jsx', 'src/pages/Contact.jsx']) {
  const source = fs.readFileSync(file, 'utf8')
  assert(source.includes('COMPANY.phoneSecondary') && source.includes('COMPANY.phoneSecondaryRaw'), `Missing second sales number: ${file}`)
}
for (const source of ['/images/:path*', '/downloads/:path*', '/fonts/:path*']) {
  assert(config.headers.some((rule) => rule.source === source && rule.headers.some((h) => h.key === 'Cache-Control' && h.value === 'public, max-age=604800, stale-while-revalidate=86400')))
}
console.log(`Performance checks passed: responsive image paths, ${Object.keys(CLIENT_LOGOS).length} client logos, both sales numbers, unchanged conveyor, redirects and editorial content.`)
