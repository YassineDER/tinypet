#!/bin/bash

# Stop the script on errors
set -e

# Change to the output directory
pushd src/main/webapp || exit

# Delete all files and directories except WEB-INF
find . -mindepth 1 ! -regex '^./WEB-INF\(/.*\)?' -delete || exit

# Change back to the script directory
popd || exit

# Run Angular build
pushd tinypet-app || exit
npm i -g @angular/cli
ng build || exit
popd || exit

# Clean and package your project
mvn clean install || exit

# Deploy
mvn appengine:run || exit
