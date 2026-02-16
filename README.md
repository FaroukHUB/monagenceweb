# mon-agenceweb.fr

Site vitrine de l'agence web, construit avec Next.js 16 et exporté en site statique.

## Stack technique

- **Framework** : Next.js 16 (App Router, export statique)
- **React** : 19
- **Styling** : Tailwind CSS 4
- **Langage** : TypeScript 5

## Développement local

```bash
npm install
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
```

Le site statique est généré dans le dossier `out/`.

## Déploiement sur o2switch

Le déploiement est automatisé via GitHub Actions.

### Configuration (une seule fois)

1. Aller dans **Settings > Secrets and variables > Actions** du repo GitHub
2. Ajouter ces 3 secrets :

| Secret | Valeur |
|--------|--------|
| `FTP_HOST` | Votre serveur FTP o2switch (ex: `ftp.mon-agenceweb.fr` ou l'IP du serveur) |
| `FTP_USERNAME` | Votre identifiant FTP o2switch |
| `FTP_PASSWORD` | Votre mot de passe FTP o2switch |

### Fonctionnement

- **Push sur `main`** : build + déploiement automatique sur o2switch via FTP
- **Push sur `claude/*`** : build uniquement (vérification que tout compile)
- **Manuel** : lancer le workflow depuis l'onglet Actions de GitHub

### Déploiement manuel (sans CI/CD)

Si besoin de déployer manuellement :

1. Builder localement : `npm run build`
2. Uploader le contenu du dossier `out/` à la racine de votre hébergement o2switch via FileZilla ou le gestionnaire de fichiers cPanel
