@echo off
REM Vercel Deployment Setup Script for Windows
REM This script automates the setup process for deploying to Vercel

setlocal enabledelayedexpansion

echo ==================================
echo Bolt Crypto Flasher - Vercel Setup
echo ==================================
echo.

REM Check if Node.js is installed
node -v >nul 2>&1
if errorlevel 1 (
    echo Error: Node.js is not installed
    echo Please install Node.js from https://nodejs.org
    pause
    exit /b 1
)

echo Step 1: Checking Node.js version...
for /f "tokens=*" %%i in ('node -v') do set NODE_VERSION=%%i
echo Node.js version: %NODE_VERSION%
echo.

REM Check if Vercel CLI is installed
vercel --version >nul 2>&1
if errorlevel 1 (
    echo Vercel CLI not found. Installing globally...
    call npm install -g vercel
    if errorlevel 1 (
        echo Error installing Vercel CLI
        pause
        exit /b 1
    )
    echo Vercel CLI installed successfully
) else (
    echo Vercel CLI is installed
)

echo.
echo Step 2: Installing project dependencies...
call npm install
if errorlevel 1 (
    echo Error installing dependencies
    pause
    exit /b 1
)
echo Dependencies installed successfully
echo.

echo Step 3: Running type check...
call npm run check
if errorlevel 1 (
    echo Warning: Type check failed. Continuing anyway...
)
echo.

echo Step 4: Building application...
call npm run build
if errorlevel 1 (
    echo Error during build
    pause
    exit /b 1
)
echo Build successful
echo.

echo Step 5: Attempting to get Vercel CLI version...
vercel --version
echo.

echo ===================================
echo Manual Deployment Instructions
echo ===================================
echo.
echo Since this is a Windows environment, please follow these manual steps:
echo.
echo 1. Install Vercel CLI globally:
echo    npm install -g vercel
echo.
echo 2. Login to Vercel:
echo    vercel login
echo.
echo 3. Deploy to Vercel:
echo    vercel --prod
echo.
echo 4. When prompted, add your DATABASE_URL from Neon
echo.
echo For detailed instructions, see:
echo - VERCEL-MIGRATION-COMPLETE.md
echo - WINDOWS-APP-URL-UPDATE.md
echo.

pause
