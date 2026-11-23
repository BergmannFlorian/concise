# Concise – municipal website redesign

An **unofficial** redesign proposal, made in a personal capacity, for the website of the municipality of
Concise (canton of Vaud, Switzerland). Official site: https://concise.ch. The "Site non officiel" banner must
stay visible on every page (it lives in `src/layouts/Base.astro`), and pages stay `noindex` until this is official.

## Conventions

- **All code comments, CLAUDE.md and README.md are in English.**
- The site itself is French-first (fr default, de, en). Content schema field names (`titre`, `ancre`, `icone`…)
  and content files under `src/content/` (including their comments) stay in French: they are what editors type.
- `CONTENU.md` is the editor guide, in French, for non-developer editors.
- Talk to the user in French.

## Design source

Claude Design mockup: https://claude.ai/artifact/3iGgacWrGcEQJ4M9Cijn9G
(read with the Artifact tool, `action: read`, then `path: project/<Page>.dc.html`).
Coat of arms: mockup asset `f052bcb5f43b854de14940b8ad7a27ba` → original in `public/armoiries.svg` (favicon);
lighter version (rounded coordinates) in `src/assets/armoiries.svg`, **inlined** in the Header via Astro's SVG
import. Do not go back to an `<img>`: the logo flickered on every page change.

| Artboard | Route | Status |
|---|---|---|
| `Main.dc.html` | `/` | ✅ done ("Accueil" entry added first in the menu, not in the mockup) |
| `Services.dc.html` | `/services` | ✅ done |
| `PilierPublic.dc.html` | `/pilier-public` + `/pilier-public/<slug>` | ✅ done (one detail page per notice, not in the mockup) |
| `Politique.dc.html` | `/politique` + `/politique/seances/<id>` | ✅ done (one page per session, not in the mockup) |
| `VieQuotidienne.dc.html` | `/vie-quotidienne` | ✅ done (h1 "Vivre à Concise", breadcrumb/menu "Vie quotidienne") |
| `Locations.dc.html` | `/locations` | ✅ done |
| `Contact.dc.html` | `/contact` | ✅ done (form = mailto, see below) |

All mockup pages are built. Photos in the mockup are placeholders: content supports an optional `image`
(path under `public/`) and shows a dashed "Photo à venir" box until one is provided.

## Stack & commands

- **Astro 7** (fully static), strict TypeScript, Zod 4 (`import { z } from 'astro/zod'`).
- No UI framework yet; add `@astrojs/react` only for a real interactive need (island).
- Self-hosted fonts via Fontsource (`@fontsource-variable/inter`, `@fontsource-variable/fraunces/opsz.css`).
  No Google Fonts (Swiss data protection, nLPD).
- `npm run dev` (http://localhost:4321) · `npm run build` (= `astro check` + `astro build` + `pagefind --site dist`,
  must stay at 0 errors/warnings) · `npm run preview` (only way to try search locally: the index exists after a build).
- Environment: Windows, no Python installed, Node 24. `npx -y <package>` downloads are blocked by permissions.
- The dev server keeps a stale content store when content files are deleted/recreated while it runs: restart it.
  Stopping the background shell does not kill Node on Windows; use `npx astro dev stop` first.

## Architecture

```
src/
  i18n/ui.ts            languages (fr default, de, en), UI strings, localizePath/stripLang helpers, navItems
  styles/global.css     colour tokens (light + dark), base styles, utility classes (.container .pill .btn-primary .card .eyebrow .section-title .prose)
  layouts/Base.astro    <html>, theme anti-flash script, unofficial banner, front-desk bar, Header, Footer, hreflang
  components/           Header (mobile menu), Footer, ThemeToggle, LangSwitch, Icon (stroke icons), LocalLink,
                        PageHeader (breadcrumb: parent/crumb/compact), NextSessionCard, HoursTable, ContactLinks
  assets/               inlined SVGs
  lib/content.ts        getLocalized (FR fallback), getLocalizedEntry, getCommune, getNextSeance/getPastSeances,
                        seanceHref, resolveContact (personne ref + inline fields), initials, telHref, formatDate, weekdayName
  content.config.ts     collection schemas
  content/              editable content (see CONTENU.md)
  pages/[...lang]/      one page = one file; getStaticPaths = langPaths → /x, /de/x, /en/x
```

### i18n
- Astro i18n routing, `prefixDefaultLocale: false`: French unprefixed, `/de/…`, `/en/…`. Same (French) slugs in every language.
- UI strings: `ui.ts` (`useTranslations(lang)`). Missing key → French.
- Content: collections organised as `<collection>/<lang>/<slug>.md`; `getLocalized()` falls back to French when a
  translation is missing (`fallback: true` → `lang="fr"` + "not translated yet" notice).
- Internal links coming from content: always render through `LocalLink` (adds the language prefix).
- Dates and weekdays: `Intl` (`fr-CH`, `de-CH`, `en-GB`), Europe/Zurich time zone.
  French typography: space before colon ("Guichet :") in FR only; the colon is part of the UI string.

### Dark theme
- Every colour is a CSS variable in `global.css`. Dark is defined twice (`prefers-color-scheme` media query on
  `:root:not([data-theme=light])` + `:root[data-theme=dark]`): **always edit both blocks together**.
- `ThemeToggle` sets `data-theme` on `<html>` + `localStorage('theme')`. Inline `<head>` script = no flash.
- Never hard-code colours in components, except elements sitting on the illustration (hero pills).
- `html { scrollbar-gutter: stable }` avoids a sideways shift between short and long pages on Windows.

### Collections (`content.config.ts`)
`commune` (infos.yaml), `personnes` (one yaml per person, referenced via `reference('personnes')`),
`services` (fr/…), `avis` (fr/…, official notice board), `seances` (not translated, `organe` translated via UI strings),
`accueil`, `pilier`, `politique`, `vie`, `locations`, `contact` (one page-text file per language: fr.md / de.md / en.md,
read with `getLocalizedEntry`). Shared schema pieces: `lien`, `horaire` (weekday enum + hours), `chiffre`, `contact`
(`personne` ref and/or inline `nom`/`role`/`telephone`/`email`/`url`, resolved with `resolveContact`).
`seances` have an optional `documents` list; their body is the agenda (French only).
`avis.categorie` is a closed enum (`avisCategories` in `ui.ts`, labels = `cat.*` UI strings); notices can have
an optional `document` link.

### Notice board (`pages/[...lang]/pilier-public/`)
- `index.astro`: next-session banner, search + category filters, list, sidebar boxes.
- Filtering is **vanilla JS progressive enhancement**, not React: the server renders every notice; controls are
  `hidden` until the script runs. Search matches accent-free text (`data-text`, normalised at build time).
  The selected category is kept in `?categorie=<key>` (shareable; the detail page's category links use it).
- `[slug].astro`: one page per notice per language (French fallback).
- The 17 notices come from the mockup; their **dates are placeholders** (the mockup had none, order preserved)
  and their bodies are "[Texte complet de l'avis à compléter.]".

### Politique (`pages/[...lang]/politique/`)
- `index.astro`: executive/legislative cards, executive members (names from `personnes`, initials avatar,
  `principal` = highlighted), request steps, council block (`NextSessionCard` + link cards, all `#` for now),
  "recent" list = past council sessions + `elections` notices (newest first, max 6).
- `seances/[id].astro`: one page per session per language (agenda + documents). Every "Ordre du jour" link
  (home, notice board, politique) points there via `seanceHref()`.
- `components/NextSessionCard.astro` is shared by the home page and Politique.

### Vie quotidienne / Locations / Contact
- Vie: section chips built from each section's `menu` label; waste block uses the `--olive-*` tokens.
- Locations: `principal` venue (photo + figures + documents + booking), `secondaires` (`style: beige|bleu`),
  `autres` (non-municipal venues, inline contacts).
- Contact: address, phone, emergency number and desk hours come from `commune/infos.yaml`; emergency box uses
  `--danger-*` tokens. **The form has no backend**: JS builds a `mailto:` (subject + body) to `commune.email`;
  without JS the native `mailto` form post is the fallback. At deployment, switch to a form backend
  (e.g. Netlify Forms) if messages should be received without the visitor's mail app.
- The header Contact button is inverted (dark) when it is the current page.

### Search (Pagefind)
- `pagefind` (dev dependency) indexes `dist/` after the build: one index per language (from `<html lang>`),
  so results always match the current language. Only `<main data-pagefind-body>` (Base layout) is indexed.
- `components/Search.astro`: native `<dialog>` mounted in Base; opened by any `[data-search-open]` button
  (Header: one in `.actions` on desktop, one next to the menu button on mobile; hidden without JS).
  Pagefind's default UI (`/pagefind/pagefind-ui.js` + css) is loaded on first open, themed through
  `--pagefind-ui-*` variables mapped to the site tokens (works in dark mode). In `npm run dev` the index is
  missing, so the dialog shows `search.unavailable`.
- Result titles come from each page's `<h1>`; the home page overrides it with `data-pagefind-meta="title:…"`.
- To exclude an element from the index: `data-pagefind-ignore`.

### Error pages (404)
- Static site → only a 404 is needed (no server, so no 500). Content lives in `components/NotFound.astro`
  (title, text, home button, search button, useful links), rendered by `pages/404.astro` (FR → `/404.html`,
  also the page `astro dev` shows for any unknown URL) and `pages/[...lang]/404.astro` (DE/EN).
- Astro emits `/de/404/index.html`; the `localized404` integration in `astro.config.mjs` moves it to
  `/de/404.html` (same for `en`) after the build. Hosts: Cloudflare Pages picks the nearest `404.html`
  automatically; Netlify uses `public/_redirects`.
- `Base` with `errorPage`: no nav highlight, no hreflang, not indexed by Pagefind (no `data-pagefind-body`),
  language switcher → each language's home page.
- Use JSX comments `{/* */}` in `.astro` markup: HTML comments `<!-- -->` are shipped to visitors.

## Design guidelines

- Fonts: **Fraunces** (headings, 500–600) + **Inter** (body).
- Light: background `#F6F3EC` · text `#1B2629` · lake-blue accent `#1D5670` · cards `#FFFDF8`/border `#E2DCCD` · olive labels `#5C6B2E`.
- 1240 px container, card radii 28/20/14 px, pill buttons ≥ 44 px tall. Stroke SVG icons (stroke 1.7), no emoji.
- Accessibility: skip link, `aria-current`, visible focus, AA contrast in both themes.

## Next steps

1. Replace placeholders: notice dates/bodies, session agendas, `#` links (archives, council links, schools,
   associations, PDFs…), photos.
2. DE/EN translations of services and notices.
3. Contact form backend (see above), deployment (Netlify / Cloudflare Pages), possibly a Git-based CMS (Decap / Pages CMS) for editors.
   "Next session" is computed at build time → schedule a daily rebuild (e.g. cron-triggered deploy hook).

## Log

- 2026-11-23: read the mockup; chose Astro + Markdown content + FR/DE/EN + dark theme.
  Foundation, home and services done; 5 placeholder pages. Build OK (21 pages, 0 errors).
  Then: "Accueil" menu entry, inlined coat of arms (flicker fix), scrollbar-gutter, all comments/docs in English + README.
  First commit `1813916`. Then: Pilier public page + notice detail pages (72 pages built, 0 errors), commit `5b1890b`.
  Then: Politique page + session pages (81 pages built, 0 errors), commit `42430ef`.
  Then: Vie quotidienne (`1c80a94`), Locations (`6e28661`), Contact (`0e33dda`); placeholder route removed. All mockup pages done.
  Then: Pagefind search (header button + dialog), verified with real queries against the built index (FR/DE/EN),
  commit `5d3cf27`. Then: localized 404 pages (84 pages built, 81 indexed).
