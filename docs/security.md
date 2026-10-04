# HealthVault — Security Architecture

## Fundamental Principle

Authentication ≠ Authorization


Authentication answers:

"Who are you?"


Authorization answers:

"What are you allowed to access?"


## Healthcare Access

For every protected operation determine:

- Who is requesting?
- Who owns the resource?
- What permission is required?
- What consent exists?
- What organization relationship exists?
- What records are accessible?


## Never Trust the Frontend

Frontend authorization is only a UX layer.

It must never be the final security boundary.


## Security Layers

```text
Authentication
       ↓
Authorization
       ↓
Resource ownership
       ↓
Consent
       ↓
RLS
       ↓
Database

Secrets

Frontend:

NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY

Backend:

SUPABASE_URL
SUPABASE_SECRET_KEY

The secret key is server-only.

Never:

Expose it to the browser
Put it in frontend code
Commit it to Git
Hardcode it
Send it in chat
Input Validation

All untrusted external input must be validated.

Use Zod for runtime validation.

Security Requirements

Security must include:

Authentication
Authorization
RBAC
RLS
Consent enforcement
Input validation
Rate limiting
Secure file handling
Audit logging
Secret management
Session security
Security headers
Data isolation
Sensitive Healthcare Data

Never expose healthcare information to a user simply because they are authenticated.

Access must be explicitly authorized.

Auditability

Sensitive actions should eventually be auditable:

Login
Record viewed
Document uploaded
Document downloaded
Document deleted
Consent granted
Consent revoked
Record modified
Organization verified
AI accessed records