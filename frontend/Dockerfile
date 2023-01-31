FROM node:18.8.0-alpine

ARG PORT

WORKDIR /app

# Install microservice dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install

# Bundle microservice source
COPY . .

CMD [ "npm", "run", "dev" ]   