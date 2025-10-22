# Connectify

**Connectify** est une application web interactive développée avec **React (Vite)** et **Firebase**.  
Elle permet aux utilisateurs de se connecter, partager leur passion pour la musique, publier des contenus (photos, vidéos, audios) et interagir avec une communauté musicale dynamique.

---

##  Installation et utilisation du projet

Structure du projet:

connectify/
├── Dockerfile
├── docker-compose.yml
├── .env
├── package.json
├── vite.config.js
├── public/
├── src/
│   ├── components/
│   ├── pages/
│   ├── firebase.js
│   ├── App.jsx
│   └── main.jsx
└── dist/


### Cloner le dépôt
Ouvre ton terminal et exécute :
```bash
git clone https://github.com/ton-utilisateur/connectify.git
cd connectify

Installer toutes les librairies nécessaires :
npm install

Le projet utilise Firebase (Auth + Firestore)
+ Docker

npm run dev
