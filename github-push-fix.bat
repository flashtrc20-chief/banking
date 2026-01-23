@echo off
echo GitHub Push Fix - Removing Large Files
echo =====================================

echo Step 1: Remove large files from Git index...
git rm --cached BoltCryptoFlasher.exe
git rm --cached exe-build/BoltCryptoFlasher.exe
git rm --cached *.tar.gz
git rm -r --cached exe-build/
git rm -r --cached native-app/
git rm -r --cached portable-app/

echo Step 2: Update .gitignore...
echo *.exe >> .gitignore
echo *.tar.gz >> .gitignore
echo exe-build/ >> .gitignore
echo native-app/ >> .gitignore
echo portable-app/ >> .gitignore

echo Step 3: Configure Git for large repositories...
git config http.postBuffer 524288000
git config http.maxRequestBuffer 100M
git config core.compression 0
git config pack.windowMemory 256m
git config pack.packSizeLimit 2g

echo Step 4: Commit changes...
git add .gitignore
git add client/
git add server/
git add shared/
git add *.json *.md *.ts *.js
git commit -m "Remove large distribution files - deploy source code only"

echo Step 5: Push to GitHub...
git push -u origin main

echo.
echo If push still fails, try:
echo git push --set-upstream origin main --force
echo.
pause