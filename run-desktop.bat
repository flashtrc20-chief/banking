@echo off
:: Quick launcher for Bolt Flasher Desktop
:: This replaces "npm start" since we can't edit package.json

echo ===============================================
echo     BOLT FLASHER DESKTOP - LAUNCHING
echo ===============================================
echo.

:: Check if node_modules exists
if not exist node_modules (
    echo Installing dependencies first...
    npm install
)

echo Starting Bolt Flasher Desktop Application...
echo.

:: Run the integrated Electron app
npx electron electron/integrated-main.js

:: If app closes, pause to see any errors
if errorlevel 1 (
    echo.
    echo Application closed with errors.
    pause
)