// Configuration for Electron app
const isDev = process.env.NODE_ENV === 'development';

// In production, the app works in offline mode without database
const config = {
  isDevelopment: isDev,
  serverPort: 5000,
  databaseUrl: isDev ? process.env.DATABASE_URL : null,
  offlineMode: !isDev, // Production runs in offline mode
};

module.exports = config;