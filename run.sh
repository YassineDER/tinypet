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
npm i || exit
npm i -g @angular/cli || exit
npm run build || exit
popd || exit

# Clean and package your project
mvn clean install || exit
mvn endpoints-framework:openApiDocs || exit
gcloud endpoints services deploy target/openapi-docs/openapi.json || exit

# Deploy
mvn appengine:run || exit
