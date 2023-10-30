FROM node:18.3.0-alpine3.14 
# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

RUN npm install
RUN npm ci

# Bundle app source
COPY . .

CMD ["npm", "run", "program"]
