# HealthVault — Current Development State

## Current Module

MODULE 03 — PATIENT PROFILE (PLANNED)


## Completed Modules

### Module 01 — Foundation

STATUS: COMPLETED ✅

Completed:
- Next.js frontend
- Express backend
- TypeScript
- Node ESM
- Environment configuration
- Supabase project
- Backend Supabase client
- CORS
- Helmet
- JSON middleware
- Frontend → Backend communication
- Backend health endpoint
- Temporary Supabase health_check table
- RLS enabled on health_check


### Module 02 — Authentication & Identity

STATUS: COMPLETED ✅

Completed:
- PostgreSQL `public.profiles` database schema migration (`02_auth_profiles.sql`) with `verification_status`, `medical_license_number`, and `specialization` columns
- Database trigger `handle_new_user()` for automatic profile creation supporting Patient & Doctor onboarding with default `verification_status = 'pending'` for doctors
- Row Level Security (RLS) policies on `public.profiles` enforcing `auth.uid() = id` with immutable `role` and `verification_status`
- Supabase Browser Client helper (`frontend/src/lib/supabaseClient.ts`) with Google OAuth PKCE integration (`signInWithGoogle`)
- OAuth PKCE Callback handler page (`/auth/callback`) with automatic session exchange and role-based redirect
- React Auth Context & Provider (`AuthContext.tsx`) managing `user`, `session`, `profile` (with Doctor metadata), `loading`
- Protected route wrapper component (`ProtectedRoute.tsx`) supporting `allowedRoles` (`patient`, `doctor`) and cross-role redirects
- Role-based Authentication UI Architecture:
  - `AuthLayout.tsx` (Responsive 2-column desktop split-screen layout)
  - `AuthBrandPanel.tsx` (Healthcare SaaS trust highlights, security badges, dynamic Patient/Doctor value proposition)
  - `RoleSelector.tsx` (Patient / Doctor workspace portal switcher tabs)
  - `GoogleButton.tsx` (Functional Google OAuth sign-in button)
  - `/signup` (Patient & Doctor registration forms with doctor license and specialization metadata)
  - `/login` (Role-aware login with password show/hide toggle and role-based routing)
  - `/forgot-password` (Password recovery email request)
  - `/reset-password` (Password reset form)
  - `/patient/dashboard` (Dedicated Patient Portal workspace)
  - `/doctor/dashboard` (Dedicated Doctor Portal workspace with verification status banner)
  - `/dashboard` (Smart router redirecting user to authorized role dashboard)
- Express JWT Authentication Middleware (`backend/src/middlewares/auth.middleware.ts`) attaching verified `role` & `verification_status`
- Express Authorization Middleware (`backend/src/middlewares/authorize.middleware.ts`) providing `requireRole(...)` & `requireVerifiedDoctor()`
- Express `Request` type extension for authenticated `user` property (`backend/src/types/express.d.ts`)
- Authenticated user endpoints:
  - `GET /api/auth/me`
  - `GET /api/auth/patient-only` (Patient authorized test)
  - `GET /api/auth/doctor-only` (Doctor authorized test)
- API base path alignment to `/api/...` per `docs/api-design.md`


## Current API

```http
GET /api/health
GET /api/auth/me (Protected, Header: Authorization: Bearer <access_token>)
GET /api/auth/patient-only (Protected: patient role required)
GET /api/auth/doctor-only (Protected: doctor role required)
```

## Current Backend
```text
backend/src/
├── config/
├── controllers/
│   └── auth.controller.ts
├── db/
│   └── migrations/
│       └── 02_auth_profiles.sql
├── lib/
│   └── supabase.ts
├── middlewares/
│   ├── auth.middleware.ts
│   └── authorize.middleware.ts
├── routes/
│   └── auth.routes.ts
├── services/
├── types/
│   └── express.d.ts
├── app.ts
└── server.ts
```

## Current Frontend
```text
frontend/src/
├── app/
│   ├── (auth)/
│   │   ├── forgot-password/
│   │   ├── login/
│   │   ├── reset-password/
│   │   └── signup/
│   ├── auth/
│   │   └── callback/
│   ├── dashboard/
│   ├── doctor/
│   │   └── dashboard/
│   ├── patient/
│   │   └── dashboard/
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── auth/
│   │   ├── AuthBrandPanel.tsx
│   │   ├── AuthLayout.tsx
│   │   ├── GoogleButton.tsx
│   │   └── RoleSelector.tsx
│   └── ProtectedRoute.tsx
├── context/
│   └── AuthContext.tsx
└── lib/
    ├── api.ts
    └── supabaseClient.ts
```

## Next Module

Module 03 — Patient Profile