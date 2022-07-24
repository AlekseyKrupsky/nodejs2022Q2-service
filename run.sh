#!/bin/sh

cp -r /usr/src/node_modules /usr/src/app/

#cd /usr/src/app

#whoami

exec npm run start:dev

#npm run start:dev