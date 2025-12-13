# Fix GitHub Push Issues - Large Files Solution

## Problem
Your push is failing because the repository contains large distribution files (138MB total):
- BoltCryptoFlasher.exe (39MB)
- BoltCryptoFlasher-Native.tar.gz (158MB)
- BoltCryptoFlasher-Portable.tar.gz (258KB)

GitHub has size limits that cause 408 timeout errors with large uploads.

## Solution Options

### Option 1: Exclude Distribution Files (Recommended)
```bash
# Create .gitignore to exclude large files
echo "*.exe" >> .gitignore
echo "*.tar.gz" >> .gitignore
echo "exe-build/" >> .gitignore
echo "native-app/" >> .gitignore
echo "portable-app/" >> .gitignore
echo "node_modules/" >> .gitignore

# Remove already tracked large files
git rm --cached *.exe *.tar.gz
git rm -r --cached exe-build/ native-app/ portable-app/ 2>/dev/null || true

# Commit the cleanup
git add .gitignore
git commit -m "Remove large distribution files from git tracking"

# Push successfully
git push -u origin main
```

### Option 2: Increase Git Buffer Size
```bash
# Increase HTTP buffer size for large pushes
git config http.postBuffer 524288000
git config http.maxRequestBuffer 100M
git config core.compression 0

# Try pushing again
git push -u origin main
```

### Option 3: Push in Smaller Chunks
```bash
# Push only source code first
git add client/ server/ shared/ package.json
git commit -m "Add source code"
git push -u origin main

# Then add other files gradually
```

## Recommended .gitignore File
```
# Distribution files
*.exe
*.tar.gz
exe-build/
native-app/
portable-app/

# Dependencies
node_modules/
package-lock.json

# Build outputs
dist/
build/

# Environment files
.env
.env.local

# OS files
.DS_Store
Thumbs.db

# IDE files
.vscode/
.idea/
*.swp
*.swo
```