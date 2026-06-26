type Chunk = {
  id: string;
  content: string;
};

export function recursiveChunker(
  text: string,
  maxChunkSize = 500
): Chunk[] {
  const chunks: Chunk[] = [];

  function split(content: string) {
    content = content.trim();

    if (!content) return;

    if (content.length <= maxChunkSize) {
      chunks.push({
        id: `chunk-${chunks.length}`,
        content,
      });
      return;
    }

    // Level 1: Paragraphs
    const paragraphs = content.split(/\n\s*\n/);

    if (paragraphs.length > 1) {
      paragraphs.forEach(split);
      return;
    }

    // Level 2: Sentences
    const sentences = content.split(/(?<=[.!?])\s+/);

    if (sentences.length > 1) {
      let current = "";

      for (const sentence of sentences) {
        if (
          current.length + sentence.length >
          maxChunkSize
        ) {
          split(current);
          current = sentence;
        } else {
          current += " " + sentence;
        }
      }

      if (current.trim()) {
        split(current);
      }

      return;
    }

    // Level 3: Hard Split
    for (
      let i = 0;
      i < content.length;
      i += maxChunkSize
    ) {
      chunks.push({
        id: `chunk-${chunks.length}`,
        content: content.slice(
          i,
          i + maxChunkSize
        ),
      });
    }
  }

  split(text);

  return chunks;
}