// @ts-check
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';
import icon from 'astro-icon';

export default defineConfig({
integrations: [icon()],
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