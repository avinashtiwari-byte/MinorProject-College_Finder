import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageCircle,
  X,
  Send,
  Minimize2,
  Maximize2,
  Bot,
  User,
  Sparkles,
  BookOpen,
  TrendingUp,
  HelpCircle
} from 'lucide-react';

const ChatAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Quick prompts for users
  const quickPrompts = [
    { text: 'Find engineering colleges in Bangalore', icon: BookOpen },
    { text: 'What are the top IITs?', icon: TrendingUp },
    { text: 'Compare private vs government colleges', icon: HelpCircle },
    { text: 'Help me choose a course', icon: Sparkles },
  ];

  // Predefined responses
  const getBotResponse = (userMessage) => {
    const message = userMessage.toLowerCase();

    if (message.includes('engineering') && message.includes('bangalore')) {
      return "Bangalore has excellent engineering colleges! Some top options include IISc, RV College of Engineering, BMS College of Engineering, and PES University. Would you like detailed information about any of these?";
    }

    if (message.includes('iit')) {
      return "The top IITs in India are:\n1. IIT Bombay (Rank 1)\n2. IIT Delhi (Rank 2)\n3. IIT Madras (Rank 3)\n4. IIT Kanpur (Rank 4)\n5. IIT Kharagpur (Rank 5)\n\nEach IIT excels in different engineering streams. Which branch interests you?";
    }

    if (message.includes('private') && message.includes('government')) {
      return "Here's a quick comparison:\n\nGovernment Colleges:\n✓ Lower fees\n✓ Better placements\n✓ Established reputation\n✗ Limited seats\n\nPrivate Colleges:\n✓ More seats available\n✓ Modern infrastructure\n✗ Higher fees\n✗ Varying placement quality\n\nBoth have their merits - it depends on your budget and career goals!";
    }

    if (message.includes('course') || message.includes('choose')) {
      return "I'd be happy to help you choose a course! To give you the best advice, could you tell me:\n• What subjects do you enjoy?\n• What are your career goals?\n• What's your budget?\n\nBased on this, I can suggest suitable courses and colleges!";
    }

    return "I'm here to help you find the perfect college! You can ask me about:\n• College recommendations\n• Course comparisons\n• Admission processes\n• Fee structures\n• Placement statistics\n\nWhat would you like to know?";
  };

  // Auto scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && !isMinimized) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
    }
  }, [isOpen, isMinimized]);

  const handleSendMessage = () => {
    if (inputMessage.trim() === '') return;

    const userMessage = {
      id: Date.now(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const botMessage = {
        id: Date.now() + 1,
        text: getBotResponse(inputMessage),
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleQuickPrompt = (prompt) => {
    setInputMessage(prompt.text);
    if (!isOpen) {
      setIsOpen(true);
    }
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="fixed bottom-6 right-6 z-50"
        >
          <button
            onClick={() => setIsOpen(true)}
            className="relative w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-glow-lg hover:shadow-xl transition-all duration-300 group"
          >
            <MessageCircle className="w-6 h-6 text-white" />

            {/* Pulse Animation */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 animate-ping opacity-25" />

            {/* Badge */}
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white" />

            {/* Tooltip */}
            <div className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
              Need help? Chat with us!
              <div className="absolute top-full right-2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900" />
            </div>
          </button>
        </motion.div>
      )}

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3 }}
            className={`fixed bottom-6 right-6 z-50 ${
              isMinimized ? 'w-80' : 'w-96 h-[600px]'
            }`}
          >
            <div className="glass rounded-2xl shadow-glow-lg border border-white/20 overflow-hidden flex flex-col h-full">
              {/* Header */}
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-4 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Bot className="w-6 h-6 text-white" />
                  </motion.div>
                  <div>
                    <h3 className="text-white font-semibold">College Assistant</h3>
                    <p className="text-white/80 text-xs">Always here to help</p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setIsMinimized(!isMinimized)}
                    className="p-1 rounded-lg hover:bg-white/20 transition-colors"
                  >
                    {isMinimized ? (
                      <Maximize2 className="w-4 h-4 text-white" />
                    ) : (
                      <Minimize2 className="w-4 h-4 text-white" />
                    )}
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-1 rounded-lg hover:bg-white/20 transition-colors"
                  >
                    <X className="w-4 h-4 text-white" />
                  </button>
                </div>
              </div>

              {!isMinimized && (
                <>
                  {/* Messages Area */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-black/20">
                    {/* Welcome Message */}
                    {messages.length === 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center py-8"
                      >
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Bot className="w-6 h-6 text-white" />
                        </div>
                        <h4 className="text-white font-semibold mb-2">Welcome to CollegeFinder! 👋</h4>
                        <p className="text-gray-300 text-sm mb-4">
                          I'm here to help you find your perfect college. Ask me anything!
                        </p>

                        {/* Quick Prompts */}
                        <div className="space-y-2">
                          <p className="text-gray-400 text-xs">Quick Questions:</p>
                          {quickPrompts.map((prompt, index) => {
                            const Icon = prompt.icon;
                            return (
                              <motion.button
                                key={prompt.text}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                onClick={() => handleQuickPrompt(prompt)}
                                className="w-full text-left p-3 rounded-lg glass hover:bg-white/20 transition-all duration-300 flex items-center space-x-3 group"
                              >
                                <Icon className="w-4 h-4 text-purple-400 group-hover:text-white" />
                                <span className="text-gray-300 group-hover:text-white text-sm">
                                  {prompt.text}
                                </span>
                              </motion.button>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}

                    {/* Chat Messages */}
                    {messages.map((message) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex items-start space-x-2 ${
                          message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                        }`}
                      >
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                          message.sender === 'user'
                            ? 'bg-gradient-to-br from-purple-500 to-pink-500'
                            : 'bg-gradient-to-br from-green-500 to-emerald-500'
                        }`}>
                          {message.sender === 'user' ? (
                            <User className="w-4 h-4 text-white" />
                          ) : (
                            <Bot className="w-4 h-4 text-white" />
                          )}
                        </div>

                        <div className={`max-w-[70%] ${
                          message.sender === 'user' ? 'text-right' : ''
                        }`}>
                          <div className={`inline-block p-3 rounded-2xl ${
                            message.sender === 'user'
                              ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                              : 'glass text-white'
                          }`}>
                            <p className="text-sm whitespace-pre-line">{message.text}</p>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">
                            {formatTime(message.timestamp)}
                          </p>
                        </div>
                      </motion.div>
                    ))}

                    {/* Typing Indicator */}
                    {isTyping && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-start space-x-2"
                      >
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                          <Bot className="w-4 h-4 text-white" />
                        </div>
                        <div className="glass p-3 rounded-2xl">
                          <div className="flex space-x-1">
                            {[...Array(3)].map((_, i) => (
                              <motion.div
                                key={i}
                                className="w-2 h-2 bg-white rounded-full"
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{
                                  duration: 0.8,
                                  repeat: Infinity,
                                  delay: i * 0.2,
                                }}
                              />
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}

                    <div ref={messagesEndRef} />
                  </div>

                  {/* Input Area */}
                  <div className="p-4 border-t border-white/10 bg-black/30">
                    <div className="flex items-center space-x-2">
                      <input
                        ref={inputRef}
                        type="text"
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Type your message..."
                        className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 outline-none focus:border-purple-400 transition-colors"
                      />
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleSendMessage}
                        disabled={inputMessage.trim() === ''}
                        className={`p-3 rounded-xl transition-all duration-300 ${
                          inputMessage.trim() === ''
                            ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                            : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg'
                        }`}
                      >
                        <Send className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatAssistant;