#PASO 1
FROM node:latest as node
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --prod

#PASO 2
FROM nginx:alpine
COPY --from=node /app/dist/heroesApp /usr/share/nginx/html
