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
| `PilierPublic.dc.html` | `/pilier-public` | ⏳ placeholder |
| `Politique.dc.html` | `/politique` | ⏳ placeholder |
| `VieQuotidienne.dc.html` | `/vie-quotidienne` | ⏳ placeholder |
| `Locations.dc.html` | `/locations` | ⏳ placeholder |
| `Contact.dc.html` | `/contact` | ⏳ placeholder |

Placeholder pages come from `src/pages/[...lang]/[section].astro`: when building the real page, remove its
entry from the `pending` list in that file.

## Stack & commands

- **Astro 7** (fully static), strict TypeScript, Zod 4 (`import { z } from 'astro/zod'`).
- No UI framework yet; add `@astrojs/react` only for a real interactive need (island).
- Self-hosted fonts via Fontsource (`@fontsource-variable/inter`, `@fontsource-variable/fraunces/opsz.css`).
  No Google Fonts (Swiss data protection, nLPD).
- `npm run dev` (http://localhost:4321) · `npm run build` (= `astro check` + build, must stay at 0 errors/warnings) · `npm run preview`.
- Environment: Windows, no Python installed, Node 24. `npx -y <package>` downloads are blocked by permissions.

## Architecture

```
src/
  i18n/ui.ts            languages (fr default, de, en), UI strings, localizePath/stripLang helpers, navItems
  styles/global.css     colour tokens (light + dark), base styles, utility classes (.container .pill .btn-primary .card .eyebrow .section-title .prose)
  layouts/Base.astro    <html>, theme anti-flash script, unofficial banner, front-desk bar, Header, Footer, hreflang
  components/           Header (mobile menu), Footer, ThemeToggle, LangSwitch, Icon (stroke icons), LocalLink, PageHeader
  assets/               inlined SVGs
  lib/content.ts        getLocalized (FR fallback), getLocalizedEntry, getCommune, getNextSeance, telHref, formatDate, weekdayName
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
`accueil` (fr.md / de.md / en.md).

## Design guidelines

- Fonts: **Fraunces** (headings, 500–600) + **Inter** (body).
- Light: background `#F6F3EC` · text `#1B2629` · lake-blue accent `#1D5670` · cards `#FFFDF8`/border `#E2DCCD` · olive labels `#5C6B2E`.
- 1240 px container, card radii 28/20/14 px, pill buttons ≥ 44 px tall. Stroke SVG icons (stroke 1.7), no emoji.
- Accessibility: skip link, `aria-current`, visible focus, AA contrast in both themes.

## Next steps

1. Remaining pages from the mockup: Pilier public (filterable notice list → good candidate for a React island),
   Politique (sessions, executive, council), Vie quotidienne, Locations, Contact.
2. Search (Pagefind, static); the mockup has a search button.
3. DE/EN translations of services and notices.
4. 404 page, deployment (Netlify / Cloudflare Pages), possibly a Git-based CMS (Decap / Pages CMS) for editors.

## Log

- 2026-11-23: read the mockup; chose Astro + Markdown content + FR/DE/EN + dark theme.
  Foundation, home and services done; 5 placeholder pages. Build OK (21 pages, 0 errors).
  Then: "Accueil" menu entry, inlined coat of arms (flicker fix), scrollbar-gutter, all comments/docs in English + README.
