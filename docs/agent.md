# Autonomous Module Development Loop

HealthVault is developed module-by-module.

The AI agent must always determine the current module from:

docs/08-current-state.md

and verify the module status using:

docs/module-status.md


## Module Loop

For each module follow this sequence:

1. READ
2. INSPECT
3. PLAN
4. WAIT FOR APPROVAL
5. IMPLEMENT
6. TEST
7. FIX
8. VERIFY
9. SECURITY REVIEW
10. UPDATE DOCUMENTATION
11. COMMIT
12. MARK MODULE COMPLETE
13. MOVE TO NEXT MODULE


## Step 1 — READ

Read:

- docs/AGENT.md
- docs/00-project-overview.md
- docs/01-architecture.md
- docs/02-development-rules.md
- docs/03-database.md
- docs/04-security.md
- docs/05-api-design.md
- docs/07-development-roadmap.md
- docs/08-current-state.md
- docs/module-status.md
- Current module specification

Do not read unrelated future module specifications unless required.


## Step 2 — INSPECT

Inspect the existing codebase.

Never assume:

- A file exists
- A dependency exists
- A route exists
- A component exists
- A database table exists
- A feature is implemented


## Step 3 — PLAN

Create a plan for the current module.

The plan must cover:

- Requirements
- Existing implementation
- Missing pieces
- Architecture
- Database
- Relationships
- RLS
- Authentication
- Authorization
- Backend
- Frontend
- Testing
- Security


Do not modify files during planning.


## Step 4 — APPROVAL

Wait for explicit user approval before implementation.

Do not interpret a planning request as implementation approval.


## Step 5 — IMPLEMENT

Implement only the approved phase.

Make the smallest correct changes.

Do not implement future modules.


## Step 6 — TEST

Run appropriate:

- TypeScript checks
- Lint
- Unit tests
- Integration tests
- API tests
- Database/RLS tests
- Frontend tests

depending on the current module.


## Step 7 — FIX

If tests fail:

1. Diagnose the root cause.
2. Fix the smallest correct thing.
3. Run the test again.
4. Do not hide or ignore failures.


## Step 8 — VERIFY

Verify:

- Feature works
- Existing features still work
- Authorization works
- RLS works
- No secrets leaked
- No unnecessary dependencies
- No unrelated files changed


## Step 9 — SECURITY REVIEW

Every module must receive a security review.

Ask:

- Can an unauthenticated user access this?
- Can another user access this?
- Can the client manipulate ownership?
- Can a user escalate privileges?
- Is RLS correct?
- Is authorization enforced server-side?
- Are sensitive fields exposed?
- Are secrets protected?


## Step 10 — UPDATE DOCUMENTATION

After successful implementation:

Update:

docs/08-current-state.md

and:

docs/module-status.md

Update the current phase and completed work.

Do not rewrite permanent architecture documentation unless architecture actually changed.


## Step 11 — COMMIT

Before commit:

- Check git diff
- Check git status
- Check for secrets
- Run tests
- Check unrelated changes

Create a focused commit.


## Step 12 — MARK COMPLETE

A module can only become COMPLETE when:

- Requirements implemented
- Database complete
- RLS complete
- Backend complete
- Frontend complete
- Integration complete
- Tests pass
- Security review complete
- Documentation updated
- Git commit completed


## Step 13 — MOVE TO NEXT MODULE

After a module is complete:

1. Mark it COMPLETE.
2. Identify the next PLANNED module.
3. Mark it IN PROGRESS.
4. Update current-state.md.
5. STOP.

Do not automatically implement the next module without user approval.

The next cycle starts with planning.