# Vectorless Retrieval

Exploring retrieval systems without embeddings or vector databases.

Most modern RAG systems rely on:

```text
Document
    ↓
Chunking
    ↓
Embeddings
    ↓
Vector Database
    ↓
Retrieval
```

This project explores an alternative approach:

```text
Document
    ↓
Index Generation
    ↓
Structured Knowledge
    ↓
Retrieval
```

No embeddings.

No vector database.

No similarity search.

---

## Why Explore Vectorless Retrieval?

Vector search is powerful, but it is not always the best solution.

Many retrieval problems involve:

* Exact identifiers
* Function names
* File paths
* Error messages
* API routes
* Configuration values
* Technical keywords

These can often be retrieved more accurately using structured indexes than semantic search.

---

## When Vector RAG Fails

### Exact Keyword Search

Query:

```text
JWT_SECRET
```

Vector search may retrieve:

```text
Authentication
Authorization
Login Flow
```

instead of the exact occurrence.

---

### Code Search

Query:

```text
runEmbeddingModel
```

Vector search may return semantically related functions instead of the exact implementation.

---

### Error Messages

Query:

```text
TypeError: Cannot read property map of undefined
```

Embedding models may treat this as noise.

Keyword-based retrieval often performs better.

---

### Small Knowledge Bases

For:

```text
50 Pages
100 Pages
Few Documents
```

the cost of embeddings and vector databases may not be justified.

---

## What Is Vectorless Retrieval?

Instead of storing embeddings, we build a structured index.

Example:

```json
{
  "Authentication": [12, 13],
  "Redis": [20, 21],
  "BullMQ": [34, 35],
  "Qdrant": [50]
}
```

When a user asks:

```text
How does BullMQ work?
```

The system:

```text
Looks up BullMQ
    ↓
Finds Pages 34-35
    ↓
Loads Source Content
    ↓
Generates Answer
```

---

## Approaches

### Page Index Retrieval

Build an index that maps topics to pages.

```text
Topic
    ↓
Relevant Pages
```

Useful for:

* PDFs
* Books
* Documentation

---

### Table of Contents Retrieval

Use document structure directly.

```text
Chapter
    ↓
Section
    ↓
Page
```

Useful for:

* Technical books
* Reports
* Documentation

---

### LLM-Generated Wiki

Generate a searchable wiki from uploaded documents.

Example:

```markdown
# Redis

Pages: 12, 15, 18

Summary:
Redis is an in-memory data structure store...
```

Questions are answered by searching the wiki first.

---

### Repository Indexing

Build indexes for:

* Files
* Functions
* Classes
* Interfaces
* Routes

Instead of:

```text
Semantic Search
```

use:

```text
Code Structure
```

---

## Vector vs Vectorless

### Vector Retrieval

Pros:

* Semantic search
* Flexible wording
* Natural language queries

Cons:

* Embedding costs
* Vector database required
* Chunking complexity
* Can miss exact matches

---

### Vectorless Retrieval

Pros:

* Cheap
* Explainable
* Fast
* Exact matches
* No embeddings required

Cons:

* Less semantic understanding
* Requires good indexing
* Harder for fuzzy queries

---

## Hybrid Retrieval

Many production systems use both.

```text
Keyword Search
+
Page Index
+
Vector Search
```

Example:

```text
Question
    ↓
Keyword Search
    ↓
Vector Search
    ↓
Combine Results
    ↓
Answer
```

---

## Learning Goals

This project explores:

* PageIndex Retrieval
* Document Structure Retrieval
* LLM-Generated Wikis
* Agent Memory Substrates
* Hybrid Search Systems
* Vector vs Vectorless Tradeoffs
* Retrieval Evaluation

---

## Key Insight

Retrieval is not the same as vector search.

Vector search is only one retrieval strategy.

The goal is not to use embeddings.

The goal is to find the right information quickly and reliably.
