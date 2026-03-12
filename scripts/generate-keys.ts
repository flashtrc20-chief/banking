import { drizzle } from 'drizzle-orm/neon-http';
import { activationKeys } from '../shared/schema';

// Initialize database
if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable not set');
}

const db = drizzle(process.env.DATABASE_URL);

// Generate random alphanumeric key (13 characters)
function generateKey() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let key = '';
  for (let i = 0; i < 13; i++) {
    key += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return key.toUpperCase();
}

// Generate 15 unique keys
async function generateActivationKeys() {
  const keys = [];
  
  for (let i = 0; i < 15; i++) {
    const key = generateKey();
    keys.push({
      key,
      isActive: true,
      usedBy: null,
      activatedAt: null,
      expiresAt: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // 90 days from now
    });
  }
  
  try {
    // Insert all keys into the database
    for (const keyData of keys) {
      await db.insert(activationKeys).values(keyData);
    }
    
    console.log('✅ Successfully created 15 activation keys:\n');
    keys.forEach((k, i) => {
      console.log(`${i + 1}. ${k.key}`);
    });
    
    console.log('\nKeys expire on:', new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString());
    
  } catch (error) {
    console.error('Error inserting keys:', error);
  }
}

generateActivationKeys();
