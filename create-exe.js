import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🚀 Creating Bolt Crypto Flasher .exe file...\n');

try {
  // Step 1: Build the web application
  console.log('📦 Building web application...');
  execSync('npm run build', { stdio: 'inherit' });
  console.log('✅ Web application built successfully\n');

  // Step 2: Create exe directory
  const exeDir = path.join(__dirname, 'exe-build');
  if (fs.existsSync(exeDir)) {
    fs.rmSync(exeDir, { recursive: true });
  }
  fs.mkdirSync(exeDir, { recursive: true });

  // Step 3: Create standalone server for exe
  const exeServerContent = `const express = require('express');
const path = require('path');
const { createServer } = require('http');

const app = express();
const PORT = 5000;

// Serve static files from bundled assets
app.use(express.static(path.join(__dirname, 'public')));

// Basic health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Bolt Crypto Flasher is running' });
});

// API endpoints for basic functionality
app.get('/api/subscription-plans', (req, res) => {
  res.json([
    { id: '1', name: 'Basic', price: 550, features: ['BTC', 'ETH'] },
    { id: '2', name: 'Pro', price: 950, features: ['BTC', 'ETH', 'USDT'] },
    { id: '3', name: 'Full', price: 3000, features: ['All Networks', 'Premium Support'] }
  ]);
});

app.get('/api/auth/user', (req, res) => {
  // Return admin user for exe version
  res.json({
    id: 'admin',
    username: 'admin',
    hasActiveSubscription: true,
    subscriptionPlan: 'Full'
  });
});

app.post('/api/transactions', express.json(), (req, res) => {
  const { amount, recipient, currency, network } = req.body;
  
  // Simulate transaction creation
  const transaction = {
    id: Date.now().toString(),
    amount,
    recipient,
    currency,
    network,
    status: 'pending',
    flashFee: '0.019 ETH',
    flashAddress: 'TQm8yS3XZHgXiHMtMWbrQwwmLCztyvAG8y',
    createdAt: new Date().toISOString()
  };
  
  res.json(transaction);
});

// Serve index.html for all other routes (SPA support)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

console.log('🔥 Bolt Crypto Flasher is starting...');
console.log('💰 Professional Cryptocurrency Flash Platform');
console.log('🌐 Opening browser to: http://localhost:5000');
console.log('');

const server = createServer(app);

server.listen(PORT, () => {
  console.log('⚡ Server running on http://localhost:5000');
  console.log('🎯 Ready for flash transactions!');
  console.log('📝 Login with: admin / usdt123');
  
  // Auto-open browser
  if (process.platform === 'win32') {
    const { exec } = require('child_process');
    setTimeout(() => {
      exec('start http://localhost:5000');
    }, 1000);
  }
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down Bolt Crypto Flasher...');
  server.close(() => {
    console.log('✅ Server stopped gracefully');
    process.exit(0);
  });
});`;

  fs.writeFileSync(path.join(exeDir, 'server.js'), exeServerContent);

  // Step 4: Create package.json for exe
  const exePackageJson = {
    "name": "bolt-crypto-flasher-exe",
    "version": "1.0.0",
    "main": "server.js",
    "bin": "server.js",
    "pkg": {
      "assets": ["public/**/*"],
      "targets": ["node18-win-x64"],
      "outputPath": "../"
    },
    "dependencies": {
      "express": "^4.18.2"
    }
  };

  fs.writeFileSync(path.join(exeDir, 'package.json'), JSON.stringify(exePackageJson, null, 2));

  // Step 5: Copy public files
  const distDir = path.join(__dirname, 'dist');
  const targetPublicDir = path.join(exeDir, 'public');

  if (fs.existsSync(path.join(distDir, 'public'))) {
    fs.cpSync(path.join(distDir, 'public'), targetPublicDir, { recursive: true });
  }

  // Step 6: Install dependencies in exe directory
  console.log('📦 Installing dependencies...');
  process.chdir(exeDir);
  execSync('npm install', { stdio: 'inherit' });

  // Step 7: Create the exe file
  console.log('⚡ Creating .exe file...');
  execSync('npx pkg . --output BoltCryptoFlasher.exe', { stdio: 'inherit' });

  // Move exe to main directory
  const exeFile = path.join(exeDir, 'BoltCryptoFlasher.exe');
  const targetExe = path.join(__dirname, 'BoltCryptoFlasher.exe');
  
  if (fs.existsSync(exeFile)) {
    fs.copyFileSync(exeFile, targetExe);
    console.log('✅ .exe file created successfully!');
    console.log('📁 Location: BoltCryptoFlasher.exe');
    
    // Check file size
    const stats = fs.statSync(targetExe);
    const fileSizeMB = (stats.size / (1024 * 1024)).toFixed(2);
    console.log(`📊 File size: ${fileSizeMB} MB`);
  }

  console.log('\n🎉 Build completed successfully!');
  console.log('🎯 Your .exe file is ready for distribution');
  console.log('📝 Users can run it directly - no installation needed');

} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}