# Etapa 1: build da aplicação
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Etapa 2: imagem final para produção
FROM node:20-alpine

WORKDIR /app

COPY --from=build /app/package*.json ./
COPY --from=build /app/dist ./dist
COPY --from=build /app/wait-for-it.sh ./wait-for-it.sh

RUN npm install --only=production

EXPOSE 3000

CMD ["node", "dist/index.js"]