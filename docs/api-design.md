
# HealthVault — API Design

## Base Path

HealthVault does NOT use URL-based API versioning.

Use:

/api/...

## Health

```http
GET /api/health

HTTP Methods

GET

Read

POST

Create or perform an appropriate action

PUT

Replace

PATCH

Partial update

DELETE

Delete
Examples
GET    /api/patients/me
PATCH  /api/patients/me

GET    /api/documents
POST   /api/documents
GET    /api/documents/:documentId
DELETE /api/documents/:documentId

GET    /api/consents
POST   /api/consents
PATCH  /api/consents/:consentId

GET    /api/appointments
POST   /api/appointments
GET    /api/appointments/:appointmentId
PATCH  /api/appointments/:appointmentId
DELETE /api/appointments/:appointmentId
Action Endpoints

Action endpoints are acceptable when CRUD does not naturally represent the operation.

Example:

POST /api/organizations/:organizationId/verify
Response Format

Success:

{
  "success": true,
  "data": {}
}

Error:

{
  "success": false,
  "error": {
    "code": "SOME_ERROR",
    "message": "Human-readable message"
  }
}
Error Rules

Never expose:

Stack traces
Secrets
Passwords
Internal database details
Sensitive implementation information