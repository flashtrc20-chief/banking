@echo off
echo Fixing GitHub Push Issues - Bolt Crypto Flasher
echo ================================================

echo Creating .gitignore to exclude large files...
echo *.exe >> .gitignore
echo *.tar.gz >> .gitignore
echo exe-build/ >> .gitignore
echo native-app/ >> .gitignore
echo portable-app/ >> .gitignore
echo node_modules/ >> .gitignore
echo dist/ >> .gitignore
echo .env >> .gitignore

echo Removing large files from Git tracking...
git rm --cached *.exe 2>nul
git rm --cached *.tar.gz 2>nul
git rm -r --cached exe-build/ 2>nul
git rm -r --cached native-app/ 2>nul
git rm -r --cached portable-app/ 2>nul
git rm -r --cached node_modules/ 2>nul

echo Configuring Git for better large file handling...
git config http.postBuffer 524288000
git config http.maxRequestBuffer 100M
git config core.compression 0

echo Committing changes...
git add .gitignore
git commit -m "Remove large distribution files and configure for GitHub"

echo Attempting to push to GitHub...
git push -u origin main

echo.
echo Done! Your source code should now push successfully.
echo Distribution files are excluded but still available locally.
echo.
pause