// Vercel API catch-all handler (ESM)
// This routes all API requests to the Express server

let expressApp = null;

async function getApp() {
  if (expressApp) return expressApp;
  
  try {
    // Import the built dist module - it sets up global.app
    await import('../dist/index.js');
    expressApp = global.app;
    if (!expressApp) {
      console.warn('global.app not set by dist/index.js, waiting...');
      // Give the async initialization time to complete
      await new Promise(resolve => setTimeout(resolve, 100));
      expressApp = global.app;
    }
    return expressApp;
  } catch (error) {
    console.error('Failed to load app:', error);
    throw error;
  }
}

export default async (req, res) => {
  try {
    const app = await getApp();
    
    if (!app) {
      res.status(500).json({ error: 'App not initialized' });
      return;
    }
    
    // Handle the request through Express
    return app(req, res);
  } catch (error) {
    console.error('API Handler Error:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: error.message
    });
  }
};




