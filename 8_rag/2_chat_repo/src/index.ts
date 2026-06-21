import fs from "fs";
import path from "path";
import { codeChunker } from "./chunkers/code-chunker.js";
import {runEmbeddingModel} from "./utils/runEmbeddingModel.js"
import {client,runQdrant} from "./qdrant.js"
import { searchQuery } from "./search.js";
import { input, password } from '@inquirer/prompts';



export function getAllFiles(dir: string): string[] {
  let files: string[] = [];
  for (const file of fs.readdirSync(dir)) {
    const fullPath = path.join(dir, file);

    if (fs.statSync(fullPath).isDirectory()) {
      files.push(...getAllFiles(fullPath));
    } else {
      files.push(fullPath);
    }
  }

  return files;
}


const IGNORED = [
  "node_modules",
  ".git",
  "dist",
  ".next",
  "build"
];

// const sc = "/media/omsharmadev/Data/genai/8_rag/1_search_engine_without_llm/src" testing better for know how to optimize context window.
const xyz = "/media/omsharmadev/Data/genai/8_rag/2_chat_repo/src"

const d = getAllFiles(xyz)
// console.log(d[0]);

// let finalArray : any[] = [];
// for(let i = 0; i < d.length; i++){
//     // const data = fs.readFileSync(d[i],)
//     console.log(d[i]);
//     // @ts-ignore
//     const data:any = fs.readFileSync(d[i],'utf-8');
//     // @ts-ignore
//     const chunks = codeChunker(d[i],data);
//     let xdata = {data,chunks}
//     finalArray.push(xdata);

// }

// const dd = fs.readFileSync("/media/omsharmadev/Data/genai/8_rag/1_search_engine_without_llm/src/index.ts",'utf-8');
// console.log(dd);

// const chunks = codeChunker("/media/omsharmadev/Data/genai/8_rag/1_search_engine_without_llm/src/index.ts",dd);

// console.log("Chunks : ",chunks);

// console.log(finalArray)


    async function main(){
        let finalArray:[] | any = [];

        for(let i = 0; i < d.length; i++){
        // const data = fs.readFileSync(d[i],)
        // console.log(d[i]);
        // @ts-ignore
        const data:any = fs.readFileSync(d[i],'utf-8');
        // @ts-ignore
        const chunks = codeChunker(d[i],data);
        let xdata = {data,chunks,filePath : d[i]}
        finalArray.push(xdata);

    }
        console.log("dedw",finalArray);
    

    const points:any = await Promise.all(
        finalArray.map(async(chunk:any,index:number)=>{
            
            const embedding = await runEmbeddingModel(chunk.data);
             console.log("finalllldwedlweldlwe",embedding.embeddings[0])
            console.log(
  chunk.filePath,
  chunk.data.length
);
            return {
                id : index,
                vector : embedding.embeddings[0],
                payload : {
                    chunkId : chunk.id,
                    content : chunk.data
                }
            }
        })
    )
    
    // console.log("dewd",points[0]);
    
    const insertToCollection = await client.upsert("repo-chat",{
        wait : true,
        points : points
    });
    
}   
// runQdrant();
// main()

async function runSearch(){
    while(true){
        const inputx = await input({ message : "Enter Query about Your Codebase"});
        searchQuery(inputx);
    }
    
    
}

runSearch()



// for better context-window.
export function splitLargeChunk(
  content: string,
  maxSize = 1500
){
  const chunks = [];

  for(
    let i = 0;
    i < content.length;
    i += maxSize
  ){
    chunks.push(
      content.slice(i, i + maxSize)
    );
  }

  return chunks;
}