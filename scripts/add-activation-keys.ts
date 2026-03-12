import { db } from "../server/db";
import { activationKeys } from "../shared/schema";
import dotenv from "dotenv";

dotenv.config();

async function addActivationKeys() {
  try {
    // Generate 15 alphanumeric activation keys
    const keys = generateActivationKeys(15);
    
    console.log("Adding activation keys...");
    console.log("Generated keys:", keys);

    // Insert into database
    const result = await db.insert(activationKeys).values(
      keys.map((key) => ({
        key: key,
        isActive: true,
        usedBy: null,
        activatedAt: null,
        expiresAt: null,
      }))
    ).returning();

    console.log("✅ Successfully added activation keys:");
    result.forEach((key) => {
      console.log(`  - ${key.key} (ID: ${key.id})`);
    });

    process.exit(0);
  } catch (error) {
    console.error("❌ Error adding activation keys:", error);
    process.exit(1);
  }
}

function generateActivationKeys(count: number): string[] {
  const keys: string[] = [];
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

  for (let i = 0; i < count; i++) {
    let key = "";
    for (let j = 0; j < 13; j++) {
      key += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    keys.push(key);
  }

  return keys;
}

addActivationKeys();
