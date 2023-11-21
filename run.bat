@REM @echo off

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

REM Command to clean and package your project
call mvn clean install
if %ERRORLEVEL% neq 0 exit /b %ERRORLEVEL%

REM Command to deploy
call mvn appengine:run
if %ERRORLEVEL% neq 0 exit /b %ERRORLEVEL%
