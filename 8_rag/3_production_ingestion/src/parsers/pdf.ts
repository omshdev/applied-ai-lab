import { PDFParse } from "pdf-parse";

export async function parsePdf( path:string ){
    const parser = new PDFParse({ url : path });
    const result = await parser.getText();
    return result.text;
}
