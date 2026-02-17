# mon-agenceweb.fr

Site vitrine statique en HTML + Tailwind CSS.

## Stack technique

- **HTML** statique (pas de framework)
- **Tailwind CSS 4** (compilé via CLI)
- **JavaScript** vanilla (menu mobile + FAQ accordion)

## Développement

```bash
npm install
npm run dev
```

Ouvre les fichiers HTML directement dans le navigateur.
Le CSS se recompile automatiquement à chaque modification.

## Build pour production

```bash
npm install
npm run build
```

Le CSS minifié est généré dans `css/style.css`.

## Déploiement sur o2switch (SSH)

```bash
source /home/zajr1824/nodevenv/mon-agenceweb.fr/20/bin/activate
cd ~/mon-agenceweb.fr
git pull
npm install
npm run build
```

Tous les fichiers HTML + CSS + JS sont directement servis par Apache. Pas de build lourd, pas de WebAssembly, pas de problème de mémoire.

## Structure

```
├── index.html              # Page d'accueil
├── services/index.html     # Nos services
├── offres/index.html       # Nos offres et tarifs
├── realisations/index.html # Réalisations
├── contact/index.html      # Contact
├── sites-qui-vendent/      # Service: sites web
├── google/                 # Service: SEO
├── whatsapp/               # Service: WhatsApp Business
├── ia/                     # Service: Intelligence artificielle
├── mailing/                # Service: Campagnes email
├── legal/                  # Mentions légales
├── css/style.css           # CSS compilé (généré)
├── js/main.js              # JavaScript (menu + FAQ)
├── src/input.css           # Source Tailwind CSS
└── images/                 # Images
```
