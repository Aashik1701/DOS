
/**
 * A chatbot component that provides information about distributed operating systems in mooring buoy environments.
 * It renders a chat window with a header containing the bot's name and a close button.
 * The chat window displays a list of messages, and has a form to submit new messages.
 * The chatbot responds to user input based on keywords in a predefined dataset.
 * The component also has a toggle button to show and hide the chat window.
 */

import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, X, MessageCircle } from 'lucide-react';
import chatData from './OceanBotData.json';
import './OceanBot.css';

const OceanBot = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [userName, setUserName] = useState('');
  const [isInitial, setIsInitial] = useState(true);
  const [isChatOpen, setIsChatOpen] = useState(false);
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
    const exactMatch = chatData.qa.find(item => 
      item.keywords.some(keyword => normalizedInput.includes(keyword.toLowerCase()))
    );
    return exactMatch ? exactMatch.response : chatData.defaultResponse;
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

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const renderChatButton = () => (
    <button className="chat-toggle-button-unique" onClick={toggleChat}>
      <MessageCircle size={24} />
    </button>
  );

  const renderChatWindow = () => (
    <div className="ocean-bot-container-unique">
      <div className="ocean-bot-header-unique">
        <div className="header-left-unique">
          <Bot size={24} />
          <h2>OceanBot</h2>
        </div>
        <button className="close-button-unique" onClick={toggleChat}>
          <X size={20} />
        </button>
      </div>
      
      {isInitial ? (
        <form onSubmit={handleUserNameSubmit} className="username-form-unique">
          <input
            type="text"
            placeholder="Enter your name to start..."
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="username-input-unique"
          />
          <button type="submit" className="submit-Oceanbutton-unique">
            Start Chat
          </button>
        </form>
      ) : (
        <>
          <div className="chat-messages-unique">
            {messages.map((message, index) => (
              <div key={index} className={`message-unique ${message.type}`}>
                {message.type === 'bot' ? <Bot size={20} /> : <User  size={20} />}
                <p>{message.content}</p>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          <form onSubmit={handleSendMessage} className="chat-input-form-unique">
            <input
              type="text"
              placeholder="Ask me about mooring buoy systems..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              className="chat-input-unique"
            />
            <button type="submit" className="chatsendbutton-unique">
              <Send size={20} />
            </button>
          </form>
        </>
      )}
    </div>
  );

  return (
    <div className="ocean-bot-wrapper-unique">
      {isChatOpen ? renderChatWindow() : renderChatButton()}
    </div>
  );
};

export default OceanBot;