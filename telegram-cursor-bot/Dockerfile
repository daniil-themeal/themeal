FROM node:22-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --omit=dev

COPY *.ts tsconfig.json allowed-users.json ./
COPY data ./data

ENV NODE_ENV=production

CMD ["npm", "start"]
