FROM node:14
WORKDIR /home/node/app
RUN mkdir /home/node/.npm-global \
 && npm config set prefix '/home/node/.npm-global' \
 && echo "export PATH=/home/node/.npm-global/bin:$PATH" >> /home/node/.profile
RUN . /home/node/.profile

COPY package.json .

RUN npm ci 
