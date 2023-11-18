@echo off

REM Echo each command
setlocal EnableDelayedExpansion

REM Stop the script on errors
set ERRORLEVEL=0

REM Command to clean and package your project
call mvn clean install
if %ERRORLEVEL% neq 0 exit /b %ERRORLEVEL%

REM Command to deploy
call mvn appengine:run -Dappengine.port=8280
if %ERRORLEVEL% neq 0 exit /b %ERRORLEVEL%
