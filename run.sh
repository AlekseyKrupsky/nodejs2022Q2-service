#!/bin/sh

cp -r /usr/src/node_modules /usr/src/app/

cd /usr/src/app

npm audit

exec npm run start:dev
