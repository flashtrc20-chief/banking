#!/bin/bash

# Bolt Crypto Flasher - Vercel Deployment Script
# This script helps prepare your application for Vercel deployment

echo "🚀 Preparing Bolt Crypto Flasher for Vercel deployment..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the project root directory."
    exit 1
fi

# Install Vercel CLI if not present
if ! command -v vercel &> /dev/null; then
    echo "📦 Installing Vercel CLI..."
    npm install -g vercel
fi

# Create SEO-optimized vercel.json configuration
echo "📄 Creating SEO-optimized Vercel configuration..."
cp vercel-seo.json vercel.json
echo "✅ SEO-optimized configuration applied!"

# Create .vercelignore file
echo "📄 Creating .vercelignore..."
cat > .vercelignore << 'EOF'
node_modules/
.git/
.env
*.log
.DS_Store
electron/
exe-build/
native-app/
portable-app/
*.exe
*.tar.gz
server/
client/
shared/
src/
EOF

# Build the application
echo "🔨 Building application..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
else
    echo "❌ Build failed. Please fix build errors before deploying."
    exit 1
fi

# Deploy to Vercel
echo "🚀 Deploying to Vercel..."
vercel --prod

if [ $? -eq 0 ]; then
    echo "🎉 Deployment successful!"
    echo ""
    echo "Next steps:"
    echo "1. Set up your database (recommended: Neon.tech)"
    echo "2. Configure environment variables in Vercel dashboard:"
    echo "   - DATABASE_URL=your_postgresql_connection_string"
    echo "   - NODE_ENV=production"
    echo ""
    echo "3. Your app will be available at the URL provided by Vercel"
else
    echo "❌ Deployment failed. Please check the error messages above."
    exit 1
fi