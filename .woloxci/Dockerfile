FROM node:14
WORKDIR /home/node/app
RUN mkdir -p /home/node/.npm-global \
 && npm config set prefix '/home/node/.npm-global' \
 && echo "export PATH=/home/node/.npm-global/bin:$PATH" >> /home/node/.profile
RUN . /home/node/.profile

RUN chown -R $USER ~/.npm-global  
RUN chown -R $USER $(npm config get prefix)
RUN chown -R $USER /home/node/app

COPY package.json .
RUN npm install 
