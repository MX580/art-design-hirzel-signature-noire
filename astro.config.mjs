// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// Nom de domaine définitif à mettre à jour lors de la mise en ligne (Infomaniak).
const SITE_URL = 'https://www.artdesignbyhirzel.ch';

// ⚠️ "base" ne sert que pour l'aperçu temporaire sur GitHub Pages (le site y
// est servi depuis un sous-dossier /nom-du-repo/). Supprimer cette ligne
// avant le déploiement définitif sur Infomaniak (servi depuis la racine /).
const GITHUB_PAGES_BASE = '/art-design-hirzel-editorial-suisse';

export default defineConfig({
  site: SITE_URL,
  base: GITHUB_PAGES_BASE,
  output: 'static',
  i18n: {
    defaultLocale: 'fr',
    locales: ['fr', 'en'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'fr',
        locales: { fr: 'fr-CH', en: 'en-US' },
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
