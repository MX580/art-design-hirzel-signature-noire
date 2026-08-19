# Art Design by Hirzel — site vitrine

Site vitrine pour **David Hirzel** ([@artdesignbyhirzel](https://www.instagram.com/artdesignbyhirzel/)), créateur indépendant d'objets sur mesure en bois, métal et béton (Genève / Vaud, Suisse).

Site statique bilingue FR/EN, formulaire de contact sécurisé, pensé pour un hébergement Infomaniak classique.

## Stack technique

- **[Astro](https://astro.build)** — génère un site 100% statique (HTML/CSS/JS), rapide et bon pour le référencement. Aucun serveur Node requis en production.
- **Tailwind CSS v4** — système de design ("Minéral & Cuivre" : cartes blanches, coins très arrondis, tons chauds cuivre/ardoise).
- **PHP natif** (`public/api/contact.php`) — traitement du formulaire de contact, sans dépendance externe, compatible avec n'importe quel hébergement mutualisé Infomaniak (PHP 8.1+).
- **Polices auto-hébergées** (Fraunces + Manrope via `@fontsource`) — aucun appel à Google Fonts, meilleure confidentialité et performance.

## Démarrage rapide

```bash
npm install
npm run dev       # serveur de développement sur http://localhost:4321
npm run build     # build de production dans dist/
npm run preview   # prévisualise le build de production en local
```

## Structure du projet

```
src/
  components/     Header, Hero, About, Skills, Gallery, Contact, Footer, Icon...
  layouts/        BaseLayout.astro (meta SEO, JSON-LD, structure HTML)
  i18n/           ui.ts = TOUS les textes du site (FR + EN), utils.ts = helpers
  pages/          index.astro (FR), en/index.astro (EN), pages légales
  assets/         photos utilisées sur le site (optimisées automatiquement par Astro)
public/
  api/contact.php Traitement du formulaire de contact
  .htaccess       Sécurité, cache, HTTPS (config Apache)
raw-assets/       Photos brutes extraites d'Instagram (non déployées, sert de réserve)
scripts/          Utilitaires (voir "Sécurité" plus bas)
```

## ⚠️ À faire avant la mise en ligne

Le contenu a été rédigé à partir des informations publiques du profil Instagram. Certaines informations doivent être confirmées avec David avant publication — cherchez `[À CONFIRMER avec David]` :

| Où | Quoi |
|---|---|
| `src/i18n/ui.ts` (`contact.email`, `contact.phone`) | Adresse e-mail et téléphone réels à afficher sur le site |
| `public/api/contact.php` (`CONTACT_RECIPIENT`, `MAIL_FROM`) | Adresse qui reçoit les messages du formulaire + adresse d'expédition technique |
| `src/i18n/ui.ts` (`legalNotice`) | Adresse postale complète, éventuel numéro IDE / registre du commerce (obligatoire en Suisse pour un site à caractère commercial) |
| `astro.config.mjs` (`SITE_URL`) | Nom de domaine définitif une fois choisi/réservé |

**Qualité des photos** : les images viennent de couvertures de Reels Instagram (seul contenu accessible publiquement sans connexion) — résolution correcte pour le web mais pas aussi nette que des photos originales. Si David peut envoyer quelques photos en haute résolution de ses meilleures pièces, ça vaut vraiment le coup de les intégrer, en particulier pour la photo d'accueil (Hero) et le portrait de l'atelier.

## Modifier le contenu

Tous les textes (FR et EN) sont centralisés dans **[src/i18n/ui.ts](src/i18n/ui.ts)** — un seul fichier, pas besoin de toucher aux composants pour changer une phrase, ajouter une réalisation dans "Savoir-faire" ou reformuler une section.

## Gérer les images

- `raw-assets/instagram/` : toutes les images extraites d'Instagram (archive brute, non déployée).
- `src/assets/` : sélection retravaillée utilisée sur le site (recadrée pour retirer les bandeaux noirs et textes des couvertures de Reels). Pour remplacer une photo, dépose la nouvelle image au même endroit avec le même nom, ou mets à jour le chemin d'import dans le composant concerné (`Hero.astro`, `About.astro`, `Gallery.astro`) — Astro l'optimise automatiquement (compression, format WebP, tailles responsives).

## Déploiement sur Infomaniak

1. `npm run build` → génère le dossier `dist/`.
2. Envoie **tout le contenu** de `dist/` (fichiers ET dossiers cachés comme `.htaccess`) à la racine de l'espace web Infomaniak, via FTP/SFTP ou le gestionnaire de fichiers Infomaniak.
3. Vérifie que le plan d'hébergement inclut **PHP 8.1 ou supérieur** (Manager Infomaniak → Hébergement Web → PHP) pour que `api/contact.php` fonctionne.
4. Teste le formulaire de contact une fois en ligne. Si les e-mails n'arrivent pas : Infomaniak recommande généralement de configurer SPF/DKIM pour le domaine (Manager → Mail) pour une bonne délivrabilité de la fonction `mail()` PHP.
5. Le certificat HTTPS est généralement automatique chez Infomaniak (Let's Encrypt) ; `.htaccess` force déjà la redirection HTTP → HTTPS.

## Sécurité

- **Formulaire de contact** : validation stricte, protection anti-injection d'en-têtes e-mail, piège à robots (honeypot), limite de débit par IP, filtrage anti-spam basique. Aucune base de données.
- **En-têtes de sécurité** (`public/.htaccess`) : Content-Security-Policy stricte, `X-Frame-Options`, `X-Content-Type-Options`, etc.
- La CSP autorise les deux seuls scripts inline du site (menu mobile + formulaire) par **empreinte sha256 exacte** plutôt que par `'unsafe-inline'`. Si tu modifies le code JavaScript dans `Header.astro` ou `Contact.astro`, régénère les empreintes :

  ```bash
  npm run build
  node scripts/print-csp-hashes.mjs
  ```

  puis colle les nouvelles valeurs dans la directive `script-src` de `public/.htaccess`.

## Pages légales

`Mentions légales` et `Politique de confidentialité` sont pré-remplies avec la structure attendue en Suisse (obligation d'impressum, conformité nLPD) mais contiennent des champs à compléter (adresse, éventuel numéro IDE). À faire relire par David — ou un juriste — avant mise en ligne définitive.
