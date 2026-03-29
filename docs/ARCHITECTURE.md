# CRM Architecture & System Design

## 1. System Architecture Overview

### Layered Architecture

```
┌─────────────────────────────────────┐
│         Presentation Layer           │
│  (React Components, UI Rendering)   │
└─────────────────────────────────────┘
         ↓
┌─────────────────────────────────────┐
│      Application Layer               │
│   (Next.js Pages & API Routes)      │
└─────────────────────────────────────┘
         ↓
┌─────────────────────────────────────┐
│       Business Logic Layer           │
│   (Services, Utils, Validations)    │
└─────────────────────────────────────┘
         ↓
┌─────────────────────────────────────┐
│        Data Access Layer             │
│    (Prisma ORM, Database Queries)   │
└─────────────────────────────────────┘
         ↓
┌─────────────────────────────────────┐
│       Data Storage Layer             │
│      (PostgreSQL Database)           │
└─────────────────────────────────────┘
```

## 2. Technology Stack

### Frontend
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom cyberpunk theme
- **UI Components**: Custom React components
- **Charts**: Recharts for data visualization
- **State Management**: React Hooks
- **Form Handling**: React Hook Form with Zod validation

### Backend
- **Runtime**: Node.js
- **Framework**: Next.js API Routes
- **Database ORM**: Prisma
- **Authentication**: NextAuth.js
- **Email Service**: Nodemailer
- **Validation**: Zod
- **HTTP Client**: Axios

### Database
- **Primary**: PostgreSQL 14+
- **ORM**: Prisma
- **Connection Pooling**: Built-in (Prisma)

### Deployment
- **Platform**: Vercel
- **CI/CD**: GitHub Actions
- **Monitoring**: Vercel Analytics

## 3. Module Structure

### Core Modules

#### 1. Authentication Module
- Location: `src/lib/auth.ts`, `src/app/api/auth/`
- Responsibilities:
  - User login/logout
  - Session management
  - Token generation
  - Role-based authorization
- Uses: NextAuth.js, bcrypt

#### 2. Database Module
- Location: `src/lib/db.ts`
- Responsibilities:
  - Prisma client instantiation
  - Connection management
  - Query composition
- Uses: Prisma Client

#### 3. Email Module
- Location: `src/lib/email.ts`, `src/app/api/email/`
- Responsibilities:
  - Email sending
  - Template rendering
  - Queue management
- Uses: Nodemailer

#### 4. Analytics Module
- Location: `src/app/dashboard/` pages
- Responsibilities:
  - Sales metrics
  - Pipeline analysis
  - Performance tracking
- Uses: Recharts

## 4. Data Flow Patterns

### Synchronous Request Flow
```
Client (React Component)
    ↓
Next.js API Route (/api/contacts)
    ↓
Business Logic (validation, transformation)
    ↓
Prisma Query
    ↓
PostgreSQL Database
    ↓
Response (JSON)
    ↓
React State Update
    ↓
UI Re-render
```

### Email Automation Flow
```
Event Trigger (New Contact, Deal Update)
    ↓
Email Service
    ↓
Template Rendering
    ↓
Nodemailer Configuration
    ↓
SMTP Server
    ↓
Email Delivered
    ↓
Activity Logged
```

## 5. Component Architecture

### Page Components
- Dashboard (`dashboard/page.tsx`)
- Contacts (`dashboard/contacts/page.tsx`)
- Pipeline (`dashboard/pipeline/page.tsx`)
- Login (`login/page.tsx`)

### UI Components (Reusable)
- `CyberpunkButton` - Styled button with variants
- `CyberpunkCard` - Container with glow effect
- `CyberpunkInput` - Form input with validation styling
- `MainLayout` - Navigation and layout wrapper

### Layout Components
- `MainLayout` - Main application layout with sidebar
- Root layout - App-wide styling and fonts

## 6. Security Architecture

### Authentication Flow
```
User Input (Email/Password)
    ↓
NextAuth.js Handler
    ↓
Validate Credentials
    ↓
Hash Comparison (bcrypt)
    ↓
Generate Session Token
    ↓
Set Secure Cookie
    ↓
Redirect to Dashboard
```

### Authorization Strategy
- **Role-Based Access Control (RBAC)**: ADMIN, MANAGER, SALESPERSON, USER
- **Protected Routes**: Middleware checks session
- **API Protection**: Server-side validation of user permissions
- **Data Privacy**: Users can only access their own data

## 7. Performance Considerations

### Frontend Optimization
```js
// Code Splitting
const ContactsPage = dynamic(() => import('./contacts'), {
  loading: () => <LoadingSpinner />
})

// Image Optimization (if used)
import Image from 'next/image'

// Memoization for expensive components
const ChartComponent = memo(function Chart() { ... })
```

### Database Optimization
```prisma
// Selective queries
const contacts = await prisma.contact.findMany({
  select: {
    id: true,
    firstName: true,
    email: true,
    deals: {
      select: { value: true }
    }
  }
})

// Indexing on frequently queried fields
model Contact {
  @@index([email])
  @@index([userId])
}
```

### Caching Strategy
- Next.js ISR for dashboard pages
- Browser caching for static assets
- JWT token caching in secure cookies

## 8. Error Handling

### Global Error Handling Pattern
```typescript
try {
  // API call
  const result = await fetchContacts()
  return result
} catch (error) {
  logger.error('Failed to fetch contacts', error)
  return { error: 'Failed to fetch contacts' }
}
```

### API Error Responses
```json
{
  "success": false,
  "error": "Contact not found",
  "code": "NOT_FOUND",
  "statusCode": 404
}
```

## 9. Scalability Considerations

### Horizontal Scaling
- Stateless API routes
- Session stored in secure cookies
- Database connection pooling

### Vertical Scaling
- Query optimization
- Index optimization
- Caching strategies

### Future Enhancements
- Redis for session cache
- Message queue for email/async jobs
- CDN for static assets
- Database replicas for read scaling

---

**Last Updated**: March 2026
**Architecture Version**: 1.0
