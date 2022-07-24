FROM node:16-alpine

WORKDIR /usr/src/

COPY ./package*.json ./

RUN npm install --legacy-peer-deps

WORKDIR /usr/src/app

COPY . /usr/src/app
