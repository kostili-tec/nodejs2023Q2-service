FROM node

ENV NODE_ENV=development

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . .

EXPOSE $PORT

CMD [ "npm", "start:dev" ]