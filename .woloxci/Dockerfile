FROM node:14
WORKDIR /home/node
COPY "./package.json" .
RUN mkdir ~/.npm-global && npm config set prefix '~/.npm-global' && \
    export PATH=~/.npm-global/bin:$PATH
RUN npm install
ENV PATH /home/node/node_modules/.bin:~/.npm-global/bin:$PATH
WORKDIR /home/node/app
