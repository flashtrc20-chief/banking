# Bolt Crypto Flasher - Desktop Application Setup

## Overview
This document explains how to build and distribute the standalone desktop version of Bolt Crypto Flasher.

## Building the Desktop Application

### Prerequisites
- Node.js installed
- All dependencies installed (`npm install`)

### Build Process
```bash
# Build the desktop application
node build-electron.js
```

This will:
1. Build the web application for production
2. Create necessary Electron configuration
3. Generate a Windows installer (.exe file)
4. Output the installer to `dist-electron/` directory

### Output Files
- **Windows**: `BoltCryptoFlasher-Setup-1.0.0.exe`
- **macOS**: `BoltCryptoFlasher-1.0.0.dmg` (if built on macOS)
- **Linux**: `BoltCryptoFlasher-1.0.0.AppImage` (if built on Linux)

## Features of Desktop Version

### Embedded Server
- Self-contained Express.js server
- No external dependencies required
- Automatic database setup
- Local data storage

### Desktop Integration
- Native window controls
- System tray integration
- Auto-start capabilities
- File association support

### Security Features
- Sandboxed web content
- Secure context isolation
- External link protection
- Local data encryption

## Distribution

### Single File Distribution
The generated `.exe` file contains everything needed:
- Complete application
- Database system
- All dependencies
- User interface

### Installation Process
1. Download the `.exe` file
2. Run the installer
3. Follow setup wizard
4. Launch from desktop shortcut

### System Requirements
- **Windows**: Windows 10 or later (64-bit)
- **RAM**: Minimum 4GB recommended
- **Storage**: 500MB available space
- **Network**: Internet connection for transactions

## Configuration

### Default Settings
- Server runs on `localhost:5000`
- Database stored in user data directory
- Automatic updates disabled (manual distribution)

### Custom Configuration
Users can modify settings through the application interface:
- Network preferences
- Display settings
- Security options
- Backup configurations

## Troubleshooting

### Common Issues
1. **Antivirus Detection**: Some antivirus software may flag the application
   - Solution: Add to whitelist or exclude from scanning

2. **Port Conflicts**: If port 5000 is in use
   - Solution: Application will automatically find available port

3. **Database Issues**: If data doesn't persist
   - Solution: Check user permissions and available disk space

### Support
For technical support:
- Check application logs in user data directory
- Verify system requirements
- Ensure latest version is installed

## Advanced Usage

### Command Line Options
```bash
# Start in development mode
BoltCryptoFlasher.exe --dev

# Custom port
BoltCryptoFlasher.exe --port=8080

# Debug mode
BoltCryptoFlasher.exe --debug
```

### Data Management
- **Backup**: User data automatically backed up daily
- **Export**: Transaction history can be exported to CSV
- **Import**: Settings can be imported from backup files

## Building for Other Platforms

### macOS Build
```bash
# On macOS system
npx electron-builder --mac
```

### Linux Build
```bash
# On Linux system
npx electron-builder --linux
```

Your Bolt Crypto Flasher desktop application is ready for distribution!