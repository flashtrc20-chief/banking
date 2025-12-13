import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🚀 Building Bolt Crypto Flasher Desktop Application...\n');

try {
  // Step 1: Build the web application
  console.log('📦 Building web application...');
  execSync('npm run build', { stdio: 'inherit' });
  console.log('✅ Web application built successfully\n');

  // Step 2: Create electron assets directory
  const assetsDir = path.join(__dirname, 'electron', 'assets');
  if (!fs.existsSync(assetsDir)) {
    fs.mkdirSync(assetsDir, { recursive: true });
  }

  // Step 3: Create a simple icon (you can replace with actual icon files)
  console.log('🎨 Creating application icons...');
  // For now, we'll create placeholder icon files
  // In production, you'd want actual .ico, .icns, and .png files
  const iconContent = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
  <rect width="256" height="256" fill="#1a1a1a" rx="32"/>
  <path d="M128 40L108 52L60 140h40L80 216l20-12l60-88h-40l28-76z" fill="#FFD700"/>
  <text x="128" y="240" text-anchor="middle" fill="#FFD700" font-family="Arial" font-size="20" font-weight="bold">BOLT</text>
</svg>`;
  
  fs.writeFileSync(path.join(assetsDir, 'icon.svg'), iconContent);
  console.log('✅ Icons created\n');

  // Step 4: Install Electron locally if needed
  console.log('📦 Installing Electron dependencies...');
  execSync('npm install electron electron-builder', { stdio: 'inherit' });

  // Step 5: Create electron build configuration
  const electronConfig = {
    "main": "electron/main.js",
    "build": {
      "appId": "com.boltcrypto.flasher",
      "productName": "Bolt Crypto Flasher", 
      "directories": {
        "output": "dist-electron"
      },
      "files": [
        "electron/main.js",
        "dist/**/*",
        "node_modules/**/*"
      ],
      "win": {
        "target": "nsis",
        "icon": "electron/assets/icon.ico"
      },
      "nsis": {
        "oneClick": false,
        "allowToChangeInstallationDirectory": true
      }
    }
  };

  // Write temporary package.json for electron-builder
  fs.writeFileSync('electron-build-config.json', JSON.stringify(electronConfig, null, 2));

  // Step 6: Build Electron application
  console.log('⚡ Building Electron application...');
  execSync('npx electron-builder --config electron-build-config.json --win', { stdio: 'inherit' });
  
  console.log('\n🎉 Build completed successfully!');
  console.log('📁 Your executable file is located in: dist-electron/');
  console.log('💡 Look for: BoltCryptoFlasher-Setup-1.0.0.exe');
  
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}