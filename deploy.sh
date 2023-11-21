#!/bin/bash

# Stop the script on errors
set -e

# Change to the output directory
pushd src/main/webapp

# Delete all files and directories except WEB-INF
find . -mindepth 1 ! -regex '^./WEB-INF\(/.*\)?' -delete

# Change back to the script directory
popd

# Run Angular build
pushd tinypet-app
ng build
popd

# Clean and package your project
mvn clean install

# Generate API
mvn endpoints-framework:openApiDocs

gcloud endpoints services deploy target/openapi-docs/openapi.json

# Deploy
mvn appengine:deploy
