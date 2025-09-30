@echo off
echo Starting lua-react-boilerplate development environment...
echo.
echo This will:
echo 1. Install dependencies
echo 2. Build the project
echo 3. Start watch mode
echo.
pause

cd web
echo Installing dependencies...
npm install

echo Building project...
npm run build

echo Starting watch mode...
echo Press Ctrl+C to stop
npm run watch

pause