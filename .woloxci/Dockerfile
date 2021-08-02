FROM node:14-alpine3.14

WORKDIR /home/node

COPY package.json .


ENV PATH /home/node/node_modules/.bin:$PATH

RUN npm ci

WORKDIR /home/node/app
