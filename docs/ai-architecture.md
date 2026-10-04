
# HealthVault — AI Architecture

## Core Principle

AI is an intelligence layer on top of healthcare records.

AI must not become the source of truth.

Healthcare records are the source of truth.


## AI Request Flow

```text
User Question
      ↓
Authentication
      ↓
Authorization
      ↓
Retrieve permitted records
      ↓
Relevant context
      ↓
AI model
      ↓
Answer
      ↓
Source citations

AI Requirements

AI must be:

Grounded
Permission-aware
Source-aware
Traceable
Robust to missing data
Explicit about uncertainty
No Fabrication

AI must never invent:

Medical records
Lab results
Diagnoses
Medications
Patient history

If information is unavailable:

"The available records do not contain enough information to answer this."

Preferred Response

AI response should ideally contain:

Answer
+
Relevant source records
+
Document/date context

RAG

Future architecture:

Document
↓
Ingestion
↓
Chunking
↓
Embeddings
↓
Vector storage
↓
Metadata
↓
Hybrid search
↓
Ranking
↓
Relevant records
↓
LLM

AI Provider Abstraction

Business logic should not be tightly coupled to one AI provider.

Future infrastructure should support:

Provider abstraction
Model routing
Fallback models
Prompt management
Context engineering
RAG
Embeddings
Vector search
Output validation
Source attribution
Observability
AI safety controls
Expensive Processing

Large OCR/AI operations should eventually run asynchronously.

Do not block normal HTTP requests with expensive AI processing.