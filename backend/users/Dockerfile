FROM node:18.8.0-alpine

#ARG NAME #TO BE USED when refactoring dockerfile between services!
ARG PORT

# Create microservice directory #TO BE REFACTORED BY LEVERAGING DOCKER S ARG!
WORKDIR /usr/src/users

# Install microservice dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If building for production: RUN npm ci --only=production

# Bundle microservice source
COPY . .

CMD [ "node", "index.js" ]