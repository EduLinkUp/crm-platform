# Contributing Guidelines

## Welcome! 👋

Thank you for your interest in contributing to the CRM system. This document provides guidelines and instructions for contributing.

## Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Help others learn and grow
- Report issues professionally

## How to Contribute

### 1. Reporting Bugs

**Before Creating a Bug Report:**
- Check existing issues to avoid duplicates
- Gather information about the bug
- Prepare clear reproduction steps

**Bug Report Format:**
```
Title: Brief description
Environment: OS, Node version, Browser
Steps to Reproduce:
1. Step one
2. Step two
3. Step three
Expected Result: What should happen
Actual Result: What actually happened
Screenshots/Logs: If applicable
```

### 2. Suggesting Enhancements

**Feature Request Template:**
```
Title: [FEATURE] Brief description
Description: Detailed explanation
Motivation: Why this feature is needed
Proposed Implementation: How it could work
```

### 3. Pull Requests

#### Setup Development Environment

```bash
# Fork repository
# Clone your fork
git clone https://github.com/your-username/crm.git

# Add upstream remote
git remote add upstream https://github.com/EduLinkUp-Developers/crm.git

# Create feature branch
git checkout -b feature/your-feature-name
```

#### Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Make changes
# Test locally
# Commit changes
git commit -m "feat: description"
```

#### Submission

1. Push to your fork
2. Create Pull Request
3. Fill in PR template
4. Response to review feedback
5. Wait for approval

### 4. Code Standards

#### Style Guide

- Use TypeScript for type safety
- Follow existing code style
- Use meaningful variable names
- Keep functions small and focused
- Comment complex logic

#### Naming Conventions

```typescript
// Components: PascalCase
const MyComponent = () => {}

// Functions/Variables: camelCase  
const getUserData = () => {}
const userName = "John"

// Constants: UPPER_SNAKE_CASE
const MAX_RETRIES = 3
const API_URL = "https://api.example.com"

// Branches: lowercase-kebab-case
feature/add-contact-search
bugfix/fix-login-error
```

#### TypeScript Best Practices

```typescript
// ✅ Good
interface User {
  id: string
  email: string
  name: string
}

const getUser = (userId: string): Promise<User> => {
  // implementation
}

// ❌ Avoid
const getUser: any = (id: any) => {
  // implementation
}
```

### 5. Testing

#### Writing Tests

```typescript
describe('Contact Module', () => {
  it('should create a contact', async () => {
    const contact = await createContact({
      firstName: 'John',
      email: 'john@example.com'
    })
    
    expect(contact.id).toBeDefined()
    expect(contact.email).toBe('john@example.com')
  })
})
```

#### Running Tests

```bash
# Run all tests
npm run test

# Watch mode
npm run test:watch

# Coverage
npm run test:coverage
```

### 6. Documentation

#### Code Comments

```typescript
// Use meaningful comments
// ✅ Good
// Calculate discount based on customer loyalty tier
const discount = tier * 5

// ❌ Avoid
// Set discount
const x = a * 5
```

#### Documentation Files

Update relevant docs when:
- Adding new features
- Changing APIs
- Modifying database schema
- Updating dependencies

### 7. Commit Messages

#### Format: `<type>(<scope>): <subject>`

```
feat(contacts): add bulk import functionality
fix(dashboard): resolve chart rendering issue
docs(api): update endpoint documentation  
style: format code according to prettier
refactor(database): optimize query performance
test: add contact creation tests
```

#### Tips
- Use imperative mood ("add" not "added")
- Don't capitalize first letter
- No period at end
- Limit to 50 characters
- Reference issues: `fix #123`

### 8. Pull Request Process

#### Before Submitting

- [ ] Updated documentation
- [ ] Added/updated tests
- [ ] Code follows style guidelines  
- [ ] No console.log() statements
- [ ] No breaking changes (or documented)
- [ ] Tests pass locally
- [ ] Commit messages are clear

#### Review Process

1. Automated tests run
2. Code review by maintainers
3. Feedback provided (if needed)
4. Changes requested or approved
5. Merge to main

#### Addressing Review Comments

```bash
# Make requested changes
git add .
git commit -m "refactor: address code review comments"

# Push changes
git push origin feature/your-feature
```

### 9. Release Process

- Versions follow Semantic Versioning (MAJOR.MINOR.PATCH)
- Changes documented in CHANGELOG.md
- Tagged releases in GitHub

### 10. Questions?

- Check documentation in `/docs` folder
- Review existing issues and PRs
- Create a Discussion on GitHub
- Contact maintainers

---

## Development Workflow

```
Fork Repository
    ↓
Create Feature Branch
    ↓  
Make Changes
    ↓
Write/Update Tests
    ↓
Commit with Clear Messages
    ↓
Push to Fork
    ↓
Create Pull Request
    ↓
Respond to Review
    ↓
Merge to Main
```

## Local Development Checklist

- [ ] Node 18+ installed
- [ ] PostgreSQL running
- [ ] .env.local configured
- [ ] Dependencies installed (`npm install`)
- [ ] Database seeded (`npx prisma db push`)
- [ ] Dev server running (`npm run dev`)
- [ ] Tests passing (`npm run test`)
- [ ] Linter passing (`npm run lint`)

## Useful Commands

```bash
# Format code
npm run format

# Check types
npm run type-check

# Build for production
npm run build

# View database
npx prisma studio

# Generate types  
npx prisma generate
```

---

## Thank You! 🙏

Your contributions make this project better. We appreciate:
- Bug reports
- Feature suggestions
- Code contributions
- Documentation improvements
- Test coverage
- Performance optimizations

---

**Last Updated**: March 2026
