# Bolt Crypto Flasher - EXE Build Instructions

## Prerequisites
1. Node.js 18+ installed
2. All dependencies installed (`npm install`)
3. Windows OS for building .exe

## Build Steps

### Step 1: Build the Client
```bash
npm run build
```

### Step 2: Build the Server for Electron
Create a temporary build script `build-server-electron.js`:
```javascript
const { exec } = require('child_process');
const fs = require('fs');

// Build server with esbuild
exec('npx esbuild server/index.ts --bundle --platform=node --target=node18 --external:electron --external:@neondatabase/serverless --external:drizzle-orm --external:ws --external:express --external:passport --external:openid-client --outfile=dist/server.js', (err, stdout, stderr) => {
  if (err) {
    console.error('Server build failed:', err);
    return;
  }
  console.log('Server built successfully!');
});
```

Run it:
```bash
node build-server-electron.js
```

### Step 3: Package with Electron
```bash
npx electron-builder --config electron-build-config.json
```

## Important Notes

1. **Offline Mode**: The packaged exe runs in offline mode without requiring a database connection.

2. **Admin Credentials**: 
   - Username: `admin` (case-insensitive)
   - Password: `usdt123`
   
   OR
   
   - Username: `SoftwareHenry` (case-insensitive)
   - Password: `Rmabuw190`

3. **Environment Variables**: The exe doesn't require any environment variables like DATABASE_URL.

4. **Features in Offline Mode**:
   - Admin login works
   - Basic subscription management
   - Flash transaction interface (UI only, no actual blockchain transactions)
   - User management for admins

## Troubleshooting

### Error: DATABASE_URL must be set
This error occurs when the production detection fails. Make sure:
1. The build process sets NODE_ENV=production
2. The offline storage is properly configured

### Module not found errors
These occur when Node.js internals aren't properly bundled. The solution:
1. Use `--external` flags for problematic modules
2. Set `asar: false` in electron-build-config.json
3. Include all necessary files in the build configuration

### Build Output
The final executable will be located at:
```
dist-electron/Bolt Crypto Flasher.exe
```

## Quick Build Command
After setting up the scripts, you can run:
```bash
node build-exe.js
```

This will automatically execute all build steps in sequence.