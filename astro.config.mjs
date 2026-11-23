// @ts-check
import { defineConfig } from 'astro/config';
import fs from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

/**
 * Astro only emits a flat 404.html at the root; localized ones come out as /de/404/index.html.
 * Static hosts look for /de/404.html, so move them there after the build.
 * @returns {import('astro').AstroIntegration}
 */
function localized404() {
  return {
    name: 'localized-404',
    hooks: {
      'astro:build:done': async ({ dir, logger }) => {
        const root = fileURLToPath(dir);
        for (const lang of ['de', 'en']) {
          const from = `${root}${lang}/404/index.html`;
          try {
            await fs.rename(from, `${root}${lang}/404.html`);
            await fs.rm(`${root}${lang}/404`, { recursive: true, force: true });
            logger.info(`/${lang}/404/index.html → /${lang}/404.html`);
          } catch {
            logger.warn(`No ${lang} 404 page found at ${from}`);
          }
        }
      },
    },
  };
}

export default defineConfig({
  // GitHub Pages project site by default (https://bergmannflorian.github.io/concise/).
  // For a custom domain or another host, set SITE_URL (e.g. https://example.ch) and BASE_PATH=/ at build time.
  site: process.env.SITE_URL ?? 'https://bergmannflorian.github.io',
  base: process.env.BASE_PATH ?? '/concise',
  i18n: {
    locales: ['fr', 'de', 'en'],
    defaultLocale: 'fr',
    routing: { prefixDefaultLocale: false },
  },
  integrations: [localized404()],
});
