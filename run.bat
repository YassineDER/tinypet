@echo off
setlocal EnableDelayedExpansion

PUSHD src\main\webapp
for /d %%x in (*) do if /i not "%%x"=="WEB-INF" rd /s /q "%%x"
del /q *.*
POPD
if %ERRORLEVEL% neq 0 exit /b %ERRORLEVEL%

PUSHD tinypet-app
CALL ng build
POPD
if %ERRORLEVEL% neq 0 exit /b %ERRORLEVEL%

call mvn clean install
if %ERRORLEVEL% neq 0 exit /b %ERRORLEVEL%

call mvn appengine:run
if %ERRORLEVEL% neq 0 exit /b %ERRORLEVEL%
