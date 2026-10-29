# Content and media update — 29 October 2026

## A. Removed products and files

Removed Apron Feeder, Bagging Machine, Furnace Feeder, Hot Air Generator,
Coal Handling System, Kiln Burner System and Kiln Feeder System from product
data, featured cards, gallery, categories, search and enquiry options. Homepage
copy, metadata and counts now describe seven retained systems. Coal remains a
material linked to Weigh Feeder; iron ore links to Belt Weigher. Their old
capacity, temperature and spillage claims have been replaced accordingly.

Deleted files, recoverable from Git:

- `public/images/p01.jpg`, `p02.jpg`, `p07.jpg`, `p08.jpg`, `p13.jpg`, `p14.jpg`, `p15.jpg`
- `public/images/s-apron-feeder.jpg`, `public/images/s-bagging-machine.jpg`
- `public/downloads/apron-feeder-datasheet.pdf`
- `public/vercel.json`: redundant copy; root `vercel.json` is authoritative.

For each slug below, HTTP 301 redirects cover `/products/<slug>`, `/<slug>`
(including subpaths), `/products?item=<slug>`, and old
`/contact?product=<name-or-slug>` URLs. They lead to the products listing and
explicitly clear retired query values to prevent redirect loops:

`apron-feeder`, `bagging-machine`, `furnace-feeder`, `hot-air-generator`,
`coal-handling-system`, `kiln-burner-system`, `kiln-feeder-system`.

No database, CMS, individual product-page files, sitemap, robots file or
structured-data block exists here needing separate removal. The source search
retains discontinued names only in necessary redirects and this report. PDF
exceptions are listed below.

## B. Photos and their usage

All 29 images were visually reviewed. 22 usable images plus 22 thumbnails are
published as WebP, at most 1920px on the long edge and below 300 KB each.
Originals remain intact in the Git-ignored supplied folder.

| Public image folder | Kept | Used in |
| --- | ---: | --- |
| `weigh-feeder` | 12 | Main product image, product photo selector, homepage featured card, grouped gallery |
| `belt-weigher` | 2 | Main product image, product photo selector, grouped gallery |
| `hopper-weighing` | 3 | Main hopper image, product photo selector, homepage featured card, batching hardware detail photos, grouped gallery |
| `liw` | 3 | Main product image, product photo selector, homepage featured card, grouped gallery |
| `rod-gates` | 2 | Gallery only; converted from HEIC; no new product page |

The gallery keeps the existing masonry cards and lightbox, with category
headings and lazy-loaded thumbnails. Its 25 images include three retained
batching, belt-feeder and vibratory-feeder photos. No direct replacements of
those complete systems were supplied; the existing batching main image stays,
with clearly captioned load-cell hardware details added to its photo selector.
Material imagery remains material imagery. Existing sections and animation
logic were not changed.

Excluded from publication; source originals were not deleted:

- `WEIGH FEEDER PHOTOS/2 copy.jpg`: similar control cabinet to `8.jpg`; the retained view shows its controls more clearly.
- `WEIGH FEEDER PHOTOS/IMAGE-2.JPG`: near-duplicate installation view covered by `IMAGE-1.JPG` and `IMAGE-4.JPG`.
- `WEIGH FEEDER PHOTOS/IMAGE-9.jpg`: dark, compressed 964×581 view with timestamp; better installation views available.
- `WEIGH FEEDER PHOTOS/IMAGE-10.jpg`: compressed 919×517 drive detail; retained higher-resolution `IMAGE-8.jpg` covers the drive.
- `WEIGH FEEDER PHOTOS/IMAGE-11.jpg`: compressed 971×546 installation detail covered by clearer views.
- `LIW PHOTOS/IMG-20250407-WA0027.jpg`: near-duplicate of `WA0026`, with strong light flare.
- `ROD GATES/20250623_124735.heic`: near-duplicate front view; retained `124755` and `124815` show front and side.

## PDFs and downloads

All four supplied PDFs were opened and their complete text extracted; the
scanned weigh-feeder and general brochures were additionally read with local
OCR. The equipment catalogue contains 25 pages, including EUC-2 information.

| Supplied document | Public file in `public/downloads/` | Usage |
| --- | --- | --- |
| Weigh Feeder Brochure, 20-11-2024 | `enweigh-weigh-feeder-2024-11-20.pdf` (5.1 MB) | Downloads and weigh-feeder modal |
| General Brochure | `enweigh-general-brochure.pdf` (4.2 MB) | Downloads; source for hopper weighing content |
| New Batching Brochure | `enweigh-batching-plants-brochure.pdf` (7.4 MB) | Downloads and batching modal; source for batching descriptions/features |
| Equipment Photos, 01092025 | `enweigh-equipment-photos-2025-09-01.pdf` (6.7 MB) | Downloads, dated 1 September 2025 |

Displayed sizes use actual byte counts with 1024-based units. No dates were
invented for general/batching brochures. No cover thumbnails were introduced
because Downloads has no existing cover-thumbnail style. The batching public
copy was reduced from 12,294,157 to 7,797,325 bytes using high-quality photo
compression, preserving image dimensions, text, page structure and four pages.
Its original is untouched. Other PDF files were copied without editing.

Removed-product mentions deliberately retained inside unchanged PDFs:

- Supplied **General Brochure -Enweigh.pdf**, page 2: “APRON FEEDERS”; public copy retains this historical list.
- Existing **enweigh-company-profile.pdf**: apron feeders. Its download card is removed; the mixed company document is retained unchanged.
- Existing **enweigh-product-catalogue.pdf**: all seven discontinued product families. Its download card is removed; file retained unchanged.
- The deleted dedicated datasheet contained Apron Feeder and is no longer published.

The supplied weigh-feeder brochure, new batching brochure and equipment
catalogue contain no detected mention of the discontinued product families.

## Missing or conflicting information

- Weigh-feeder widths: dedicated brochure 650–2000 mm; general brochure 650–2400 mm. The existing dedicated-brochure range stays. The catalogue's 1300 TPH installation is project-specific, not a universal rating.
- Detailed LIW, belt feeder, belt weigher and vibratory feeder specifications are not substantiated by the supplied PDFs. Existing specifications/descriptions remain as instructed and need engineering confirmation; no new numerical claims were added for them.
- Existing batching accuracy (±0.1–±0.25%), ingredient count (2–24+), recipe/PLC details and the glass-card precision are not specified in the supplied batching brochure. These existing values remain pending confirmation. Supported descriptions and construction/maintenance features were updated.
- Hopper weighing now reflects the general brochure: 5 kg–3000 ton solutions, 3/4 live cells, ±0.5% all-live-cell accuracy, and a distinct live/dummy-cell configuration for level measurement only.
- Stainless-steel grades and the precise Profibus variant were absent from the weigh-feeder source; unsupported grade/variant detail was removed, keeping its documented material and communication options.
- No full batching-plant, belt-feeder or vibratory-feeder replacement photograph was supplied; their existing main photos remain.

## Verification and delivery

Run `pnpm lint`, `pnpm typecheck` and `pnpm build`. Lint includes static checks
of product links, retired redirects, public asset paths, image sizes and download
sizes. Typecheck covers TSX and module resolution; legacy JavaScript remains
`checkJs: false`. No browser tests, screenshots or generated artwork were used.
Changes are local, not pushed or deployed. The unrelated untracked logo file
was left untouched.
