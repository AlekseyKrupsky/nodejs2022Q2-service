FROM node:16-alpine

WORKDIR /usr/src/

COPY ./package*.json ./

RUN npm install --legacy-peer-deps

WORKDIR /usr/src/app

#RUN touch testfile123

#USER node

COPY . /usr/src/app

#CMD [ "npm", "run", "start:dev" ]
#CMD [ "top" ]
