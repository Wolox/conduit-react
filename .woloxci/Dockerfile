FROM node:14-alpine3.14

WORKDIR /home/node

COPY package.json .

RUN npm install
RUN npm install cypress
ENV PATH /home/node/node_modules/.bin:$PATH

WORKDIR /home/node/app
