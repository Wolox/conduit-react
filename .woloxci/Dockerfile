FROM node:14
WORKDIR /home/node/app
RUN mkdir /home/node/.npm-global \
 && npm config set prefix '/home/node/.npm-global' \
 && echo "export PATH=/home/node/.npm-global/bin:$PATH" >> /home/node/.profile
RUN . /home/node/.profile

RUN mkdir -p /.npm
RUN chown -R 498:0 /.npm

COPY package.json .

RUN npm install 

WORKDIR /home/node/app
