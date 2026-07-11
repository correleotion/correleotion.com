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
├── img/                   # images (TU logo, portrait, ...)
├── js/main.js             # theme toggle (localStorage persistence)
└── CNAME                  # custom domain for GitHub Pages
```

## Editing content

- **All content lives in the component files** — edit the matching file in
  `src/components/` (e.g. education text in `Education.astro`).
  `Work.astro`, `Stack.astro`, `Awards.astro`, `Writing.astro`, and
  `MetaStrip.astro` are data-driven — edit the array at the top of the file
  instead of duplicating markup.
- **Section order**: edit `src/pages/index.astro`.
- **Theme colours**: CSS variables in `src/styles/styles.css` — `:root` for
  light, `html[data-theme="dark"]` for dark. Accent variants:
  `html[data-accent="terminal"]` (green) / `html[data-accent="amber"]`.

Push to `main` and the GitHub Actions workflow builds and deploys automatically.

## Analytics (Supabase)

- `public/js/tracker.js` logs pageviews, clicks, copies, and section views to a
  Supabase `events` table (insert-only for anonymous visitors via RLS).
- The dashboard lives at `/admin` (unlinked, noindex) — Supabase Auth login,
  reads restricted by RLS to the owner's email.
- Setup: create a Supabase project, run `supabase/schema.sql` in the SQL editor,
  add your user in Authentication, then fill `public/js/supabase-config.js`
  with the project URL + anon key.

## Images

The two placeholders (`DROP A PORTRAIT` in `About.astro`, `TU logo` in
`Education.astro`) are waiting for real assets — drop images into `public/img/`
and swap the placeholder `<div>`s for `<img>` tags.
