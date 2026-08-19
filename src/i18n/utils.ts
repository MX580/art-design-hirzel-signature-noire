import { ui, defaultLang, type Lang } from './ui';

export type { Lang };

export function getLangFromUrl(url: URL): Lang {
  const [, maybeLang] = url.pathname.split('/');
  if (maybeLang in ui) return maybeLang as Lang;
  return defaultLang;
}

export function useTranslations(lang: Lang) {
  return function t<S extends keyof (typeof ui)[typeof defaultLang]>(section: S) {
    return { ...ui[defaultLang][section], ...ui[lang][section] };
  };
}

/** Construit une URL relative vers l'autre langue, en conservant la page courante. */
export function getAlternateLangPath(url: URL, lang: Lang): string {
  const segments = url.pathname.split('/').filter(Boolean);
  const isEn = segments[0] === 'en';

  if (lang === 'en') {
    return isEn ? `/${segments.join('/')}` : `/en${url.pathname === '/' ? '' : url.pathname}`;
  }
  // lang === 'fr'
  if (!isEn) return url.pathname;
  const rest = segments.slice(1);
  return rest.length ? `/${rest.join('/')}` : '/';
}
