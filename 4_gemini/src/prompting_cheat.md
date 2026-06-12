

These are the notes I'd keep in a Notion page for quick revision before building projects.

---

# Prompt Engineering Cheat Sheet

## 1. Zero-Shot Prompting

### What?

Ask directly without examples.

### Example

```text
Translate to French:

Hello, how are you?
```

### Use Cases

- Translation
- Summarization
- Q&A
- Simple tasks

### Mental Model

```text
No examples.
Just ask.
```

---

## 2. Few-Shot Prompting

### What?

Give examples before the actual task.

### Example

```text
Text: I love this product.
Sentiment: Positive

Text: Worst experience ever.
Sentiment: Negative

Text: Delivery was fast.
Sentiment:
```

### Use Cases

- Classification
- Data extraction
- Formatting
- Labeling

### Mental Model

```text
Teach pattern → Ask question
```

---

## 3. Role Prompting / Personas

### What?

Assign a role to the model.

### Example

```text
You are a Distributed Systems Architect.

Explain Redis.
```

### Use Cases

- Interviewers
- Architects
- Security Experts
- Product Managers

### Mental Model

```text
Give identity → Change perspective
```

---

## 4. Chain of Thought (CoT)

### What?

Force step-by-step reasoning.

### Example

```text
Think step by step.

1. Analyze
2. Reason
3. Answer
```

### Use Cases

- Planning
- Logic
- Debugging
- Math

### Mental Model

```text
Reason first → Answer later
```

---

## 5. Self Consistency

### What?

Generate multiple answers and choose consensus.

### Example

```text
Run same prompt 5 times.

7
8
8
9
8

Final = 8
```

### Use Cases

- Evaluation
- Scoring
- High accuracy systems

### Mental Model

```text
Multiple brains → One decision
```

---

## 6. ReAct (Reason + Act)

### What?

Reason → Use Tool → Observe → Continue

### Example

```text
Thought:
Need docs.

Action:
SearchDocs()

Observation:
Got result.

Answer:
...
```

### Use Cases

- AI Agents
- Coding Agents
- Research Agents

### Mental Model

```text
Think → Act → Observe → Repeat
```

---

## 7. Negative Prompting

### What?

Tell model what NOT to do.

### Example

```text
Generate interview questions.

DO NOT:
- Ask frontend questions
- Ask HR questions
```

### Use Cases

- Restrict output
- Reduce hallucinations
- Enforce rules

### Mental Model

```text
Guardrails for AI
```

---

## 8. Structured Output

### What?

Force machine-readable responses.

### Example

```json
{
  "score": 8,
  "strengths": [],
  "weaknesses": []
}
```

### Use Cases

- APIs
- Agents
- Automation

### Mental Model

```text
Human text ❌

JSON ✅
```

---

## 9. Prompt Chaining

### What?

Output of one prompt becomes input to another.

### Example

```text
Resume
 ↓
Extract Skills
 ↓
Generate Questions
 ↓
Evaluate Answers
 ↓
Recommendation
```

### Use Cases

- Agents
- Workflows
- Complex systems

### Mental Model

```text
Break big task into small tasks
```

---

## 10. Common Prompt Mistakes

### Too Vague ❌

```text
Write code.
```

### Better ✅

```text
Write Express middleware for JWT verification.
```

---

### No Output Format ❌

```text
Extract user info.
```

### Better ✅

```text
Return JSON:

{
  "name":"",
  "email":""
}
```

---

### Too Many Tasks ❌

```text
Analyze
Summarize
Translate
Generate Quiz
```

### Better ✅

```text
Use Prompt Chaining
```

---

# Where Things Usually Go

### System Prompt

```text
Role Prompting
Few Shot Examples
Constraints
ReAct Instructions
Output Schema
Evaluation Rules
```

---

### User Prompt

```text
Resume
Question
Document
Candidate Answer
Article
Dynamic Input
```

---

# One-Line Revision

| Technique | One Line Memory |
|------------|------------|
| Zero-Shot | Ask directly |
| Few-Shot | Show examples first |
| Role Prompting | Give AI a role |
| CoT | Think step by step |
| Self Consistency | Multiple answers → consensus |
| ReAct | Think + Use Tools |
| Negative Prompting | Tell AI what not to do |
| Structured Output | Return JSON |
| Prompt Chaining | Split large task into smaller tasks |
| Prompt Mistakes | Be specific, structured, constrained |

If you can build your Interview Assistant assignment using **Few-Shot + Role Prompting + CoT + ReAct + Structured JSON + Prompt Chaining**, you've already covered about **80–90% of the prompting patterns used in real-world AI products and agents**.