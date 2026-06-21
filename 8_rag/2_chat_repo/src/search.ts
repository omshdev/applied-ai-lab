import { client } from "./qdrant.js";
import { runEmbeddingModel } from "./utils/runEmbeddingModel.js";
import { runModel } from "./utils/runModel.js";

export async function searchQuery(query : string){

    const embedQuery : any= await runEmbeddingModel(query);
    console.log("ember query",embedQuery);
    
    const response = await client.search("repo-chat",{
        vector : embedQuery.embeddings[0],
        limit : 5
    });

    let contents = "";

    response.map((r)=>{
        contents += r?.payload?.content;
    });

    const raw = await runModel(`${query} and content is : ${contents}`)

    console.log("Final Response : ",raw);
    // console.log("Top Results:");

    // response.forEach((r, i) => {
    //     console.log(`
    //     Result ${i + 1}
    //     Score: ${r.score}
    //     Content:
    //     ${r.payload?.content}
    //     `);
    // });

    

}
