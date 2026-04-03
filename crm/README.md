# EduLink CRM System - Full Stack Application

## 🚀 Project Overview

A **modern Next.js CRM application** built for advanced customer relationship management, sales pipeline tracking, and team collaboration. This system demonstrates enterprise-grade architecture with modern web technologies optimized for performance and user experience.

### Key Technologies
- **Frontend**: Next.js 16, React 19, TypeScript, Tailwind CSS
- **Backend**: Node.js, Next.js API Routes
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js with role-based access
- **Analytics**: Custom dashboard with metrics
- **UI**: shadcn/ui components with modern design
- **Deployment**: Ready for Vercel

---

## 📋 Table of Contents

1. [Features](#features)
2. [Getting Started](#getting-started)
3. [Project Structure](#project-structure)
4. [API Documentation](#api-documentation)

---

## ✨ Features

### Core Functionality
- **Customer Management**: Add, edit, delete contacts with detailed profiles
- **Sales Pipeline**: Visual deal tracking through customizable stages
- **Task Management**: Assign and track team tasks with deadlines
- **Email Campaigns**: Create and send targeted marketing campaigns
- **Analytics Dashboard**: Real-time metrics and performance charts
- **Team Collaboration**: Multi-user support with role-based permissions

### Modern UI/UX
- **Professional Theme**: Clean blue/white modern design
- **Responsive Design**: Mobile-first approach for all devices
- **Interactive Components**: Smooth animations and transitions
- **Form Validation**: Real-time input validation with error handling
- **Modal Dialogs**: Add Contact, Deal, Task with beautiful forms

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
cd crm-platform/crm
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

4. **Initialize the database**
```bash
npx prisma migrate dev
npx prisma generate
```

5. **Run the development server**
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

---

## 📁 Project Structure

```
crm/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── login/             # Authentication pages
│   │   ├── signup/
│   │   ├── dashboard/         # Main dashboard
│   │   ├── contacts/          # Contact management
│   │   ├── deals/            # Sales pipeline
│   │   ├── tasks/            # Task management
│   │   └── analytics/        # Reports and charts
│   ├── components/            # Reusable React components
│   │   ├── ui/               # shadcn/ui components
│   │   ├── crm/              # CRM-specific components
│   │   ├── add-item-modal.tsx # Modal for adding items
│   │   └── dashboard-client.tsx # Interactive dashboard
│   ├── lib/                   # Utility functions
│   │   ├── auth.ts           # Authentication config
│   │   ├── prisma.ts         # Database client
│   │   └── utils.ts          # Helper functions
│   └── types/                 # TypeScript type definitions
├── prisma/                    # Database schema
├── public/                    # Static assets
└── package.json              # Project dependencies
```

---

## 🔧 Key Components

### Add Item Modal (`components/add-item-modal.tsx`)
Dynamic modal component that handles adding:
- **Contacts**: Name, email, phone, company, status
- **Deals**: Title, company, value, stage, close date
- **Tasks**: Title, description, priority, due date, assignee

### Dashboard Client (`components/dashboard-client.tsx`)
Interactive dashboard featuring:
- Real-time statistics cards
- Recent activities feed
- Top customers grid
- Quick action buttons (Add Contact, Deal, Task)

### Authentication System
- NextAuth.js with credentials provider
- In-memory user storage for demo
- Protected routes with middleware
- Session management

---

## 📊 API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/credentials` - Login with email/password
- `GET/POST /api/auth/[...nextauth]` - NextAuth.js routes

### CRM Operations
- `GET /api/contacts` - List all contacts
- `POST /api/contacts` - Create new contact
- `GET /api/deals` - List all deals
- `POST /api/deals` - Create new deal
- `GET /api/tasks` - List all tasks
- `POST /api/tasks` - Create new task

---

## 🎨 UI/UX Features

### Modern Design System
- **Color Scheme**: Professional blue/white theme
- **Typography**: Inter font family
- **Spacing**: Consistent 8px grid system
- **Shadows**: Subtle elevation effects
- **Borders**: Rounded corners (8-12px radius)

### Interactive Elements
- **Buttons**: Primary (blue), outline, ghost variants
- **Cards**: Hover effects with border highlights
- **Modals**: Centered with backdrop blur
- **Forms**: Icon-integrated inputs with validation
- **Badges**: Status indicators with color coding

---

## 🔐 Security Features

- **CSRF Protection**: Built into NextAuth.js
- **Input Sanitization**: Zod schema validation
- **Secure Sessions**: HTTP-only cookies
- **Role-Based Access**: Admin, Manager, User roles
- **Data Encryption**: bcrypt for passwords

---

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm i -g vercel
vercel
```

### Environment Variables for Production
```
NEXTAUTH_URL=https://your-domain.com
NEXTAUTH_SECRET=your-secret-key
DATABASE_URL=postgresql://...
```

---

## 📝 Development Notes

### Local Storage Persistence
The application uses browser localStorage for data persistence in demo mode:
- `crm_contacts` - Stored contacts
- `crm_deals` - Stored deals  
- `crm_tasks` - Stored tasks
- `crm_activities` - Activity log

### Build Commands
```bash
npm run dev      # Development server
npm run build    # Production build
npm run start    # Production server
npm run lint     # ESLint check
```

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 👨‍💻 Author

**EduLinkUp** - Building educational technology solutions

Project Link: [https://github.com/EduLinkUp/crm-platform](https://github.com/EduLinkUp/crm-platform)

---

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [shadcn/ui](https://ui.shadcn.com/) - UI component library
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Prisma](https://www.prisma.io/) - Database ORM
- [NextAuth.js](https://next-auth.js.org/) - Authentication
