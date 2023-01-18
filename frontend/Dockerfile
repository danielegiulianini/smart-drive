FROM node:18.8.0-alpine

ARG PORT

WORKDIR /app

# Install microservice dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If building for production: RUN npm ci --only=production

# Bundle microservice source
COPY . .

CMD [ "npm", "run", "dev" ]   
#CMD [ "npm", "run", "preview" ] if building for production