import { Worker } from 'bullmq';
import IORedis from "ioredis"
import { parsePdf } from '../parsers/pdf.js';
import { recursiveChunker } from '../chunkers/recursive.js';
import { runEmbeddingModel } from '../utils/runEmbeddingModel.js';
import { qdrantClient, runQdrant } from '../vector-db/qdrant.js';

// @ts-ignore
const connection = new IORedis({ maxRetriesPerRequest: null });

const path = `/media/omsharmadev/Data/genai/8_rag/3_production_ingestion/src/uploads/`;

const worker = new Worker(
  'production-ingestion',
  async job => {
    await runQdrant();
    const chunks = await parseAndChunk(`${path}${job.data.fileName}`);
    
    // convert chunks to embeddings
    const points = await Promise.all(
      chunks.map(async(chunk:any,index : number | string)=>{
        console.log("Each Piece",chunk.content);
      const embedding = await runEmbeddingModel(chunk.content); 
      return {
        id : index,
        vector : embedding.embeddings[0]!,
        payload : {
          chunkId : chunk.id,
          content : chunk.content
        }
      };

    }));

    console.log("points : ",points);
    // put embeddings to qdrant db.
    const insertToCollection = await qdrantClient.upsert("production-ingestion",{wait : true,points : points});
  },
  
  { connection }
);

worker.on("completed",job=>{
  console.log(`${job.id} has complted!`);
});

worker.on("failed",(job,err)=>{
  console.log(`${job?.id} has failed with error message ${err}`);
})


// parse , chunk

async function parseAndChunk(path : string){
  console.log(path);
  console.log()
  const text : any = await parsePdf(path);
  console.log(text)
  const chunks = recursiveChunker(text);
  return chunks;
} 