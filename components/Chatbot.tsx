'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send } from 'lucide-react';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ text: string; isBot: boolean }[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const quickReplies = [
    'Find my bar 🎯',
    'Track order 📦',
    'Best for weight loss?',
    'Bulk deals?'
  ];

  const botResponses: Record<string, string> = {
    'find my bar': 'Check out our Bestsellers section! Choco Blast is our #1 seller with 22g protein.',
    'track order': 'You can track your order by entering your order number in the tracking page.',
    'best for weight loss': 'Berry Burn is perfect for weight loss! Low carb, high fiber, and only 190 calories.',
    'bulk deals': 'Build Your Box with any 6 bars and save 20%! Or get our 12-pack for 18% off.',
    default: 'Thanks for reaching out! Check out our products or contact support at hello@fuelbar.com'
  };

  const handleSend = () => {
    if (!input.trim()) return;

    setMessages([...messages, { text: input, isBot: false }]);
    const userInput = input.toLowerCase();
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const response = Object.keys(botResponses).find(key =>
        userInput.includes(key)
      );
      const botMessage = response ? botResponses[response] : botResponses.default;
      setMessages(prev => [...prev, { text: botMessage, isBot: true }]);
      setIsTyping(false);
    }, 1500);
  };

  const handleQuickReply = (reply: string) => {
    setInput(reply);
    handleSend();
  };

  return (
    <>
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 bg-purple text-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg hover:bg-pink transition-colors"
        animate={{
          scale: [1, 1.08, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatDelay: 3
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-yellow rounded-full" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-24 right-6 w-80 sm:w-96 h-[480px] z-50 glassmorphism overflow-hidden flex flex-col"
          >
            <div className="bg-purple text-white p-4 flex items-center justify-between">
              <div>
                <h3 className="font-bebas text-xl tracking-wide">
                  FUEL ASSISTANT 🤖
                </h3>
                <p className="text-xs text-white/60">Online now</p>
              </div>
              <button onClick={() => setIsOpen(false)} className="hover:opacity-70">
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-offwhite/50">
              {messages.length === 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-2xl p-4"
                >
                  <p className="text-sm text-gray-700">
                    Hey! 👋 Looking for your perfect protein bar?
                  </p>
                </motion.div>
              )}

              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl p-3 ${
                      message.isBot
                        ? 'bg-white text-gray-800'
                        : 'bg-purple text-white'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-white rounded-2xl p-3">
                    <div className="typing-indicator flex space-x-1">
                      <span className="w-2 h-2 bg-purple rounded-full" />
                      <span className="w-2 h-2 bg-purple rounded-full" />
                      <span className="w-2 h-2 bg-purple rounded-full" />
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {messages.length === 0 && (
              <div className="p-4 bg-white/50 border-t border-white/20">
                <div className="flex flex-wrap gap-2">
                  {quickReplies.map((reply) => (
                    <button
                      key={reply}
                      onClick={() => handleQuickReply(reply)}
                      className="px-3 py-2 bg-white rounded-full text-xs font-bold text-purple hover:bg-purple hover:text-white transition-colors"
                    >
                      {reply}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="p-4 bg-white border-t border-gray-200">
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask anything..."
                  className="flex-1 bg-offwhite rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple/20"
                />
                <button
                  onClick={handleSend}
                  className="bg-purple text-white rounded-full p-2 hover:bg-pink transition-colors"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
