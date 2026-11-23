# Concise – website redesign

An **unofficial** redesign proposal for the website of the municipality of
[Concise](https://concise.ch) (canton of Vaud, Switzerland), made in a personal capacity.
The official website remains [concise.ch](https://concise.ch).

- Static site built with [Astro](https://astro.build)
- Content in Markdown / YAML, editable by non-developers
- French (default), German and English
- Light and dark themes (follows the system setting, with a manual toggle)
- Static full-text search with [Pagefind](https://pagefind.app), one index per language
- Accessible and responsive, fonts self-hosted (no third-party requests)

## Getting started

Requirements: Node.js 22 or later.

```sh
npm install
npm run dev       # http://localhost:4321
npm run build     # type-check + build into dist/ + search index (dist/pagefind)
npm run preview   # serve the built site
```

Search only works on a built site (`npm run build && npm run preview`): the Pagefind index does not
exist in `npm run dev`.

## Project structure

```
public/                 static files (favicon)
src/
  assets/               SVGs inlined at build time (coat of arms)
  components/           Header, Footer, ThemeToggle, LangSwitch, Icon, LocalLink, PageHeader
  content/              editable content (Markdown / YAML), see below
  content.config.ts     content schemas (validated at build time)
  i18n/ui.ts            languages and interface strings
  layouts/Base.astro    page shell (banner, header, footer, theme script)
  lib/content.ts        content helpers (translation fallback, dates…)
  pages/[...lang]/      routes, generated for every language
  styles/global.css     design tokens (light + dark) and base styles
```

## Content

All content lives in `src/content/`:

| Folder | What |
|---|---|
| `commune/infos.yaml` | address, phone numbers, front-desk opening hours |
| `personnes/` | contact people (one file each, reused across pages) |
| `accueil/` | home page, one file per language |
| `services/<lang>/` | municipal services |
| `avis/<lang>/` | official notices (*pilier public*) |
| `seances/` | council / executive sessions |

Content is written in French, the site's main language; field names are therefore in French too.
A step-by-step guide for editors (in French) is available in [CONTENU.md](CONTENU.md).

## Languages

French is served without a prefix (`/services`), the other languages under `/de/…` and `/en/…`.
Interface strings live in `src/i18n/ui.ts`. Translated content is stored per language folder;
when a translation is missing, the French version is shown with a "not translated yet" notice.

## Theming

All colours are CSS custom properties defined in `src/styles/global.css`, once for the light theme and
redefined for the dark theme. Components never hard-code colours.

## Deployment

The site is deployed to **GitHub Pages**: https://bergmannflorian.github.io/concise/

The [Deploy to GitHub Pages](.github/workflows/deploy.yml) workflow builds and publishes the site on every
push to `master`, on demand (Actions tab → *Run workflow*), and once a day (some content, such as the next
council session, is computed at build time).

The site is served under the `/concise` base path. To host it elsewhere (custom domain, Netlify,
Cloudflare Pages…), build with `SITE_URL=https://your-domain BASE_PATH=/ npm run build`; `dist/` is a fully
static site.
