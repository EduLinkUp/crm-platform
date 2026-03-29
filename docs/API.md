# API Documentation

## 1. API Overview

- **Base URL**: `https://your-domain.com/api` or `http://localhost:3000/api`
- **Format**: RESTful JSON
- **Authentication**: NextAuth.js Session
- **Rate Limiting**: Applied to prevent abuse

## 2. Authentication Endpoints

### Login
```
POST /api/auth/signin
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "callbackUrl": "/dashboard"
}

Response (200):
{
  "ok": true,
  "error": null,
  "status": 200,
  "url": "/dashboard"
}
```

### Logout
```
GET /api/auth/signout

Response:
Redirects to login page
```

### Session
```
GET /api/auth/session

Response (200):
{
  "user": {
    "id": "user-id",
    "email": "user@example.com",
    "name": "John Doe",
    "role": "MANAGER"
  },
  "expires": "2024-12-31T23:59:59Z"
}
```

## 3. Contacts API

### List Contacts
```
GET /api/contacts?page=1&limit=10&search=john&sort=name

Response (200):
{
  "success": true,
  "data": [
    {
      "id": "contact-1",
      "firstName": "John",
      "lastName": "Doe",
      "email": "john@example.com",
      "phone": "+1-555-0100",
      "company": "Tech Corp",
      "createdAt": "2024-01-15T10:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 45,
    "pages": 5
  }
}
```

### Get Single Contact
```
GET /api/contacts/contact-1

Response (200):
{
  "success": true,
  "data": {
    "id": "contact-1",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "phone": "+1-555-0100",
    "company": "Tech Corp",
    "deals": [
      { "id": "deal-1", "title": "Enterprise Deal", "value": 50000 }
    ],
    "activities": [
      { "id": "activity-1", "type": "CALL", "notes": "Initial consultation" }
    ]
  }
}
```

### Create Contact
```
POST /api/contacts
Content-Type: application/json

{
  "firstName": "Jane",
  "lastName": "Smith",
  "email": "jane@example.com",
  "phone": "+1-555-0111",
  "company": "Startup Inc",
  "jobTitle": "CEO",
  "source": "REFERRAL"
}

Response (201):
{
  "success": true,
  "data": {
    "id": "contact-2",
    "firstName": "Jane",
    "lastName": "Smith",
    "email": "jane@example.com",
    "createdAt": "2024-03-29T10:00:00Z"
  }
}
```

### Update Contact
```
PUT /api/contacts/contact-1
Content-Type: application/json

{
  "firstName": "John",
  "phone": "+1-555-0199"
}

Response (200):
{
  "success": true,
  "data": { ... updated contact ... }
}
```

### Delete Contact
```
DELETE /api/contacts/contact-1

Response (200):
{
  "success": true,
  "message": "Contact deleted successfully"
}
```

## 4. Deals API

### List Deals
```
GET /api/deals?stage=PROPOSAL&sort=-value&limit=20

Response (200):
{
  "success": true,
  "data": [
    {
      "id": "deal-1",
      "title": "Enterprise Deal",
      "stage": "PROPOSAL",
      "value": 75000,
      "probability": 60,
      "contact": { "id": "contact-1", "firstName": "John" },
      "expectedCloseDate": "2024-04-15"
    }
  ]
}
```

### Create Deal
```
POST /api/deals
Content-Type: application/json

{
  "title": "New Enterprise Deal",
  "description": "Large enterprise opportunity",
  "stage": "QUALIFIED",
  "value": 100000,
  "probability": 45,
  "contactId": "contact-1",
  "expectedCloseDate": "2024-06-30"
}

Response (201):
{
  "success": true,
  "data": { ... created deal ... }
}
```

### Update Deal
```
PUT /api/deals/deal-1
Content-Type: application/json

{
  "stage": "PROPOSAL",
  "probability": 65
}

Response (200):
{
  "success": true,
  "data": { ... updated deal ... }
}
```

## 5. Activities API

### Log Activity
```
POST /api/activities
Content-Type: application/json

{
  "type": "CALL",
  "title": "Initial consultation call",
  "description": "Discussed requirements",
  "duration": 30,
  "notes": "Customer interested in enterprise package",
  "contactId": "contact-1",
  "dealId": "deal-1"
}

Response (201):
{
  "success": true,
  "data": { ... created activity ... }
}
```

### List Activities
```
GET /api/activities?contactId=contact-1&type=CALL&limit=50

Response (200):
{
  "success": true,
  "data": [ ... activities ... ]
}
```

## 6. Email API

### Send Email
```
POST /api/email/send
Content-Type: application/json

{
  "to": "contact@example.com",
  "subject": "Follow-up: Your inquiry",
  "html": "<h1>Hello!</h1><p>Thank you for your interest...</p>",
  "contactId": "contact-1"
}

Response (200):
{
  "success": true,
  "message": "Email sent successfully",
  "messageId": "message-123"
}
```

## 7. Error Responses

### Error Format
```json
{
  "success": false,
  "error": "User not found",
  "code": "NOT_FOUND",
  "statusCode": 404
}
```

### Common Error Codes
- `400`: Bad Request - Invalid input
- `401`: Unauthorized - Not authenticated
- `403`: Forbidden - No permission
- `404`: Not Found - Resource doesn't exist
- `409`: Conflict - Duplicate entry
- `500`: Server Error - Internal error

## 8. Rate Limiting

- 100 requests per minute per IP
- 1000 requests per hour per user
- Rate limit headers included in all responses:
  - `X-RateLimit-Limit`
  - `X-RateLimit-Remaining`
  - `X-RateLimit-Reset`

## 9. Pagination

All list endpoints support:
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10, max: 100)
- `sort`: Sort field (default: createdAt)
- `order`: asc or desc (default: desc)

## 10. Filtering & Search

```
GET /api/contacts?search=john&company=tech&status=active

// Multiple values
GET /api/deals?stage=PROPOSAL,NEGOTIATION&sortBy=-value
```

---

**Last Updated**: March 2026
