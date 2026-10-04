
# HealthVault — Database Architecture

## Database

Supabase PostgreSQL.


## Core Rules

Use:

- UUIDs where appropriate
- Foreign keys
- Unique constraints
- Check constraints
- Proper indexes
- Timestamps
- Database-level integrity
- RLS

Use soft deletion only when justified.


## Ownership

Every healthcare resource must have a clearly defined owner or ownership relationship.

Before creating a table determine:

- Owner
- Readers
- Writers
- Relationships
- Authorization
- RLS


## RLS

Row Level Security is a primary database security boundary.

Frontend authorization is not sufficient.

Backend authorization is not sufficient by itself.

Sensitive healthcare data should have appropriate RLS policies.


## Medical Files

Do NOT store large medical files directly in PostgreSQL.

Use:

Object Storage
+
PostgreSQL metadata


Database should store information such as:

- File reference
- Owner
- Document type
- Metadata
- Upload date
- Processing status
- Integrity information


## Authentication Data

Supabase Auth manages authentication credentials.

Application database stores application-specific profile information.

Do not duplicate passwords or authentication credentials in application tables.


## Database Design Principle

Do not create tables simply because a future feature might need them.

Design the current module first.

Then extend the schema when the next module requires it.