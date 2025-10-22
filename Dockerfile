# Étape 1 : build du projet
FROM node:20 AS build

WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# Étape 2 : serveur web léger pour servir les fichiers
FROM nginx:alpine

# Supprimer la page par défaut de Nginx
RUN rm -rf /usr/share/nginx/html/*

# Copier les fichiers build dans le dossier de Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Copier une config Nginx custom si besoin
# COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
