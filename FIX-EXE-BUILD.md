# Fix for EXE Build Error

## The Problem
Your exe is failing because:
1. DATABASE_URL environment variable is not available in the packaged exe
2. Node.js modules aren't being bundled correctly

## Quick Fix Instructions

### 1. Update `server/db.ts`
Replace the entire content with:
```typescript
import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from "ws";
import * as schema from "@shared/schema";

neonConfig.webSocketConstructor = ws;

// Check if running as packaged exe
const isPackagedExe = process.env.NODE_ENV === 'production' && process.argv[0].includes('electron');

// Only require DATABASE_URL in development or non-exe production
if (!process.env.DATABASE_URL && !isPackagedExe) {
  console.warn("DATABASE_URL not set - running in offline mode");
}

export const pool = process.env.DATABASE_URL ? new Pool({ connectionString: process.env.DATABASE_URL }) : null;
export const db = process.env.DATABASE_URL ? drizzle({ client: pool, schema }) : null;
```

### 2. Create `server/mock-storage.ts`
```typescript
// Mock storage for offline exe mode
export const mockStorage = {
  async getUserByUsername(username: string) {
    const users = [
      { id: "1", username: "admin", password: "usdt123", role: "admin", email: null, firstName: "Admin", lastName: "User", createdAt: new Date(), updatedAt: new Date() },
      { id: "2", username: "softwarehenry", password: "Rmabuw190", role: "admin", email: null, firstName: "Henry", lastName: "Software", createdAt: new Date(), updatedAt: new Date() }
    ];
    return users.find(u => u.username.toLowerCase() === username.toLowerCase());
  },
  
  async getUserSubscription(userId: string) {
    return { id: "sub-1", userId, planId: "full", status: "active", paymentTxHash: "admin", createdAt: new Date(), expiresAt: new Date(2030, 1, 1) };
  },
  
  async getSubscriptionPlans() {
    return [
      { id: "basic", name: "Basic", price: "550", features: ["BTC Flash", "ETH Flash"], createdAt: new Date() },
      { id: "pro", name: "Pro", price: "950", features: ["All Basic", "USDT Flash", "BNB Flash"], createdAt: new Date() },
      { id: "full", name: "Full", price: "3000", features: ["All Networks", "Premium Support"], createdAt: new Date() }
    ];
  },
  
  // Add other required methods as empty implementations
  async getUser(id: string) { return null; },
  async createUser(data: any) { return { ...data, id: Date.now().toString() }; },
  async getWalletsByUserId(userId: string) { return []; },
  async getTransactionsByUserId(userId: string) { return []; },
  async createTransaction(data: any) { return { ...data, id: Date.now().toString() }; },
  async getPendingSubscriptions() { return []; },
  async getAllUsers() { return []; },
  getGasReceiverAddress() { return "TQm8yS3XZHgXiHMtMWbrQwwmLCztyvAG8y"; }
};
```

### 3. Update `server/storage.ts` 
At the very end of the file, replace the export line:
```typescript
// At the end of server/storage.ts
import { mockStorage } from './mock-storage';

const isOfflineMode = !db;
export const storage = isOfflineMode ? mockStorage as any : new DatabaseStorage();
```

### 4. Update `electron/main.js`
Add environment variable for offline mode:
```javascript
serverProcess = spawn(command, [serverPath], {
  cwd: path.join(__dirname, '..'),
  env: { 
    ...process.env, 
    NODE_ENV: 'production',
    PORT: '5000',
    OFFLINE_MODE: 'true'
  }
});
```

### 5. Build Commands
Run these commands in order:

```bash
# 1. Build the React app
npm run build

# 2. Build server for Node.js
npx esbuild server/index.ts --bundle --platform=node --target=node16 --outfile=dist/server.js --external:electron --external:ws --external:@neondatabase/serverless --external:drizzle-orm

# 3. Build exe with Electron
npx electron-builder --config electron-build-config.json
```

## Result
Your exe will be in `dist-electron/` folder and will:
- Run without DATABASE_URL
- Allow admin login with credentials
- Work in offline mode

## Test the EXE
1. Find `Bolt Crypto Flasher.exe` in `dist-electron/`
2. Run it
3. Login with `admin/usdt123` or `SoftwareHenry/Rmabuw190`

The app will run in offline mode with mock data for admin users.