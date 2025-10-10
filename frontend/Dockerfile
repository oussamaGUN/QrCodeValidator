FROM node:20-alpine

WORKDIR /app

COPY . .

COPY package*.json ./

RUN npm install
RUN npm install --production && npm install typescript


CMD [ "npm", "run", "dev" ]