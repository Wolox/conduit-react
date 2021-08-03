FROM cypress/base:10
RUN npm install --save-dev cypress
RUN $(npm bin)/cypress verify
RUN $(npm bin)/cypress run

WORKDIR /home/node

COPY package.json .

RUN npm install

ENV PATH /home/node/node_modules/.bin:$PATH

WORKDIR /home/node/app
