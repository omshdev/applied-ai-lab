// Assumes paragraphs are separated by blank lines.

type Chunk = {
    id : string;
    content : string;
};

export function paragraphChunker(text: string): Chunk[] {
  return text
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)
    .filter((paragraph) => paragraph.length > 100)
    .map((content, index) => ({
      id: `paragraph-${index}`,
      content,
    }));
}