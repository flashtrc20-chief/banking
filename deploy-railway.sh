#!/bin/bash

# Bolt Crypto Flasher - Railway Deployment Script
# This script helps prepare your application for Railway deployment

echo "🚀 Preparing Bolt Crypto Flasher for Railway deployment..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the project root directory."
    exit 1
fi

# Create railway.json configuration
echo "📄 Creating Railway configuration..."
cat > railway.json << 'EOF'
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "startCommand": "npm start",
    "healthcheckPath": "/",
    "healthcheckTimeout": 100
  }
}
EOF

# Create .railwayignore file
echo "📄 Creating .railwayignore..."
cat > .railwayignore << 'EOF'
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
dist/public/*.map
EOF

# Update package.json scripts if needed
echo "📦 Checking package.json scripts..."
if ! grep -q '"start"' package.json; then
    echo "⚠️  Adding start script to package.json..."
    # This would require jq or manual editing
    echo "Please ensure your package.json has a 'start' script that runs the production server"
fi

# Build the application
echo "🔨 Building application..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
else
    echo "❌ Build failed. Please fix build errors before deploying."
    exit 1
fi

# Check if git repository is initialized
if [ ! -d ".git" ]; then
    echo "📝 Initializing git repository..."
    git init
    git add .
    git commit -m "Initial commit for Railway deployment"
fi

echo "🎉 Preparation complete!"
echo ""
echo "Next steps:"
echo "1. Push your code to GitHub:"
echo "   git remote add origin https://github.com/yourusername/your-repo.git"
echo "   git push -u origin main"
echo ""
echo "2. Go to Railway.app and:"
echo "   - Connect your GitHub repository"
echo "   - Add a PostgreSQL database"
echo "   - Deploy your application"
echo ""
echo "3. Configure environment variables in Railway:"
echo "   - DATABASE_URL (automatically provided by Railway PostgreSQL)"
echo "   - NODE_ENV=production"
echo ""
echo "Your application will be available at: https://your-app-name.up.railway.app"