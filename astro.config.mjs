// @ts-check
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';
import Icon from 'astro-icon';

export default defineConfig({
integrations: [Icon()],
output: 'server',
adapter: vercel(),
redirects: {
  '/': '/fr/'
},
i18n: {
  locales: ['fr', 'en', 'ar', 'es'],
  defaultLocale: 'fr',
  routing: {
    prefixDefaultLocale: true
  }
}
});