FROM node:lts
#18.8.0-alpine

ARG PORT

WORKDIR /usr/src/frontend

# Install microservice dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./
COPY vite.config.js ./

RUN npm install

# Bundle microservice source (must include a .dockerignore)
COPY . .

CMD [ "npm", "run", "dev" ]   