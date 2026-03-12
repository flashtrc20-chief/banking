#!/bin/bash

# Vercel Deployment Setup Script
# This script automates the setup process for deploying to Vercel

set -e

echo "=================================="
echo "Bolt Crypto Flasher - Vercel Setup"
echo "=================================="
echo ""

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found. Installing globally..."
    npm install -g vercel
else
    echo "✅ Vercel CLI is installed"
fi

echo ""
echo "Step 1: Checking Node.js version..."
node_version=$(node -v)
echo "✅ Using Node.js $node_version"

echo ""
echo "Step 2: Installing dependencies..."
npm install
echo "✅ Dependencies installed"

echo ""
echo "Step 3: Running type check..."
npm run check
echo "✅ Type check passed"

echo ""
echo "Step 4: Building application..."
npm run build
echo "✅ Build successful"

echo ""
echo "Step 5: Logging into Vercel..."
echo ""
echo "Please follow the prompts to log in to Vercel..."
echo "If you don't have an account, create one at https://vercel.com"
echo ""
vercel login

echo ""
echo "Step 6: Setting up environment variables..."
echo ""
echo "You need to set up your DATABASE_URL environment variable."
echo "Get this from Neon: https://console.neon.tech"
echo ""
read -p "Enter your Neon DATABASE_URL: " DATABASE_URL

if [ -z "$DATABASE_URL" ]; then
    echo "❌ DATABASE_URL is required"
    exit 1
fi

echo ""
echo "Step 7: Deploying to Vercel..."
vercel env add DATABASE_URL <<< "$DATABASE_URL"

echo ""
echo "Step 8: Running production deployment..."
echo ""
echo "Choose your deployment preferences when prompted:"
echo "  - Link to existing project: No (for first time)"
echo "  - Build command: (use default - npm run build)"
echo "  - Output directory: (use default - dist)"
echo ""
read -p "Press Enter to continue with deployment..."

vercel --prod

echo ""
echo "=================================="
echo "✅ Deployment Complete!"
echo "=================================="
echo ""
echo "Your application is now live on Vercel!"
echo ""
echo "Next steps:"
echo "1. Verify your application is running:"
echo "   - Check https://vercel.com/dashboard for your project URL"
echo ""
echo "2. Test API connectivity:"
echo "   - curl https://your-project.vercel.app/api/auth/login"
echo ""
echo "3. Update your Windows app with the new backend URL"
echo "   - See: WINDOWS-APP-URL-UPDATE.md"
echo ""
echo "4. Monitor your deployment:"
echo "   - vercel logs --follow"
echo ""
