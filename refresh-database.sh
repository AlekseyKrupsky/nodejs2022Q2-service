#!/bin/sh

for i in {1..5}; do npm run migration:revert; done

npm run migration:run

