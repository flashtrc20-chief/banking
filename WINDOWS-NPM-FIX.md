# Fix for Windows NPM Installation Error

## The Problem
You're getting "Access to the registry key denied" error when running `npm install` on Windows.

## Solutions (Try in Order)

### Solution 1: Run as Administrator
1. Close your current terminal/PowerShell
2. Right-click on PowerShell or Command Prompt
3. Select "Run as Administrator"
4. Navigate to your project folder:
   ```powershell
   cd C:\Users\YourUsername\Desktop\bolt-crypto-flasher
   ```
5. Run the install command:
   ```powershell
   npm install
   ```

### Solution 2: Use Command Prompt Instead
Sometimes PowerShell has issues that Command Prompt doesn't:
1. Open Command Prompt as Administrator (not PowerShell)
2. Navigate to your project
3. Run `npm install`

### Solution 3: Clear NPM Cache
```bash
npm cache clean --force
npm install
```

### Solution 4: Disable Windows Defender Temporarily
1. Open Windows Security
2. Go to Virus & threat protection
3. Turn off Real-time protection temporarily
4. Run `npm install`
5. Turn protection back on

### Solution 5: Install Without Optional Dependencies
```bash
npm install --no-optional
```

### Solution 6: Use Yarn Instead
If npm continues to fail:
```bash
# Install yarn globally
npm install -g yarn

# Use yarn to install dependencies
yarn install
```

## If All Else Fails

### Manual Installation Steps:
1. Delete `node_modules` folder if it exists
2. Delete `package-lock.json` file
3. Open Command Prompt as Administrator
4. Run these commands one by one:
   ```bash
   npm config set registry https://registry.npmjs.org/
   npm install --force
   ```

### Alternative: Use Git Bash
1. Install Git for Windows if not already installed
2. Right-click in your project folder
3. Select "Git Bash Here"
4. Run `npm install`

## Prevention for Future
- Always run your terminal as Administrator when working with npm on Windows
- Consider using WSL (Windows Subsystem for Linux) for development
- Keep Windows and npm updated

## Quick Fix Command
Try this all-in-one command in Administrator Command Prompt:
```bash
npm cache clean --force && npm install --no-optional --force
```

This should resolve your installation issues!