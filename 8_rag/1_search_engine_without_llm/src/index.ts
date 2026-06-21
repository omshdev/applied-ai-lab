import {fixedSizeChunker} from "./chunkers/fixed_size_chunker.js" 
import { markdownHeadingChunker } from "./chunkers/markdownHeadingChunker.js";
import {paragraphChunker} from "./chunkers/paragraph_chunker.js"
import { client,runQdrant } from "./qdrant.js";
import { fifteen100 } from "./text/1500.js"
import { markDown } from "./text/markDown.js";
import { embeddingOllama } from "./utils/ollama.js";
import { runEmbeddingModel } from "./utils/runEmbeddingModel.js";
import { runModel } from "./utils/runModel.js";

// const response = fixedSizeChunker(fifteen100,500,100);
// const response = paragraphChunker(fifteen100);
// const response = markdownHeadingChunker(markDown);
// console.log(response);

async function main(){
    // first chunk the content using  diffrent chunkers and put them into diffrent collections.
    // 1 . fixed size chunker.
    const response:any = fixedSizeChunker(fifteen100,500,100);

    const points = await Promise.all(
        response.map(async(chunk:any,index:number)=>{
            const embedding = await runEmbeddingModel(chunk.content);
             console.log("finalllldwedlweldlwe",embedding.embeddings[0])
            return {
                id : index,
                vector : embedding.embeddings[0],
                payload : {
                    chunkId : chunk.id,
                    content : chunk.content
                }
            }
        })
    )
    
    // console.log("dewd",points[0]);
    
    const insertToCollection = await client.upsert("rag",{
        wait : true,
        points : points
    });
    
}   
// runQdrant();
// main()
