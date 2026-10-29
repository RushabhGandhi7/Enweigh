import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { PRODUCTS, GALLERY, DOWNLOADS, MATERIALS } from '../src/data/site.js'
import { PHOTOS } from '../src/data/photos.js'

const root = fileURLToPath(new URL('../', import.meta.url))
const publicRoot = path.join(root, 'public')
const config = JSON.parse(fs.readFileSync(path.join(root, 'vercel.json'), 'utf8'))
const retired = config.redirects.filter((r) => r.source.startsWith('/products/') && !r.has)
  .map((r) => r.source.split('/')[2])

function checkAsset(value) {
  if (!value || /^(?:https?:|data:)/.test(value)) return
  const asset = path.join(publicRoot, value.replace(/^\//, ''))
  assert(fs.existsSync(asset), `Missing public asset: ${value}`)
}

assert.equal(PRODUCTS.length, 7, 'Retained product count')
assert.equal(retired.length, 7, 'Retired product redirect count')
const productSlugs = new Set(PRODUCTS.map((p) => p.slug))
for (const slug of retired) {
  assert(!productSlugs.has(slug), `Retired product still listed: ${slug}`)
  assert(config.redirects.some((r) => r.has?.some((h) => h.key === 'item' && h.value === slug) && r.statusCode === 301), `Missing query redirect: ${slug}`)
}
for (const material of MATERIALS) {
  assert(productSlugs.has(material.systemSlug), `Invalid material link: ${material.name}`)
  checkAsset(material.img)
  checkAsset(material.thumb)
}
for (const item of [...PRODUCTS, ...GALLERY, ...Object.values(PHOTOS).flat()]) {
  checkAsset(item.img)
  checkAsset(item.thumb)
  for (const photo of item.gallery || []) {
    checkAsset(photo.img)
    checkAsset(photo.thumb)
  }
}
for (const document of DOWNLOADS) {
  checkAsset(document.file)
  const bytes = fs.statSync(path.join(publicRoot, document.file.replace(/^\//, ''))).size
  const size = bytes >= 1024 * 1024 ? `${(bytes / 1024 / 1024).toFixed(1)} MB` : `${(bytes / 1024).toFixed(1)} KB`
  assert.equal(document.size, size, `Incorrect download size: ${document.title}`)
}
const liveContent = JSON.stringify({ PRODUCTS, GALLERY, DOWNLOADS, MATERIALS })
for (const slug of retired) {
  assert(!liveContent.toLowerCase().includes(slug), `Retired slug in live content: ${slug}`)
  assert(!liveContent.toLowerCase().includes(slug.replaceAll('-', ' ')), `Retired name in live content: ${slug}`)
}
for (const filename of fs.readdirSync(path.join(publicRoot, 'images'), { recursive: true })) {
  if (filename.endsWith('.webp')) {
    const bytes = fs.statSync(path.join(publicRoot, 'images', filename)).size
    assert(bytes < 300_000, `Oversized optimized image: ${filename}`)
  }
}
console.log(`Content checks passed: ${PRODUCTS.length} products, ${GALLERY.length} gallery images, ${DOWNLOADS.length} downloads, permanent redirects and public asset paths.`)
