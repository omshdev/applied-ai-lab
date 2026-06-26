import { MarkdownParser } from "markdown-parser"

const parser = new MarkdownParser();

export async function markDownParser(markDownContent:any){
    const nodes = parser.parse(markDownContent);
    console.log(nodes);
    return nodes;
}