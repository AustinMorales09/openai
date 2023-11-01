import {useState} from 'react';
import OpenAI from "openai";



const Chatbot = () =>{
  const openai = new OpenAI({
      organization: "org-Ab7i9S7PkFRFmtmSmGeQIiff",
      apiKey: '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',
      dangerouslyAllowBrowser: true
  });
;
  const [prompt, setPrompt] = useState('');
  const [apiResponse, setApiResponse] = useState('');
  const [loading, setLoading] = useState(false);


  const handleSubmit = async (e) =>{
    e.preventDefault(); 
    setLoading(true);

    try{
      const result = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{role:'system', content:'You are a helpful assistant'}],
 
        temperature: 0.5,
        max_tokens: 2200
      });
      setApiResponse(result.choices[0])
    } catch(error) {
      console.log(error)
    }
    setLoading(false);
  };

  return (
    <>
      <div style={{
        display:'flex',
        justifyContent:'center',
        alignItems: 'center',
        height: '100vh',
      }}>
        <form onSubmit={handleSubmit}>
          <textarea type='text' value={prompt} placeholder='Please ask openai' onChange={(e) =>setPrompt(e.target.value)}></textarea>
          <button disabled={loading || prompt.length === 0} type='submit'>
            {loading ? "Generating...": "Generate"}
          </button>
        </form>
      </div>
      {apiResponse && (
        <div style={{ display: 'flex', justifyContent: 'center'}}>
          <pre>
            <strong>API response:</strong>
            {apiResponse}
          </pre>
        </div>
      )}
    </>
  )
}

export default Chatbot


