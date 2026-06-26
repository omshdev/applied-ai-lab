type Chunk = {
  id: string;
  heading: string;
  content: string;
};

export function semanticMarkdownChunker(
  markdown: string
): Chunk[] {
  const chunks: Chunk[] = [];

  const lines = markdown.split("\n");

  let currentHeading : string | any = "Introduction";
  let currentContent: string[] = [];

  for (const line of lines) {
    const match = line.match(
      /^(#{1,6})\s+(.*)$/
    );

    if (match) {
      if (currentContent.length > 0) {
        chunks.push({
          id: `chunk-${chunks.length}`,
          heading: currentHeading,
          content: currentContent.join("\n").trim(),
        });
      }

      currentHeading = match[2];
      currentContent = [];
    } else {
      currentContent.push(line);
    }
  }

  if (currentContent.length > 0) {
    chunks.push({
      id: `chunk-${chunks.length}`,
      heading: currentHeading,
      content: currentContent.join("\n").trim(),
    });
  }

  return chunks;
}