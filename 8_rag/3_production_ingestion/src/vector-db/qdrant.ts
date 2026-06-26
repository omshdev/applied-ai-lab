import { QdrantClient } from "@qdrant/js-client-rest";

export const qdrantClient = new QdrantClient({url : 'http://127.0.0.1:6333',checkCompatibility : false});

export async function runQdrant(){
    const collection_name = 'production-ingestion';

    await qdrantClient.createCollection(collection_name,{
        vectors : {
            size : 768,
            distance : "Cosine"
        }
    });
    console.log(`Collection "${collection_name}" created.`);
}
