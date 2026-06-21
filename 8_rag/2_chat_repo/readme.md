Built my own RepoChat today from scratch.

Features:
• Fixed-size, paragraph & markdown chunking
• Local embeddings with nomic-embed-text
• Vector search using Qdrant
• Semantic codebase/document retrieval
• Natural language querying of indexed content
• Local LLM responses with gpt-oss:120b

A question like:
"Who is William Bronk?"
gets embedded → searched against vectors → relevant chunks retrieved → passed to the LLM for grounded answers.

The best part wasn't the final result.

It was debugging every mistake:

* wrong embedding inputs
* vector dimensions mismatch
* Qdrant point structure errors
* payload design
* retrieval pipeline bugs

Today I understood how RAG systems actually work under the hood instead of just importing a framework.

Next: citations, hybrid search, reranking, conversation memory, and full codebase indexing.
