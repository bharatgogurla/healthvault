# HealthVault — System Architecture

## Monorepo

```text
healthvault/
├── frontend/
├── backend/
├── docs/

Frontend

Technology:

Next.js
TypeScript
App Router
Tailwind CSS
shadcn/ui
TanStack Query
Zod
React Hook Form

Development server:

http://localhost:3000

Backend

Technology:

Node.js
Express
TypeScript
Zod
Supabase
Helmet
CORS
dotenv

Development server:

http://localhost:5000

Backend Structure
backend/src/

├── config/
├── controllers/
├── lib/
├── middlewares/
├── routes/
├── services/
├── types/
├── app.ts
└── server.ts
Backend Responsibilities
Routes

Define HTTP endpoints.

Controllers

Handle HTTP request/response.

Controllers should remain thin.

Services

Contain business logic.

Examples:

patient.service.ts
document.service.ts
consent.service.ts
ai.service.ts
Middlewares

Handle cross-cutting concerns:

Authentication
Authorization
Validation
Error handling
Lib

External service clients.

Config

Environment and application configuration.

Types

Backend types.

Supabase

Supabase is the primary backend platform.

Use Supabase for:

PostgreSQL
Authentication
Storage
Row Level Security
Realtime
Data API

Do not unnecessarily recreate Supabase functionality inside Express.

Architectural Principle

Do not create unnecessary layers.

Use the simplest architecture that preserves:

Security
Separation of concerns
Maintainability
Testability
Scalability