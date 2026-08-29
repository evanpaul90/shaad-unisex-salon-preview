# Shaad Unisex Salon website

Owned production build for Shaad Unisex Salon in BTM Layout, Bengaluru. The default website is our
semantic HTML/CSS/JavaScript implementation; Framer is retained only as a visual reference under
`mirror/` and is not loaded by the site.

## Run locally

```sh
npm install
npm run dev
```

Local URL: `http://localhost:5181/`

## Production and verification

```sh
npm run build
npm run test:site
```

The Playwright suite checks all 11 routes at desktop and mobile widths: layout overflow, navigation,
booking links, dynamic hero, local video playback, desktop/mobile review behavior, interactive process
tabs, contact details, Google Maps link, formal footer, and the Odessis.in builder credit.

## Temporary GitHub Pages preview

Pushes to `main` deploy the owned build to:

`https://evanpaul90.github.io/shaad-unisex-salon-preview/`

The Pages build uses a repository-aware base path and includes a `404.html` SPA fallback, so direct
links to service, about, and contact routes continue to work.

## Integrations

- Booking: `https://aicrm.geteasysoftware.com/shaad_unisexsalon/webapp/`
- Directions: `https://share.google/ZmUFkZwmDAVp3thyx`
- Builder credit: `https://odessis.in/`

All imagery and video used by the live design are stored under `public/assets/`. The old Framer snapshot
can be refreshed manually with `npm run sync:reference`; it must not replace the owned build.

The GitHub Pages deployment is a temporary client preview, not the salon's final production hosting.
