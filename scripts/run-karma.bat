@echo off
echo Starting Karma Server
echo -------------------------------------------------------------------
set BASE_DIR=%~dp0
karma start "%BASE_DIR%..\config\karma.conf.js" %*