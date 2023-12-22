#!/bin/bash

set -e

pushd src/main/webapp || exit
find . -mindepth 1 ! -regex '^./WEB-INF\(/.*\)?' -delete || exit
popd || exit

pushd tinypet-app || exit
npm install
npm run build || exit
popd || exit

mvn clean install || exit

mvn endpoints-framework:openApiDocs || exit
gcloud endpoints services deploy target/openapi-docs/openapi.json || exit

mvn appengine:deploy || exit
