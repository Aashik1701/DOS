import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User } from 'lucide-react';
import chatData from './OceanBotData.json';
import './OceanBot.css';

const OceanBot = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [userName, setUserName] = useState('');
  const [isInitial, setIsInitial] = useState(true);
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleUserNameSubmit = (e) => {
    e.preventDefault();
    if (userName.trim()) {
      setIsInitial(false);
      const welcomeMessage = {
        type: 'bot',
        content: `Welcome ${userName}! I'm OceanBot, your expert on Distributed Operating Systems in Mooring Buoy Environments. How can I help you today?`,
      };
      setMessages([welcomeMessage]);
    }
  };

  const findResponse = (userInput) => {
    const normalizedInput = userInput.toLowerCase();
    
    // First, check for exact matches
    const exactMatch = chatData.qa.find(item => 
      item.keywords.some(keyword => normalizedInput.includes(keyword.toLowerCase()))
    );
    
    if (exactMatch) return exactMatch.response;

    // If no exact match, check for partial matches
    const partialMatch = chatData.qa.find(item =>
      item.keywords.some(keyword => 
        normalizedInput.split(' ').some(word => word.includes(keyword.toLowerCase()))
      )
    );

    return partialMatch ? partialMatch.response : chatData.defaultResponse;
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (inputMessage.trim()) {
      const userMsg = { type: 'user', content: inputMessage };
      const botResponse = { type: 'bot', content: findResponse(inputMessage) };
      
      setMessages(prev => [...prev, userMsg, botResponse]);
      setInputMessage('');
    }
  };

  if (isInitial) {
    return (
      <div className="ocean-bot-container">
        <div className="ocean-bot-header">
          <Bot size={24} />
          <h2>OceanBot</h2>
        </div>
        <form onSubmit={handleUserNameSubmit} className="username-form">
          <input
            type="text"
            placeholder="Enter your name to start..."
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="username-input"
          />
          <button type="submit" className="submit-button">
            Start Chat
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="ocean-bot-container">
      <div className="ocean-bot-header">
        <Bot size={24} />
        <h2>OceanBot</h2>
      </div>
      
      <div className="chat-messages">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.type}`}>
            {message.type === 'bot' ? <Bot size={20} /> : <User size={20} />}
            <p>{message.content}</p>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      <form onSubmit={handleSendMessage} className="chat-input-form">
        <input
          type="text"
          placeholder="Ask me about mooring buoy systems..."
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          className="chat-input"
        />
        <button type="submit" className="send-button">
          <Send size={20} />
        </button>
      </form>
    </div>
  );
};

export default OceanBot;