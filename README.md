# Enweigh India website

React 18, Vite 6, React Router, Tailwind CSS, Framer Motion and Lenis.

```sh
pnpm install
pnpm dev        # http://127.0.0.1:5183
pnpm lint       # ESLint, content links, download sizes and asset references
pnpm typecheck  # TypeScript sources; existing JavaScript uses checkJs: false
pnpm build     # production output in dist/
```

The six public pages are Home, About, Products, Gallery, Downloads and Contact.
Product details open in the existing Products modal via /products?item=<slug>.
The seven retained products and shared copy are in src/data/site.js.
Curated equipment photos, alt text and thumbnails are in src/data/photos.js.
The original supplied media folder is ignored by Git; only optimized copies ship.

Vercel uses the root vercel.json for Vite output, permanent legacy-product
redirects and the SPA fallback. Do not put another Vercel config in public/.
The existing public/_redirects provides a Netlify SPA fallback.

Downloads lists three supplied brochures, the equipment photos catalogue and
three existing brief technical/service guides. Original PDFs are unchanged;
the oversized batching brochure has a compressed public copy.

See CONTENT-UPDATE-REPORT.md for media selection, removed assets, redirects,
brochure discrepancies and specifications requiring engineering confirmation.

The contact form requires the existing VITE_FORM_ENDPOINT or
VITE_WEB3FORMS_ACCESS_KEY configuration for delivery. No form submission or
browser UI testing is performed by the check/build commands.
