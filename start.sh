#!/bin/bash
echo "Starting to-do app..."
cd "$(dirname "$0")"
cd to-do/client
npm install --save --legacy-peer-deps
ng build
cd ..
npm install
npm start