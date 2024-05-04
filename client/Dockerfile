FROM node:18.18.1

WORKDIR /usr/app

COPY package*.json ./

RUN yarn install

COPY . .

RUN yarn add --dev process

RUN yarn build

RUN yarn global add serve

EXPOSE 3001
