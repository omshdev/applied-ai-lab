import { useState } from 'react'

function App() {
    const [prompt,setPrompt] = useState("");
    const [answer,setAnswer]  = useState("");

    async function handleChat(){
      const response = await fetch(`http://localhost:3000/api/v1/ai/chat`,{
        method : "POST",
         headers: {
      "Content-Type": "application/json",
    },
        body : JSON.stringify({ prompt})
      });
      console.log(response);
      // response.body?.getReader()
      
      const reader = response.body?.getReader();
      if(!reader) return;

      const decoder = new TextDecoder();

      let fullText = "";

      while(true){
        const { done ,value} = await reader.read();

        if(done) break;

        const chunk = decoder.decode(value);

        const lines = chunk.split("\n");
        for (const line of lines){
          if(!line.startsWith("data:")) continue;

          const data = line.replace("data:","").trim();

          if(data == "[DONE]"){
            break;
          }
          try{
            const parsed = JSON.parse(data);
              fullText+=parsed.content;
              setAnswer(fullText);
          }catch(error){

          }
        }
        

        
      }
    
    
    
    
    }

  return (
    <>
    <h1>Om Sharma's OmGPT</h1>
    <h1>Enter Prompt</h1>
    <br />
    <input type="text" placeholder='Enter Prompt' onChange={(e)=>{setPrompt(e.target.value)}} />
    <br />
    <button onClick={handleChat}>Send</button>
    {answer ?<pre>{answer}</pre> : ""}
    </>
  )
}

export default App
