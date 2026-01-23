#!/bin/bash

# Bolt Crypto Flasher - Instant Railway Deployment Script
# This script prepares and deploys your app to Railway in minutes

echo "🚀 Bolt Crypto Flasher - Railway Instant Deployment"
echo "=================================================="

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "📁 Initializing git repository..."
    git init
    git branch -M main
fi

# Add all files and commit
echo "📦 Preparing files for deployment..."
git add .
git commit -m "Deploy Bolt Crypto Flasher to Railway - $(date)"

# Check if Railway CLI is installed
if ! command -v railway &> /dev/null; then
    echo "🔧 Installing Railway CLI..."
    npm install -g @railway/cli
fi

echo ""
echo "🎯 Next Steps for Railway Deployment:"
echo "======================================"
echo ""
echo "1. Visit: https://railway.app"
echo "2. Click 'Login with GitHub' (no verification required)"
echo "3. Click 'Deploy from GitHub'"
echo "4. Select your repository"
echo "5. Railway will automatically:"
echo "   - Detect Node.js project"
echo "   - Create PostgreSQL database"
echo "   - Set up environment variables"
echo "   - Deploy your application"
echo ""
echo "⚡ Your app will be live in under 5 minutes!"
echo ""
echo "🔧 Alternative: CLI Deployment"
echo "If you prefer command-line deployment:"
echo "1. Run: railway login"
echo "2. Run: railway link (select your project)"
echo "3. Run: railway up"
echo ""
echo "💡 Benefits of Railway:"
echo "- No verification delays"
echo "- Integrated database hosting"
echo "- Automatic SSL certificates"
echo "- Custom domain support"
echo "- Global CDN"
echo "- ~$5-10/month cost"
echo ""
echo "🎉 Your Bolt Crypto Flasher platform will be accessible worldwide!"

# Push to remote if origin exists
if git remote get-url origin &> /dev/null; then
    echo "📤 Pushing to GitHub..."
    git push origin main
    echo "✅ Code pushed to GitHub - ready for Railway deployment!"
else
    echo "⚠️  Remember to push to GitHub before deploying to Railway"
    echo "   Add remote: git remote add origin https://github.com/username/bolt-crypto-flasher.git"
    echo "   Push code: git push -u origin main"
fi