FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

# Certifique-se de que o TypeScript compile os arquivos para o diretório dist
RUN npm run build

# Use o diretório dist como ponto de entrada
EXPOSE 3000

CMD ["node", "dist/index.js"]
