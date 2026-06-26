import { parse } from "node-html-parser";

export function htmlParser(html:string | any){
    const root = parse(html);
    return root;
}
