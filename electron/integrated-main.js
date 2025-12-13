const { app, BrowserWindow, Menu, shell, dialog } = require('electron');
const path = require('path');
const express = require('express');
const cors = require('cors');
const isDev = require('electron-is-dev');

let mainWindow;
let server;

// Import your backend routes and storage
async function setupBackend() {
  const expressApp = express();
  
  // Google verification file - served first
  expressApp.get('/google4c248d7f08aff326.html', (_req, res) => {
    res.status(200);
    res.type('text/html');
    res.send('google-site-verification: google4c248d7f08aff326.html');
  });

  // Configure CORS
  expressApp.use(cors({
    origin: true,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'Origin', 'X-Requested-With']
  }));

  // Body parsing middleware
  expressApp.use(express.json());
  expressApp.use(express.urlencoded({ extended: false }));

  // API Routes - Import your actual routes here
  expressApp.use('/api/auth', require('../server/routes/auth'));
  expressApp.use('/api/transactions', require('../server/routes/transactions'));
  expressApp.use('/api/security', require('../server/routes/security'));
  expressApp.use('/api/news', require('../server/routes/news'));
  expressApp.use('/api/sitemap.xml', require('../server/routes/sitemap'));
  expressApp.use('/api', require('../server/routes'));

  // In production, serve the built React app
  if (!isDev) {
    const staticPath = path.join(__dirname, '..', 'server', 'public');
    expressApp.use(express.static(staticPath));
    
    // Catch all route - serve React app
    expressApp.get('*', (req, res) => {
      res.sendFile(path.join(staticPath, 'index.html'));
    });
  } else {
    // In development, proxy to Vite dev server
    const { createProxyMiddleware } = require('http-proxy-middleware');
    expressApp.use('/', createProxyMiddleware({
      target: 'http://localhost:5173',
      changeOrigin: true,
      ws: true
    }));
  }

  // Start the Express server
  return new Promise((resolve) => {
    const PORT = process.env.PORT || 5000;
    server = expressApp.listen(PORT, '127.0.0.1', () => {
      console.log(`Backend server running on port ${PORT}`);
      resolve();
    });
  });
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 1000,
    minHeight: 700,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      webSecurity: !isDev,
      preload: path.join(__dirname, 'preload.js')
    },
    icon: path.join(__dirname, '..', 'client', 'public', 'bolt-logo-256.png'),
    titleBarStyle: 'default',
    show: false,
    title: 'Bolt Flasher - Professional Cryptocurrency Flash Platform',
    backgroundColor: '#1a1a1a',
    autoHideMenuBar: false
  });

  // Set custom menu
  const menu = Menu.buildFromTemplate([
    {
      label: 'File',
      submenu: [
        {
          label: 'Home',
          click: () => mainWindow.loadURL('http://localhost:5000/home')
        },
        {
          label: 'Dashboard',
          click: () => mainWindow.loadURL('http://localhost:5000/dashboard')
        },
        {
          label: 'Send Transaction',
          click: () => mainWindow.loadURL('http://localhost:5000/send')
        },
        {
          label: 'History',
          click: () => mainWindow.loadURL('http://localhost:5000/history')
        },
        { type: 'separator' },
        {
          label: 'Settings',
          click: () => mainWindow.loadURL('http://localhost:5000/settings')
        },
        { type: 'separator' },
        {
          label: 'Exit',
          accelerator: process.platform === 'darwin' ? 'Cmd+Q' : 'Ctrl+Q',
          click: () => app.quit()
        }
      ]
    },
    {
      label: 'Edit',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
        { role: 'selectAll' }
      ]
    },
    {
      label: 'View',
      submenu: [
        { role: 'reload' },
        { role: 'forceReload' },
        { role: 'toggleDevTools' },
        { type: 'separator' },
        { role: 'resetZoom' },
        { role: 'zoomIn' },
        { role: 'zoomOut' },
        { type: 'separator' },
        { role: 'togglefullscreen' }
      ]
    },
    {
      label: 'Window',
      submenu: [
        { role: 'minimize' },
        { role: 'close' },
        { role: 'quit' }
      ]
    },
    {
      label: 'Help',
      submenu: [
        {
          label: 'Documentation',
          click: () => mainWindow.loadURL('http://localhost:5000/api-docs')
        },
        {
          label: 'FAQ',
          click: () => mainWindow.loadURL('http://localhost:5000/faq')
        },
        { type: 'separator' },
        {
          label: 'Telegram Support',
          click: () => shell.openExternal('https://t.me/Henryphilipbolt')
        },
        {
          label: 'WhatsApp Support',
          click: () => shell.openExternal('https://wa.me/message/DRQEAFSUHZMLC1')
        },
        { type: 'separator' },
        {
          label: 'About Bolt Flasher',
          click: () => {
            dialog.showMessageBox(mainWindow, {
              type: 'info',
              title: 'About Bolt Flasher',
              message: 'Bolt Flasher v1.0.0',
              detail: 'Professional Cryptocurrency Flash Platform\n\nFeatures:\n• Flash USDT, BTC, ETH, BNB, TRX\n• Multi-network support (TRC20, ERC20, BEP20)\n• Advanced security with 2FA\n• Real-time transaction tracking\n• Professional analytics dashboard\n\n© 2025 Bolt Flasher. All rights reserved.',
              buttons: ['OK'],
              icon: path.join(__dirname, '..', 'client', 'public', 'bolt-logo-256.png')
            });
          }
        }
      ]
    }
  ]);

  Menu.setApplicationMenu(menu);

  // Load the app
  const startUrl = isDev 
    ? 'http://localhost:5173/home'  // Vite dev server in development
    : 'http://localhost:5000/home'; // Express server in production
  
  mainWindow.loadURL(startUrl);

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
    
    // Show splash screen animation
    mainWindow.webContents.executeJavaScript(`
      console.log('Bolt Flasher Desktop v1.0.0 - Ready');
    `);
    
    if (isDev) {
      mainWindow.webContents.openDevTools();
    }
  });

  // Handle external links
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('http://localhost') || url.startsWith('https://localhost')) {
      return { action: 'allow' };
    }
    shell.openExternal(url);
    return { action: 'deny' };
  });

  // Handle window closed
  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  // Prevent navigation away from app
  mainWindow.webContents.on('will-navigate', (event, url) => {
    if (!url.startsWith('http://localhost')) {
      event.preventDefault();
      shell.openExternal(url);
    }
  });
}

// App event handlers
app.whenReady().then(async () => {
  console.log('Starting Bolt Flasher Desktop Application...');
  
  try {
    // Setup backend server first
    await setupBackend();
    console.log('Backend server initialized');
    
    // Then create the window
    createWindow();
    console.log('Application window created');
  } catch (error) {
    console.error('Failed to start application:', error);
    dialog.showErrorBox('Startup Error', `Failed to start Bolt Flasher: ${error.message}`);
    app.quit();
  }

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  // Close the server when all windows are closed
  if (server) {
    server.close(() => {
      console.log('Backend server closed');
    });
  }
  
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('before-quit', () => {
  // Ensure server is closed before quitting
  if (server) {
    server.close();
  }
});

// Handle certificate errors in development
app.on('certificate-error', (event, webContents, url, error, certificate, callback) => {
  if (isDev) {
    event.preventDefault();
    callback(true);
  } else {
    callback(false);
  }
});

// Prevent multiple instances
const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
  app.quit();
} else {
  app.on('second-instance', () => {
    // Someone tried to run a second instance, focus our window instead
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore();
      mainWindow.focus();
    }
  });
}

// Set app user model ID for Windows
if (process.platform === 'win32') {
  app.setAppUserModelId('com.boltflasher.app');
}