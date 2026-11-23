// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  // Replace with the final domain when deploying.
  site: 'https://concise.example',
  i18n: {
    locales: ['fr', 'de', 'en'],
    defaultLocale: 'fr',
    routing: { prefixDefaultLocale: false },
  },
});
