# Enweigh India — New Multi-Page Website

A proper multi-page site for **Enweigh India Pvt. Ltd.** (industrial weighing & feeding
systems), in a clean **white + purple** theme pulled straight from the Enweigh logo
(`#3E2D63` family). Scroll animations throughout via Framer Motion + Lenis.

## Pages

| Route | Page | Source |
| --- | --- | --- |
| `/` | Home — hero, featured systems, why us, stats, process, CTA | `src/pages/Home.jsx` |
| `/about` | About Us — story, pillars, capabilities, industries, stats | `src/pages/About.jsx` |
| `/products` | Products — all 14 systems with category filter | `src/pages/Products.jsx` |
| `/gallery` | Gallery — masonry grid + lightbox | `src/pages/Gallery.jsx` |
| `/downloads` | Downloads — brochures, datasheets & guides | `src/pages/Downloads.jsx` |
| `/contact` | Contact — enquiry form + direct lines | `src/pages/Contact.jsx` |

## Stack

- **React 18** + **Vite 6** + **React Router 6**
- **Tailwind CSS v4** (custom `@theme` tokens: `brand-50 … brand-950`)
- **Framer Motion** (word-reveal, scroll reveal, counters, tilt, layout animations)
- **Lenis** (inertial smooth scrolling)

## Run it

```bash
pnpm install
pnpm dev        # http://127.0.0.1:5183
pnpm build      # outputs static site to dist/
pnpm preview    # serve the production build (with SPA fallback)
```

**Deploy:** `dist/` is portable (relative paths). For clean URLs (no `.html`), SPA fallback
is configured already — Netlify uses `public/_redirects`, Vercel uses `public/vercel.json`.
On Apache (your current enweigh.in host) add to `.htaccess`:

```apache
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteRule . /index.html [L]
```

> **DeepSeek Harness note:** inside this harness, `esbuild`'s Go binary hangs on `open()`
> when its working directory is the sandboxed workspace. This is a sandbox quirk, *not* a
> code problem — on your normal terminal or any CI/deploy platform `pnpm dev`/`build` work
> directly. Inside the harness, run from a copy outside the workspace:
> `rsync -a --exclude node_modules ./ /tmp/enweigh-site && cd /tmp/enweigh-site`.

## Where everything lives

| What | File |
| --- | --- |
| **All copy, products, nav, stats, contact, downloads** | [`src/data/site.js`](src/data/site.js) |
| Colors / fonts / design tokens | [`src/index.css`](src/index.css) (the `@theme` block) |
| Shared nav / footer / buttons / reveal | [`src/components/`](src/components/) |
| Pages | [`src/pages/`](src/pages/) |
| Images | `public/images/` |
| Downloads (placeholder PDFs) | `public/downloads/` |

## ⚠️ Verify before publishing

1. **Machine images** — I used the photos from your current site as placeholders. Replace the
   files in `public/images/` with your own per-machine shots (keep the same filenames, or
   update the `img:` paths in `src/data/site.js`).
2. **Stats** — now sourced, not invented:
   - **Founded 2021** — incorporated 29 Nov 2021 (MCA CIN `U74999MH2021PTC372422`, ROC Mumbai).
   - **14 product systems** — from your own products page.
   - **6 core industries** — cement, steel, chemical, glass, foundry, fertilizer (your About page).
   - **10–50 team** — from SignalHire's directory (a third-party estimate; adjust if your actual
     headcount differs). All editable in the `STATS` array in `src/data/site.js`.
3. **Product tags** — I used *qualitative* capability tags (no false numeric specs). Add real
   datasheet values if you want hard numbers.
4. **Downloads** — the 8 PDFs in `public/downloads/` are **placeholder documents** (title +
   one-line text). Swap in your real brochures/datasheets and update `src/data/site.js`.
5. **Contact form** — opens the visitor's email client via `mailto:` (no backend). For a
   server-side form, wire `Contact.jsx` to your form endpoint/Formspree.
6. **Logo** — I use a purple "E" monogram in the nav/footer (your logo is white-on-transparent
   and vanishes on a white site). Add a purple/colored version to `public/images/logo.png`
   and swap the marks in `Nav.jsx` / `Footer.jsx` if you prefer the real logo.

Every motion respects `prefers-reduced-motion`.
