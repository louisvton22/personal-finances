FROM node:current-alpine

WORKDIR /app

COPY ./package*.json .

RUN npm install --quiet

COPY . .

EXPOSE 3000

RUN npx prisma generate

CMD ["npm", "run", "dev"]



