# Deployment Guide

## 1. Pre-Deployment Checklist

- [ ] Environment variables configured
- [ ] Database migrations applied
- [ ] Environment variables added to Vercel dashboard
- [ ] GitHub repository is public/accessible
- [ ] SSL certificate configured
- [ ] Email credentials verified
- [ ] Database backups enabled

## 2. Deploying to Vercel

### Step 1: Prepare Your Repository

```bash
# Initialize git if not done
git init

# Create .gitignore
cat > .gitignore << EOF
node_modules/
.env.local
.env*.local
.next/
.vercel/
dist/
build/
*.log
EOF

# Add and commit
git add .
git commit -m "Initial commit: CRM application"
git branch -M main
```

### Step 2: Push to GitHub

```bash
# Add remote
git remote add origin https://github.com/EduLinkUp-Developers/crm.git

# Push to GitHub
git push -u origin main
```

### Step 3: Connect to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Select your GitHub repository
4. Configure project:
   - Framework: Next.js
   - Root Directory: ./
   - Build Command: `npm run build`
   - Output Directory: `.next`

### Step 4: Add Environment Variables

In Vercel Dashboard → Settings → Environment Variables:

```
DATABASE_URL=postgresql://[user]:[password]@[host]:5432/crm_db
NEXTAUTH_SECRET=[generate: openssl rand -base64 32]
NEXTAUTH_URL=https://your-domain.com
NEXT_PUBLIC_API_URL=https://your-domain.com/api

SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
EMAIL_FROM=noreply@crm.com

NODE_ENV=production
```

### Step 5: Deploy

```bash
# Trigger deployment
git push origin main

# Or deploy directly from Vercel dashboard
```

## 3. Database Setup on Vercel

### Using Vercel Postgres (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Link project
vercel link

# Create database
vercel postgres create

# Get connection string from Vercel dashboard
# Add to .env.local
```

### Alternative: External PostgreSQL

```
URL Format: postgresql://user:password@host:port/database
```

## 4. Post-Deployment

### Run Migrations

```bash
# SSH into server or use vercel CLI
vercel env pull .env.production.local

# Run migrations
npx prisma db push --skip-generate
```

### Verify Deployment

```bash
# Test API endpoint
curl https://your-domain.com/api/health

# Check logs
vercel logs
```

### Monitor Performance

Vercel Analytics → Performance Monitoring → Setup:
- Web Vitals
- Custom Metrics
- Error Reporting

## 5. Continuous Deployment

### GitHub Actions Integration

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Vercel

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: vercel/action@master
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
```

## 6. SSL/TLS Configuration

- Vercel automatically provides SSL for all deployments
- Free certificates via Let's Encrypt
- Auto-renewal handled by Vercel
- HSTS header recommended

## 7. Scaling Considerations

### Database Scaling
- Monitor connection pool
- Add read replicas for scaling
- Use connection pooling

### API Scaling
- Vercel auto-scales serverless functions
- Monitor function execution time
- Optimize cold starts

### Static Content
- Vercel CDN distributes globally
- Edge functions for routing logic
- Image optimization enabled by default

## 8. Security Checklist

- [ ] HTTPS enabled (automatic)
- [ ] Environment variables not in Git
- [ ] Database credentials secured
- [ ] CORS properly configured
- [ ] Rate limiting implemented
- [ ] Input validation enabled
- [ ] SQL injection prevention (Prisma)

## 9. Monitoring & Logging

### Vercel Analytics
- Real User Monitoring (RUM)
- Performance metrics
- Error tracking

### Application Logging
```typescript
// Add logging
import { logger } from '@/lib/logger'

logger.info('Contact created', { contactId })
logger.error('Failed to send email', { error })
```

## 10. Rollback Procedure

```bash
# View deployments
vercel list

# Rollback to previous deployment
vercel rollback [deployment-id]

# Or redeploy from Git
git revert HEAD
git push origin main
```

---

**Last Updated**: March 2026
