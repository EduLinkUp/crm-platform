# EduLink CRM System - Full Stack Application

## 🚀 Project Overview

A **cyberpunk-themed Next.js CRM application** built for advanced customer relationship management, sales pipeline tracking, and team collaboration. This system demonstrates enterprise-grade architecture with modern web technologies optimized for performance and user experience.

### Key Technologies
- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS
- **Backend**: Node.js, Next.js API Routes
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js with role-based access
- **Analytics**: Recharts for data visualization
- **Email**: Nodemailer for automation
- **Deployment**: Vercel

---

## 📋 Table of Contents

1. [Features](#features)
2. [Getting Started](#getting-started)
3. [Project Structure](#project-structure)
4. [API Documentation](#api-documentation)

---

## ✨ Features

### Core Functionality
- **NextAuth.js Integration**: Secure authentication with role-based access control
- **Contact Management**: Full CRUD operations for customer profiles
- **Sales Pipeline**: Multi-stage deal tracking with probability scoring
- **Activity Logging**: Track all customer interactions
- **Email Automation**: Nodemailer integration
- **Analytics Dashboard**: Real-time charts with Recharts
- **SSR Implementation**: Server-side rendering for optimal performance
- **CSV Export**: Export contact lists and reports

### UI/UX
- **Cyberpunk Design**: Yellow and red neon color scheme with glowing effects
- **Responsive Layout**: Mobile-friendly interface
- **Dark Mode**: Performance-optimized dark theme

---

## 🛠 Getting Started

### Prerequisites
- Node.js 18+ and npm/yarn
- PostgreSQL 14+
- Git

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/EduLinkUp-Developers/crm.git
cd crm

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env.local

# 4. Configure PostgreSQL connection
# DATABASE_URL="postgresql://user:password@localhost:5432/crm_db"

# 5. Setup Prisma and database
npx prisma generate
npx prisma db push

# 6. Run development server
npm run dev
```

Visit `http://localhost:3000`

---

## 📁 Project Structure

```
crm/
├── src/
│   ├── app/
│   │   ├── login/page.tsx
│   │   ├── dashboard/page.tsx
│   │   ├── contacts/page.tsx
│   │   ├── pipeline/page.tsx
│   │   └── api/
│   ├── components/
│   │   ├── ui/ (Cyberpunk components)
│   │   └── layout/
│   ├── lib/
│   │   ├── db.ts
│   │   ├── utils.ts
│   │   └── email.ts
│   └── types/
├── prisma/
│   └── schema.prisma
└── docs/ (Comprehensive documentation)
```

---

## 🚀 Deployment

### Vercel
1. Push to GitHub
2. Connect repository in Vercel dashboard
3. Add environment variables (DATABASE_URL, NEXTAUTH_SECRET, SMTP)
4. Deploy (automatic on push to main)

---

## 🔒 Security

- NextAuth.js with encrypted sessions
- Role-based access control (RBAC)
- Password hashing with bcrypt
- HTTPS enforced in production

---

**Version**: 1.0.0 | **Organization**: EduLinkUp - Developers
