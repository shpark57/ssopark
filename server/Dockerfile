FROM node:18.18.1

WORKDIR /usr/app

COPY package*.json ./
RUN yarn

COPY . .

EXPOSE 6000

CMD ["yarn", "run" , "server"]