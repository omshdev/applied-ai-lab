type HeadingChunk = {
    id : string;
    heading : string;
    content : string;
}

export function markdownHeadingChunker(markDown: string):HeadingChunk[]{
    const lines = markDown.split("\n");
    const chunks : HeadingChunk[] = [];
  
    let currentHeading:any = "Introduction";
    let currentContent: string[] = [];

    let index = 0;

    for (const line of lines) {
        const headingMatch = line.match(/^#+\s+(.*)$/);

        if (headingMatch) {
        if (currentContent.length > 0) {
            chunks.push({
            id: `heading-${index++}`,
            heading: currentHeading,
            content: currentContent.join("\n").trim(),
            });
        }

        currentHeading = headingMatch[1];
        currentContent = [];
        } else {
        currentContent.push(line);
        }
    }

    if (currentContent.length > 0) {
        chunks.push({
        id: `heading-${index++}`,
        heading: currentHeading,
        content: currentContent.join("\n").trim(),
        });
    }

  return chunks;
}