#!/bin/bash

# Echo each command
set -x

# Stop the script on errors
set -e

# Command to clean and package your project
mvn clean install

# Command to deploy
mvn appengine:run
