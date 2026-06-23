# RAGForge

A production-style document ingestion pipeline for RAG (Retrieval-Augmented Generation) systems.

RAGForge processes documents asynchronously, generates embeddings, stores vectors in Qdrant, and tracks ingestion progress through a queue-based architecture.

# Tech Stack 
- Express
- BullMQ
- Redis
- Qdrant
- Ollama
- Postgres

## Why?

Most RAG tutorials process documents directly inside API requests:

```text
Upload Document
    ↓
Parse
    ↓
Chunk
    ↓
Embed
    ↓
Store
```

This works for demos but breaks down in production:

* Large documents take too long
* Requests timeout
* Embedding generation is expensive
* Failures require restarting the entire process
* Users have no visibility into progress

RAGForge solves this using queues and background workers.

## Architecture

```text
                ┌─────────────┐
                │   Client    │
                └──────┬──────┘
                       │
                       ▼
              ┌─────────────────┐
              │ Upload Document │
              └────────┬────────┘
                       │
                       ▼
              ┌─────────────────┐
              │ Create Job      │
              └────────┬────────┘
                       │
                       ▼
              ┌─────────────────┐
              │ BullMQ Queue    │
              └────────┬────────┘
                       │
                       ▼
              ┌─────────────────┐
              │ Worker          │
              └────────┬────────┘
                       │
         ┌─────────────┼─────────────┐
         ▼             ▼             ▼
      Parse         Chunk         Embed
         │             │             │
         └─────────────┴─────────────┘
                       │
                       ▼
              ┌─────────────────┐
              │ Qdrant          │
              └─────────────────┘
```

## Features

* Queue-based ingestion
* Background workers
* Document parsing
* Multiple chunking strategies
* Embedding generation
* Qdrant integration
* Progress tracking
* Failure recovery
* Retry support
* Async processing

## Tech Stack

* TypeScript
* Node.js
* Express
* BullMQ
* Redis
* Qdrant
* Ollama
* Docker

## Ingestion Flow

```text
Document
    ↓
Parser
    ↓
Chunker
    ↓
Embedding Model
    ↓
Vector Database
```

## Project Structure

```text
src/
├── api/
│   └── upload.ts
│
├── queues/
│   └── ingestion.queue.ts
│
├── workers/
│   └── ingestion.worker.ts
│
├── parsers/
│   ├── pdf.ts
│   ├── markdown.ts
│   └── html.ts
│
├── chunkers/
│   ├── fixed.ts
│   ├── recursive.ts
│   └── semantic.ts
│
├── embeddings/
│   └── ollama.ts
│
├── vector-db/
│   └── qdrant.ts
│
├── services/
│   └── ingestion.service.ts
│
└── types/
```

## Learning Goals

This project explores:

### RAG Architecture

* Indexing pipelines
* Query pipelines
* Chunking strategies
* Embeddings
* Vector search

### Production Ingestion

* Queue-based processing
* Worker architecture
* Retry mechanisms
* Progress tracking
* Fault tolerance

### Retrieval Systems

* Vector databases
* Similarity search
* Metadata filtering
* Context retrieval

## Future Work

* Hybrid Search (BM25 + Vector Search)
* Reranking
* Multi-document collections
* Repository ingestion
* Incremental indexing
* Document versioning
* OCR support
* Distributed workers

## Example Use Cases

* Chat with PDFs
* Internal knowledge bases
* Documentation search
* Repository search
* AI assistants
* Enterprise search systems

## Key Lesson

A production RAG system is not just:

```text
LLM + Vector Database
```

It is:

```text
Document Processing
        +
Chunking
        +
Embeddings
        +
Queues
        +
Workers
        +
Storage
        +
Retrieval
        +
LLMs
```

The ingestion pipeline is the foundation that makes the entire system reliable and scalable.

