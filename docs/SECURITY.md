# Security & Best Practices

## 1. Authentication Security

### Password Security
- **Hashing**: bcrypt with 10 salt rounds
- **Storage**: Hashed passwords only, never plain text
- **Minimum Requirements**: 8 characters, mixed case, numbers

```typescript
import bcrypt from 'bcrypt'

const hashedPassword = await bcrypt.hash(password, 10)
const isValid = await bcrypt.compare(inputPassword, hashedPassword)
```

### Session Management
- **Token Storage**: HttpOnly cookies (XSS protection)
- **Token Expiry**: 7 days default
- **Refresh Strategy**: Automatic renewal
- **Logout**: Session invalidation

## 2. Authorization (RBAC)

### Role Definitions
- **ADMIN**: Full system access, user management
- **MANAGER**: Team oversight, reporting
- **SALESPERSON**: Contact & deal management  
- **USER**: Read-only access

### Protected Routes
```typescript
// Middleware protection
const protectedRoutes = ['/dashboard', '/contacts', '/pipeline']

// API route protection
if (!session) return res.status(401).json({ error: 'Unauthorized' })
if (session.user.role !== 'ADMIN') {
  return res.status(403).json({ error: 'Forbidden' })
}
```

## 3. Data Privacy

### GDPR Compliance
- [ ] User consent tracking
- [ ] Data export functionality
- [ ] Account deletion with data wipe
- [ ] Privacy policy documentation
- [ ] DPA with hosting provider

### Data Protection
- [ ] Encryption at rest (database)
- [ ] Encryption in transit (HTTPS)
- [ ] PII masking in logs
- [ ] Regular backups
- [ ] Access logs auditing

## 4. SQL Injection Prevention

### Using Prisma ORM
```typescript
// ❌ VULNERABLE
const result = await db.query(`SELECT * FROM contacts WHERE id = ${id}`)

// ✅ SAFE - Prisma handles parameterization
const contact = await prisma.contact.findUnique({
  where: { id: contactId }
})
```

## 5. Cross-Site Scripting (XSS) Prevention

### Server-Side Rendering
- Content properly escaped by Next.js
- User input sanitized before storage
- DOMPurify for HTML content

```typescript
import DOMPurify from 'isomorphic-dompurify'

const cleanHTML = DOMPurify.sanitize(userInput)
```

## 6. CSRF Protection

- NextAuth.js handles CSRF tokens automatically
- SameSite cookie attribute enforced
- No additional configuration needed

## 7. Environment Security

### Never Commit Secrets
```bash
# .gitignore
.env
.env.local
.env.*.local
.env.production.local
```

### Environment Variable Best Practices
```env
# .env.example - Safe template
DATABASE_URL=postgresql://user:password@localhost:5432/crm_db
NEXTAUTH_SECRET=ADD_YOUR_SECRET_HERE
SMTP_USER=your-email@example.com
```

## 8. API Security

### Request Validation
```typescript
import { z } from 'zod'

const createContactSchema = z.object({
  firstName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
})

const data = createContactSchema.parse(body)
```

### Rate Limiting
```typescript
// Implement rate limiting middleware
import rateLimit from 'express-rate-limit'

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
})
```

### CORS Configuration
```typescript
// next.config.js
const headers = [
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=31536000; includeSubDomains'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  }
]
```

## 9. Secure Headers

### Critical Headers
```
Strict-Transport-Security: max-age=31536000; includeSubDomains
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: geolocation=(), microphone=(), camera=()
```

## 10. Audit Logging

### Activity Tracking
```typescript
// Log all sensitive operations
logger.info('User login', {
  userId: user.id,
  email: user.email,
  timestamp: new Date(),
  ip: req.headers['x-forwarded-for']
})

logger.warn('Failed login attempt', {
  email,
  attempts: retryCount,
  ip: req.headers['x-forwarded-for']
})
```

## 11. Dependency Security

### Regular Updates
```bash
# Check for vulnerabilities
npm audit

# Update packages
npm update

# Fix vulnerabilities
npm audit fix
```

### Dependency Analysis
- Review package.json regularly
- Use `npm ls` to check versions
- Pin dependencies to known good versions

## 12. Third-Party Security

### Email Service (Nodemailer)
- Credentials in environment variables
- Use App Passwords for Gmail
- Implement email templates safely

### Database Provider
- Encrypted connections only
- VPC/Private networks when available
- Regular backups and point-in-time recovery

## 13. Testing Security

### Unit Tests
```typescript
describe('Contact Password', () => {
  it('should never return password in API response', () => {
    // Test implementation
  })

  it('should properly hash passwords', async () => {
    // Test implementation
  })
})
```

### Penetration Testing Checklist
- [ ] SQL Injection attempts
- [ ] XSS payload testing
- [ ] CSRF token validation
- [ ] Authentication bypass attempts
- [ ] Authorization boundary tests
- [ ] Rate limit evasion

## 14. Incident Response

### Breach Protocol
1. Disable affected accounts
2. Force password resets
3. Notify users
4. Investigate logs
5. Deploy patches

### Monitoring
- Error rate spikes
- Unusual database queries
- Failed authentication attempts
- Unusual API patterns

---

**Last Updated**: March 2026
