# Clean Vercel Deployment - Bolt Crypto Flasher

## Step 1: Clean Repository for GitHub

**Run these commands in PowerShell to remove large files:**

```powershell
# Remove large distribution files from Git tracking
git rm --cached BoltCryptoFlasher.exe
git rm --cached *.tar.gz
git rm -r --cached exe-build/
git rm -r --cached native-app/
git rm -r --cached portable-app/

# Configure Git for better handling
git config http.postBuffer 524288000
git config http.maxRequestBuffer 100M
git config core.compression 0

# Add deployment files and commit
git add .
git commit -m "Prepare for Vercel deployment - source code only"
git push -u origin main
```

## Step 2: Database Setup (Neon Database)

1. Visit **neon.tech** and create account
2. Create new project: "bolt-crypto-flasher"
3. Copy connection string (format: `postgresql://username:password@host/dbname`)
4. Save for Vercel environment variables

## Step 3: Deploy to Vercel

### Method A: Vercel Dashboard (Recommended)
1. Visit **vercel.com** and sign up
2. Click **"New Project"**
3. Import from GitHub: Select your repository
4. Configure project:
   - Framework Preset: **Other**
   - Build Command: `npm run build`
   - Output Directory: `dist/public`
   - Install Command: `npm install`

### Method B: Vercel CLI
```bash
npm i -g vercel
vercel login
vercel --prod
```

## Step 4: Environment Variables

In Vercel dashboard, add these environment variables:
- `DATABASE_URL`: Your Neon database connection string
- `NODE_ENV`: production

## Step 5: Custom Domain (Optional)

1. In Vercel project settings
2. Go to "Domains"
3. Add your custom domain
4. Update DNS records as instructed

## What Gets Deployed

**Source Code Only (Small & Fast):**
- React frontend components
- Express.js server code
- Database schemas and configurations
- SEO components and assets
- All functionality preserved

**What Stays Local:**
- Distribution files (.exe, .tar.gz)
- Build artifacts
- Large binary files

## Expected Results

**Performance:**
- Load time: <1 second globally
- Lighthouse SEO: 95-100
- Global CDN delivery
- Automatic SSL

**Features:**
- Admin panel with user management
- Subscription system ($550, $950, $3000)
- Multi-chain crypto support
- Flash fee payments with Tron integration
- Real-time transaction tracking
- SEO optimization with social previews

**Cost:** Free tier available, $20/month for pro features

Your platform will be live at `yourproject.vercel.app` with professional hosting and all features intact.