import React, { useState, useEffect } from 'react';
import OpenAI from 'openai';

const API_KEY = process.env.REACT_APP_KEY
const ORG = process.env.REACT_APP_ORG
const Chatbot = () => {
  const openai = new OpenAI({
    organization: ORG,
    apiKey: API_KEY,
    dangerouslyAllowBrowser: true,
  });

  const [userPrompt, setUserPrompt] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [apiResponse, setApiResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [conversation, setConversation] = useState([]);
  const [showWelcome, setShowWelcome] = useState(true);

  const addMessageToConversation = (role, content) => {
    setConversation((prevConversation) => [
      ...prevConversation,
      { role, content },
    ]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setShowWelcome(false);

    try {
      const result = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'You are a helpful assistant' },
          { role: 'user', content: userPrompt },
          ...conversation,
        ],
        temperature: 0.5,
        max_tokens: 2200,
      });
      setApiResponse(result.choices[0].message.content);

      // Add the user's message to the conversation
      addMessageToConversation('user', userPrompt);

      // Add the assistant's response to the conversation
      addMessageToConversation('assistant', result.choices[0].message.content);

    } catch (error) {
      console.log(error);
    }
    setLoading(false);
    setUserPrompt('');
  };

  useEffect(() => {
    // Reset the welcome message when a new user prompt is entered
    setShowWelcome(true);
  }, [userPrompt]);

  return (
    <>
      <div className="ai-container">
        <div id="header">
          <h1>Chatbot</h1>
        </div>
        <div id="chatbot">
        <div id="conversation">
  {showWelcome && (
    <div className="chatbot-message">
      <p className="chatbot-text assistant">Assistant: Welcome! Please enter a question or request.</p>
    </div>
  )}
  {conversation.map((message, index) => (
    <div key={index} className={`chatbot-message ${message.role}`}>
      <p className={`chatbot-text ${message.role}`}>
        {message.role === 'user' ? 'User: ' : 'Assistant: '}{message.content}
      </p>
    </div>
  ))}
</div>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={userPrompt}
              placeholder="Please ask OpenAI"
              onChange={(e) => setUserPrompt(e.target.value)}
            />
            <button disabled={loading || userPrompt.length === 0} type="submit">
              {loading ? 'Generating...' : 'Generate'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Chatbot;