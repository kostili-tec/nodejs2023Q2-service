FROM node:alpine

ENV NODE_ENV=development

WORKDIR /app

COPY package.json /app

RUN npm install && npm cache clean --force

COPY . .

EXPOSE $PORT

CMD [ "npm", "start:dev" ]