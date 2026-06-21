import { client } from "./qdrant.js";
import { runEmbeddingModel } from "./utils/runEmbeddingModel.js";
import { runModel } from "./utils/runModel.js";

export async function searchQuery(query : string){
    
    const embedQuery : any= await runEmbeddingModel(query);
    console.log("ember query",embedQuery);
    
    const response = await client.search("rag",{
        vector : embedQuery.embeddings[0],
        limit : 5
    });

    let contents = "";

    response.map((r)=>{
        contents += r?.payload?.content;
    });

    const raw = await runModel(`${query} and content is : ${contents}`)

    console.log("Final Response : ",raw);
}
