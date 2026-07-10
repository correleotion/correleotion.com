# correleotion.com

Static portfolio site for Thanakorn Sin-on. Plain HTML / CSS / JS — no build step,
no framework. Open `index.html` in a browser, or serve the folder with any static
file server.

```
site/
├── sections/          # ← EDIT THESE — one file per page section
│   ├── nav.html
│   ├── hero.html
│   ├── meta.html
│   ├── about.html
│   ├── work.html
│   ├── stack.html
│   ├── experience.html
│   ├── education.html
│   ├── awards.html
│   ├── writing.html
│   ├── contact.html
│   └── footer.html
├── template.html      # page shell (head + <!-- @include name --> markers)
├── build.mjs          # assembles sections + template → index.html
├── index.html         # BUILD OUTPUT — do not edit by hand
├── css/
│   ├── styles.css     # layout, components, light/dark theme tokens
│   └── fonts.css      # @font-face for the self-hosted IBM Plex fonts
├── js/
│   ├── i18n.js        # English + Thai translation strings
│   └── main.js        # language + theme toggles (persisted to localStorage)
└── fonts/             # IBM Plex Mono / Sans / Sans Thai (woff2 subsets)
```

## Editing a section

1. Edit the relevant file in `sections/` (e.g. `sections/about.html`).
2. Regenerate the page:  `node build.mjs`  (run from inside `site/`).
3. Commit and push — the deploy workflow rebuilds and publishes automatically.

You never edit `index.html` directly; it is generated. If you forget to run
`node build.mjs` locally, CI runs it anyway before deploying, so pushing a section
change is always enough.

To add or reorder sections, edit the `<!-- @include name -->` markers in
`template.html`.

## Editing content

- **Text** lives in `js/i18n.js` as two dictionaries, `en` and `th`. Each key maps
  to an element via `data-i18n="key"` in `index.html`.
- **Theme colours** are CSS variables in `css/styles.css` — `:root` for light,
  `html[data-theme="dark"]` for dark.
- **Accent colour** defaults to Monochrome (`--accent: #14110f`). Set
  `<html data-accent="terminal">` (green) or `data-accent="amber"` to switch.

> Note: with the Monochrome accent, accent-coloured details (section numbers, the
> brand dot, the hero cursor) are dark in both themes, so they sit quietly on a dark
> background — this matches the original design. To make them follow the foreground
> in dark mode, add `html[data-theme="dark"] { --accent: var(--fg); }` to `styles.css`.

## Images

The two image placeholders (`.placeholder--portrait`, `.placeholder--logo`) were
interactive drop-slots in the original. Replace each with a plain `<img>` when you
have the assets.
