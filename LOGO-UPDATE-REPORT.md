# Revised Enweigh logo update

## Where the new logo appears

- Shared header on all six pages, including the header above the open mobile menu. The mobile overlay has no separate logo to replace.
- Shared footer on all six pages.
- Small identity badge on About.
- Browser favicon, Apple touch icon and web-manifest app icons.
- Open Graph and Twitter image metadata, using the supplied 512px fallback image. No share-image metadata existed previously.
- Every shared COMPANY logo/mark/white/horizontal alias now references the same new SVG; no recoloured variant is substituted.

All on-page placements use BrandLogo: SVG first, then the supplied 512px and
256px PNGs if loading fails. Alt text is always “Enweigh India Pvt. Ltd.”.
Images have explicit 512×524 dimensions, width auto and object-fit contain.
The actual SVG viewBox (182.25×186.38) and supplied PNG proportions are
preserved. No cropping, recolouring, inversion or background box was added.

Header logo height is 52px on mobile and 56px on desktop, inside the unchanged
72px header. Footer and About badge retain their prior displayed heights.
The header and footer also display “ENWEIGH / INDIA PVT. LTD.” beside the logo,
as requested after the initial replacement. The adjacent text is hidden from
assistive technology because the logo already provides the full company name.

## Dark-background placement

The shared footer has background #2c1c4e; the new logo is #3e2d63 and therefore
has low contrast there. It remains the original purple on transparency, without
inversion or a white box, as requested. No other dark on-page section renders
the site logo. The hero/header area and About badge are light backgrounds.

## Search scope and unchanged source documents

Searched source, shared data, public assets, head metadata and repository text.
There are no login/admin pages, loading-screen logos, logo-bearing download
cards or logo-bearing JSON-LD blocks. Download cards use generic document icons.
Brochure PDFs and logos physically embedded in equipment photographs were not
rewritten; these remain original source documents/photos under the earlier
instruction not to edit PDFs. Historical reports and ignored original-asset
archives may still name the old filenames, but no live source reference does.
The original Revised Logo folder and unrelated root logo source files were
left intact. Only the three requested supplied files were copied into public.

## Every changed file

Modified:

- `src/components/Nav.jsx`: new brand component and adjacent company name; unchanged header height.
- `src/components/Footer.jsx`: new brand component and adjacent company name.
- `src/pages/About.jsx`: new logo in the existing badge; corrected full alt text.
- `src/data/site.js`: all shared logo aliases now use the new SVG.
- `src/data/image-assets.js`: removed old logo entries; updated favicon dimensions.
- `index.html`: favicon, Apple/manifest links and logo share-image metadata.
- `public/favicon.png`: new 32×32 white-background icon from SVG.
- `public/apple-touch-icon.png`: new 180×180 white-background icon from SVG.

Added:

- `src/components/BrandLogo.jsx`: shared SVG/PNG fallback handling and dimensions.
- `public/images/logo/enweigh-logo.svg`: unchanged supplied main logo.
- `public/images/logo/enweigh-logo-512.png`: unchanged supplied 512×524 fallback.
- `public/images/logo/enweigh-logo-256.png`: unchanged supplied 256×262 fallback.
- `public/favicon.ico`: 16×16, 32×32 and 48×48 frames, rendered from SVG on white.
- `public/images/logo/icon-192.png`: 192×192 white-background manifest icon.
- `public/images/logo/icon-512.png`: 512×512 white-background manifest icon.
- `public/site.webmanifest`: app icon declarations.
- `LOGO-UPDATE-REPORT.md`: this report.

Removed after checking no live references remain (recoverable from Git):

- `public/enweigh-logo.webp`
- `public/images/enweigh-logo-horizontal.webp`
- `public/images/enweigh-logo-left-aligned-white.webp`
- `public/images/enweigh-logo-left-aligned.webp`
- `public/images/enweigh-logo-white.webp`
- `public/images/enweigh-logo.webp`
- `public/images/enweigh-mark-white.webp`
- `public/images/enweigh-mark.webp`

## Verification

Lint, typecheck and production build pass with no introduced errors or warnings.
Confirmed supplied logo copies are byte-for-byte unchanged; PNG/ICO dimensions,
ICO frame sizes and white icon backgrounds are correct. No screenshots or
browser tests were taken. Header fit was checked from its fixed dimensions;
visual UI review remains with the owner. Conveyor, retired-product redirects,
product/gallery/download editorial content and client logos remain unchanged.
Git publication and production deployment are verified separately after these checks.
