FROM node:20

WORKDIR /app

# Install system dependencies for node-canvas
RUN apt-get update && apt-get install -y \
    build-essential \
    libcairo2-dev \
    libjpeg-dev \
    libpango1.0-dev \
    libgif-dev \
    libpixman-1-dev \
    libpangomm-1.4-dev \
    libgdk-pixbuf2.0-dev \
    libfontconfig1-dev \
    libfreetype6-dev \
    libpng-dev \
    libjpeg62-turbo-dev \
    libtiff-dev \
    libharfbuzz-dev \
    libfribidi-dev \
    gcc \
    g++ \
    make \
    && apt-get clean

COPY . .

COPY package*.json ./

RUN npm install
RUN npm install --production && npm install typescript

CMD [ "npm", "run", "start:dev" ]