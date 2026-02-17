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

## Build et déploiement sur o2switch

```bash
# Activer Node.js sur o2switch
source /home/zajr1824/nodevenv/mon-agenceweb.fr/20/bin/activate

# Installer les dépendances
cd ~/mon-agenceweb.fr
npm install

# Builder le site statique (optimisé mémoire, utilise Babel au lieu de SWC)
npm run build
```

Le site statique est généré dans le dossier `out/`.
