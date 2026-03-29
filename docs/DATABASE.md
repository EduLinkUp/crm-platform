# Database Design & Prisma Schema

## 1. Database Overview

- **Type**: Relational (PostgreSQL)
- **ORM**: Prisma
- **Approach**: Code-first with schema.prisma

## 2. Entity Relationship Diagram

```
User (1) ──→ (Many) Contact
User (1) ──→ (Many) Lead
User (1) ──→ (Many) Deal
User (1) ──→ (Many) Activity
User (1) ──→ (Many) Task
User (1) ──→ (Many) Note

Contact (1) ──→ (Many) Lead
Contact (1) ──→ (Many) Deal
Contact (1) ──→ (Many) Activity
Contact (1) ──→ (Many) Attachment
Contact (1) ──→ (Many) Note
Contact (1) ──→ (Many) Interaction

Lead (1) ──→ (1) Deal
Lead (0,1) ──→ (Many) Activity

Deal (1) ──→ (Many) Activity
Deal (0,1) ──→ (1) Lead
```

## 3. Table Schemas

### Users Table
```sql
CREATE TABLE User (
  id TEXT PRIMARY KEY DEFAULT cuid(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role ENUM('ADMIN', 'MANAGER', 'SALESPERSON', 'USER'),
  department VARCHAR(255),
  phone VARCHAR(20),
  avatar TEXT,
  isActive BOOLEAN DEFAULT true,
  createdAt TIMESTAMP DEFAULT NOW(),
  updatedAt TIMESTAMP
);
CREATE INDEX idx_user_email ON User(email);
CREATE INDEX idx_user_role ON User(role);
```

### Contacts Table
```sql
CREATE TABLE Contact (
  id TEXT PRIMARY KEY DEFAULT cuid(),
  firstName VARCHAR(100) NOT NULL,
  lastName VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  company VARCHAR(255),
  jobTitle VARCHAR(255),
  address TEXT,
  city VARCHAR(100),
  state VARCHAR(100),
  zipCode VARCHAR(20),
  country VARCHAR(100),
  website VARCHAR(255),
  source ENUM('WEBSITE', 'REFERRAL', 'COLD_CALL', 'EMAIL', 'SOCIAL_MEDIA', 'TRADE_SHOW', 'PARTNER', 'OTHER'),
  segment VARCHAR(100),
  notes TEXT,
  avatar TEXT,
  isActive BOOLEAN DEFAULT true,
  userId TEXT NOT NULL,
  createdAt TIMESTAMP DEFAULT NOW(),
  updatedAt TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES User(id)
);
CREATE INDEX idx_contact_email ON Contact(email);
CREATE INDEX idx_contact_userId ON Contact(userId);
CREATE INDEX idx_contact_source ON Contact(source);
```

### Leads Table
```sql
CREATE TABLE Lead (
  id TEXT PRIMARY KEY DEFAULT cuid(),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  status ENUM('NEW', 'CONTACTED', 'QUALIFIED', 'PROPOSAL_SENT', 'NEGOTIATING', 'WON', 'LOST'),
  source ENUM(...),
  budget INT,
  priority ENUM('LOW', 'MEDIUM', 'HIGH', 'URGENT'),
  expectedCloseDate TIMESTAMP,
  probability INT DEFAULT 50,
  contactId TEXT NOT NULL,
  userId TEXT NOT NULL,
  createdAt TIMESTAMP DEFAULT NOW(),
  updatedAt TIMESTAMP,
  FOREIGN KEY (contactId) REFERENCES Contact(id) ON DELETE CASCADE,
  FOREIGN KEY (userId) REFERENCES User(id)
);
CREATE INDEX idx_lead_contactId ON Lead(contactId);
CREATE INDEX idx_lead_status ON Lead(status);
```

### Deals Table
```sql
CREATE TABLE Deal (
  id TEXT PRIMARY KEY DEFAULT cuid(),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  stage ENUM('LEAD', 'PROSPECT', 'QUALIFIED', 'PROPOSAL', 'NEGOTIATION', 'CLOSED_WON', 'CLOSED_LOST'),
  value DECIMAL(12, 2) NOT NULL,
  probability INT DEFAULT 50,
  expectedCloseDate TIMESTAMP,
  actualCloseDate TIMESTAMP,
  isWon BOOLEAN DEFAULT false,
  contactId TEXT NOT NULL,
  userId TEXT NOT NULL,
  leadId TEXT UNIQUE,
  createdAt TIMESTAMP DEFAULT NOW(),
  updatedAt TIMESTAMP,
  FOREIGN KEY (contactId) REFERENCES Contact(id) ON DELETE CASCADE,
  FOREIGN KEY (userId) REFERENCES User(id),
  FOREIGN KEY (leadId) REFERENCES Lead(id)
);
CREATE INDEX idx_deal_contactId ON Deal(contactId);
CREATE INDEX idx_deal_stage ON Deal(stage);
CREATE INDEX idx_deal_userId ON Deal(userId);
```

### Activities Table
```sql
CREATE TABLE Activity (
  id TEXT PRIMARY KEY DEFAULT cuid(),
  type ENUM('CALL', 'EMAIL', 'MEETING', 'TASK', 'NOTE', 'VISIT', 'PRESENTATION', 'PROPOSAL', 'CONTRACT', 'OTHER'),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  duration INT,
  location VARCHAR(255),
  notes TEXT,
  contactId TEXT NOT NULL,
  dealId TEXT,
  leadId TEXT,
  userId TEXT NOT NULL,
  createdAt TIMESTAMP DEFAULT NOW(),
  updatedAt TIMESTAMP,
  FOREIGN KEY (contactId) REFERENCES Contact(id) ON DELETE CASCADE,
  FOREIGN KEY (dealId) REFERENCES Deal(id) ON DELETE SET NULL,
  FOREIGN KEY (leadId) REFERENCES Lead(id) ON DELETE SET NULL,
  FOREIGN KEY (userId) REFERENCES User(id)
);
CREATE INDEX idx_activity_contactId ON Activity(contactId);
CREATE INDEX idx_activity_type ON Activity(type);
CREATE INDEX idx_activity_createdAt ON Activity(createdAt);
```

### Tasks Table
```sql
CREATE TABLE Task (
  id TEXT PRIMARY KEY DEFAULT cuid(),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  status ENUM('TODO', 'IN_PROGRESS', 'REVIEW', 'DONE', 'CANCELLED'),
  priority ENUM('LOW', 'MEDIUM', 'HIGH', 'URGENT'),
  dueDate TIMESTAMP,
  completedDate TIMESTAMP,
  fromUser VARCHAR(255),
  userId TEXT NOT NULL,
  createdAt TIMESTAMP DEFAULT NOW(),
  updatedAt TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES User(id)
);
CREATE INDEX idx_task_userId ON Task(userId);
CREATE INDEX idx_task_status ON Task(status);
```

## 4. Key Relationships

### One-to-Many: User → Contacts
- A user can manage multiple contacts
- Contacts belong to one user
- Foreign Key: `userId` in Contact table

### One-to-Many: Contact → Deals
- A contact can have multiple deals
- Deals tied to specific contacts
- Enables contact-centric sales tracking

### One-to-One: Lead → Deal
- Each lead can progress to one deal
- One deal can originate from one lead
- Optional relationship (lead may not convert

)

### Many-to-Many: Activity → (Contact, Deal, Lead)
- Activities can be associated with multiple entities
- Tracks all customer interactions

## 5. Indexing Strategy

```sql
-- Performance Indexes
CREATE INDEX idx_user_email ON User(email);
CREATE INDEX idx_contact_userId_email ON Contact(userId, email);
CREATE INDEX idx_deal_stage_value ON Deal(stage, value);
CREATE INDEX idx_activity_createdAt_type ON Activity(createdAt, type);

-- Foreign Key Indexes (created automatically)
```

## 6. Query Optimization Patterns

### Efficient Pagination
```prisma
const contacts = await prisma.contact.findMany({
  skip: (page - 1) * limit,
  take: limit,
  select: {
    id: true,
    firstName: true,
    email: true,
  },
})
```

### Eager Loading
```prisma
const deal = await prisma.deal.findUnique({
  where: { id: dealId },
  include: {
    contact: true,
    activities: { take: 5, orderBy: { createdAt: 'desc' } }
  }
})
```

### Aggregation Queries
```prisma
const stats = await prisma.deal.aggregate({
  _sum: { value: true },
  _avg: { probability: true },
  _count: true,
  where: { stage: 'CLOSED_WON' }
})
```

## 7. Data Integrity

### Constraints
- NOT NULL on required fields
- UNIQUE on email fields
- FOREIGN KEY with ON DELETE CASCADE for related records
- CHECK constraints for enums

### Validation (Prisma Level)
```prisma
model Deal {
  value Float @db.Decimal(12, 2)
  probability Int? @default(50) @db.Int
}
```

## 8. Backup & Recovery

- PostgreSQL native backups
- Automated daily backups on Vercel
- Point-in-time recovery available

---

**Last Updated**: March 2026
