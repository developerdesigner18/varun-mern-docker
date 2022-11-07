# Derivative of ethereum/Dockerfile, look there for an explanation on how it works.
FROM node:16-alpine@sha256:f21f35732964a96306a84a8c4b5a829f6d3a0c5163237ff4b6b8b34f8d70064b as builder

RUN apk add g++ make 
RUN mkdir -p /app
WORKDIR /app

#COPY package.json package-lock.json ./
COPY package.json .

COPY . .
RUN npm install
CMD [ "npm", "start" ]