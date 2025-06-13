import React, { useState, useRef, useEffect } from 'react';
import './ChatBot.css';
import botIcon from '../assets/robo.png';
import userIcon from '../assets/user.png';
import chatIcon from '../assets/logo.png'; // Floating chat trigger icon

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [showBot, setShowBot] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [speakEnabled, setSpeakEnabled] = useState(true);
  const recognitionRef = useRef(null);
  const chatBodyRef = useRef(null);

  const toggleBot = () => setShowBot(prev => !prev);

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { sender: 'user', text: input }];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('http://localhost:4000/ask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({ messageText: input }),
      });

      if (!res.ok) {
        console.error(`Fetch failed: ${res.status}`);
        throw new Error('Network response was not ok');
      }

      const data = await res.json();
      console.log('Backend reply:', data);

      const botReply = data?.answer || 'Unknown error occurred.';
      setMessages([...newMessages, { sender: 'bot', text: botReply }]);
      setIsLoading(false);

      if (speakEnabled) {
        const utterance = new SpeechSynthesisUtterance(botReply);
        utterance.lang = /[ఁ-౿]/.test(botReply) ? 'hi-IN' : 'hi-In';
        speechSynthesis.speak(utterance);
      }
    } catch (err) {
      console.error('Error from backend:', err);
      setMessages([...newMessages, { sender: 'bot', text: 'Server error. Please try again later.' }]);
      setIsLoading(false);
    }
  };

  const startListening = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert('Speech recognition not supported');
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = 'hi-IN';
    recognition.interimResults = true;
    recognition.continuous = false;
    recognitionRef.current = recognition;

    setIsListening(true);

    recognition.onresult = (e) => {
      const transcript = Array.from(e.results).map(r => r[0].transcript).join('');
      setInput(transcript);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <>
      <img
        src={chatIcon}
        alt="Chat Icon"
        className="floating-chat-icon"
        onClick={toggleBot}
      />
      {showBot && (
        <div className="chatbot-container">
          <div className="chat-header">
            <img src={chatIcon} alt="Logo" className="bot-logo" />
            Ari-Bot
          </div>
          <div className="chat-body" ref={chatBodyRef}>
            {messages.map((msg, i) => (
              <div className={`msg ${msg.sender}`} key={i}>
                <img
                  src={msg.sender === 'user' ? userIcon : botIcon}
                  alt={msg.sender}
                />
                <span>{msg.text}</span>
              </div>
            ))}
            {isLoading && (
              <div className="loading">
                <span>... Analysing</span>
              </div>
            )}
          </div>
          <div className="chat-footer">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={isListening ? 'Listening...' : 'Type or speak...'}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            />
            <img
              src="https://png.pngtree.com/png-clipart/20190520/original/pngtree-vector-microphone-icon-png-image_4013734.jpg"
              alt="Mic"
              className={`mic-icon ${isListening ? 'active' : ''}`}
              onClick={startListening}
            />
            <button onClick={handleSend}>Send</button>
          </div>
          <div className="speak-toggle">
            <input
              type="checkbox"
              checked={speakEnabled}
              onChange={() => setSpeakEnabled(prev => !prev)}
              id="speak"
            />
            <label htmlFor="speak">Read messages aloud</label>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;