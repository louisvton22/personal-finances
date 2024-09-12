FROM node:current-alpine

WORKDIR /app

COPY ./client/package*.json .

RUN npm install --quiet

COPY ./client/ .

EXPOSE 3000

RUN npx prisma generate

CMD ["npm", "run", "dev"]



