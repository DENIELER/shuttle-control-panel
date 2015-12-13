@echo off

set LOG=F:\Projects\GitHub\shuttle-control-panel\server\extensions_server\log.txt

time /t >> %LOG%

node "%~dp0listen-chrome-extension.js" %* 2>> %LOG%

echo "Error level:" >> %LOG% 
echo  %errorlevel% >> %LOG%