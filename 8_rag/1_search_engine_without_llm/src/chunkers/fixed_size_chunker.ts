// Chunk A : fixed size of chunks
// Chunk B : Paragraph chunking.
// Chunk C : Heading Based Chunking.

// Chunk A
type Chunk = {
    id : string;
    content : string;
}

export function fixedSizeChunker(text:string,chunkSize:500,overlap:100):Chunk[]{
    const chunks : Chunk[] = [];
    let start = 0;
    let index = 0;

    while (start<text.length){
        const end = Math.min(start+chunkSize,text.length);

        chunks.push({
            id : `chunk-${index++}`,
            content : text.slice(start,end),
        });

        start+=chunkSize-overlap;
    }
    return chunks;
}