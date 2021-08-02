FROM node:14

RUN apt update && apt install -y \
                 libgtk2.0-0 \
                 libgtk-3-0 \
                 libgbm-dev \
                 libnotify-dev \
                 libgconf-2-4 \
                 libnss3 \
                 libxss1 \
                 libasound2 \
                 libxtst6 \
                 xauth \
                 xvfb && \
   apt-get clean && apt-get autoclean

WORKDIR /home/node

COPY package.json .

ENV PATH /home/node/node_modules/.bin:$PATH

RUN npm ci

WORKDIR /home/node/app



