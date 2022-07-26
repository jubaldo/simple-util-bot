FROM node:18-alpine3.15


WORKDIR /usr/app

COPY src .
COPY package*.json .
RUN npm install

# Set up a default command
CMD [ "node","app.js" ]