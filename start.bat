@echo off
echo.
echo   Pure Swad - Starting Development Server...
echo   URL: http://localhost:5173
echo.
cd /d "%~dp0"
npm run dev -- --host 0.0.0.0 --port 5173
pause