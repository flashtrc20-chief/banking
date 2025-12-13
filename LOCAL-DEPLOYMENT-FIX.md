# Local Deployment Fix - Install Dependencies

You downloaded the project but need to install dependencies first.

## Run These Commands in Order:

```powershell
# 1. Install all dependencies (this will take 2-3 minutes)
npm install

# 2. Build the application
npm run build

# 3. Install Vercel CLI globally
npm install -g vercel

# 4. Login to Vercel
vercel login

# 5. Deploy to production
vercel --prod
```

## What npm install does:
- Downloads all required packages (React, Express, etc.)
- Creates node_modules folder
- Makes build commands available

## After npm install completes:
- You'll see a node_modules folder created
- vite command will be available
- npm run build will work properly

## Expected Build Output:
```
> rest-express@1.0.0 build
> vite build && esbuild server/index.ts...

✓ built in 2.45s
✓ dist/index.js  1.2mb
```

Then you can proceed with Vercel deployment to get your Bolt Crypto Flasher platform live!