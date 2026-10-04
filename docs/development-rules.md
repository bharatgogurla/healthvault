
# HealthVault — Development Rules

## Golden Workflow

Every development task must follow:

Inspect
→ Understand
→ Plan
→ Implement
→ Test
→ Verify


## Before Coding

Always inspect:

- Existing files
- Existing components
- Existing APIs
- Existing routes
- Existing database
- Existing types
- Existing dependencies
- Existing environment configuration

Never assume something does not exist.


## Before Installing Packages

Check whether an existing dependency already solves the problem.

Avoid unnecessary dependencies.


## Before Creating a Database Table

Ask:

1. Why does this table exist?
2. Who owns the data?
3. Who can read it?
4. Who can modify it?
5. What relationships exist?
6. What constraints are required?
7. What indexes are required?
8. What RLS policies are required?
9. What audit events are required?


## Before Creating an API

Determine:

1. Who can call it?
2. What authentication is required?
3. What authorization is required?
4. What validation is required?
5. What data can be returned?
6. What audit event is required?


## Vertical Slice Development

Do not build the entire frontend first and backend later.

Preferred:

Module
↓
Database
↓
RLS / Security
↓
Backend
↓
Frontend
↓
Integration
↓
Testing
↓
Complete module


## Code Changes

Make the smallest correct change.

Do not rewrite working architecture unnecessarily.

Do not modify unrelated files.


## Testing

Every completed feature must be tested.

At minimum consider:

- Happy path
- Invalid input
- Unauthorized access
- Edge cases
- Error handling
- Security implications


## Git

Complete modules should be committed separately.

Example:

```text
feat: implement patient authentication