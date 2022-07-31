#!/bin/sh

cp -r /usr/src/node_modules /usr/src/app/

cd /usr/src/app

npm audit

sleep 3

exec npm run start:dev