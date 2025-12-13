@echo off
:: Direct replacement for "npm run dist"
:: Builds the Electron distributions

echo Building Bolt Flasher Desktop...
npm run build
npx electron-builder --config electron-builder.json