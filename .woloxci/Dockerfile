FROM node:14
WORKDIR /home/node/app
RUN mkdir -p /home/node/.npm-global \
 && npm config set prefix '/home/node/.npm-global' \
 && echo "export PATH=/home/node/.npm-global/bin:$PATH" >> /home/node/.profile
RUN . /home/node/.profile
RUN chown -R node $(npm config get prefix)
RUN chown -R node /home/node/app
USER node
COPY package.json .
RUN npm install --verbose
