// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// Nom de domaine définitif à mettre à jour lors de la mise en ligne (Infomaniak).
const SITE_URL = 'https://www.artdesignbyhirzel.ch';

export default defineConfig({
  site: SITE_URL,
  output: 'static',
  i18n: {
    defaultLocale: 'fr',
    locales: ['fr', 'en'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
