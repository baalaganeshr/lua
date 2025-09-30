@echo off
color 0A
echo ========================================
echo    lua-react-boilerplate Builder
echo ========================================
echo.

echo [1/3] Installing dependencies...
cd web
npm install
if %errorlevel% neq 0 (
    echo.
    echo ^[ERROR^] Failed to install dependencies!
    pause
    exit /b 1
)

echo.
echo [2/3] Building React application...
npm run build
if %errorlevel% neq 0 (
    echo.
    echo ^[ERROR^] Failed to build application!
    pause
    exit /b 1
)

echo.
echo [3/3] Build completed successfully!
echo.
echo Files built to: build/
echo.
echo To use in FiveM:
echo 1. Copy this folder to your resources directory
echo 2. Add 'ensure lua-react-boilerplate' to server.cfg
echo 3. Restart your server
echo.
echo For development, use: npm run watch
echo.
pause