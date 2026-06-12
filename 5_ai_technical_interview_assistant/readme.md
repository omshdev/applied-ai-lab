Since you're a full-stack engineer interested in AI agents, don't build a toy "write a poem" app.

Build something that resembles a real SaaS feature.

# Assignment: AI Technical Interview Assistant

Build an API that helps companies evaluate backend candidates.

The system should use **every prompting technique** you learned.

---

# Final User Flow

User uploads:

```json
{
  "resume": "...",
  "jobDescription": "...",
  "candidateAnswer": "..."
}
```

The AI should:

1. Analyze resume
2. Extract structured data
3. Generate interview questions
4. Evaluate answers
5. Produce hiring recommendation

---

# Architecture

```text
Resume
   │
   ▼
Prompt 1
Extract Candidate Info
   │
   ▼
JSON Output
   │
   ▼
Prompt 2
Generate Questions
   │
   ▼
Questions
   │
   ▼
Prompt 3
Evaluate Answers
   │
   ▼
Score
   │
   ▼
Prompt 4
Final Recommendation
```

This forces Prompt Chaining.

---

# Part 1 — Zero Shot Prompting

Create endpoint:

```http
POST /summary
```

Prompt:

```text
Summarize this resume in 5 bullet points.
```

No examples.

No role.

No special instructions.

Just plain prompting.

Goal:

Understand baseline behavior.

---

# Part 2 — Few Shot Prompting

Create endpoint:

```http
POST /extract
```

Input:

```text
John Doe

5 years React

Node.js

AWS
```

Prompt:

```text
Example:

Input:
Alice
3 years React

Output:
{
  "name":"Alice",
  "experience":3,
  "skills":["React"]
}

Input:
Bob
7 years Go

Output:
{
  "name":"Bob",
  "experience":7,
  "skills":["Go"]
}

Now extract:
...
```

Goal:

Learn how examples improve consistency.

---

# Part 3 — Role Prompting

Create endpoint:

```http
POST /interview-questions
```

Prompt:

```text
You are a Staff Backend Engineer at Amazon.

Generate 10 interview questions for this candidate.
```

Try changing persona:

```text
You are a Startup CTO
```

vs

```text
You are a FAANG interviewer
```

Observe differences.

---

# Part 4 — Chain of Thought

Create endpoint:

```http
POST /evaluate
```

Prompt:

```text
Evaluate this answer.

Think step by step.

1. Check correctness
2. Check depth
3. Check practical knowledge
4. Assign score
```

Candidate answer:

```text
What is Redis?
```

Goal:

See better evaluation quality.

---

# Part 5 — Self Consistency

Don't trust one evaluation.

Run same evaluation:

```ts
Promise.all([
  evaluate(),
  evaluate(),
  evaluate(),
  evaluate(),
  evaluate()
]);
```

Example:

```text
Score 7
Score 8
Score 8
Score 9
Score 8
```

Final:

```text
Average = 8
```

or

```text
Majority vote = 8
```

Goal:

Understand how agents reduce randomness.

---

# Part 6 — ReAct

Now introduce tools.

Tools:

```ts
searchGithub()
searchStackOverflow()
searchDocs()
```

Prompt:

```text
You may use tools.

Available tools:

1. SearchGithub
2. SearchDocs
```

Question:

```text
What is BullMQ FlowProducer?
```

Expected behavior:

```text
Thought:
Need documentation

Action:
SearchDocs("BullMQ FlowProducer")

Observation:
...

Thought:
Now I understand

Answer:
...
```

This is the core idea behind AI agents.

---

# Part 7 — Negative Prompting

Add constraints.

Prompt:

```text
Generate interview questions.

DO NOT:
- Ask frontend questions
- Ask HR questions
- Ask database questions

ONLY ask Node.js questions
```

Compare results with and without constraints.

---

# Part 8 — Structured Output

Force JSON.

Prompt:

```text
Return ONLY valid JSON.

Schema:

{
  "score": number,
  "strengths": string[],
  "weaknesses": string[],
  "recommendation": string
}
```

Parse:

```ts
JSON.parse(response)
```

No regex.

No string manipulation.

---

# Part 9 — Prompt Chaining

Now combine everything.

### Prompt 1

Extract candidate profile.

Output:

```json
{
  "experience": 4,
  "skills": ["Node","Redis"]
}
```

---

### Prompt 2

Generate interview questions using extracted profile.

Output:

```json
{
  "questions":[...]
}
```

---

### Prompt 3

Evaluate answers.

Output:

```json
{
  "score": 8
}
```

---

### Prompt 4

Generate hiring recommendation.

Output:

```json
{
  "hire": true
}
```

Each prompt consumes previous output.

---

# Part 10 — Common Prompt Failures Lab

Create a folder:

```text
experiments/
```

Test:

## Experiment 1

Vague prompt

```text
Analyze candidate.
```

Observe bad output.

---

## Experiment 2

Specific prompt

```text
Analyze Node.js experience,
Redis knowledge,
System Design ability.
```

Observe improvement.

---

## Experiment 3

No JSON

Observe inconsistent responses.

---

## Experiment 4

JSON schema

Observe consistency.

---

# Bonus Challenge (Closest to Real AI Agents)

Build:

```http
POST /agent/interview
```

Workflow:

```text
Role Prompt
     │
     ▼
Resume Extraction
(Few Shot)
     │
     ▼
Question Generation
(Role Prompt)
     │
     ▼
Answer Evaluation
(CoT)
     │
     ▼
Self Consistency
(5 Evaluations)
     │
     ▼
JSON Output
     │
     ▼
Final Recommendation
```

If you complete this properly with OpenAI, Gemini, or Mistral APIs, you'll have implemented the core prompting patterns used in many real-world AI products: recruiter copilots, customer support systems, document analyzers, coding assistants, and agent workflows. This is much closer to production AI engineering than most tutorial projects.
