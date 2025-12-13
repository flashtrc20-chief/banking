# Vercel CLI Deployment Walkthrough - Bolt Crypto Flasher

## Step 1: Install Vercel CLI

Open PowerShell and run:
```powershell
npm install -g vercel
```

## Step 2: Login to Vercel

```powershell
vercel login
```
- Choose your preferred login method (GitHub, GitLab, Bitbucket, or email)
- Complete authentication in browser
- Return to terminal when authenticated

## Step 3: Set Up Database (Neon)

1. Visit **neon.tech** in browser
2. Sign up with GitHub or email
3. Create new project: "bolt-crypto-flasher"
4. Copy connection string (looks like: `postgresql://username:password@host/dbname`)
5. Keep this handy for next step

## Step 4: Build Your Application

In your project directory:
```powershell
npm run build
```
This creates the `dist` folder with your built application.

## Step 5: Deploy to Vercel

```powershell
vercel --prod
```

You'll be prompted with questions:
- **Set up and deploy?** → Yes
- **Which scope?** → Select your account
- **Link to existing project?** → No
- **Project name?** → bolt-crypto-flasher (or press Enter for default)
- **Directory?** → Press Enter (current directory)
- **Want to override settings?** → No

## Step 6: Configure Environment Variables

After deployment, you'll get a URL. Now add your database:

```powershell
vercel env add DATABASE_URL
```
- Paste your Neon database connection string when prompted
- Select "Production" environment

## Step 7: Redeploy with Environment Variables

```powershell
vercel --prod
```
This redeploys with your database connected.

## Expected Output

You'll see:
```
✅ Production: https://bolt-crypto-flasher-xyz.vercel.app [copied to clipboard]
```

## Verification Steps

1. Visit your Vercel URL
2. Test login with admin credentials: admin/usdt123
3. Verify subscription plans are loading
4. Check admin panel functionality
5. Test crypto transaction flow

## What's Deployed

Your live platform includes:
- Complete admin user management system
- Three subscription tiers ($550, $950, $3000)
- Multi-chain crypto support (Bitcoin, USDT, Ethereum, BNB)
- Flash fee payment system with Tron wallet
- Real-time transaction tracking
- Enhanced SEO with social media previews
- Google Analytics integration

## Custom Domain (Optional)

In Vercel dashboard:
1. Go to your project
2. Settings → Domains
3. Add your custom domain
4. Update DNS records as instructed

Your Bolt Crypto Flasher platform will be live globally with professional hosting!