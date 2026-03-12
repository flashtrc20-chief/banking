// Direct Vercel API handler for activation key validation
// Connects directly to Neon PostgreSQL database

export default async (req, res) => {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { key } = req.body;

    if (!key) {
      return res.status(400).json({ error: 'Activation key is required' });
    }

    // Get database URL from environment
    const databaseUrl = process.env.DATABASE_URL;
    if (!databaseUrl) {
      return res.status(500).json({ error: 'Database not configured' });
    }

    // Use neon-http for serverless database queries
    const { neon } = await import('@neondatabase/serverless');
    const sql = neon(databaseUrl);

    // Query the activation_keys table
    const result = await sql(
      'SELECT * FROM "activation_keys" WHERE key = $1 LIMIT 1',
      [key.toUpperCase()]
    );

    if (result.length === 0) {
      return res.status(401).json({
        valid: false,
        error: 'Invalid or expired activation key'
      });
    }

    const activationKey = result[0];

    // Check if key is already active (used)
    if (!activationKey.is_active) {
      return res.status(401).json({
        valid: false,
        error: 'This activation key has already been used'
      });
    }

    // Check if key is expired
    if (activationKey.expires_at && new Date(activationKey.expires_at) < new Date()) {
      return res.status(401).json({
        valid: false,
        error: 'This activation key has expired'
      });
    }

    // Mark key as used and record the activation
    await sql(
      'UPDATE "activation_keys" SET is_active = false, activated_at = NOW() WHERE key = $1',
      [key.toUpperCase()]
    );

    return res.status(200).json({
      valid: true,
      message: 'Activation key validated successfully'
    });

  } catch (error) {
    console.error('Activation key validation error:', error);
    return res.status(500).json({
      error: 'Internal Server Error',
      message: error.message
    });
  }
};


