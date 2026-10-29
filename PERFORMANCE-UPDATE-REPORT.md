# Image performance, client logos and sales number — 30 October 2026

## 1. Image-loading causes and changes

- The five legacy material photos were 842,265–1,041,210 bytes each. Cards also used those full-size images instead of card variants.
- The shared header image was 249,603 bytes; the small About mark was 297,940 bytes; the 64px favicon request fetched a 467,631-byte original.
- Several product cards still selected full equipment images. Responsive srcsets, sizes, dimensions and async decoding were inconsistent or absent.
- Static images, downloads and fonts had no explicit cache policy. The Google Fonts stylesheet added an external render-blocking request.

Legacy photos and brand images now use WebP. Full images are below 200,000 bytes; card/thumbnail candidates below 80,000 bytes. Responsive widths include 320, 480, 600, 768 and 1200 where the source resolution warrants them, plus the capped full version. Equipment images are capped at a 1792px long edge; material images retain their original 1200px width. Logos match their display dimensions at up to 2x. Aspect ratios and image subjects are preserved.

The shared SiteImage component renders ordinary img/srcset/sizes attributes (or the existing Framer Motion image). Every image has dimensions and async decoding. First visible page images are eager and high priority; below-fold images are lazy. Cards and galleries select thumbnail candidates. Large product/lightbox images are mounted only when opened. Both carousels keep their existing one-visible-main-slide rendering and animation behavior; their five visible thumbnail controls use tiny assets. Conveyor and client strip are not lazy-loaded.

The existing Inter, Sora and JetBrains Mono font files are self-hosted from Google's official font service, with their original weight ranges, subsets and font-display: swap. Only Inter Latin and Sora Latin are preloaded. Licences are in public/fonts/licenses/. No third-party JavaScript is loaded at startup. PDFs remain click-only download links; no videos, PDF viewers or embeds fetch on page load. Existing animation libraries are actively used on the homepage and remain intact. No route-loading behavior was changed.

Root vercel.json now gives /images/*, /downloads/* and /fonts/*:
`Cache-Control: public, max-age=604800, stale-while-revalidate=86400`.
No immutable/year-long caching was added, and no public/vercel.json was recreated.

### Before/after image weights

Public image files, including all responsive sizes, icons and the eight new client logos:
**13,391,572 → 12,570,589 bytes** (13.39 → 12.57 MB; 6.1% smaller).
This is the deployed image collection, not bytes fetched in one visit: individual pages load only the sizes selected for their viewport. The initial clinker hero file drops from 873,677 to 186,104 bytes; its 768px variant is 129,816 bytes. Cards are below 80 KB.

Largest content-image file reachable on each page, including an opened product/lightbox or later carousel slide; browser-selected responsive files can be smaller. Icons are reported separately:

| Page | Before, bytes | After, bytes |
| --- | --- | --- |
| Home | 1,041,210 (`images/materials/iron-ore.jpg`) | 194,736 (`images/materials/iron-ore.webp`) |
| About | 1,041,210 (`images/materials/iron-ore.jpg`) | 194,736 (`images/materials/iron-ore.webp`) |
| Products | 298,534 (`/images/weigh-feeder/multi-feeder-control-panels.webp`) | 192,618 (`/images/belt-weigher/belt-weigher-installed.webp`) |
| Gallery | 298,534 (`/images/weigh-feeder/multi-feeder-control-panels.webp`) | 192,618 (`/images/belt-weigher/belt-weigher-installed.webp`) |
| Downloads | 249,603 (`images/enweigh-logo-left-aligned.png`) | 18,936 (`/images/enweigh-logo-left-aligned.webp`) |
| Contact | 249,603 (`images/enweigh-logo-left-aligned.png`) | 18,936 (`/images/enweigh-logo-left-aligned.webp`) |

Shared favicon: 467,631 → 5,168 bytes. Separate 192px Apple touch icon: 20,944 bytes.

### All pre-change public/code images over 150,000 bytes

Paths below are relative to public/. This includes oversized unused files so the inventory is complete.

| Image | Before, bytes (descending) | Usage |
| --- | ---: | --- |
| `images/materials/iron-ore.jpg` | 1,041,210 | Home and About carousels; Home material cards |
| `images/materials/glass.jpg` | 955,134 | Home and About carousels; Home material cards |
| `images/materials/limestone.jpg` | 940,348 | Home and About carousels; Home material cards |
| `images/materials/clinker.jpg` | 873,677 | Home and About carousels; Home material cards |
| `images/materials/coal.jpg` | 842,265 | Home and About carousels; Home material cards |
| `enweigh-logo.png` | 467,631 | Unused legacy public asset; not currently rendered |
| `favicon.png` | 467,631 | Browser favicon and old Apple touch icon; all pages |
| `images/ENWEIGH Geometric Purple Logo.png` | 467,631 | Unused legacy public asset; not currently rendered |
| `images/enweigh-logo.png` | 467,631 | COMPANY.logo metadata; no current rendered component |
| `images/weigh-feeder/multi-feeder-control-panels.webp` | 298,534 | Product detail photo selector and Gallery/lightbox |
| `images/enweigh-mark.png` | 297,940 | About page identity badge |
| `images/rod-gates/rod-gate-front-view.webp` | 286,534 | Gallery and its lightbox |
| `images/weigh-feeder/installed-feeder-weigh-frame.webp` | 278,938 | Product detail photo selector and Gallery/lightbox |
| `images/belt-weigher/belt-weigher-idler-frame.webp` | 274,400 | Belt Weigher product photo selector and Gallery/lightbox |
| `images/belt-weigher/belt-weigher-installed.webp` | 270,910 | Belt Weigher product photo selector and Gallery/lightbox |
| `images/rod-gates/rod-gate-side-view.webp` | 269,278 | Gallery and its lightbox |
| `images/weigh-feeder/installed-feeder-granular-material.webp` | 255,766 | Product detail photo selector and Gallery/lightbox |
| `images/enweigh-logo-left-aligned.png` | 249,603 | Shared header, all pages |
| `images/enweigh-nav-lockup.png` | 249,603 | Unused legacy public asset; not currently rendered |
| `images/weigh-feeder/installed-feeder-dark-material.webp` | 246,216 | Product detail photo selector and Gallery/lightbox |
| `images/weigh-feeder/installed-feeder-drive-detail.webp` | 233,212 | Product detail photo selector and Gallery/lightbox |
| `images/hopper-weighing/dummy-load-cell-installation.webp` | 228,710 | Hopper/batching detail photos and Gallery/lightbox |
| `images/banner-01.jpg` | 226,111 | Unused legacy public asset; not currently rendered |
| `images/hopper-weighing/live-load-cell-installation.webp` | 207,656 | Hopper/batching detail photos and Gallery/lightbox |
| `images/p03.jpg` | 154,528 | Batching product, Home featured card, Gallery/lightbox |

Superseded legacy originals were archived in the Git-ignored
`.asset-originals/2026-10-30/public/` after all source references were migrated.
Original equipment WebPs are backed up there too. Unreferenced generated
sizes were removed from public/. No live reference points to an archived file.
Original supplied media remains untouched. New size variants account for why
the total collection reduces less dramatically than individual page downloads.

## 2. Client logo provenance

No separate client-logo files were supplied in the repo or the source-media folder. Eight logos were downloaded from official company sites, cleaned and stored locally. SVG scripts/metadata were removed; raster logos were cropped to their content and exterior white backgrounds made transparent, without recolouring the marks. Raster heights are at most 64px and each is below 20 KB. Logos retain their wording, colours and proportions.

| Existing client | Local file | Source / fallback reason |
| --- | --- | --- |
| Tata Steel | `/images/clients/tata-steel.svg` | [Official asset](https://www.tatasteelnederland.com/themes/custom/cwr__theme/logo.svg) |
| ACC Limited | `/images/clients/acc-limited.webp` | [Official asset](https://www.acclimited.com/-/media/Project/ACC-Limited/Common/icons/ACC-Footer-1.ashx) |
| Ambuja Cements | Text fallback | [Official site](https://www.ambujacement.com/); observed header asset could not be downloaded reliably (DNS/network failure). |
| Dalmia Cement | `/images/clients/dalmia-cement.svg` | [Official asset](https://www.dalmiacement.com/assets/images/logo/dalmia-bharat-cement.svg) |
| Shree Cement | `/images/clients/shree-cement.webp` | [Official asset](https://www.shreecement.com/public/front_assets/images/logo.jpg) |
| Jindal Stainless | `/images/clients/jindal-stainless.webp` | [Official asset](https://www.jindalstainless.com/wp-content/themes/jsl/assets/images/JSL.png) |
| Lloyds Metals & Energy | `/images/clients/lloyds-metals-energy.svg` | [Official asset](https://lloyds.in/wp-content/themes/lloyds-metals-new/img/lloyds-metals-logo.svg) |
| Nuvoco Vistas Corporation | `/images/clients/nuvoco-vistas-corporation.webp` | [Official asset](https://nuvoco.com/static/media/logo.4ea493e1b272e146e560.png) |
| Wonder Cement | Text fallback | [Official site](https://www.wondercement.com/en); verified header/footer assets are white-on-transparent, unsuitable for the white strip. No recolouring or substitute logo used. |
| India Cements | `/images/clients/india-cements.webp` | [Official asset](https://www.indiacements.co.in/images/india-cements-logo.png) |

Tata Steel's Indian site returned 403, so its official Netherlands site's Tata Steel wordmark was used. Wonder's white logo and the unsuitable generic metadata tile were not substituted or recoloured. Ambuja's attempted header asset was:
https://www.ambujacement.com/-/media/Project/AmbujaLimited/Common/Logo/Ambuja-Footer-1.ashx

The strip keeps its original white surface, spacing, original computed row heights (52px mobile, 50.5px desktop), four repeated lists, marquee timing and hover behavior. Logos use vertically centered fixed-height boxes (28px mobile, 32px desktop), normal brand colours and contain sizing. Each has intrinsic width/height, eager loading and async decoding. The three duplicate copies have empty image alt text and are aria-hidden. Missing/unloadable logos fall back to the real company name in the same slot.

## 3. Second sales number

Added **+91 83560 73597** with **tel:+918356073597** to the Contact direct-call cards, footer, mobile menu and Home click-to-call CTA, matching each existing link style. **+91 98692 64635** and **tel:+919869264635** remain unchanged.

The desktop header keeps only the original number: adding a second number risks pushing the navigation/quote button at 1280px, and the request explicitly allows this safe exception. Existing WhatsApp links still use the original number; no WhatsApp capability was assumed for the added telephone line. No phone-bearing JSON-LD or metadata exists to amend. Brochure PDFs and download descriptions were not edited.

## Verification and scope

### Production-build follow-up

The current output was rebuilt with `pnpm build` and served using
`pnpm preview --host 127.0.0.1 --port 4173 --strictPort` at
http://127.0.0.1:4173/. The served HTML references compiled, hashed JS/CSS;
it contains neither the Vite development client nor the raw `src/main.jsx`
entry. This is a production-build preview, not the dev server on port 5183.

Production HTTP checks returned the expected MIME types and exact static
file sizes: clinker 480px 62,040 bytes, clinker 768px 129,816 bytes,
clinker full 186,104 bytes, weigh-feeder thumbnail 17,220 bytes and favicon
5,168 bytes. Across all 89 card candidates, the largest is 77,212 bytes;
the largest mapped full image is 194,736 bytes. These checks inspect served
assets and source loading conditions, not browser render/LCP performance.

Dev-only behavior: Vite's cold startup, dependency preparation and on-demand
JavaScript/CSS transforms can delay the first local development visit. They
are absent from the compiled production preview. The observation of dev
slowness alone does not establish a production problem. In this repository,
public images are static files even in dev; Vite is not running a per-request
image optimizer for them. There is no Next.js `unoptimized` setting here.

Production causes fixed: oversized legacy material photos, the oversized
favicon/header mark, full images used for cards, missing responsive choices,
and inconsistent loading/dimensions. Existing carousels already mount only
the visible main slide, so their logic was preserved. Their visible thumbnail
controls use small assets; large gallery/product images mount only when the
lightbox/detail modal is opened. The production recheck did not find another
image-loading defect requiring a source change. No dev-only workaround or
disabled optimizer was introduced.

The production preview does not emulate Vercel's cache headers or redirect
engine; the root Vercel configuration is retained and checked separately.
No browser tests or screenshots were run. The official Ambuja asset download
was retried but still failed DNS resolution for that hostname; its existing
text fallback remains. Internet availability was not treated as a permission
blocker, and the eight locally downloaded official logos remain in use.

- `pnpm lint`, `pnpm typecheck` and `pnpm build` pass.
- Lint checks image/variant paths, thumbnail weights, client-logo paths, sales values and cache headers.
- Snapshot checks confirm the conveyor file is byte-for-byte unchanged, retired-product redirects are unchanged, and product/gallery/download/material editorial content is unchanged (only media references were migrated).
- The real ten-client list is unchanged. Both existing carousel implementations remain single-slide rendering.
- No screenshots, browser tests, generated artwork, or form submissions were used. UI review remains with the owner.
- Work is local and not pushed or deployed. Previous uncommitted product/media changes and the unrelated untracked logo are preserved.
