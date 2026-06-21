import { ollama } from "./ollama.js";

export async function runEmbeddingModel(prompt:string){
    const response = await ollama.embeddings({
        model : "nomic-embed-text",
        prompt : prompt,
    });
    return response.embedding;
}