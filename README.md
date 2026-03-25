# Projet ESILV - Tracker de depenses

Application web full-stack permettant d'ajouter, consulter, categoriser et supprimer des depenses.

## Stack

- Frontend: Vue 3 + Vite
- Backend: Node.js + Fastify
- Base de donnees: MongoDB

## Fonctionnalites

- ajout d'une depense via formulaire
- categorie de depense
- affichage dynamique des depenses
- total des depenses
- modification de categorie
- suppression d'une depense
- graphiques par categorie

## Lancement en local

### Backend

```bash
cd server
npm install
node src/index.js
```

### Frontend

```bash
cd client
npm install
npm run dev
```

### MongoDB

Lancer MongoDB localement sur `mongodb://localhost:27017`.

## Variables d'environnement

### Frontend

Voir `client/.env.example`

Variable utile:

- `VITE_API_URL`: URL publique du backend

### Backend

Voir `server/.env.example`

Variables utiles:

- `PORT`
- `MONGODB_URI`
- `CORS_ORIGIN`

## Deploiement

### Frontend sur Netlify

- base directory: `client`
- build command: `npm run build`
- publish directory: `dist`
- variable d'environnement a definir:
  - `VITE_API_URL=https://<ton-backend-render>.onrender.com`

Le fichier `netlify.toml` est deja fourni.

### Backend sur Render

- service type: `Web Service`
- root directory: `server`
- build command: `npm install`
- start command: `npm start`
- variables d'environnement a definir:
  - `MONGODB_URI=<ton-uri-mongodb>`
  - `CORS_ORIGIN=https://<ton-frontend-netlify>.netlify.app`

Le fichier `render.yaml` est deja fourni.
