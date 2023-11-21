@echo off

REM Echo each command
setlocal EnableDelayedExpansion

REM Stop the script on errors
set ERRORLEVEL=0

REM Change to the output directory
PUSHD src\main\webapp

REM Delete all files and directories except WEB-INF
for /d %%x in (*) do if /i not "%%x"=="WEB-INF" rd /s /q "%%x"
del /q *.*

REM Change back to the script directory
POPD

REM Run Angular build
PUSHD tinypet-app
CALL ng build
POPD

REM Clean and package your project
call mvn clean install
if %ERRORLEVEL% neq 0 exit /b %ERRORLEVEL%

REM Generate API
call mvn endpoints-framework:openApiDocs
if %ERRORLEVEL% neq 0 exit /b %ERRORLEVEL%

call gcloud endpoints services deploy target/openapi-docs/openapi.json
if %ERRORLEVEL% neq 0 exit /b %ERRORLEVEL%

REM Deploy
call mvn appengine:deploy
if %ERRORLEVEL% neq 0 exit /b %ERRORLEVEL%
