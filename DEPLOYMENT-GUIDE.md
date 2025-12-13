# Bolt Crypto Flasher - External Hosting Deployment Guide

This guide covers deploying your Bolt Crypto Flasher application to various external hosting providers.

## Prerequisites

Before deploying, ensure you have:
- Your application files ready (web app version)
- Database credentials (PostgreSQL)
- Environment variables configured
- Domain name (optional but recommended)

## Recommended Hosting Providers

### 1. Vercel (Recommended for Web App)

**Best for**: Static frontend with serverless backend
**Cost**: Free tier available, pay-as-you-go

#### Setup Steps:
1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Prepare for deployment**:
   ```bash
   npm run build
   ```

3. **Deploy**:
   ```bash
   vercel --prod
   ```

4. **Configure Environment Variables** in Vercel dashboard:
   - `DATABASE_URL` - Your PostgreSQL connection string
   - `NODE_ENV=production`

#### Vercel Configuration:
Create `vercel.json`:
```json
{
  "version": 2,
  "builds": [
    {
      "src": "dist/index.js",
      "use": "@vercel/node"
    },
    {
      "src": "dist/public/**",
      "use": "@vercel/static"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/dist/index.js"
    },
    {
      "src": "/(.*)",
      "dest": "/dist/public/$1"
    }
  ]
}
```

### 2. Railway

**Best for**: Full-stack applications with database
**Cost**: $5/month starter plan

#### Setup Steps:
1. **Connect GitHub repository** to Railway
2. **Add PostgreSQL database** in Railway dashboard
3. **Configure environment variables**:
   - Railway auto-provides `DATABASE_URL`
   - Add `NODE_ENV=production`
4. **Deploy automatically** via GitHub integration

#### Railway Configuration:
Create `railway.json`:
```json
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "startCommand": "npm start",
    "healthcheckPath": "/",
    "healthcheckTimeout": 100
  }
}
```

### 3. Render

**Best for**: Full-stack applications
**Cost**: Free tier available, $7/month for paid

#### Setup Steps:
1. **Connect GitHub repository**
2. **Create Web Service**:
   - Build Command: `npm run build`
   - Start Command: `npm start`
3. **Add PostgreSQL database**
4. **Configure environment variables**

### 4. DigitalOcean App Platform

**Best for**: Scalable applications
**Cost**: $5/month starter

#### Setup Steps:
1. **Connect GitHub repository**
2. **Configure app spec**:
   ```yaml
   name: bolt-crypto-flasher
   services:
   - name: web
     source_dir: /
     github:
       repo: your-username/your-repo
       branch: main
     run_command: npm start
     build_command: npm run build
     environment_slug: node-js
     instance_count: 1
     instance_size_slug: basic-xxs
     env:
     - key: NODE_ENV
       value: production
     - key: DATABASE_URL
       value: ${db.DATABASE_URL}
   databases:
   - name: db
     engine: PG
     size: basic-xxs
   ```

### 5. Heroku

**Best for**: Quick deployment
**Cost**: $7/month for basic dyno

#### Setup Steps:
1. **Install Heroku CLI**
2. **Create Heroku app**:
   ```bash
   heroku create bolt-crypto-flasher
   ```
3. **Add PostgreSQL**:
   ```bash
   heroku addons:create heroku-postgresql:mini
   ```
4. **Set environment variables**:
   ```bash
   heroku config:set NODE_ENV=production
   ```
5. **Deploy**:
   ```bash
   git push heroku main
   ```

## Database Hosting Options

### 1. Neon (Recommended)
- **Free tier**: 512MB storage
- **Serverless PostgreSQL**
- **Auto-scaling**
- **Built-in connection pooling**

### 2. Supabase
- **Free tier**: 500MB storage
- **PostgreSQL with real-time features**
- **Built-in authentication (if needed)**

### 3. PlanetScale
- **MySQL-compatible**
- **Serverless scaling**
- **Branching for schema changes**

### 4. Railway PostgreSQL
- **Integrated with Railway hosting**
- **$5/month for 1GB**

## Environment Variables Setup

For any hosting provider, configure these environment variables:

```env
# Database
DATABASE_URL=postgresql://username:password@host:port/database

# Node Environment
NODE_ENV=production

# Optional: Custom port (most providers set this automatically)
PORT=5000
```

## Custom Domain Setup

1. **Purchase domain** from provider (Namecheap, GoDaddy, etc.)
2. **Configure DNS** in your hosting provider:
   - Add CNAME record pointing to your hosting URL
   - Or use A record with IP address
3. **Enable SSL** (most providers offer free SSL certificates)

## Recommended Deployment Strategy

For Bolt Crypto Flasher, I recommend:

### Option A: Vercel + Neon (Cost-effective)
- **Frontend/Backend**: Vercel (free tier)
- **Database**: Neon (free tier)
- **Total cost**: $0/month (with limitations)

### Option B: Railway (Balanced)
- **Full app + database**: Railway
- **Total cost**: ~$10/month
- **Benefits**: Integrated solution, easy scaling

### Option C: DigitalOcean (Production)
- **App Platform**: $5/month
- **Managed PostgreSQL**: $15/month
- **Total cost**: $20/month
- **Benefits**: High performance, managed services

## Post-Deployment Checklist

1. **Test all functionality**:
   - User registration/login
   - Transaction creation
   - Admin panel access
   - Payment processing

2. **Monitor performance**:
   - Check response times
   - Monitor database connections
   - Review error logs

3. **Security setup**:
   - Enable HTTPS
   - Configure CORS properly
   - Review API endpoints

4. **Backup strategy**:
   - Database backups
   - Application code in version control

## Troubleshooting Common Issues

### Database Connection Issues
```bash
# Test database connection
node -e "
const { Pool } = require('@neondatabase/serverless');
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
pool.query('SELECT NOW()').then(console.log).catch(console.error);
"
```

### Build Failures
- Ensure all dependencies are in `package.json`
- Check Node.js version compatibility
- Verify build scripts work locally

### Environment Variables
- Double-check all required variables are set
- Ensure no spaces in variable values
- Use proper PostgreSQL connection string format

## Getting Started

1. **Choose your hosting provider** based on budget and requirements
2. **Set up database** (Neon recommended for simplicity)
3. **Configure environment variables**
4. **Deploy application**
5. **Test thoroughly**
6. **Set up monitoring**

For immediate deployment, I recommend starting with **Railway** as it provides the easiest full-stack deployment experience with integrated PostgreSQL database.