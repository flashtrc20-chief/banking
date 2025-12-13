const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

console.log('Building Bolt Crypto Flasher executable...\n');

// Step 1: Build the client
console.log('Step 1: Building client...');
exec('npm run build', (err, stdout, stderr) => {
  if (err) {
    console.error('Client build failed:', err);
    return;
  }
  console.log('Client built successfully!\n');
  
  // Step 2: Build the server
  console.log('Step 2: Building server...');
  exec('npm run build:server', (err, stdout, stderr) => {
    if (err) {
      console.error('Server build failed:', err);
      return;
    }
    console.log('Server built successfully!\n');
    
    // Step 3: Package with Electron
    console.log('Step 3: Packaging with Electron...');
    exec('npm run electron:build', { 
      env: { 
        ...process.env,
        NODE_ENV: 'production',
        CSC_IDENTITY_AUTO_DISCOVERY: false 
      }
    }, (err, stdout, stderr) => {
      if (err) {
        console.error('Electron build failed:', err);
        console.error(stderr);
        return;
      }
      
      console.log('\n✅ Build completed successfully!');
      console.log('Your executable is located at: dist-electron/Bolt Crypto Flasher.exe');
      console.log('\nThe app will run in offline mode without requiring a database.');
      console.log('Admin credentials: admin/usdt123 or SoftwareHenry/Rmabuw190');
    });
  });
});