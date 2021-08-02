FROM node:14-alpine3.14

WORKDIR /home/node

COPY package.json .
COPY package-lock.json .


ENV PATH /home/node/node_modules/.bin:$PATH

RUN npm install

WORKDIR /home/node/app
