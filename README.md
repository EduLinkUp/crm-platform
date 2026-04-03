# EduLink CRM System - Full Stack Application

## 🚀 Project Overview

A **modern Next.js CRM application** built for advanced customer relationship management, sales pipeline tracking, and team collaboration. This system demonstrates enterprise-grade architecture with modern web technologies optimized for performance and user experience.

### Key Technologies
- **Frontend**: Next.js 16, React 19, TypeScript, Tailwind CSS
- **Backend**: Node.js, Next.js API Routes
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js with role-based access
- **UI**: shadcn/ui components with modern blue/white design
- **Deployment**: Ready for Vercel

---

## 📋 Table of Contents

1. [Features](#features)
2. [Getting Started](#getting-started)
3. [Project Structure](#project-structure)
4. [Screenshots](#screenshots)

---

## ✨ Features

### Core Functionality
- **Customer Management**: Add, edit, delete contacts with detailed profiles
- **Sales Pipeline**: Visual deal tracking through customizable stages
- **Task Management**: Assign and track team tasks with deadlines
- **Analytics Dashboard**: Real-time metrics and performance charts
- **Team Collaboration**: Multi-user support with role-based permissions

### Modern UI/UX
- **Professional Theme**: Clean blue/white modern design (Updated from cyberpunk)
- **Responsive Design**: Mobile-first approach for all devices
- **Interactive Components**: Smooth animations and transitions
- **Form Modals**: Add Contact, Deal, Task with beautiful forms
- **Real-time Updates**: Instant feedback for all actions

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- PostgreSQL database (local or cloud)
- npm or yarn package manager

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/EduLinkUp/crm-platform.git
cd crm-platform
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env.local
```
Edit `.env.local` with your database credentials.

4. **Run the development server**
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### Demo Credentials
- **Email**: admin@neonflow.com
- **Password**: password123

---

## 📁 Project Structure

```
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── login/             # Authentication pages
│   │   ├── signup/
│   │   ├── dashboard/         # Main dashboard with working buttons
│   │   ├── contacts/          # Contact management
│   │   ├── deals/            # Sales pipeline
│   │   ├── tasks/            # Task management
│   │   └── analytics/        # Reports and charts
│   ├── components/            # Reusable React components
│   │   ├── ui/               # shadcn/ui components
│   │   ├── crm/              # CRM-specific components
│   │   ├── add-item-modal.tsx # Modal for adding contacts/deals/tasks
│   │   └── dashboard-client.tsx # Interactive dashboard
│   ├── lib/                   # Utility functions
│   │   ├── auth.ts           # Authentication config
│   │   ├── prisma.ts         # Database client
│   │   └── utils.ts          # Helper functions
│   └── types/                 # TypeScript type definitions
├── crm/                       # Complete CRM copy for submission
├── prisma/                    # Database schema
├── public/                    # Static assets
└── package.json              # Project dependencies
```

---

## 🔧 Key Components

### Add Item Modal
Dynamic modal component with forms for:
- **Contacts**: Name, email, phone, company, status
- **Deals**: Title, company, value, stage, close date
- **Tasks**: Title, description, priority, due date, assignee

### Dashboard Client
Interactive dashboard featuring:
- Real-time statistics cards
- Recent activities feed
- Top customers grid
- Working Add Contact/Deal/Task buttons
- localStorage data persistence

### Authentication System
- NextAuth.js with credentials provider
- In-memory user storage for demo
- Protected routes with middleware

---

## 🎨 UI Transformation

### Before (Cyberpunk Theme)
- Black background with yellow neon colors
- Dark aesthetic with glow effects
- Hard to read for professional use

### After (Modern Professional)
- Clean white background with blue accents
- Professional business appearance
- Better accessibility and readability
- Industry-standard CRM interface

---

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm i -g vercel
vercel
```

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit changes
4. Push to branch
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

**EduLinkUp** - Building educational technology solutions

Project Link: [https://github.com/EduLinkUp/crm-platform](https://github.com/EduLinkUp/crm-platform)

---

## 🙏 Acknowledgments

- Next.js Team
- shadcn/ui
- Tailwind CSS
- Prisma
- NextAuth.js
