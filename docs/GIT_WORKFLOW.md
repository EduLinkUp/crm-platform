# Git Workflow & Contributing

## 1. Git Workflow (GitHub Flow)

### Main Branches
- **`main`**: Production-ready code
- **Feature branches**: For new features

### Branch Naming Convention

```
feature/add-contact-search
bugfix/fix-login-error
docs/update-api-docs
hotfix/critical-security-fix
chore/update-dependencies
```

## 2. Creating a Feature Branch

```bash
# Update main branch
git checkout main
git pull origin main

# Create feature branch
git checkout -b feature/your-feature-name

# Make changes
git add .
git commit -m "feat: add new feature"

# Push to remote
git push -u origin feature/your-feature-name
```

## 3. Commit Message Format

### Format: `<type>: <description>`

**Types:**
- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation changes
- `style`: Code style changes
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Build process, dependencies

### Examples:

```
feat: add contact export to CSV
fix: resolve dashboard loading issue
docs: update API documentation
refactor: simplify database queries
perf: optimize contact search
```

## 4. Commit Best Practices

```bash
# Good commits (atomic, focused)
git commit -m "feat: add email validation

- Add email format validation
- Update error messages
- Add unit tests"

# Avoid large commits mixing multiple features
# Bad: git commit -m "updated stuff"
```

## 5. Pull Request Process

### Create Pull Request on GitHub

1. Push your feature branch
2. Go to GitHub repository
3. Click "New Pull Request"
4. Base: `main`, Compare: `feature/your-feature`
5. Fill in PR description

### PR Description Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
Steps to test the changes

## Checklist
- [ ] Code follows style guidelines
- [ ] Tests added/updated
- [ ] Documentation updated
- [ ] No new warnings generated
```

## 6. Code Review Checklist

- [ ] Code is readable and well-commented
- [ ] No console.log() statements left
- [ ] Error handling is implemented
- [ ] Tests are included
- [ ] Documentation is updated
- [ ] No sensitive data in commits

##7. Merging to Main

```bash
# After PR approval
git checkout main
git pull origin main
git merge feature/your-feature-name
git push origin main

# Or merge via GitHub UI
```

## 8. Handling Merge Conflicts

```bash
# Update feature branch with latest main
git fetch origin
git rebase origin/main

# Resolve conflicts in your editor
# File conflicts marked with <<<<<<, ======, >>>>>>

git add .
git rebase --continue

# If something goes wrong
git rebase --abort
```

## 9. Keeping Feature Branch Updated

```bash
# Fetch latest changes
git fetch origin

# Rebase onto main
git rebase origin/main

# If conflicts, resolve them and continue
git rebase --continue

# Force push (use carefully!)
git push origin feature/your-feature --force-with-lease
```

## 10. Reverting Changes

```bash
# Undo last commit (keep changes)
git reset --soft HEAD~1

# Undo last commit (discard changes)
git reset --hard HEAD~1

# Revert a specific commit
git revert <commit-hash>

# Interactive rebase to edit history
git rebase -i origin/main
```

## 11. Stashing Changes

```bash
# Save uncommitted changes
git stash

# List stashes
git stash list

# Apply stashed changes
git stash pop

# Apply specific stash
git stash apply stash@{n}

# Delete stash
git stash drop
```

## 12. Useful Git Commands

```bash
# View commit history
git log --oneline
git log --graph --all --oneline

# View changes before committing
git diff

# View staged changes
git diff --cached

# Create lightweight tag
git tag v1.0.0
git push origin v1.0.0

# See who changed what
git blame src/file.ts

# Find commits that changed something
git log -p --follow src/file.ts
```

## 13. GitHub Actions CI/CD

### Auto-run Tests on PR

Create `.github/workflows/test.yml`:

```yaml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run lint
      - run: npm run build
      - run: npm run test
```

## 14. Deployment Workflow

```
Feature Branch
    ↓
    ├─→ Create Pull Request
    ├─→ Code Review
    ├─→ Approval
    ↓
    └─→ Merge to Main
         ↓
    ├─→ GitHub Actions Tests
    ├─→ Auto-deploy to Vercel
         ↓
    └─→ Production Update
```

## 15. Emergency Hotfixes

```bash
# Create hotfix branch from main
git checkout -b hotfix/critical-bug

# Make fix
git add .
git commit -m "fix: critical production bug"

# Create PR and merge to main immediately
# Also merge back to active feature branches

git checkout feature/in-progress
git merge hotfix/critical-bug
```

## 16. Repository Protection

- Require PR reviews before merge
- Require status checks (CI/CD) to pass
- Protect main branch
- Require up-to-date branches

---

**Last Updated**: March 2026
