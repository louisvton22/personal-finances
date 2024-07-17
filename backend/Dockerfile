FROM node:current-alpine

WORKDIR /app

COPY ./package*.json ./

RUN npm install --quiet

COPY . .

EXPOSE 3000

CMD ["node", "app.js"]
