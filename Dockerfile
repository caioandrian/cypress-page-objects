FROM node:latest

WORKDIR /usr/src/e2e

RUN apt-get update && apt-get install --yes libgtk2.0-0 libgtk-3-0 libgbm-dev libnotify-dev libgconf-2-4 libnss3 libxss1 libasound2 libxtst6 xauth xvfb && apt-get clean cache

COPY package*.json ./

RUN npm install

COPY . .

ENTRYPOINT [ "npm", "run", "test"]