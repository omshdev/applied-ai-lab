import { embeddingOllama } from "./ollama.js"

export async function runEmbeddingModel(prompt:string){
    console.log("Embedding Model ",prompt );
    const embeddings = await embeddingOllama.embed({
        model : "nomic-embed-text",
        input : prompt
    });    
    // console.log(embeddings)
    return embeddings;
}