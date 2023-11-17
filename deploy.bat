@echo off

REM Echo each command
setlocal EnableDelayedExpansion

REM Stop the script on errors
set ERRORLEVEL=0

REM Command to clean and package your project
call mvn clean install
if %ERRORLEVEL% neq 0 exit /b %ERRORLEVEL%

REM Generate API
call mvn endpoints-framework:openApiDocs
if %ERRORLEVEL% neq 0 exit /b %ERRORLEVEL%

call gcloud endpoints services deploy target/openapi-docs/openapi.json
if %ERRORLEVEL% neq 0 exit /b %ERRORLEVEL%

REM Command to deploy
call mvn appengine:deploy
if %ERRORLEVEL% neq 0 exit /b %ERRORLEVEL%
