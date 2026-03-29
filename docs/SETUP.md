# Project Setup Guide

## 1. Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: 18.0 or higher
  - Download from: https://nodejs.org/
  - Verify: `node --version`

- **npm**: Usually installed with Node.js
  - Verify: `npm --version`

- **Git**: For version control
  - Download from: https://git-scm.com/
  - Verify: `git --version`

- **PostgreSQL**: 14 or higher (for local development)
  - Download from: https://www.postgresql.org/download/
  - Or use Docker: `docker run --name postgres -e POSTGRES_PASSWORD=password -p 5432:5432 postgres:15`

- **GitHub Account**: For repository hosting

## 2. Initial Setup

### 2.1 Clone or Initialize Repository

```bash
# If cloning
git clone https://github.com/EduLinkUp-Developers/crm.git
cd crm

# If starting fresh
git init
cd crm
```

### 2.2 Install Dependencies

```bash
npm install

# Or using yarn
yarn install

# Or using pnpm
pnpm install
```

### 2.3 Environment Configuration

```bash
# Copy example environment file
cp .env.example .env.local

# Edit .env.local with your values
# For VSCode: code .env.local
# For Sublime: subl .env.local
```

### 2.4 Database Setup

```bash
# Create PostgreSQL database
createdb crm_db

# Or using Docker PostgreSQL
docker exec -it postgres psql -U postgres -c "CREATE DATABASE crm_db;"

# Update .env.local with DATABASE_URL
# DATABASE_URL="postgresql://postgres:password@localhost:5432/crm_db"
```

### 2.5 Prisma Setup

```bash
# Generate Prisma Client
npx prisma generate

# Run migrations
npx prisma db push

# Optional: Seed database with sample data
npx prisma db seed
```

### 2.6 Create `.env.local`

```env
# Database
DATABASE_URL="postgresql://postgres:password@localhost:5432/crm_db"

# NextAuth
NEXTAUTH_SECRET="your-secret-key-generate-with: openssl rand -base64 32"
NEXTAUTH_URL="http://localhost:3000"

# Email (Gmail example)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-specific-password"
EMAIL_FROM="noreply@crm.com"

# Application
NODE_ENV="development"
NEXT_PUBLIC_API_URL="http://localhost:3000/api"
```

### For Gmail SMTP App Password:

1. Enable 2-Factor Authentication on Google Account
2. Go to https://myaccount.google.com/apppasswords
3. Select "Mail" and "Windows Computer" (or your device)
4. Copy the 16-character password
5. Use this in `SMTP_PASS`

## 3. Development Workflow

### 3.1 Start Development Server

```bash
npm run dev

# The application will be available at http://localhost:3000
```

### 3.2 Open in Browser

- Navigate to: http://localhost:3000
- Default Credentials:
  - Email: demo@crm.com
  - Password: Demo@123

### 3.3 View Prisma Studio (Database GUI)

```bash
npx prisma studio
```

Prisma Studio opens at: http://localhost:5555

## 4. Project Structure Overview

```
crm/
├── src/
│   ├── app/              # Next.js App Router pages
│   ├── components/       # Reusable React components
│   ├── lib/              # Utility functions & services
│   ├── types/            # TypeScript type definitions
│   └── styles/           # Global styles
├── prisma/
│   ├── schema.prisma     # Database schema
│   └── seed.ts           # Sample data
├── public/               # Static files
├── docs/                 # Documentation
├── .env.example          # Environment template
├── README.md
└── package.json
```

## 5. Common Commands

```bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm run start            # Start production server
npm run lint             # Run ESLint

# Database
npx prisma generate     # Generate Prisma Client
npx prisma db push      # Sync schema to database
npx prisma studio       # Open Prisma Studio

# Testing
npm run test             # Run tests
npm run test:watch       # Run tests in watch mode

# Git
git status               # Check git status
git add .
git commit -m "message"
git push origin main
```

## 6. Making Your First Contact Entry

### Via API:

```bash
curl -X POST http://localhost:3000/api/contacts \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "phone": "+1-555-0100",
    "company": "Tech Corp",
    "source": "REFERRAL"
  }'
```

### Via Dashboard:

1. Login to http://localhost:3000/login
2. Navigate to Contacts (left sidebar)
3. Click "Add Contact" button
4. Fill in the form and submit

## 7. Setting up GitHub Repository

### 7.1 Create Repository on GitHub

1. Go to https://github.com/new
2. Repository name: `crm` (or any name)
3. Organization: `EduLinkUp-Developers`
4. Make it Public or Private
5. Click "Create repository"

### 7.2 Connect Local Repository

```bash
# Add remote
git remote add origin https://github.com/EduLinkUp-Developers/crm.git

# Verify remote
git remote -v

# Push initial commit
git add .
git commit -m "Initial commit: CRM application"
git branch -M main
git push -u origin main
```

### 7.3 Repository Protection Rules

On GitHub → Settings → Branches → Add Rule:

```
Branch name pattern: main
- Require pull request reviews: ✓
- Require status checks to pass: ✓
- Require branches to be up to date: ✓
```

## 8. Installing Vercel CLI (Optional)

```bash
npm install -g vercel

# Login
vercel login

# Link project
vercel link

# Deploy
vercel deploy
```

## 9. Troubleshooting

### Port 3000 Already in Use

```bash
# Find and kill process on port 3000
npx kill-port 3000

# Or specify different port
PORT=3001 npm run dev
```

### Database Connection Error

```bash
# Check PostgreSQL is running
# Connect directly
psql -U postgres -d crm_db

# Test connection string
psql "postgresql://postgres:password@localhost:5432/crm_db"
```

### Prisma Generation Error

```bash
# Clear Prisma cache
rm -rf node_modules/.prisma

# Regenerate
npx prisma generate
```

### Email Not Sending

- Check SMTP credentials in .env.local
- Verify Gmail App Password (not regular password)
- Check email address is correct
- Look at console logs for email errors

## 10. Next Steps

1. **Explore the Code**: Check `src/` directory structure
2. **Read Documentation**: Review files in `docs/` folder
3. **UI Customization**: Modify `tailwind.config.ts` for theme
4. **Add Features**: Create new API routes and pages
5. **Testing**: Write unit and integration tests
6. **Deploy**: Push to Vercel

---

**Having Issues?**
- Check the README.md
- Review documentation in `/docs` folder
- Check GitHub Issues
- Consult the API documentation

**Last Updated**: March 2026
