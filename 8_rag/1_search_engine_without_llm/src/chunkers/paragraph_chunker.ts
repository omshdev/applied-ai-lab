// Assumes paragraphs are separated by blank lines.

type Chunk = {
    id : string;
    content : string;
};

export function paragraphChunker(text:string):Chunk[]{
    const chunk:Chunk[] = text
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)
    .map((content, index) => ({
      id: `paragraph-${index}`,
      content,
    }));
    console.log(chunk);
    
    return chunk;
}