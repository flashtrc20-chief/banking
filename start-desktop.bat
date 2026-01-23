@echo off
cls
echo ============================================
echo    BOLT FLASHER - DESKTOP APPLICATION
echo ============================================
echo.
echo Starting Bolt Flasher Desktop v1.0.0...
echo.

:: Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Node.js is not installed!
    echo.
    echo Please install Node.js from: https://nodejs.org
    echo.
    pause
    exit /b
)

echo [√] Node.js detected
echo.

:: Check if dependencies are installed
if not exist node_modules (
    echo [!] Installing dependencies...
    echo This may take a few minutes on first run...
    echo.
    call npm install
    if errorlevel 1 (
        echo [ERROR] Failed to install dependencies
        pause
        exit /b
    )
    echo.
    echo [√] Dependencies installed
    echo.
)

:: Build the application if not built
if not exist server\public (
    echo [!] Building application...
    echo This may take a few minutes on first run...
    echo.
    call npm run build
    if errorlevel 1 (
        echo [ERROR] Failed to build application
        pause
        exit /b
    )
    echo.
    echo [√] Application built successfully
    echo.
)

:: Launch the desktop app
echo ============================================
echo    LAUNCHING BOLT FLASHER...
echo ============================================
echo.
echo The application will open in a new window.
echo.
echo DO NOT CLOSE THIS CONSOLE WINDOW
echo (It runs the backend server)
echo.

:: Start with integrated main file
npx electron electron/integrated-main.js

:: If electron exits, pause to show any errors
if errorlevel 1 (
    echo.
    echo [ERROR] Application crashed or was closed unexpectedly
    echo.
    pause
)