# correleotion.com

Portfolio site for Thanakorn Sin-on, built with [Astro](https://astro.build).
Deployed to GitHub Pages at https://correleotion.com on every push to `main`.

## Develop

```sh
npm install     # first time only
npm run dev     # dev server with hot reload at http://localhost:4321
npm run build   # production build into dist/
```

## Structure

```text
src/
├── pages/index.astro      # page composition — section order lives here
├── layouts/Layout.astro   # <head>, theme/lang bootstrap, global CSS + scripts
├── components/            # ← EDIT THESE — one file per section
│   ├── Nav.astro            Hero.astro       MetaStrip.astro
│   ├── About.astro          Work.astro       Stack.astro
│   ├── Experience.astro     Education.astro  Awards.astro
│   └── Writing.astro        Contact.astro    Footer.astro
└── styles/
    ├── styles.css         # layout, components, light/dark theme tokens
    └── fonts.css          # @font-face for the self-hosted IBM Plex fonts
public/
├── fonts/                 # IBM Plex Mono / Sans / Sans Thai (woff2 subsets)
├── js/
│   ├── i18n.js            # ← English + Thai text lives here
│   └── main.js            # language + theme toggles (localStorage persistence)
└── CNAME                  # custom domain for GitHub Pages
```

## Editing content

- **Text (EN/TH)**: edit `public/js/i18n.js` — every element with a
  `data-i18n="key"` attribute gets its text from those dictionaries at runtime.
- **Section markup**: edit the matching file in `src/components/`.
  `Work.astro`, `Stack.astro`, and `Writing.astro` are data-driven — edit the
  array at the top of the file instead of duplicating markup.
- **Section order**: edit `src/pages/index.astro`.
- **Theme colours**: CSS variables in `src/styles/styles.css` — `:root` for
  light, `html[data-theme="dark"]` for dark. Accent variants:
  `html[data-accent="terminal"]` (green) / `html[data-accent="amber"]`.

Push to `main` and the GitHub Actions workflow builds and deploys automatically.

## Images

The two placeholders (`DROP A PORTRAIT` in `About.astro`, `TU logo` in
`Education.astro`) are waiting for real assets — drop images into `public/img/`
and swap the placeholder `<div>`s for `<img>` tags.
