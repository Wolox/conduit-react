FROM node:14
WORKDIR /home/node
COPY package.json .
ENV PATH /home/node/node_modules/.bin:$PATH
RUN chown -R 498:497 "/.npm"
RUN npm install
WORKDIR /home/node/app