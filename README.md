# Mini projet Web ESILV 2026

## Description du projet

Ce projet est une petite application web de suivi de depenses.

Le but est de pouvoir ajouter des depenses, les classer par categorie, voir la
liste des depenses et voir aussi le total. J'ai aussi ajouté une partie visuel
avec des graphiques pour que ce soit plus simple a lire.

Le frontend a ete fait avec Vue.js et le backend avec Fastify. Les donnees sont
enregistrées dans MongoDB donc elles restent meme si on redemarre le serveur.

Franchement l'idee etait de faire un projet simple mais complet pour appliquer
ce qu'on a vu en cours sur le front, le back et la base de donnée.

## Comment lancer le serveur

Il faut d'abord aller dans le dossier `server` :

```bash
cd server
```

Ensuite installer les dependances :

```bash
npm install
```

Puis lancer le serveur :

```bash
node src/index.js
```

Le serveur se lance sur le port `3000`.

## Comment lancer le frontend

Il faut aller dans le dossier `client` :

```bash
cd client
```

Ensuite installer les dependances :

```bash
npm install
```

Puis lancer le frontend :

```bash
npm run dev
```

Apres ca, Vite donne un lien local dans le terminal pour ouvrir le site dans le
navigateur.

## Remarque

Pour que le projet marche bien en local, il faut aussi lancer MongoDB en local,
sinon les depenses ne pourront pas etre enregistrer.
