#!/bin/sh

cp -r /usr/src/node_modules /usr/src/app/

cd /usr/src/app

npm audit

sleep 30000

#exec npm run start:dev
exec ls