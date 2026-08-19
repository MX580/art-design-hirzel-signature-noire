/**
 * Affiche les empreintes sha256 des scripts inline présents dans le build.
 *
 * Astro intègre les petits scripts (menu mobile, formulaire de contact)
 * directement dans le HTML plutôt que dans des fichiers externes. Pour
 * garder une Content-Security-Policy stricte (sans 'unsafe-inline') on
 * autorise ces scripts par empreinte exacte dans public/.htaccess.
 *
 * À relancer après toute modification du contenu des balises <script> de
 * Header.astro ou Contact.astro (ou de tout autre script inline ajouté) :
 *
 *   npm run build
 *   node scripts/print-csp-hashes.mjs
 *
 * Puis copier les valeurs affichées dans la ligne "Content-Security-Policy"
 * de public/.htaccess (directive script-src), et relancer `npm run build`.
 */
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { createHash } from 'node:crypto';
import path from 'node:path';

const DIST = 'dist';

function walk(dir, files = []) {
  for (const entry of readdirSync(dir)) {
    const full = path.join(dir, entry);
    if (statSync(full).isDirectory()) walk(full, files);
    else if (entry.endsWith('.html')) files.push(full);
  }
  return files;
}

let htmlFiles;
try {
  htmlFiles = walk(DIST);
} catch {
  console.error(`Dossier "${DIST}" introuvable — lance d'abord "npm run build".`);
  process.exit(1);
}

const scriptRe = /<script type="module">([\s\S]*?)<\/script>/g;
const hashes = new Map();

for (const file of htmlFiles) {
  const html = readFileSync(file, 'utf8');
  let m;
  while ((m = scriptRe.exec(html))) {
    const hash = createHash('sha256').update(m[1], 'utf8').digest('base64');
    if (!hashes.has(hash)) hashes.set(hash, []);
    hashes.get(hash).push(path.relative(DIST, file));
  }
}

if (hashes.size === 0) {
  console.log('Aucun script inline (type="module") trouvé dans le build.');
} else {
  console.log(`${hashes.size} script(s) inline distinct(s) trouvé(s) :\n`);
  for (const [hash, files] of hashes) {
    console.log(`'sha256-${hash}'`);
    console.log(`  vu dans : ${files.slice(0, 3).join(', ')}${files.length > 3 ? ` (+${files.length - 3})` : ''}\n`);
  }
  console.log('Valeur complète pour script-src :');
  console.log([...hashes.keys()].map((h) => `'sha256-${h}'`).join(' '));
}
